import fs from 'node:fs';
import crypto from 'node:crypto';

function fail(msg){ console.log("VC FAIL:", msg); process.exit(1); }

const vc = JSON.parse(fs.readFileSync('spec/test-vectors/vc-v1-valid.json','utf8'));
const pcs = JSON.parse(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json','utf8'));

// 1. Estructura W3C V2
if(!vc["@context"]?.includes("https://www.w3.org/ns/credentials/v2")) fail("falta @context W3C v2");
if(!vc.type?.includes("VerifiableCredential")) fail("falta type VerifiableCredential");
if(!vc.type?.includes("ArkhePcsCredential")) fail("falta type ArkhePcsCredential");
if(!vc.issuer) fail("falta issuer");
if(!vc.credentialSubject) fail("falta credentialSubject");
if(!vc.proof) fail("falta proof");

// 2. El VC debe contener EXACTAMENTE el mismo PCS original
const embedded = vc.credentialSubject.arkhePcs;
if(JSON.stringify(embedded) !== JSON.stringify(pcs)) fail("arkhePcs embebido != pcs-v1-valid.json original");

// 3. Governance 51/49
const gov = vc.credentialSubject.governance;
if(gov.model !== "PCS-51-49" || gov.human_pct !== 51 || gov.ai_pct !== 49) fail("governance violada en VC");

// 4. Proof debe referenciar los mismos hashes que el PCS
if(vc.proof.arkhe_canonical_payload_sha256 !== pcs.signatures.canonical_payload_sha256) fail("canonical_payload_sha256 mismatch en proof");
if(vc.proof.arkhe_signing_input_sha256 !== pcs.signatures.signing_input_sha256) fail("signing_input_sha256 mismatch en proof");
if(vc.proof.proofValue !== pcs.signatures.ed25519.signature_base64) fail("proofValue Ed25519 mismatch");
if(vc.proof.arkhe_mldsa65_proofValue !== pcs.signatures["mldsa-65"]?.signature_base64) fail("mldsa-65 proofValue mismatch");

console.log("VC PASS - VALIDO");
console.log("issuer:", vc.issuer);
console.log("id:", vc.id);
console.log("governance:", gov.model, gov.human_pct + "/" + gov.ai_pct);
