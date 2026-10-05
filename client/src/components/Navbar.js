function Navbar({ page, setPage, isOwner }) {

  const tabs = [
    { id: "verify", label: "Verify", icon: "bi-search", isPublic: true },
    { id: "issue", label: "Issue", icon: "bi-plus-circle", isPublic: false },
    { id: "revoke", label: "Revoke", icon: "bi-x-octagon", isPublic: false },
    { id: "records", label: "Records", icon: "bi-table", isPublic: false },
  ];

  const visibleTabs = tabs.filter((tab) => tab.isPublic || isOwner);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <a className="navbar-brand" href="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Universiti Tun Abdul Razak
        </a>

        <div className="d-flex flex-wrap gap-2">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              className={`btn btn-sm ${page === tab.id ? "btn-light" : "btn-outline-light"}`}
              onClick={() => setPage(tab.id)}
            >
              <i className={`bi ${tab.icon} me-1`}></i>
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;