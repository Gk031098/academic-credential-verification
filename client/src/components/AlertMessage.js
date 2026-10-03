function AlertMessage({ alert }) {

  if (!alert.show) return null;

  const icons = {
    success: "bi-check-circle-fill",
    danger: "bi-x-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  };

  return (
    <div className="toast-fixed">
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show shadow d-flex align-items-center`}
        role="alert"
      >
        <i className={`bi ${icons[alert.type]} me-2 fs-5`}></i>
        <span>{alert.message}</span>

        <button
          type="button"
          className="btn-close"
          onClick={alert.close}
        ></button>
      </div>
    </div>
  );
}

export default AlertMessage;