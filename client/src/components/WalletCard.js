function WalletCard({ account, connectWallet }) {
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

          </div>

          <div className="col-md-3 text-end">

            <button
              className="btn btn-primary"
              onClick={connectWallet}
            >
              <i className="bi bi-plug-fill"></i>{" "}
              Connect MetaMask
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default WalletCard;