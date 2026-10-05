import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
  
function CredentialDetails({ result }) {

  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const baseUrl = process.env.REACT_APP_PUBLIC_URL || window.location.origin;
  const shareLink = `${baseUrl}/?id=${encodeURIComponent(result.studentId)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } 

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
                    href={`http://${window.location.hostname}:8080/ipfs/${result.ipfsHash}`}
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

                <div className="bg-light border rounded p-3 mt-3 d-flex flex-column flex-md-row align-items-center gap-3">

          <QRCodeSVG value={shareLink} size={120} />

          <div className="flex-grow-1 w-100">
            <h6 className="mb-1">Share this verification</h6>
            <p className="text-muted small mb-2">
              Scan the QR code or send this link. Anyone can verify this credential, no wallet needed.
            </p>

            <div className="input-group">
              <input
                className="form-control form-control-sm"
                value={shareLink}
                readOnly
              />
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={copyLink}
              >
                <i className="bi bi-clipboard me-1"></i>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CredentialDetails;