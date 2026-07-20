function VerifyCredential({
  studentId,
  setStudentId,
  verifyCredential,
}) {
  return (
    <div className="card shadow-sm border-0 h-100">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="bi bi-search"></i> Verify Credential
        </h5>
      </div>

      <div className="card-body">

        <input
          className="form-control mb-3"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={verifyCredential}
        >
          Verify Credential
        </button>

      </div>

    </div>
  );
}

export default VerifyCredential;