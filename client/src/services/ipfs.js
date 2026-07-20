import { create } from "ipfs-http-client";

const ipfs = create({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});

export async function uploadToIPFS(file) {
  try {
    console.log("========== IPFS TEST ==========");
    console.log("File:", file);

    const result = await ipfs.add(file);

    console.log("Upload Success!");
    console.log("CID:", result.cid.toString());

    return result.cid.toString();

  } catch (error) {
    console.error("IPFS ERROR:", error);
    throw error;
  }
}

export default ipfs;