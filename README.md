# 🎓 Academic Credential Verification Portal

> Final Year Project (FYP)

Bachelor of Information Technology (Hons.)

Universiti Tun Abdul Razak (UNIRAZAK)

---

## 📖 Project Overview

The Academic Credential Verification Portal is a blockchain-based web application developed to provide a secure, transparent, and decentralized platform for issuing, verifying, and revoking academic credentials.

The system leverages Ethereum smart contracts to ensure credential integrity and uses the InterPlanetary File System (IPFS) to store supporting documents securely. By eliminating reliance on centralized verification methods, the platform reduces credential fraud and enables faster verification by employers, educational institutions, and other authorized parties.

---

## 💡 Problem Statement

Traditional academic credential verification is often performed manually, making the process slow, costly, and vulnerable to fraudulent certificates.

This project addresses these challenges by implementing blockchain technology to create an immutable record of issued credentials while utilizing decentralized file storage to securely manage supporting documents.

---

## 🎯 Objectives

- Develop a decentralized academic credential verification system.
- Implement Ethereum smart contracts for credential issuance and verification.
- Store supporting documents securely using IPFS.
- Enable credential revocation by authorized administrators.
- Improve transparency, security, and trust in academic credential verification.

---

## ✨ Features

The Academic Credential Verification Portal provides the following core functionalities:

- 🔐 **MetaMask Wallet Authentication**
  - Secure login using MetaMask wallet.
  - Displays the connected Ethereum account.

- 🎓 **Issue Academic Credentials**
  - Issue academic credentials to students.
  - Upload supporting PDF certificates to IPFS.
  - Store the IPFS Content Identifier (CID) securely on the Ethereum blockchain.

- ✅ **Verify Credentials**
  - Verify the authenticity of issued credentials.
  - Retrieve credential details directly from the blockchain.
  - Access supporting documents stored on IPFS.

- 🚫 **Revoke Credentials**
  - Revoke previously issued credentials.
  - Prevent revoked credentials from being considered valid during verification.

- 📋 **Credential Management**
  - View all issued credentials.
  - Monitor credential status.
  - Display credential details in a user-friendly interface.

- 📊 **Dashboard**
  - View total credentials issued.
  - View active and revoked credentials.
  - Display the connected wallet address.

  ---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React.js |
| Programming Language | JavaScript (ES6) |
| Smart Contract | Solidity |
| Blockchain Network | Ethereum (Local Development using Ganache) |
| Development Framework | Truffle Suite |
| Wallet Integration | MetaMask |
| Decentralized Storage | IPFS (InterPlanetary File System) |
| Blockchain Library | ethers.js v6 |
| Styling | CSS3 |
| Version Control | Git & GitHub |

---

## 📂 Project Structure

```text
academic-credential-verification/
│
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── contract.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── contracts/                  # Solidity smart contracts
│   ├── AcademicCredential.sol
│   └── Migrations.sol
│
├── migrations/                 # Truffle migration scripts
│
├── test/                       # Smart contract tests
│
├── truffle-config.js           # Truffle configuration
│
└── README.md
```

---

## 🏗️ System Architecture

The Academic Credential Verification Portal follows a decentralized architecture that integrates a React frontend, Ethereum blockchain, MetaMask wallet, Solidity smart contracts, and the InterPlanetary File System (IPFS).

The React application provides the user interface for administrators to issue, verify, and revoke academic credentials. MetaMask acts as the authentication layer and enables secure interaction with the Ethereum blockchain. Smart contracts manage credential records, while supporting PDF certificates are stored securely on IPFS. The blockchain stores only the credential information and the corresponding IPFS Content Identifier (CID), ensuring data integrity while minimizing on-chain storage.

```text
                    +-----------------------------+
                    |          React.js           |
                    |       User Interface        |
                    +-------------+---------------+
                                  |
                                  | ethers.js
                                  |
                    +-------------v---------------+
                    |         MetaMask            |
                    |      Ethereum Wallet        |
                    +-------------+---------------+
                                  |
                                  |
                    +-------------v---------------+
                    |   Solidity Smart Contract   |
                    |  AcademicCredential.sol     |
                    +-------------+---------------+
                                  |
                 +----------------+----------------+
                 |                                 |
                 |                                 |
        +--------v--------+              +---------v---------+
        | Ethereum Chain  |              |       IPFS        |
        | Credential Data |              | PDF Certificates  |
        +-----------------+              +-------------------+
```

---

## ⚙️ System Workflow

1. The administrator connects their Ethereum wallet using MetaMask.
2. A student's academic credential information is entered into the system.
3. The supporting PDF certificate is uploaded to IPFS.
4. IPFS returns a unique Content Identifier (CID).
5. The smart contract stores:
   - Student information
   - Credential details
   - IPFS CID
   - Credential status
6. During verification, the smart contract retrieves the credential information from the blockchain.
7. The corresponding PDF certificate is accessed securely through IPFS using the stored CID.
8. If a credential has been revoked, the verification result clearly indicates its revoked status.

---

## 📸 Application Screenshots

### Dashboard

*Coming Soon*

### Issue Credential

*Coming Soon*

### Verify Credential

*Coming Soon*

### Revoke Credential

*Coming Soon*

### Credential List

*Coming Soon*

---

## 🚀 Installation

### Prerequisites

Ensure the following software is installed:

- Node.js
- npm
- Ganache
- MetaMask
- Truffle
- IPFS Desktop

### Clone the Repository

```bash
git clone https://github.com/Gk031098/academic-credential-verification.git
```

### Install Dependencies

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

### Deploy Smart Contracts

Start Ganache, then run:

```bash
truffle migrate --reset
```

### Start the React Application

```bash
cd client
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

## 👩‍💻 Author

**Auji Kamaruddin**

Bachelor of Information Technology (Hons.)

Universiti Tun Abdul Razak (UNIRAZAK)

Final Year Project (2026)

```

