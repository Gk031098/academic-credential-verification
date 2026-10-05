import { ethers } from "ethers";
import contractData from "../contracts/AcademicCredential.json";

// Direct connection to the blockchain, no wallet needed.
// Used for reading (verifying) only.
const RPC_URL = `http://${window.location.hostname}:7545`;
const NETWORK_ID = "5777";

const provider = new ethers.JsonRpcProvider(RPC_URL);

export const readOnlyContract = new ethers.Contract(
  contractData.networks[NETWORK_ID].address,
  contractData.abi,
  provider
);