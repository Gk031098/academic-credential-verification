function DashboardCards({
  account,
  totalCredentials,
  revokedCredentials,
}) {

  const validCredentials =
    totalCredentials - revokedCredentials;

  return (

    <div className="row mb-4">

      {/* Connected Wallet */}

      <div className="col-lg-3 col-md-6 mb-4">

        <div className="card dashboard-blue shadow-lg h-100">

          <div className="card-body text-center">

            <i
              className="bi bi-wallet2"
              style={{
                fontSize: "45px",
                color: "white"
              }}
            ></i>

            <h6 className="mt-3 fw-bold">
              Connected Wallet
            </h6>

            <p
              className="mb-0"
              style={{
                fontSize: "15px",
                fontWeight: "500"
              }}
            >
              {account
                ? `${account.substring(0, 6)}...${account.substring(
                    account.length - 4
                  )}`
                : "Not Connected"}
            </p>

          </div>

        </div>

      </div>

      {/* Total Credentials */}

      <div className="col-lg-3 col-md-6 mb-4">

        <div className="card dashboard-green shadow-lg h-100">

          <div className="card-body text-center">

            <i
              className="bi bi-file-earmark-text-fill"
              style={{
                fontSize: "45px",
                color: "white"
              }}
            ></i>

            <h6 className="mt-3 fw-bold">
              Total Credentials
            </h6>

            <h1
              className="display-5 fw-bold"
            >
              {totalCredentials}
            </h1>

          </div>

        </div>

      </div>

      {/* Valid Credentials */}

      <div className="col-lg-3 col-md-6 mb-4">

        <div className="card dashboard-light shadow-lg h-100">

          <div className="card-body text-center">

            <i
              className="bi bi-patch-check-fill"
              style={{
                fontSize: "45px",
                color: "white"
              }}
            ></i>

            <h6 className="mt-3 fw-bold">
              Valid Credentials
            </h6>

            <h1
              className="display-5 fw-bold"
            >
              {validCredentials}
            </h1>

          </div>

        </div>

      </div>

      {/* Revoked Credentials */}

      <div className="col-lg-3 col-md-6 mb-4">

        <div className="card dashboard-red shadow-lg h-100">

          <div className="card-body text-center">

            <i
              className="bi bi-x-circle-fill"
              style={{
                fontSize: "45px",
                color: "white"
              }}
            ></i>

            <h6 className="mt-3 fw-bold">
              Revoked Credentials
            </h6>

            <h1
              className="display-5 fw-bold"
            >
              {revokedCredentials}
            </h1>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardCards;