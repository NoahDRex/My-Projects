// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title LandRegistry
/// @notice Records land ownership on-chain and lets anyone verify that a land
///         record (and the legal document behind it) has not been tampered
///         with after registration.
///
/// How tamper-evidence works here:
/// 1. Every land record stores a SHA-256 hash of its supporting document
///    (sale deed / title document), not the document itself.
/// 2. Once written, blockchain state can only change through a new
///    transaction signed by an authorized verifier - it can't be silently
///    edited. Every change is permanently logged as an event.
/// 3. Anyone holding a copy of the document can re-hash it locally and call
///    verifyDocumentIntegrity() to confirm it matches what was registered.
///    A single changed character in the document produces a completely
///    different hash, so tampering is immediately detectable.
/// 4. getTransferHistory() exposes the full chain-of-custody for a parcel,
///    so the entire ownership trail is auditable, not just the latest state.
contract LandRegistry {
    address public admin;

    struct Land {
        uint256 landId;
        string location;
        uint256 area; // in square feet
        address owner;
        string documentHash; // SHA-256 hex digest of the title document
        bool isRegistered;
        uint256 registeredAt;
        uint256 lastUpdatedAt;
    }

    struct TransferRecord {
        address from;
        address to;
        uint256 timestamp;
        string remarks;
    }

    mapping(uint256 => Land) private lands;
    mapping(uint256 => TransferRecord[]) private transferHistory;
    mapping(address => bool) public verifiers; // authorized registry officials
    uint256[] private allLandIds;

    event LandRegistered(
        uint256 indexed landId,
        address indexed owner,
        string location,
        string documentHash,
        uint256 timestamp
    );
    event OwnershipTransferred(
        uint256 indexed landId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyVerifier() {
        require(
            verifiers[msg.sender] || msg.sender == admin,
            "Only an authorized verifier can perform this action"
        );
        _;
    }

    modifier landExists(uint256 _landId) {
        require(lands[_landId].isRegistered, "Land is not registered");
        _;
    }

    constructor() {
        admin = msg.sender;
        verifiers[msg.sender] = true;
    }

    // ---------------------------------------------------------------------
    // Verifier management (e.g. registry officials / sub-registrar offices)
    // ---------------------------------------------------------------------

    function addVerifier(address _verifier) external onlyAdmin {
        verifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) external onlyAdmin {
        verifiers[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }

    // ---------------------------------------------------------------------
    // Core registry operations
    // ---------------------------------------------------------------------

    function registerLand(
        uint256 _landId,
        string memory _location,
        uint256 _area,
        address _owner,
        string memory _documentHash
    ) external onlyVerifier {
        require(!lands[_landId].isRegistered, "Land ID already registered");
        require(_owner != address(0), "Invalid owner address");
        require(bytes(_documentHash).length > 0, "Document hash required");

        lands[_landId] = Land({
            landId: _landId,
            location: _location,
            area: _area,
            owner: _owner,
            documentHash: _documentHash,
            isRegistered: true,
            registeredAt: block.timestamp,
            lastUpdatedAt: block.timestamp
        });

        allLandIds.push(_landId);

        emit LandRegistered(_landId, _owner, _location, _documentHash, block.timestamp);
    }

    function transferOwnership(
        uint256 _landId,
        address _newOwner,
        string memory _newDocumentHash,
        string memory _remarks
    ) external onlyVerifier landExists(_landId) {
        require(_newOwner != address(0), "Invalid new owner address");
        require(bytes(_newDocumentHash).length > 0, "Document hash required");

        Land storage land = lands[_landId];
        address previousOwner = land.owner;

        transferHistory[_landId].push(
            TransferRecord({
                from: previousOwner,
                to: _newOwner,
                timestamp: block.timestamp,
                remarks: _remarks
            })
        );

        land.owner = _newOwner;
        land.documentHash = _newDocumentHash;
        land.lastUpdatedAt = block.timestamp;

        emit OwnershipTransferred(_landId, previousOwner, _newOwner, block.timestamp);
    }

    // ---------------------------------------------------------------------
    // Tamper verification
    // ---------------------------------------------------------------------

    /// @notice Compare a freshly computed document hash against the one
    ///         stored at registration/transfer time. Returns false the
    ///         moment a single byte of the underlying document has changed.
    function verifyDocumentIntegrity(uint256 _landId, string memory _hashToCheck)
        external
        view
        landExists(_landId)
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(lands[_landId].documentHash)) ==
            keccak256(abi.encodePacked(_hashToCheck));
    }

    // ---------------------------------------------------------------------
    // Read functions
    // ---------------------------------------------------------------------

    function getLandDetails(uint256 _landId)
        external
        view
        landExists(_landId)
        returns (
            uint256 landId,
            string memory location,
            uint256 area,
            address owner,
            string memory documentHash,
            uint256 registeredAt,
            uint256 lastUpdatedAt
        )
    {
        Land memory land = lands[_landId];
        return (
            land.landId,
            land.location,
            land.area,
            land.owner,
            land.documentHash,
            land.registeredAt,
            land.lastUpdatedAt
        );
    }

    function getTransferHistory(uint256 _landId)
        external
        view
        landExists(_landId)
        returns (TransferRecord[] memory)
    {
        return transferHistory[_landId];
    }

    /// @notice Same data as getTransferHistory but as parallel arrays, which
    ///         is easier to consume from a hand-written (human-readable) ABI
    ///         on the frontend.
    function getTransferHistoryFlat(uint256 _landId)
        external
        view
        landExists(_landId)
        returns (
            address[] memory froms,
            address[] memory tos,
            uint256[] memory timestamps,
            string[] memory remarksList
        )
    {
        TransferRecord[] memory records = transferHistory[_landId];
        froms = new address[](records.length);
        tos = new address[](records.length);
        timestamps = new uint256[](records.length);
        remarksList = new string[](records.length);

        for (uint256 i = 0; i < records.length; i++) {
            froms[i] = records[i].from;
            tos[i] = records[i].to;
            timestamps[i] = records[i].timestamp;
            remarksList[i] = records[i].remarks;
        }
    }

    function getAllLandIds() external view returns (uint256[] memory) {
        return allLandIds;
    }

    function isLandRegistered(uint256 _landId) external view returns (bool) {
        return lands[_landId].isRegistered;
    }
}
