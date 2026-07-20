function CredentialList({ credentialList }) {
  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Credential Management</h5>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Programme</th>
                <th>Graduation Date</th>
                <th>Status</th>
                <th>Certificate</th>
              </tr>
            </thead>

            <tbody>
              {credentialList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No credentials found.
                  </td>
                </tr>
              ) : (
                credentialList.map((credential, index) => (
                  <tr key={index}>
                    <td>{credential.studentId}</td>
                    <td>{credential.studentName}</td>
                    <td>{credential.programme}</td>
                    <td>{credential.graduationDate}</td>
                    <td>
                      {credential.revoked ? (
                        <span className="badge bg-danger">Revoked</span>
                      ) : (
                        <span className="badge bg-success">Valid</span>
                      )}
                    </td>
                    <td>
                      {credential.ipfsHash ? (
                        <a
                          href={`http://127.0.0.1:8080/ipfs/${credential.ipfsHash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </a>
                      ) : (
                        "No Certificate"
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CredentialList;