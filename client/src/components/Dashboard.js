function DashboardCards({
  account,
  totalCredentials,
  revokedCredentials
}) {

  const validCredentials =
    totalCredentials - revokedCredentials;

  return (
    <div className="row mb-4">

      <div className="col-md-3">

        <div className="card shadow h-100">
          <div className="card-body text-center">
            <i className="bi bi-wallet2 display-4"></i>

            <h5 className="mt-3">
              Connected Wallet
            </h5>

            <p className="mb-0">
              {account
                ? `${account.slice(0,6)}...${account.slice(-4)}`
                : "Not Connected"}
            </p>

          </div>
        </div>

      </div>

      <div className="col-md-3">

        <div className="card bg-primary text-white shadow h-100">

          <div className="card-body text-center">

            <i className="bi bi-file-earmark-text display-4"></i>

            <h5 className="mt-3">
              Total Credentials
            </h5>

            <h2>{totalCredentials}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card bg-success text-white shadow h-100">

          <div className="card-body text-center">

            <i className="bi bi-patch-check-fill display-4"></i>

            <h5 className="mt-3">
              Valid Credentials
            </h5>

            <h2>{validCredentials}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card bg-danger text-white shadow h-100">

          <div className="card-body text-center">

            <i className="bi bi-x-octagon-fill display-4"></i>

            <h5 className="mt-3">
              Revoked Credentials
            </h5>

            <h2>{revokedCredentials}</h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCards;