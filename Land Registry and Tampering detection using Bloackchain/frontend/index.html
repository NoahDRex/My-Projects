<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Land Registry Ledger — Blockchain Verification</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/6.15.0/ethers.umd.min.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  :root{
    --ink:#1f2a3d;
    --ink-soft:#4a5a73;
    --parchment:#e8dfc8;
    --paper:#f8f3e6;
    --paper-2:#fffdf7;
    --ledger-green:#2f4f3e;
    --ledger-green-light:#3e6b54;
    --seal-red:#8c3b2e;
    --brass:#a9844a;
    --line:rgba(31,42,61,0.16);
    --shadow:0 10px 30px rgba(31,42,61,0.12);
  }

  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background:var(--parchment);
    background-image:
      radial-gradient(circle at 20% 0%, rgba(169,132,74,0.10), transparent 45%),
      radial-gradient(circle at 100% 100%, rgba(47,79,62,0.08), transparent 40%);
    color:var(--ink);
    font-family:'Inter', sans-serif;
    min-height:100vh;
  }

  .mono{font-family:'IBM Plex Mono', monospace;}

  .wrap{
    max-width:1180px;
    margin:0 auto;
    padding:28px 20px 60px;
  }

  /* ---------- Header ---------- */
  header.masthead{
    display:flex;
    align-items:baseline;
    justify-content:space-between;
    border-bottom:3px solid var(--ink);
    padding-bottom:14px;
    margin-bottom:18px;
    flex-wrap:wrap;
    gap:10px;
  }
  .masthead .title-block h1{
    font-family:'Spectral', serif;
    font-weight:700;
    font-size:2rem;
    margin:0;
    letter-spacing:0.2px;
  }
  .masthead .title-block .eyebrow{
    text-transform:uppercase;
    font-size:0.7rem;
    letter-spacing:2.5px;
    color:var(--ledger-green);
    font-weight:600;
  }
  .masthead .ledger-no{
    font-family:'IBM Plex Mono',monospace;
    font-size:0.8rem;
    color:var(--ink-soft);
    text-align:right;
  }

  /* ---------- Connection bar ---------- */
  .connect-bar{
    background:var(--paper-2);
    border:1px solid var(--line);
    border-radius:10px;
    box-shadow:var(--shadow);
    padding:14px 18px;
    display:flex;
    gap:14px;
    flex-wrap:wrap;
    align-items:flex-end;
    margin-bottom:22px;
  }
  .field{
    display:flex;
    flex-direction:column;
    gap:5px;
    flex:1;
    min-width:200px;
  }
  .field label{
    font-size:0.72rem;
    text-transform:uppercase;
    letter-spacing:1.2px;
    color:var(--ink-soft);
    font-weight:600;
  }
  input, textarea, select{
    font-family:'IBM Plex Mono', monospace;
    font-size:0.85rem;
    padding:9px 10px;
    border:1px solid var(--line);
    border-radius:6px;
    background:var(--paper);
    color:var(--ink);
    width:100%;
  }
  textarea{font-family:'Inter',sans-serif; resize:vertical;}
  input:focus, textarea:focus, select:focus{
    outline:2px solid var(--brass);
    outline-offset:1px;
  }
  button{
    font-family:'Inter',sans-serif;
    font-weight:600;
    font-size:0.85rem;
    border:none;
    border-radius:6px;
    padding:10px 16px;
    cursor:pointer;
    transition:transform .12s ease, opacity .12s ease;
  }
  button:active{transform:translateY(1px);}
  button:disabled{opacity:0.5; cursor:not-allowed;}
  .btn-primary{background:var(--ledger-green); color:var(--paper-2);}
  .btn-primary:hover{background:var(--ledger-green-light);}
  .btn-secondary{background:transparent; color:var(--ink); border:1px solid var(--ink);}
  .btn-secondary:hover{background:rgba(31,42,61,0.06);}
  .status-chip{
    font-size:0.72rem;
    font-weight:600;
    padding:5px 10px;
    border-radius:20px;
    white-space:nowrap;
  }
  .chip-off{background:rgba(140,59,46,0.12); color:var(--seal-red);}
  .chip-on{background:rgba(47,79,62,0.14); color:var(--ledger-green);}
  .chip-admin{background:rgba(169,132,74,0.18); color:var(--brass);}

  /* ---------- Layout: index + page ---------- */
  .ledger{
    display:grid;
    grid-template-columns:230px 1fr;
    gap:20px;
  }
  @media (max-width:760px){ .ledger{grid-template-columns:1fr;} }

  nav.index{
    background:var(--ink);
    border-radius:10px;
    padding:16px 10px;
    align-self:start;
    box-shadow:var(--shadow);
  }
  nav.index .idx-label{
    color:var(--brass);
    font-size:0.68rem;
    text-transform:uppercase;
    letter-spacing:2px;
    padding:0 10px 10px;
  }
  nav.index button{
    display:flex;
    align-items:center;
    gap:10px;
    width:100%;
    text-align:left;
    background:transparent;
    color:#d8d2c0;
    padding:11px 10px;
    border-radius:6px;
    margin-bottom:4px;
    font-size:0.85rem;
  }
  nav.index button .num{
    font-family:'IBM Plex Mono',monospace;
    font-size:0.72rem;
    color:var(--brass);
  }
  nav.index button.active{
    background:rgba(255,255,255,0.08);
    color:#fff;
    border-left:3px solid var(--brass);
  }
  nav.index button:hover{background:rgba(255,255,255,0.06);}

  .page{
    background:var(--paper-2);
    border:1px solid var(--line);
    border-radius:10px;
    box-shadow:var(--shadow);
    padding:26px 28px;
    min-height:420px;
  }
  .page h2{
    font-family:'Spectral',serif;
    font-size:1.3rem;
    margin:0 0 4px;
  }
  .page .sub{
    color:var(--ink-soft);
    font-size:0.85rem;
    margin:0 0 20px;
    line-height:1.5;
  }
  .grid-2{display:grid; grid-template-columns:1fr 1fr; gap:14px;}
  @media (max-width:600px){ .grid-2{grid-template-columns:1fr;} }
  .row{margin-bottom:14px;}
  .hint{font-size:0.74rem; color:var(--ink-soft); margin-top:4px;}
  .divider{height:1px; background:var(--line); margin:20px 0;}

  .hash-box{
    background:var(--paper);
    border:1px dashed var(--brass);
    border-radius:8px;
    padding:10px 12px;
    font-family:'IBM Plex Mono',monospace;
    font-size:0.78rem;
    word-break:break-all;
    color:var(--ink-soft);
  }
  .hash-box.match{border-color:var(--ledger-green); color:var(--ledger-green);}
  .hash-box.mismatch{border-color:var(--seal-red); color:var(--seal-red);}

  /* ---------- Stamp (signature element) ---------- */
  .stamp-area{
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:150px;
    margin:10px 0 4px;
  }
  .stamp{
    width:140px;
    height:140px;
    border-radius:50%;
    border:4px double currentColor;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    font-family:'Spectral',serif;
    font-weight:700;
    text-transform:uppercase;
    letter-spacing:1px;
    transform:rotate(-8deg) scale(0.4);
    opacity:0;
    transition:transform .35s cubic-bezier(.2,1.4,.4,1), opacity .25s ease;
  }
  .stamp.show{transform:rotate(-8deg) scale(1); opacity:1;}
  .stamp.verified{color:var(--ledger-green);}
  .stamp.tampered{color:var(--seal-red);}
  .stamp .big{font-size:1.6rem; line-height:1;}
  .stamp .small{font-size:0.62rem; letter-spacing:2px; margin-top:4px;}

  /* ---------- Lookup card / audit table ---------- */
  .land-card{
    border:1px solid var(--line);
    border-radius:8px;
    padding:16px;
    background:var(--paper);
    margin-bottom:16px;
  }
  .land-card dl{display:grid; grid-template-columns:140px 1fr; gap:6px 10px; margin:0;}
  .land-card dt{color:var(--ink-soft); font-size:0.78rem; font-weight:600;}
  .land-card dd{margin:0; font-size:0.85rem; word-break:break-all;}

  table.audit{width:100%; border-collapse:collapse; font-size:0.8rem;}
  table.audit th{
    text-align:left;
    text-transform:uppercase;
    font-size:0.68rem;
    letter-spacing:1px;
    color:var(--ink-soft);
    border-bottom:2px solid var(--ink);
    padding:8px 6px;
  }
  table.audit td{padding:8px 6px; border-bottom:1px solid var(--line); font-family:'IBM Plex Mono',monospace; font-size:0.76rem;}

  .chips{display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;}
  .chips button{
    background:var(--paper);
    border:1px solid var(--line);
    padding:5px 12px;
    border-radius:20px;
    font-family:'IBM Plex Mono',monospace;
    font-size:0.78rem;
  }
  .chips button:hover{border-color:var(--brass);}

  /* ---------- Activity log ---------- */
  .log-panel{
    margin-top:22px;
    background:var(--ink);
    border-radius:10px;
    padding:14px 18px;
    box-shadow:var(--shadow);
  }
  .log-panel h3{
    color:var(--brass);
    font-size:0.72rem;
    text-transform:uppercase;
    letter-spacing:2px;
    margin:0 0 10px;
  }
  .log-lines{
    max-height:160px;
    overflow-y:auto;
    font-family:'IBM Plex Mono',monospace;
    font-size:0.76rem;
    color:#d8d2c0;
    display:flex;
    flex-direction:column;
    gap:4px;
  }
  .log-lines .ok{color:#a9d4b9;}
  .log-lines .err{color:#e0a89c;}
  .log-lines a{color:var(--brass);}

  .empty-state{
    text-align:center;
    padding:40px 10px;
    color:var(--ink-soft);
  }
  .empty-state .seal-outline{
    width:60px;height:60px;
    margin:0 auto 12px;
    border:2px solid var(--ink-soft);
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-family:'Spectral',serif;
    font-size:1.4rem;
  }
</style>
</head>
<body>
<div class="wrap">

  <header class="masthead">
    <div class="title-block">
      <div class="eyebrow">Distributed Ledger · Property Records</div>
      <h1>Land Registry Ledger</h1>
    </div>
    <div class="ledger-no">REGISTER OF DEEDS<br/>NETWORK: <span id="netName">not connected</span></div>
  </header>

  <div class="connect-bar">
    <div class="field" style="min-width:260px;">
      <label>Deployed contract address</label>
      <input id="contractAddr" type="text" placeholder="0x..." />
    </div>
    <div class="field" style="max-width:200px;">
      <label>Account</label>
      <input id="accountAddr" type="text" placeholder="—" readonly />
    </div>
    <button class="btn-primary" id="connectBtn">Connect wallet</button>
    <span class="status-chip chip-off" id="roleChip">not connected</span>
  </div>

  <div class="ledger">
    <nav class="index" id="tabNav">
      <div class="idx-label">Index</div>
      <button data-tab="register" class="active"><span class="num">01</span> Register Land</button>
      <button data-tab="transfer"><span class="num">02</span> Transfer Ownership</button>
      <button data-tab="lookup"><span class="num">03</span> Lookup &amp; Audit Trail</button>
      <button data-tab="verify"><span class="num">04</span> Verify Document</button>
    </nav>

    <div class="page">

      <!-- 01 REGISTER -->
      <section id="tab-register">
        <h2>Register a new land parcel</h2>
        <p class="sub">Only authorized registry verifiers can write a new record. The document is hashed locally — only the hash is stored on-chain, never the document itself.</p>
        <div class="grid-2">
          <div class="field row"><label>Land ID</label><input id="reg-id" type="number" placeholder="e.g. 101" /></div>
          <div class="field row"><label>Owner wallet address</label><input id="reg-owner" type="text" placeholder="0x..." /></div>
          <div class="field row"><label>Location</label><input id="reg-location" type="text" placeholder="Survey No., area, city" /></div>
          <div class="field row"><label>Area (sq. ft.)</label><input id="reg-area" type="number" placeholder="e.g. 2400" /></div>
        </div>
        <div class="field row">
          <label>Title document</label>
          <input id="reg-file" type="file" />
          <div class="hint">Or paste the document text instead of uploading a file:</div>
          <textarea id="reg-text" rows="3" placeholder="Paste deed / title text here..."></textarea>
        </div>
        <div class="row hash-box" id="reg-hash-display">Document hash will appear here once provided.</div>
        <button class="btn-primary" id="reg-submit">Register on-chain</button>
      </section>

      <!-- 02 TRANSFER -->
      <section id="tab-transfer" style="display:none;">
        <h2>Transfer ownership</h2>
        <p class="sub">Creates a new, permanent entry in the parcel's audit trail. The previous owner and timestamp are preserved forever — they cannot be edited or deleted.</p>
        <div class="grid-2">
          <div class="field row"><label>Land ID</label><input id="tr-id" type="number" placeholder="e.g. 101" /></div>
          <div class="field row"><label>New owner wallet address</label><input id="tr-owner" type="text" placeholder="0x..." /></div>
        </div>
        <div class="field row">
          <label>Updated title document</label>
          <input id="tr-file" type="file" />
          <div class="hint">Or paste the new document text:</div>
          <textarea id="tr-text" rows="3" placeholder="Paste updated deed text..."></textarea>
        </div>
        <div class="field row"><label>Remarks (sale deed no., notes)</label><input id="tr-remarks" type="text" placeholder="e.g. Sold via registered sale deed #4521" /></div>
        <div class="row hash-box" id="tr-hash-display">Document hash will appear here once provided.</div>
        <button class="btn-primary" id="tr-submit">Submit transfer</button>
      </section>

      <!-- 03 LOOKUP -->
      <section id="tab-lookup" style="display:none;">
        <h2>Lookup a parcel &amp; its audit trail</h2>
        <p class="sub">Every past owner, transfer timestamp, and document hash for a parcel — pulled straight from chain events and storage.</p>
        <div class="field row" style="max-width:260px;">
          <label>Land ID</label>
          <div style="display:flex; gap:8px;">
            <input id="lk-id" type="number" placeholder="e.g. 101" />
            <button class="btn-secondary" id="lk-fetch">Fetch</button>
          </div>
        </div>
        <div id="lk-result"></div>
        <div class="divider"></div>
        <div class="hint">All registered land IDs:</div>
        <div class="chips" id="lk-all-ids"></div>
      </section>

      <!-- 04 VERIFY -->
      <section id="tab-verify" style="display:none;">
        <h2>Verify a document against the chain</h2>
        <p class="sub">Upload (or paste) any copy of a title document. It's hashed in your browser and compared with the hash recorded on-chain — nothing is uploaded anywhere.</p>
        <div class="field row" style="max-width:200px;">
          <label>Land ID</label><input id="vf-id" type="number" placeholder="e.g. 101" />
        </div>
        <div class="field row">
          <label>Document to check</label>
          <input id="vf-file" type="file" />
          <div class="hint">Or paste text:</div>
          <textarea id="vf-text" rows="4" placeholder="Paste document text to verify..."></textarea>
        </div>
        <button class="btn-primary" id="vf-submit">Verify integrity</button>

        <div class="stamp-area"><div class="stamp" id="vf-stamp"></div></div>

        <div class="grid-2">
          <div>
            <div class="hint">On-chain stored hash</div>
            <div class="hash-box mono" id="vf-onchain-hash">—</div>
          </div>
          <div>
            <div class="hint">Computed hash (your copy)</div>
            <div class="hash-box mono" id="vf-computed-hash">—</div>
          </div>
        </div>
      </section>

    </div>
  </div>

  <div class="log-panel">
    <h3>Activity log</h3>
    <div class="log-lines" id="logLines"></div>
  </div>

</div>

<script>
const CONTRACT_ABI = [
  "function admin() view returns (address)",
  "function verifiers(address) view returns (bool)",
  "function addVerifier(address _verifier)",
  "function removeVerifier(address _verifier)",
  "function registerLand(uint256 _landId, string _location, uint256 _area, address _owner, string _documentHash)",
  "function transferOwnership(uint256 _landId, address _newOwner, string _newDocumentHash, string _remarks)",
  "function verifyDocumentIntegrity(uint256 _landId, string _hashToCheck) view returns (bool)",
  "function getLandDetails(uint256 _landId) view returns (uint256 landId, string location, uint256 area, address owner, string documentHash, uint256 registeredAt, uint256 lastUpdatedAt)",
  "function getTransferHistoryFlat(uint256 _landId) view returns (address[] froms, address[] tos, uint256[] timestamps, string[] remarksList)",
  "function getAllLandIds() view returns (uint256[])",
  "function isLandRegistered(uint256 _landId) view returns (bool)",
  "event LandRegistered(uint256 indexed landId, address indexed owner, string location, string documentHash, uint256 timestamp)",
  "event OwnershipTransferred(uint256 indexed landId, address indexed from, address indexed to, uint256 timestamp)"
];

let provider, signer, contract, account;

const $ = (id) => document.getElementById(id);

function log(msg, type=""){
  const line = document.createElement("div");
  if(type) line.className = type;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  $("logLines").prepend(line);
}

function shortAddr(a){ return a ? a.slice(0,6) + "…" + a.slice(-4) : "—"; }

async function sha256OfFile(file){
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("");
}

async function sha256OfText(text){
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("");
}

// Resolve a hash either from an uploaded file or pasted text, file takes priority.
async function resolveHash(fileInputId, textInputId, displayId){
  const fileInput = $(fileInputId);
  const textInput = $(textInputId);
  const display = $(displayId);
  let hash = null;

  if(fileInput && fileInput.files && fileInput.files[0]){
    hash = await sha256OfFile(fileInput.files[0]);
  } else if(textInput && textInput.value.trim().length > 0){
    hash = await sha256OfText(textInput.value);
  }

  if(display){
    display.textContent = hash ? `SHA-256: ${hash}` : "Document hash will appear here once provided.";
    display.className = "row hash-box";
  }
  return hash;
}

// Live hash preview as the user types/uploads
["reg","tr"].forEach(prefix => {
  const fileEl = $(`${prefix}-file`);
  const textEl = $(`${prefix}-text`);
  const update = () => resolveHash(`${prefix}-file`, `${prefix}-text`, `${prefix}-hash-display`);
  if(fileEl) fileEl.addEventListener("change", update);
  if(textEl) textEl.addEventListener("input", update);
});

// ---------------- Tabs ----------------
document.querySelectorAll("#tabNav button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#tabNav button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".page > section").forEach(s => s.style.display = "none");
    $(`tab-${btn.dataset.tab}`).style.display = "block";
  });
});

// ---------------- Connect wallet ----------------
$("connectBtn").addEventListener("click", async () => {
  if(!window.ethereum){
    log("No injected wallet found. Install MetaMask or a compatible wallet.", "err");
    return;
  }
  const addr = $("contractAddr").value.trim();
  if(!addr){
    log("Enter the deployed contract address first.", "err");
    return;
  }
  try{
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    account = await signer.getAddress();
    contract = new ethers.Contract(addr, CONTRACT_ABI, signer);

    const network = await provider.getNetwork();
    $("netName").textContent = `${network.name} (chainId ${network.chainId})`;
    $("accountAddr").value = shortAddr(account);

    const [isAdmin, isVerifier] = await Promise.all([
      contract.admin().then(a => a.toLowerCase() === account.toLowerCase()).catch(() => false),
      contract.verifiers(account).catch(() => false)
    ]);

    const chip = $("roleChip");
    if(isAdmin){
      chip.textContent = "Admin / Verifier";
      chip.className = "status-chip chip-admin";
    } else if(isVerifier){
      chip.textContent = "Authorized verifier";
      chip.className = "status-chip chip-on";
    } else {
      chip.textContent = "Read-only (not a verifier)";
      chip.className = "status-chip chip-off";
    }

    log(`Connected as ${shortAddr(account)} on ${network.name}.`, "ok");
  } catch(err){
    console.error(err);
    log(`Connection failed: ${err.message || err}`, "err");
  }
});

