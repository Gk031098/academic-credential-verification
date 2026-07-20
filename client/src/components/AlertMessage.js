function AlertMessage({ alert }) {

  if (!alert.show) return null;

  return (
    <div
      className={`alert alert-${alert.type} alert-dismissible fade show shadow`}
      role="alert"
    >
      {alert.message}

      <button
        type="button"
        className="btn-close"
        onClick={alert.close}
      ></button>
    </div>
  );
}

export default AlertMessage;