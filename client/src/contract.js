import { ethers } from "ethers";
import AcademicCredential from "./AcademicCredential.json";

const CONTRACT_ADDRESS = "0xEff834522A3474d924390B2B8ADF6310A7Cd4326";

export async function getContract() {
    if (!window.ethereum) {
        alert("Please install MetaMask.");
        return null;
    }

    await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    return new ethers.Contract(
        CONTRACT_ADDRESS,
        AcademicCredential.abi,
        signer
    );
}