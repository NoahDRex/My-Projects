# Land Registry Ledger — Blockchain-based Land Registration with Tamper Detection

A full-stack dApp that registers land ownership records on an Ethereum-compatible
blockchain and lets anyone cryptographically verify that a record — and the
legal document behind it — hasn't been altered after registration.

## How tamper-evidence works

1. **Hash, don't store.** When a parcel is registered, the title document is
   hashed with SHA-256 in the browser. Only the 64-character hex digest goes
   on-chain — the document itself never leaves your machine.
2. **Immutability.** Once a transaction is mined, the stored hash cannot be
   silently edited. The only way to change a record is a new, signed
   transaction (e.g. `transferOwnership`), which is itself permanently logged.
3. **Detection.** To check a document later, anyone re-hashes their copy and
   calls `verifyDocumentIntegrity(landId, hash)`. A single changed character
   anywhere in the document produces a completely different hash, so the
   contract immediately reports a mismatch.
4. **Full audit trail.** `getTransferHistoryFlat` returns every past owner,
   transfer timestamp, and remark for a parcel — not just the latest state —
   so the entire chain of custody is auditable.
5. **Access control.** Only addresses granted `verifier` status (by the
   `admin`) can register land or transfer ownership, modeling registry
   officials / sub-registrar offices. Read access (lookups, verification) is
   open to everyone.

## Project structure

```
land-registry-blockchain/
├── contracts/
│   └── LandRegistry.sol       # The smart contract
├── scripts/
│   ├── deploy.js              # Deploys the contract
│   └── seedDemo.js            # Optional: registers 2 sample parcels
├── test/
│   └── LandRegistry.test.js   # Hardhat/Chai test suite
├── frontend/
│   └── index.html             # Single-file dApp UI (ethers.js v6)
├── hardhat.config.js
└── package.json
```

## Setup

```bash
npm install
npx hardhat compile
npx hardhat test
```

## Run a local demo

1. Start a local blockchain node:
   ```bash
   npx hardhat node
   ```
2. In a second terminal, deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   Copy the printed contract address.
3. (Optional) Seed two demo land parcels — edit `CONTRACT_ADDRESS` at the top
   of `scripts/seedDemo.js` first:
   ```bash
   npx hardhat run scripts/seedDemo.js --network localhost
   ```
4. Open `frontend/index.html` in a browser (with MetaMask installed).
   - Add the local Hardhat network to MetaMask: RPC URL `http://127.0.0.1:8545`,
     chain ID `31337`.
   - Import one of the private keys printed by `npx hardhat node` into
     MetaMask (the first account is the contract `admin`/verifier).
   - Paste the deployed contract address into the connect bar and click
     **Connect wallet**.
5. Use the four tabs:
   - **Register Land** — verifiers create new parcel records.
   - **Transfer Ownership** — verifiers move ownership and log the change.
   - **Lookup & Audit Trail** — anyone looks up a parcel's full history.
   - **Verify Document** — anyone checks a document copy against the
     on-chain hash; the page stamps it "Verified" or "Tampered / mismatch".

## Trying tampering yourself

1. Register a parcel using some document text in the **Register Land** tab.
2. Go to **Verify Document**, paste the *exact same* text, and confirm it's
   stamped "Verified on-chain".
3. Change one word in the pasted text and verify again — it will be stamped
   "Tampered / mismatch", and the two hashes shown will no longer match.

## Notes for a viva / project report

- The contract is written for Solidity `^0.8.20` and tested with Hardhat's
  built-in network using Chai assertions (`test/LandRegistry.test.js`)
  covering registration, duplicate-ID rejection, tamper detection, transfer
  history, and access control.
- The frontend uses `ethers.js v6` via CDN and the browser's native
  `crypto.subtle.digest` for SHA-256 hashing — no external hashing library is
  required.
- This is a teaching/demo implementation. For production use you'd want to
  add: pausability/upgradability strategy, gas optimizations for large
  histories, off-chain indexing (e.g. The Graph) for fast queries, and a
  real government PKI integration for verifier onboarding.
