import { uploadToIPFS } from "./services/ipfs";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractData from "./contracts/AcademicCredential.json";
import { getErrorMessage } from "./utils/errors";
import { readOnlyContract, NETWORK_ID, NETWORK_NAME } from "./services/blockchain";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import VerifyCredential from "./components/VerifyCredential";
import IssueCredential from "./components/IssueCredential";
import CredentialDetails from "./components/CredentialDetails";
import RevokeCredential from "./components/RevokeCredential";
import AlertMessage from "./components/AlertMessage";
import Footer from "./components/Footer";
import CredentialList from "./components/CredentialList";

function App() {

  // Wallet
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
      const [page, setPage] = useState("verify");
        const [busy, setBusy] = useState("");

  // Verify
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState(null);
  const [credentialList, setCredentialList] = useState([]);

  // Issue
const [newStudentId, setNewStudentId] = useState("");
const [studentName, setStudentName] = useState("");
const [programme, setProgramme] = useState("");
const [graduationDate, setGraduationDate] = useState("");

// NEW
const [selectedFile, setSelectedFile] = useState(null);

const [totalCredentials, setTotalCredentials] = useState(0);
const [revokedCredentials, setRevokedCredentials] = useState(0);

// Revoke
const [revokeStudentId, setRevokeStudentId] = useState("");

  // Alert
  const [alertState, setAlertState] = useState({
    show: false,
    type: "success",
    message: ""
  });

  function showAlert(type, message) {
    setAlertState({
      show: true,
      type,
      message,
      close: () =>
        setAlertState(prev => ({
          ...prev,
          show: false
        }))
    });

    setTimeout(() => {
      setAlertState(prev => ({
        ...prev,
        show: false
      }));
    }, 4000);
  }

    // Reload the page if the user switches account or network in MetaMask
  useEffect(() => {
    if (!window.ethereum) return;

    const handleChange = () => window.location.reload();

    window.ethereum.on("accountsChanged", handleChange);
    window.ethereum.on("chainChanged", handleChange);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleChange);
      window.ethereum.removeListener("chainChanged", handleChange);
    };
  }, []);

  // If the page was opened with ?id=S001, verify that ID automatically
  useEffect(() => {
    const idFromLink = new URLSearchParams(window.location.search).get("id");

    if (idFromLink) {
      setStudentId(idFromLink);
      verifyCredential(idFromLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connectWallet() {

    if (!window.ethereum) {
      showAlert("danger", "Please install MetaMask.");
      return;
    }

    try {

      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

const address = await signer.getAddress();

            // Find where the contract is deployed on the current network
                  const networkId = await provider.send("net_version", []);

      if (networkId !== NETWORK_ID) {
        showAlert("warning", `Please switch MetaMask to the ${NETWORK_NAME} network.`);
        return;
      }

      const deployed = contractData.networks[networkId];

      setAccount(address);

      const smartContract = new ethers.Contract(
        deployed.address,
        contractData.abi,
        signer
      );

setContract(smartContract);

      // Is the connected wallet the contract owner (admin)?
      const owner = await smartContract.owner();
      const isAdmin = owner.toLowerCase() === address.toLowerCase();
      setIsOwner(isAdmin);

// Load dashboard statistics
await loadDashboardStats(smartContract);
await loadCredentialList(smartContract);

      if (isAdmin) {
        showAlert("success", "Logged in as university administrator.");
      } else {
        showAlert("warning", "This wallet is not the university administrator. You can still verify credentials.");
      }

    } catch (error) { 

      console.error(error);

      showAlert("danger", "Failed to connect MetaMask.");

    }

  }

  async function loadDashboardStats(smartContract) {
  try {

    const stats = await smartContract.getDashboardStats();

    setTotalCredentials(Number(stats[0]));
    setRevokedCredentials(Number(stats[2]));

  } catch (error) {

    console.error("Dashboard Error:", error);

  }
}

async function loadCredentialList(smartContract) {

  try {

    const total = Number(
      await smartContract.getStudentCount()
    );

    const credentials = [];

    for (let i = 0; i < total; i++) {

      const studentId =
        await smartContract.getStudentId(i);

      const credential =
        await smartContract.verifyCredential(studentId);

      credentials.push({
        studentId: credential[0],
        studentName: credential[1],
        programme: credential[2],
        graduationDate: credential[3],
        ipfsHash: credential[4],
        revoked: credential[6]
      });

    }

    setCredentialList(credentials);

  } catch (error) {

    console.error(error);

  }

}

      async function verifyCredential(idToCheck = studentId) {
    const id = idToCheck.trim();

    if (!id) {
      showAlert("warning", "Please enter a Student ID.");
      return;
    }

    try {
      setBusy("Checking the blockchain…");

      const credential = await readOnlyContract.verifyCredential(id);

      setResult({
        studentId: credential[0],
        studentName: credential[1],
        programme: credential[2],
        graduationDate: credential[3],
        ipfsHash: credential[4],
        issueDate: Number(credential[5]),
        revoked: credential[6],
      });
    } catch (error) {
      console.error("Verify error:", error);
      setResult(null);
      showAlert("danger", getErrorMessage(error));
    } finally {
      setBusy("");
    }
  }

  async function issueCredential() {
    if (!contract) {
      showAlert("warning", "Please log in as administrator first.");
      return;
    }

    // Check BEFORE uploading to IPFS or sending a transaction
    if (!newStudentId || !studentName || !programme || !graduationDate) {
      showAlert("warning", "Please fill in all fields.");
      return;
    }

    try {
      setBusy("Checking Student ID…");

      if (await contract.credentialExists(newStudentId)) {
        showAlert("warning", `A credential for ${newStudentId} already exists.`);
        return;
      }

      let uploadedHash = "";

      if (selectedFile) {
        setBusy("Uploading certificate to IPFS…");
        uploadedHash = await uploadToIPFS(selectedFile);
      }

      setBusy("Please confirm in MetaMask…");
      const tx = await contract.issueCredential(
        newStudentId,
        studentName,
        programme,
        graduationDate,
        uploadedHash
      );

      setBusy("Recording on the blockchain…");
      await tx.wait();

      await loadDashboardStats(contract);
      await loadCredentialList(contract);

      showAlert("success", `Credential ${newStudentId} issued successfully!`);

      setNewStudentId("");
      setStudentName("");
      setProgramme("");
      setGraduationDate("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Issue error:", error);
      showAlert("danger", getErrorMessage(error));
    } finally {
      setBusy("");
    }
  }

  async function revokeCredential() {
    if (!contract) {
      showAlert("warning", "Please log in as administrator first.");
      return;
    }

    const id = revokeStudentId.trim();

    if (!id) {
      showAlert("warning", "Please enter a Student ID.");
      return;
    }

    try {
      setBusy("Checking Student ID…");

      if (!(await contract.credentialExists(id))) {
        showAlert("warning", `No credential found for ${id}.`);
        return;
      }

      const existing = await contract.verifyCredential(id);
      if (existing[6]) {
        showAlert("warning", `${id} is already revoked.`);
        return;
      }

      setBusy("Please confirm in MetaMask…");
      const tx = await contract.revokeCredential(id);

      setBusy("Recording on the blockchain…");
      await tx.wait();

      await loadDashboardStats(contract);
      await loadCredentialList(contract);

      showAlert("success", `Credential ${id} has been revoked.`);

      if (result && result.studentId === id) {
        setResult({ ...result, revoked: true });
      }

      setRevokeStudentId("");
    } catch (error) {
      console.error("Revoke error:", error);
      showAlert("danger", getErrorMessage(error));
    } finally {
      setBusy("");
    }
  }

  return (
    <>
            <Navbar
        page={page}
        setPage={setPage}
        isOwner={isOwner}
        account={account}
        connectWallet={connectWallet}
      />

      <div className="container py-4">

        {page === "verify" && <Header />}

        <AlertMessage alert={alertState} />

        {page === "verify" && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <VerifyCredential
                studentId={studentId}
                setStudentId={setStudentId}
                verifyCredential={verifyCredential}
                                busy={busy}
              />
              <CredentialDetails result={result} />
            </div>
          </div>
        )}

        {page === "issue" && isOwner && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <IssueCredential
                newStudentId={newStudentId}
                setNewStudentId={setNewStudentId}
                studentName={studentName}
                setStudentName={setStudentName}
                programme={programme}
                setProgramme={setProgramme}
                graduationDate={graduationDate}
                setGraduationDate={setGraduationDate}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                issueCredential={issueCredential}
                                busy={busy}
              />
            </div>
          </div>
        )}

        {page === "revoke" && isOwner && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <RevokeCredential
                revokeStudentId={revokeStudentId}
                setRevokeStudentId={setRevokeStudentId}
                revokeCredential={revokeCredential}
                                busy={busy}
              />
            </div>
          </div>
        )}

        {page === "records" && isOwner && (
          <>
            <DashboardCards
              account={account}
              totalCredentials={totalCredentials}
              revokedCredentials={revokedCredentials}
            />
            <CredentialList credentialList={credentialList} />
          </>
        )}

      </div>

      <Footer />
    </>
  );

}

export default App;