function requireContract(){
  if(!contract){
    log("Connect your wallet and set the contract address first.", "err");
    return false;
  }
  return true;
}

// ---------------- Register ----------------
$("reg-submit").addEventListener("click", async () => {
  if(!requireContract()) return;
  try{
    const id = $("reg-id").value;
    const owner = $("reg-owner").value.trim();
    const location = $("reg-location").value.trim();
    const area = $("reg-area").value;
    const hash = await resolveHash("reg-file", "reg-text", "reg-hash-display");

    if(!id || !owner || !location || !area || !hash){
      log("Fill in all fields and provide a document before registering.", "err");
      return;
    }

    log(`Submitting registration for land #${id}...`);
    const tx = await contract.registerLand(id, location, area, owner, hash);
    log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    log(`Land #${id} registered on-chain.`, "ok");
  } catch(err){
    console.error(err);
    log(`Registration failed: ${err.shortMessage || err.message || err}`, "err");
  }
});

// ---------------- Transfer ----------------
$("tr-submit").addEventListener("click", async () => {
  if(!requireContract()) return;
  try{
    const id = $("tr-id").value;
    const newOwner = $("tr-owner").value.trim();
    const remarks = $("tr-remarks").value.trim();
    const hash = await resolveHash("tr-file", "tr-text", "tr-hash-display");

    if(!id || !newOwner || !hash){
      log("Fill in land ID, new owner, and the updated document before transferring.", "err");
      return;
    }

    log(`Submitting ownership transfer for land #${id}...`);
    const tx = await contract.transferOwnership(id, newOwner, hash, remarks);
    log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    log(`Land #${id} transferred to ${shortAddr(newOwner)}.`, "ok");
  } catch(err){
    console.error(err);
    log(`Transfer failed: ${err.shortMessage || err.message || err}`, "err");
  }
});

