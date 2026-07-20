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
}) {
  return (
    <div className="card shadow-sm border-0 h-100">

      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          <i className="bi bi-plus-circle"></i> Issue Credential
        </h5>
      </div>

      <div className="card-body">

        <input
          className="form-control mb-2"
          placeholder="Student ID"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Programme"
          value={programme}
          onChange={(e) => setProgramme(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Graduation Date"
          value={graduationDate}
          onChange={(e) => setGraduationDate(e.target.value)}
        />

        <label className="form-label mt-2">
          Certificate File
        </label>

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        {selectedFile && (
          <div className="alert alert-info">
            Selected File:
            <br />
            <strong>{selectedFile.name}</strong>
          </div>
        )}

        <button
          className="btn btn-success w-100"
          onClick={issueCredential}
        >
          Issue Credential
        </button>

      </div>

    </div>
  );
}

export default IssueCredential;