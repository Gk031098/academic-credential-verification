// Turns blockchain/MetaMask errors into messages a normal user can understand
export function getErrorMessage(error) {
  // User clicked "Reject" in the MetaMask popup
  if (error.code === "ACTION_REJECTED") {
    return "Transaction cancelled in MetaMask.";
  }

  // Message from require(...) in the smart contract,
  // e.g. "Credential does not exist."
  if (error.reason) {
    return error.reason;
  }
  // MetaMask sometimes hides the contract's reason deeper inside the error
  const nested =
    error.info?.error?.data?.message || error.info?.error?.message || "";
  const match = nested.match(/revert (.*)/);
  if (match) {
    return match[1];
  }

  if (error.shortMessage) {
    return error.shortMessage;
  }

  return "Something went wrong. Please try again.";
}