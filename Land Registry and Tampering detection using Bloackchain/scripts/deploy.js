const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying LandRegistry with account:", deployer.address);

  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy();
  await landRegistry.waitForDeployment();

  const address = await landRegistry.getAddress();
  console.log("LandRegistry deployed to:", address);
  console.log("\nPaste this address into frontend/app.js (CONTRACT_ADDRESS) or the");
  console.log("frontend's 'Contract address' field before connecting your wallet.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
