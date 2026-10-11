function IssueCredential({
  newStudentId,
  setNewStudentId,
  studentName,
  setStudentName,
  programme,
  setProgramme,
  graduationDate,
  setGraduationDate,
  selectedFile,
  setSelectedFile,
  issueCredential,
  busy,
}) {
  return (
    <div className="card shadow-sm border-0">

      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          <i className="bi bi-plus-circle"></i> Issue Credential
        </h5>
      </div>

      <div className="card-body">

        <label className="form-label small text-muted mb-1">Student ID</label>
        <input
          className="form-control mb-3"
          placeholder="e.g. DEMO003"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
        />

        <label className="form-label small text-muted mb-1">Student Name</label>
        <input
          className="form-control mb-3"
          placeholder="Full name as on certificate"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <label className="form-label small text-muted mb-1">Programme</label>
        <input
          className="form-control mb-3"
          placeholder="e.g. Bachelor of Information Technology"
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
        />

        <label className="form-label small text-muted mb-1">Graduation Date</label>
        <input
          type="date"
          className="form-control mb-3"
          value={graduationDate}
          onChange={(e) => setGraduationDate(e.target.value)}
        />

        <label className="form-label small text-muted mb-1">Certificate (PDF)</label>
        <input
          type="file"
          accept="application/pdf"
          key={selectedFile ? selectedFile.name : "empty"}
          className="form-control mb-3"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <button
          className="btn btn-success w-100"
          onClick={issueCredential}
          disabled={!!busy}
        >
          {busy ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              {busy}
            </>
          ) : (
            "Issue Credential"
          )}
        </button>

      </div>

    </div>
  );
}

export default IssueCredential;