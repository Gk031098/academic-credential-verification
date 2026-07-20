import { uploadToIPFS } from "./services/ipfs";
import { useState } from "react";
import { ethers } from "ethers";
import contractData from "./AcademicCredential.json";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import WalletCard from "./components/WalletCard";
import DashboardCards from "./components/DashboardCards";
import VerifyCredential from "./components/VerifyCredential";
import IssueCredential from "./components/IssueCredential";
import CredentialDetails from "./components/CredentialDetails";
import RevokeCredential from "./components/RevokeCredential";
import AlertMessage from "./components/AlertMessage";
import Footer from "./components/Footer";
import IPFSTest from "./components/IPFSTest";
import CredentialList from "./components/CredentialList";

const CONTRACT_ADDRESS = "0x3F55189B1DaF6de1E7d7246e94a76761c17344f6";

function App() {

  // Wallet
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  // Verify
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState(null);
  const [credentialList, setCredentialList] = useState([]);

  // Issue
const [newStudentId, setNewStudentId] = useState("");
const [studentName, setStudentName] = useState("");
const [programme, setProgramme] = useState("");
const [graduationDate, setGraduationDate] = useState("");

// NEW
const [selectedFile, setSelectedFile] = useState(null);

const [totalCredentials, setTotalCredentials] = useState(0);
const [revokedCredentials, setRevokedCredentials] = useState(0);

// Revoke
const [revokeStudentId, setRevokeStudentId] = useState("");

  // Alert
  const [alertState, setAlertState] = useState({
    show: false,
    type: "success",
    message: ""
  });

  function showAlert(type, message) {
    setAlertState({
      show: true,
      type,
      message,
      close: () =>
        setAlertState(prev => ({
          ...prev,
          show: false
        }))
    });

    setTimeout(() => {
      setAlertState(prev => ({
        ...prev,
        show: false
      }));
    }, 3000);
  }

  async function connectWallet() {

    if (!window.ethereum) {
      showAlert("danger", "Please install MetaMask.");
      return;
    }

    try {

      const provider = new ethers.BrowserProvider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const accounts = await provider.send("eth_accounts", []);

console.log("Authorized accounts:", accounts);

const address = await signer.getAddress();

console.log("Signer address:", address);

      setAccount(address);

      const smartContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractData.abi,
        signer
      );

console.log("Contract Address:", CONTRACT_ADDRESS);
console.log("Contract:", smartContract);

console.log("Contract owner:", await smartContract.owner());

setContract(smartContract);

// Load dashboard statistics
await loadDashboardStats(smartContract);
await loadCredentialList(smartContract);

const network = await provider.getNetwork();
console.log("Chain ID:", network.chainId.toString());

showAlert("success", "Wallet Connected Successfully!");

    } catch (error) { 

      console.error(error);

      showAlert("danger", "Failed to connect MetaMask.");

    }

  }

  async function loadDashboardStats(smartContract) {
  try {

    const stats = await smartContract.getDashboardStats();

    setTotalCredentials(Number(stats[0]));
    setRevokedCredentials(Number(stats[2]));

  } catch (error) {

    console.error("Dashboard Error:", error);

  }
}

