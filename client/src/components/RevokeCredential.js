function RevokeCredential({
  revokeStudentId,
  setRevokeStudentId,
  revokeCredential,
}) {
  return (
    <div className="card shadow-sm border-0 mt-4">

      <div className="card-header bg-danger text-white">
        <h5 className="mb-0">
          <i className="bi bi-trash"></i> Revoke Credential
        </h5>
      </div>

      <div className="card-body">

        <input
          className="form-control mb-3"
          placeholder="Student ID"
          value={revokeStudentId}
          onChange={(e) => setRevokeStudentId(e.target.value)}
        />

        <button
          className="btn btn-danger w-100"
          onClick={revokeCredential}
        >
          Revoke Credential
        </button>

      </div>

    </div>
  );
}

export default RevokeCredential;