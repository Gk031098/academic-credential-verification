function RevokeCredential({
  revokeStudentId,
  setRevokeStudentId,
  revokeCredential,
  busy,
}) {
  return (
    <div className="card shadow-sm border-0">

      <div className="card-header bg-danger text-white">
        <h5 className="mb-0">
          <i className="bi bi-x-octagon"></i> Revoke Credential
        </h5>
      </div>

      <div className="card-body">

        <p className="text-muted small">
          Revoking is permanent. The credential will show as REVOKED to anyone who verifies it.
        </p>

        <input
          className="form-control mb-3"
          placeholder="Student ID to revoke"
          value={revokeStudentId}
          onChange={(e) => setRevokeStudentId(e.target.value)}
        />

        <button
          className="btn btn-danger w-100"
          onClick={revokeCredential}
          disabled={!!busy}
        >
          {busy ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              {busy}
            </>
          ) : (
            "Revoke Credential"
          )}
        </button>

      </div>

    </div>
  );
}

export default RevokeCredential;