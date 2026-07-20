// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AcademicCredential {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only administrator can perform this action.");
        _;
    }

    struct Credential {
        string studentId;
        string studentName;
        string programme;
        string graduationDate;
        string certificateHash;
        uint256 issueDate;
        bool exists;
        bool revoked;
    }

    mapping(string => Credential) private credentials;

    // Store all student IDs
    string[] private studentIds;

    // Dashboard statistics
    uint256 public totalCredentials;
    uint256 public revokedCredentials;

    // Events
    event CredentialIssued(
        string studentId,
        string studentName,
        string programme
    );

    event CredentialRevoked(
        string studentId
    );

    /**
     * Issue Credential
     */
    function issueCredential(
        string memory _studentId,
        string memory _studentName,
        string memory _programme,
        string memory _graduationDate,
        string memory _certificateHash
    )
        public
        onlyOwner
    {

        require(
            !credentials[_studentId].exists,
            "Credential already exists."
        );

        credentials[_studentId] = Credential({
            studentId: _studentId,
            studentName: _studentName,
            programme: _programme,
            graduationDate: _graduationDate,
            certificateHash: _certificateHash,
            issueDate: block.timestamp,
            exists: true,
            revoked: false
        });

        studentIds.push(_studentId);

        totalCredentials++;

        emit CredentialIssued(
            _studentId,
            _studentName,
            _programme
        );
    }

    /**
     * Verify Credential
     */
    function verifyCredential(
        string memory _studentId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {

        require(
            credentials[_studentId].exists,
            "Credential does not exist."
        );

        Credential memory c = credentials[_studentId];

        return (
            c.studentId,
            c.studentName,
            c.programme,
            c.graduationDate,
            c.certificateHash,
            c.issueDate,
            c.revoked
        );
    }

    /**
     * Revoke Credential
     */
    function revokeCredential(
        string memory _studentId
    )
        public
        onlyOwner
    {

        require(
            credentials[_studentId].exists,
            "Credential does not exist."
        );

        require(
            !credentials[_studentId].revoked,
            "Credential already revoked."
        );

        credentials[_studentId].revoked = true;

        revokedCredentials++;

        emit CredentialRevoked(_studentId);
    }

    /**
     * Get all Student IDs
     */
    function getAllStudentIds()
        public
        view
        returns (string[] memory)
    {
        return studentIds;
    }

    /**
     * Get total student IDs
     */
    function getStudentCount()
        public
        view
        returns (uint256)
    {
        return studentIds.length;
    }

    /**
     * Get Student ID by Index
     */
    function getStudentId(
        uint256 index
    )
        public
        view
        returns (string memory)
    {
        require(
            index < studentIds.length,
            "Index out of bounds."
        );

        return studentIds[index];
    }

    /**
     * Check if Credential Exists
     */
    function credentialExists(
        string memory _studentId
    )
        public
        view
        returns (bool)
    {
        return credentials[_studentId].exists;
    }

    /**
     * Get Dashboard Statistics
     */
    function getDashboardStats()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            totalCredentials,
            totalCredentials - revokedCredentials,
            revokedCredentials
        );
    }
}