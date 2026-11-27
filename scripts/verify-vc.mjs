import fs from 'node:fs';

function fail(msg){ console.log("VC FAIL:", msg); process.exit(1); }
function canon(v){
  if(v===null) return "null";
  if(Array.isArray(v)) return "["+v.map(canon).join(",")+"]";
  if(typeof v==="object") return "{"+Object.keys(v).sort().map(k=>JSON.stringify(k)+":"+canon(v[k])).join(",")+"}";
  return JSON.stringify(v);
}

const vc = JSON.parse(fs.readFileSync('spec/test-vectors/vc-v1-valid.json','utf8'));
const pcs = JSON.parse(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json','utf8'));

if(!vc["@context"]?.includes("https://www.w3.org/ns/credentials/v2")) fail("falta @context W3C v2");
if(!vc.type?.includes("VerifiableCredential")) fail("falta type VerifiableCredential");
if(!vc.type?.includes("ArkhePcsCredential")) fail("falta type ArkhePcsCredential");
if(!vc.issuer) fail("falta issuer");
if(!vc.credentialSubject) fail("falta credentialSubject");
if(!vc.proof) fail("falta proof");

const embedded = vc.credentialSubject.arkhePcs;
if(canon(embedded) !== canon(pcs)) fail("arkhePcs embebido != pcs-v1-valid.json original");

const gov = vc.credentialSubject.governance;
if(gov.model !== "PCS-51-49" || gov.human_pct !== 51 || gov.ai_pct !== 49) fail("governance violada en VC");

if(vc.proof.arkhe_canonical_payload_sha256 !== pcs.signatures.canonical_payload_sha256) fail("canonical_payload_sha256 mismatch en proof");
if(vc.proof.arkhe_signing_input_sha256 !== pcs.signatures.signing_input_sha256) fail("signing_input_sha256 mismatch en proof");
if(vc.proof.proofValue !== pcs.signatures.ed25519.signature_base64) fail("proofValue Ed25519 mismatch");
if(vc.proof.arkhe_mldsa65_proofValue !== pcs.signatures["mldsa-65"]?.signature_base64) fail("mldsa-65 proofValue mismatch");

console.log("VC PASS - VALIDO");
console.log("issuer:", vc.issuer);
console.log("id:", vc.id);
console.log("governance:", gov.model, gov.human_pct + "/" + gov.ai_pct);
