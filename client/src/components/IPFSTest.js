import { useState } from "react";
import ipfs from "../services/ipfs";

function IPFSTest() {

  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");

  async function uploadFile() {

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {

      const result = await ipfs.add(file);

      console.log(result);

      setHash(result.path);

      alert("Upload Successful!");

    } catch (err) {

      console.error(err);

      alert("Upload Failed.");

    }

  }

  return (

    <div className="card shadow mt-4">

      <div className="card-header bg-secondary text-white">
        <h5 className="mb-0">
          Upload Certificate to IPFS
        </h5>
      </div>

      <div className="card-body">

        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-dark mt-3"
          onClick={uploadFile}
        >
          Upload to IPFS
        </button>

        {hash && (

          <div className="alert alert-success mt-3">

            <strong>IPFS Hash</strong>

            <br />

            {hash}

          </div>

        )}

      </div>

    </div>

  );

}

export default IPFSTest;