// ---------------- Lookup ----------------
$("lk-fetch").addEventListener("click", () => fetchLand($("lk-id").value));

async function fetchLand(id){
  if(!requireContract()) return;
  if(!id){ log("Enter a land ID to look up.", "err"); return; }
  const resultEl = $("lk-result");
  try{
    const registered = await contract.isLandRegistered(id);
    if(!registered){
      resultEl.innerHTML = `<div class="empty-state"><div class="seal-outline">∅</div>Land #${id} is not registered.</div>`;
      return;
    }

    const land = await contract.getLandDetails(id);
    const [froms, tos, timestamps, remarksList] = await contract.getTransferHistoryFlat(id);

    const registeredDate = new Date(Number(land.registeredAt) * 1000).toLocaleString();
    const updatedDate = new Date(Number(land.lastUpdatedAt) * 1000).toLocaleString();

    let rows = "";
    for(let i=0;i<froms.length;i++){
      rows += `<tr>
        <td>${shortAddr(froms[i])}</td>
        <td>${shortAddr(tos[i])}</td>
        <td>${new Date(Number(timestamps[i])*1000).toLocaleString()}</td>
        <td>${remarksList[i] || "—"}</td>
      </tr>`;
    }
    if(!rows) rows = `<tr><td colspan="4" style="font-family:'Inter',sans-serif; color:var(--ink-soft);">No transfers yet — still with the original owner.</td></tr>`;

    resultEl.innerHTML = `
      <div class="land-card">
        <dl>
          <dt>Land ID</dt><dd>${land.landId}</dd>
          <dt>Location</dt><dd>${land.location}</dd>
          <dt>Area</dt><dd>${land.area} sq. ft.</dd>
          <dt>Current owner</dt><dd class="mono">${land.owner}</dd>
          <dt>Document hash</dt><dd class="mono">${land.documentHash}</dd>
          <dt>Registered</dt><dd>${registeredDate}</dd>
          <dt>Last updated</dt><dd>${updatedDate}</dd>
        </dl>
      </div>
      <h2 style="font-size:1rem;">Chain-of-custody</h2>
      <table class="audit">
        <thead><tr><th>From</th><th>To</th><th>Timestamp</th><th>Remarks</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    log(`Fetched record for land #${id}.`, "ok");
  } catch(err){
    console.error(err);
    resultEl.innerHTML = `<div class="empty-state"><div class="seal-outline">!</div>Could not load land #${id}.</div>`;
    log(`Lookup failed: ${err.shortMessage || err.message || err}`, "err");
  }
}

