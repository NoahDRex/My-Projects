// Convenience script: registers a couple of sample land parcels so you have
// something to look at immediately after deploying, without using the UI.
//
// Usage:
//   1. Edit CONTRACT_ADDRESS below to match your deployed address.
//   2. npx hardhat run scripts/seedDemo.js --network localhost

const hre = require("hardhat");
const crypto = require("crypto");

const CONTRACT_ADDRESS = "PASTE_DEPLOYED_ADDRESS_HERE";

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

async function main() {
  if (CONTRACT_ADDRESS === "PASTE_DEPLOYED_ADDRESS_HERE") {
    throw new Error("Edit scripts/seedDemo.js and set CONTRACT_ADDRESS first.");
  }

  const [admin, ramesh, suresh] = await hre.ethers.getSigners();
  const landRegistry = await hre.ethers.getContractAt("LandRegistry", CONTRACT_ADDRESS);

  const doc101 = "Sale deed - Survey No. 101, Whitefield, Bengaluru - Owner: Ramesh";
  const hash101 = sha256(doc101);
  await landRegistry.connect(admin).registerLand(
    101,
    "Whitefield, Bengaluru",
    2400,
    ramesh.address,
    hash101
  );
  console.log("Registered land #101 for", ramesh.address);
  console.log("Document used:", doc101);
  console.log("Document hash:", hash101, "\n");

  const doc102 = "Sale deed - Survey No. 102, Indiranagar, Bengaluru - Owner: Suresh";
  const hash102 = sha256(doc102);
  await landRegistry.connect(admin).registerLand(
    102,
    "Indiranagar, Bengaluru",
    1800,
    suresh.address,
    hash102
  );
  console.log("Registered land #102 for", suresh.address);
  console.log("Document used:", doc102);
  console.log("Document hash:", hash102);

  console.log("\nDone. Try changing one character in either document text above,");
  console.log("hashing it, and checking it against the registry from the frontend");
  console.log("'Verify document' tab - it will report a mismatch.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
