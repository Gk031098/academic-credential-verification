const AcademicCredential = artifacts.require("AcademicCredential");

contract("AcademicCredential", (accounts) => {
  const admin = accounts[0];
  const stranger = accounts[1];

  let credential;

  // Deploy a fresh contract before EVERY test, so tests don't affect each other
  beforeEach(async () => {
    credential = await AcademicCredential.new({ from: admin });
  });

  // Helper: checks that a transaction FAILS with the expected error message
  async function expectRevert(promise, expectedMessage) {
    try {
      await promise;
    } catch (error) {
      assert(
        error.message.includes(expectedMessage),
        `Expected "${expectedMessage}" but got "${error.message}"`
      );
      return;
    }
    assert.fail(`Expected the transaction to fail with "${expectedMessage}"`);
  }

  // Helper: issues a sample credential
  async function issueSample(id = "S001", options = { from: admin }) {
    return credential.issueCredential(
      id,
      "Test Student",
      "Bachelor of IT",
      "2026-10-11",
      "QmTestCid",
      options
    );
  }

  describe("Deployment", () => {
    it("sets the deployer as the owner (administrator)", async () => {
      assert.equal(await credential.owner(), admin);
    });

    it("starts with zero credentials", async () => {
      const stats = await credential.getDashboardStats();
      assert.equal(stats[0].toNumber(), 0);
    });
  });

  describe("Issuing credentials", () => {
    it("lets the admin issue a credential and stores the details", async () => {
      await issueSample();
      const result = await credential.verifyCredential("S001");
      assert.equal(result[0], "S001");
      assert.equal(result[1], "Test Student");
      assert.equal(result[2], "Bachelor of IT");
      assert.equal(result[3], "2026-10-11");
      assert.equal(result[4], "QmTestCid");
      assert.equal(result[6], false);
    });

    it("emits a CredentialIssued event", async () => {
      const tx = await issueSample();
      assert.equal(tx.logs[0].event, "CredentialIssued");
      assert.equal(tx.logs[0].args.studentId, "S001");
    });

    it("rejects a credential issued by a non-admin", async () => {
      await expectRevert(
        issueSample("S002", { from: stranger }),
        "Only administrator can perform this action."
      );
    });

    it("rejects a duplicate Student ID", async () => {
      await issueSample();
      await expectRevert(issueSample(), "Credential already exists.");
    });
  });

  describe("Verifying credentials", () => {
    it("fails for a Student ID that does not exist", async () => {
      await expectRevert(
        credential.verifyCredential("S999"),
        "Credential does not exist."
      );
    });

    it("lets anyone (not just the admin) verify a credential", async () => {
      await issueSample();
      const result = await credential.verifyCredential("S001", { from: stranger });
      assert.equal(result[1], "Test Student");
    });
  });

  describe("Revoking credentials", () => {
    it("lets the admin revoke a credential", async () => {
      await issueSample();
      await credential.revokeCredential("S001", { from: admin });
      const result = await credential.verifyCredential("S001");
      assert.equal(result[6], true);
    });

    it("rejects revocation by a non-admin", async () => {
      await issueSample();
      await expectRevert(
        credential.revokeCredential("S001", { from: stranger }),
        "Only administrator can perform this action."
      );
    });

    it("rejects revoking the same credential twice", async () => {
      await issueSample();
      await credential.revokeCredential("S001", { from: admin });
      await expectRevert(
        credential.revokeCredential("S001", { from: admin }),
        "Credential already revoked."
      );
    });

    it("rejects revoking a credential that does not exist", async () => {
      await expectRevert(
        credential.revokeCredential("S999", { from: admin }),
        "Credential does not exist."
      );
    });
  });

  describe("Dashboard statistics", () => {
    it("counts total, valid and revoked credentials correctly", async () => {
      await issueSample("S001");
      await issueSample("S002");
      await issueSample("S003");
      await credential.revokeCredential("S002", { from: admin });

      const stats = await credential.getDashboardStats();
      assert.equal(stats[0].toNumber(), 3, "total");
      assert.equal(stats[1].toNumber(), 2, "valid");
      assert.equal(stats[2].toNumber(), 1, "revoked");
    });

    it("lists all issued Student IDs", async () => {
      await issueSample("S001");
      await issueSample("S002");
      const ids = await credential.getAllStudentIds();
      assert.deepEqual(ids, ["S001", "S002"]);
    });
  });
});