async function loadAllIds(){
  if(!contract) return;
  try{
    const ids = await contract.getAllLandIds();
    const container = $("lk-all-ids");
    container.innerHTML = "";
    ids.forEach(id => {
      const b = document.createElement("button");
      b.textContent = `#${id}`;
      b.addEventListener("click", () => { $("lk-id").value = id; fetchLand(id); });
      container.appendChild(b);
    });
  } catch(err){ console.error(err); }
}

// Refresh the "all IDs" chip list whenever the Lookup tab is opened
document.querySelector('[data-tab="lookup"]').addEventListener("click", loadAllIds);

// ---------------- Verify document ----------------
["vf"].forEach(prefix => {
  const fileEl = $(`${prefix}-file`);
  const textEl = $(`${prefix}-text`);
  const clearStamp = () => {
    $("vf-stamp").className = "stamp";
    $("vf-onchain-hash").textContent = "—";
    $("vf-computed-hash").textContent = "—";
  };
  if(fileEl) fileEl.addEventListener("change", clearStamp);
  if(textEl) textEl.addEventListener("input", clearStamp);
});

$("vf-submit").addEventListener("click", async () => {
  if(!requireContract()) return;
  const id = $("vf-id").value;
  if(!id){ log("Enter a land ID to verify against.", "err"); return; }

  const fileInput = $("vf-file");
  const textInput = $("vf-text");
  let computedHash = null;
  if(fileInput.files && fileInput.files[0]){
    computedHash = await sha256OfFile(fileInput.files[0]);
  } else if(textInput.value.trim()){
    computedHash = await sha256OfText(textInput.value);
  }
  if(!computedHash){ log("Upload a file or paste text to verify.", "err"); return; }

  try{
    const land = await contract.getLandDetails(id);
    const isValid = await contract.verifyDocumentIntegrity(id, computedHash);

    $("vf-onchain-hash").textContent = land.documentHash;
    $("vf-computed-hash").textContent = computedHash;
    $("vf-onchain-hash").className = "hash-box mono " + (isValid ? "match" : "mismatch");
    $("vf-computed-hash").className = "hash-box mono " + (isValid ? "match" : "mismatch");

    const stamp = $("vf-stamp");
    stamp.className = "stamp " + (isValid ? "verified" : "tampered");
    stamp.innerHTML = isValid
      ? `<span class="big">✓</span><span class="small">Verified on-chain</span>`
      : `<span class="big">✕</span><span class="small">Tampered / mismatch</span>`;
    requestAnimationFrame(() => stamp.classList.add("show"));

    log(isValid ? `Land #${id}: document hash matches the registry.` : `Land #${id}: document hash does NOT match — possible tampering.`, isValid ? "ok" : "err");
  } catch(err){
    console.error(err);
    log(`Verification failed: ${err.shortMessage || err.message || err}`, "err");
  }
});

log("Ready. Deploy the contract, paste its address above, then connect your wallet.");
</script>
</body>
</html>
