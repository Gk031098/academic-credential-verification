function Navbar({ page, setPage, isOwner, account, connectWallet }) {

  const tabs = [
    { id: "verify", label: "Verify", icon: "bi-search", isPublic: true },
    { id: "issue", label: "Issue", icon: "bi-plus-circle", isPublic: false },
    { id: "revoke", label: "Revoke", icon: "bi-x-octagon", isPublic: false },
    { id: "records", label: "Records", icon: "bi-table", isPublic: false },
  ];

  const visibleTabs = tabs.filter((tab) => tab.isPublic || isOwner);

  const shortAccount = account
    ? `${account.slice(0, 6)}…${account.slice(-4)}`
    : "";

  return (
    <nav className="navbar">
      <div className="container flex-wrap gap-2">

        <a className="navbar-brand me-auto" href="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          <span className="d-none d-sm-inline">Universiti Tun Abdul Razak</span>
          <span className="d-inline d-sm-none">UNIRAZAK</span>
        </a>

        <div className="d-flex flex-wrap align-items-center gap-2">

          {visibleTabs.length > 1 &&
            visibleTabs.map((tab) => (
              <button
                key={tab.id}
                className={`btn btn-sm ${page === tab.id ? "btn-light" : "btn-outline-light"}`}
                onClick={() => setPage(tab.id)}
              >
                <i className={`bi ${tab.icon} me-1`}></i>
                {tab.label}
              </button>
            ))}

          {account ? (
            <span className="badge rounded-pill bg-light text-dark py-2 px-3" title={account}>
              <i className={`bi ${isOwner ? "bi-shield-lock-fill text-success" : "bi-person-fill"} me-1`}></i>
              {shortAccount}
            </span>
          ) : (
            <button className="btn btn-sm btn-outline-light" onClick={connectWallet}>
              <i className="bi bi-shield-lock me-1"></i>
              Admin login
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;