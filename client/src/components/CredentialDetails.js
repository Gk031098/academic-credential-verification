import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { IPFS_GATEWAY } from "../services/ipfs";
import { formatDate, formatTimestamp, shortenHash } from "../utils/format";

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

      <div className="card-body p-4">

        <div className={`verify-banner ${result.revoked ? "revoked" : "valid"}`}>
          <i className={`bi ${result.revoked ? "bi-x-octagon-fill" : "bi-patch-check-fill"}`}></i>
          <div>
            <h4 className="mb-1">
              {result.revoked ? "Credential Revoked" : "Credential Verified"}
            </h4>
            <p className="mb-0">
              {result.revoked
                ? "This credential was revoked by the university and is no longer valid."
                : "This credential is authentic and recorded on the blockchain."}
            </p>
          </div>
        </div>

        <table className="table align-middle mb-0">
          <tbody>
            <tr>
              <th className="text-muted fw-normal" style={{ width: "35%" }}>Student ID</th>
              <td className="fw-semibold">{result.studentId}</td>
            </tr>
            <tr>
              <th className="text-muted fw-normal">Student Name</th>
              <td className="fw-semibold">{result.studentName}</td>
            </tr>
            <tr>
              <th className="text-muted fw-normal">Programme</th>
              <td>{result.programme}</td>
            </tr>
            <tr>
              <th className="text-muted fw-normal">Graduation Date</th>
              <td>{formatDate(result.graduationDate)}</td>
            </tr>
            <tr>
              <th className="text-muted fw-normal">Recorded on Blockchain</th>
              <td>{formatTimestamp(result.issueDate)}</td>
            </tr>
            <tr>
              <th className="text-muted fw-normal">Certificate</th>
              <td>
                {result.ipfsHash ? (
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <a
                      href={`${IPFS_GATEWAY}${result.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-file-earmark-pdf me-1"></i>
                      View Certificate
                    </a>
                    <code className="small text-muted" title={result.ipfsHash}>
                      {shortenHash(result.ipfsHash)}
                    </code>
                  </div>
                ) : (
                  <span className="text-muted">No certificate uploaded</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bg-light border rounded p-3 mt-4 d-flex flex-column flex-md-row align-items-center gap-3">

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