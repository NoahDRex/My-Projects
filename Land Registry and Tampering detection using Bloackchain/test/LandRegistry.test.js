const { expect } = require("chai");
const { ethers } = require("hardhat");
const crypto = require("crypto");

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

describe("LandRegistry", function () {
  let landRegistry, admin, owner1, owner2, outsider;

  beforeEach(async function () {
    [admin, owner1, owner2, outsider] = await ethers.getSigners();
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.waitForDeployment();
  });

  it("registers a new land parcel with its document hash", async function () {
    const docHash = sha256("Deed document for plot 101");
    await landRegistry.registerLand(101, "Whitefield, Bengaluru", 2400, owner1.address, docHash);

    const land = await landRegistry.getLandDetails(101);
    expect(land.owner).to.equal(owner1.address);
    expect(land.documentHash).to.equal(docHash);
    expect(land.area).to.equal(2400n);
  });

  it("rejects registering the same land ID twice", async function () {
    const docHash = sha256("Deed document for plot 101");
    await landRegistry.registerLand(101, "Whitefield, Bengaluru", 2400, owner1.address, docHash);

    await expect(
      landRegistry.registerLand(101, "Whitefield, Bengaluru", 2400, owner2.address, docHash)
    ).to.be.revertedWith("Land ID already registered");
  });

  it("detects tampering when the document hash no longer matches", async function () {
    const originalDoc = "Deed for plot 102 - Area 1800 sqft - Owner: Ramesh";
    const docHash = sha256(originalDoc);
    await landRegistry.registerLand(102, "Indiranagar, Bengaluru", 1800, owner1.address, docHash);

    // Someone alters the off-chain copy of the document after registration.
    const tamperedDoc = "Deed for plot 102 - Area 2800 sqft - Owner: Ramesh";
    const tamperedHash = sha256(tamperedDoc);

    expect(await landRegistry.verifyDocumentIntegrity(102, tamperedHash)).to.equal(false);
    expect(await landRegistry.verifyDocumentIntegrity(102, docHash)).to.equal(true);
  });

  it("records ownership transfers with a full audit trail", async function () {
    const docHash = sha256("Deed for plot 103");
    await landRegistry.registerLand(103, "Koramangala, Bengaluru", 1200, owner1.address, docHash);

    const newDocHash = sha256("Updated deed for plot 103 - sold to new owner");
    await landRegistry.transferOwnership(103, owner2.address, newDocHash, "Sold via registered sale deed");

    const land = await landRegistry.getLandDetails(103);
    expect(land.owner).to.equal(owner2.address);

    const history = await landRegistry.getTransferHistory(103);
    expect(history.length).to.equal(1);
    expect(history[0].from).to.equal(owner1.address);
    expect(history[0].to).to.equal(owner2.address);
  });

  it("prevents unauthorized accounts from registering or transferring land", async function () {
    const docHash = sha256("Deed for plot 104");

    await expect(
      landRegistry.connect(outsider).registerLand(104, "HSR Layout, Bengaluru", 1500, owner1.address, docHash)
    ).to.be.revertedWith("Only an authorized verifier can perform this action");

    await landRegistry.registerLand(104, "HSR Layout, Bengaluru", 1500, owner1.address, docHash);

    await expect(
      landRegistry.connect(outsider).transferOwnership(104, owner2.address, docHash, "unauthorized attempt")
    ).to.be.revertedWith("Only an authorized verifier can perform this action");
  });

  it("lets the admin grant verifier rights to another registry official", async function () {
    await landRegistry.addVerifier(outsider.address);
    const docHash = sha256("Deed for plot 105");

    await expect(
      landRegistry.connect(outsider).registerLand(105, "Jayanagar, Bengaluru", 1000, owner1.address, docHash)
    ).to.not.be.reverted;
  });
});
