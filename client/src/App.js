import { uploadToIPFS } from "./services/ipfs";
import { useState } from "react";
import { ethers } from "ethers";
import contractData from "./contracts/AcademicCredential.json";
import { getErrorMessage } from "./utils/errors";

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
import CredentialList from "./components/CredentialList";

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
    }, 4000);
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

const address = await signer.getAddress();

      setAccount(address);

            // Find where the contract is deployed on the current network
      const networkId = await provider.send("net_version", []);
      const deployed = contractData.networks[networkId];

      if (!deployed) {
        showAlert("danger", "Contract not found on this network. Please switch MetaMask to Ganache.");
        return;
      }

      const smartContract = new ethers.Contract(
        deployed.address,
        contractData.abi,
        signer
      );

setContract(smartContract);

// Load dashboard statistics
await loadDashboardStats(smartContract);
await loadCredentialList(smartContract);

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

    const credential = await contract.verifyCredential(studentId);

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

    setResult(null);
showAlert("danger", getErrorMessage(error));

  }

}

  async function issueCredential() {

  if (!contract) {
    showAlert("warning", "Please connect MetaMask first.");
    return;
  }

try {

  // Check BEFORE uploading to IPFS or sending a transaction
  if (!newStudentId || !studentName || !programme || !graduationDate) {
    showAlert("warning", "Please fill in all fields.");
    return;
  }

  if (await contract.credentialExists(newStudentId)) {
    showAlert("warning", `A credential for ${newStudentId} already exists.`);
    return;
  }
  let uploadedHash = "";

  if (selectedFile) {

    showAlert("info", "Uploading certificate to IPFS...");
    
    uploadedHash = await uploadToIPFS(selectedFile);

  }

  const tx = await contract.issueCredential(
    newStudentId,
    studentName,
    programme,
    graduationDate,
    uploadedHash
  );

await tx.wait();

await loadDashboardStats(contract);
await loadCredentialList(contract);

  showAlert("success", "Credential Issued Successfully!");

  setNewStudentId("");
  setStudentName("");
  setProgramme("");
  setGraduationDate("");
  setSelectedFile(null);

} catch (error) {

  console.error("Full Error:", error);

    showAlert("danger", getErrorMessage(error));
  
}  // <-- closes catch

}   // <-- closes issueCredential()

async function revokeCredential() {

    if (!contract) {

      showAlert("warning", "Please connect MetaMask first.");

      return;

    }

    try {

            if (!(await contract.credentialExists(revokeStudentId))) {
        showAlert("warning", `No credential found for ${revokeStudentId}.`);
        return;
      }

      const existing = await contract.verifyCredential(revokeStudentId);
      if (existing[6]) {
        showAlert("warning", `${revokeStudentId} is already revoked.`);
        return;
      }

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

            showAlert("danger", getErrorMessage(error));

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

</div>

<Footer />

    </>

  );

}

export default App;