function CredentialDetails({ result }) {

  if (!result) return null;

  return (
    <div className="card shadow-sm border-0 mt-4">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          Credential Details
        </h5>
      </div>

      <div className="card-body">

        <table className="table">

          <tbody>

            <tr>
              <th width="30%">Student ID</th>
              <td>{result.studentId}</td>
            </tr>

            <tr>
              <th>Student Name</th>
              <td>{result.studentName}</td>
            </tr>

            <tr>
              <th>Programme</th>
              <td>{result.programme}</td>
            </tr>

            <tr>
              <th>Graduation Date</th>
              <td>{result.graduationDate}</td>
            </tr>

            <tr>
              <th>Status</th>

              <td>
                {result.revoked ? (
                  <span className="badge bg-danger">
                    Revoked
                  </span>
                ) : (
                  <span className="badge bg-success">
                    Valid
                  </span>
                )}
              </td>

            </tr>

            <tr>
              <th>IPFS CID</th>
              <td>{result.ipfsHash}</td>
            </tr>

            <tr>
              <th>Certificate</th>

              <td>

                {result.ipfsHash ? (

                  <a
                    href={`http://127.0.0.1:8080/ipfs/${result.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    📄 View Certificate
                  </a>

                ) : (

                  <span className="text-muted">
                    No certificate uploaded
                  </span>

                )}

              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CredentialDetails;