async function loadCredentialList(smartContract) {

  try {

    const total = Number(
      await smartContract.getStudentCount()
    );

    const credentials = [];

    for (let i = 0; i < total; i++) {

      const studentId =
        await smartContract.getStudentId(i);

      const credential =
        await smartContract.verifyCredential(studentId);

      credentials.push({
        studentId: credential[0],
        studentName: credential[1],
        programme: credential[2],
        graduationDate: credential[3],
        ipfsHash: credential[4],
        revoked: credential[6]
      });

    }

    setCredentialList(credentials);

  } catch (error) {

    console.error(error);

  }

}

  async function verifyCredential() {

  if (!contract) {

    showAlert("warning", "Please connect MetaMask first.");

    return;

  }

  try {

    console.log("Using contract:", contract.target);

    console.log(
      "Has verifyCredential:",
      contract.interface.hasFunction("verifyCredential(string)")
    );

    console.log(
      "Contract address from ethers:",
      await contract.getAddress()
    );

    console.log("Student ID:", studentId);

    const credential = await contract.verifyCredential(studentId);

    console.log("Credential:", credential);

    setResult({
      studentId: credential[0],
      studentName: credential[1],
      programme: credential[2],
      graduationDate: credential[3],
      ipfsHash: credential[4],
      revoked: credential[6]
    });

    showAlert("success", "Credential verified successfully.");

  } catch (error) {

    console.error("MetaMask Error:", error);

    alert(JSON.stringify(error, null, 2));

  }

}

  async function issueCredential() {

  if (!contract) {
    showAlert("warning", "Please connect MetaMask first.");
    return;
  }

try {

  console.log("Step 1 - issueCredential() started");

  let uploadedHash = "";

  if (selectedFile) {

    console.log("Step 2 - Uploading to IPFS...");

    showAlert("info", "Uploading certificate to IPFS...");

    console.log("Selected File:", selectedFile);
    
    uploadedHash = await uploadToIPFS(selectedFile);

    console.log("Step 3 - IPFS Upload Success");
    console.log("CID:", uploadedHash);

  }

  console.log("Step 4 - Calling Smart Contract");

console.log("Account:", account);
console.log("Contract Address:", await contract.getAddress());
console.log("Signer:", await contract.runner.getAddress());

const owner = await contract.owner();

console.log("Owner:", owner);
console.log(
  "Is owner?",
  owner.toLowerCase() === (await contract.runner.getAddress()).toLowerCase()
);

  const tx = await contract.issueCredential(
    newStudentId,
    studentName,
    programme,
    graduationDate,
    uploadedHash
  );

  console.log("Step 5 - Transaction Sent");

await tx.wait();

await loadDashboardStats(contract);
await loadCredentialList(contract);

console.log("Step 6 - Transaction Confirmed");

  showAlert("success", "Credential Issued Successfully!");

  setNewStudentId("");
  setStudentName("");
  setProgramme("");
  setGraduationDate("");
  setSelectedFile(null);

} catch (error) {

  console.error("Full Error:", error);

  alert(
    error.message ||
    error.reason ||
    error.shortMessage ||
    "Unknown Error"
  );

  if (error.info?.error?.message)
    showAlert("danger", error.info.error.message);
  else if (error.reason)
    showAlert("danger", error.reason);
  else if (error.shortMessage)
    showAlert("danger", error.shortMessage);
  else if (error.message)
    showAlert("danger", error.message);
  else
    showAlert("danger", "Failed to issue credential.");
  
}  // <-- closes catch

}   // <-- closes issueCredential()

async function revokeCredential() {

    if (!contract) {

      showAlert("warning", "Please connect MetaMask first.");

      return;

    }

    try {

      const tx =
        await contract.revokeCredential(revokeStudentId);

await tx.wait();

// Refresh dashboard
await loadDashboardStats(contract);
await loadCredentialList(contract);

showAlert(
  "warning",
  "Credential Revoked Successfully!"
);

      if (
        result &&
        result.studentId === revokeStudentId
      ) {
        setResult({
          ...result,
          revoked: true
        });
      }

      setRevokeStudentId("");

    } catch (error) {

      console.error(error);

      if (error.info?.error?.message)
        showAlert("danger", error.info.error.message);
      else if (error.reason)
        showAlert("danger", error.reason);
      else if (error.shortMessage)
        showAlert("danger", error.shortMessage);
      else
        showAlert("danger", "Failed to revoke credential.");

    }

  }

  return (

    <>

      <Navbar />

      <div className="container py-5">

        <Header />

        <AlertMessage alert={alertState} />

        <WalletCard
          account={account}
          connectWallet={connectWallet}
        />

        <DashboardCards
          account={account}
          totalCredentials={totalCredentials}
          revokedCredentials={revokedCredentials}
        />

        <div className="row">

          <div className="col-lg-6 mb-4">

            <VerifyCredential
              studentId={studentId}
              setStudentId={setStudentId}
              verifyCredential={verifyCredential}
            />

          </div>

          <div className="col-lg-6 mb-4">

            <IssueCredential
              newStudentId={newStudentId}
              setNewStudentId={setNewStudentId}
              studentName={studentName}
              setStudentName={setStudentName}
              programme={programme}
              setProgramme={setProgramme}
              graduationDate={graduationDate}
              setGraduationDate={setGraduationDate}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              issueCredential={issueCredential}
            />

          </div>

        </div>

<CredentialDetails
  result={result}
/>

<RevokeCredential
  revokeStudentId={revokeStudentId}
  setRevokeStudentId={setRevokeStudentId}
  revokeCredential={revokeCredential}
/>

<CredentialList
  credentialList={credentialList}
/>

<IPFSTest />

</div>

<Footer />

    </>

  );

}

export default App;