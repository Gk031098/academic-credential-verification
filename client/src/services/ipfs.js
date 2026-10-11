import { create } from "ipfs-http-client";

// Online mode: if a Pinata key is set, upload to Pinata.
// Local mode: otherwise, upload to IPFS Desktop on this laptop.
const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

// Where certificates are opened from (must end with /ipfs/)
export const IPFS_GATEWAY =
  process.env.REACT_APP_IPFS_GATEWAY ||
  `http://${window.location.hostname}:8080/ipfs/`;

async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload to Pinata failed.");
  }

  const data = await response.json();
  return data.IpfsHash;
}

async function uploadToLocalIpfs(file) {
  const ipfs = create({ host: "127.0.0.1", port: 5001, protocol: "http" });
  const result = await ipfs.add(file);
  return result.cid.toString();
}

export async function uploadToIPFS(file) {
  return PINATA_JWT ? uploadToPinata(file) : uploadToLocalIpfs(file);
}