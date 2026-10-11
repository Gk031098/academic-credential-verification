import { ethers } from "ethers";
import contractData from "../contracts/AcademicCredential.json";

// Which blockchain to use. Set these in .env to switch to Sepolia;
// if they're not set, the app uses local Ganache.
const RPC_URL =
  process.env.REACT_APP_RPC_URL || `http://${window.location.hostname}:7545`;

export const NETWORK_ID = process.env.REACT_APP_NETWORK_ID || "5777";
export const NETWORK_NAME = process.env.REACT_APP_NETWORK_NAME || "Ganache";

// MetaMask needs the chain ID in hexadecimal.
// Sepolia: network ID and chain ID are the same (11155111 → 0xaa36a7).
// Ganache: they differ (network 5777, chain 1337 → 0x539).
export const CHAIN_ID_HEX =
  NETWORK_ID === "5777" ? "0x539" : "0x" + Number(NETWORK_ID).toString(16);

const provider = new ethers.JsonRpcProvider(RPC_URL);

export const readOnlyContract = new ethers.Contract(
  contractData.networks[NETWORK_ID].address,
  contractData.abi,
  provider
);