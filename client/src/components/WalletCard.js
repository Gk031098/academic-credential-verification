function WalletCard({ account, isOwner, connectWallet }) {
  return (
    <div className="card shadow-sm border-0 mb-4">

      <div className="card-body">

        <div className="row align-items-center">

          <div className="col-md-9">

            <h5>
              <i className="bi bi-wallet2"></i>{" "}
              Connected Wallet
            </h5>

            <small className="text-muted">
              {account || "Wallet not connected"}
            </small>

            {account && (
              <div className="mt-2">
                {isOwner ? (
                  <span className="badge bg-success">
                    <i className="bi bi-shield-lock-fill me-1"></i>
                    Administrator
                  </span>
                ) : (
                  <span className="badge bg-secondary">
                    <i className="bi bi-person-check-fill me-1"></i>
                    Verifier
                  </span>
                )}
              </div>
            )}

          </div>

          <div className="col-md-3 text-end">

            <button
              className="btn btn-primary"
              onClick={connectWallet}
              disabled={!!account}
            >
              <i className="bi bi-plug-fill"></i>{" "}
              {account ? "Connected" : "Connect MetaMask"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WalletCard;