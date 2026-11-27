import fs from 'node:fs';
function fail(m){ console.log("VC FAIL:", m); process.exit(1); }

const vc = JSON.parse(fs.readFileSync('spec/test-vectors/vc-v1-valid.json','utf8'));
if(!vc["@context"]?.includes("https://www.w3.org/ns/credentials/v2")) fail("falta @context W3C v2");
if(!vc.type?.includes("VerifiableCredential")) fail("falta type VerifiableCredential");
if(!vc.type?.includes("ArkhePcsCredential")) fail("falta type ArkhePcsCredential");
if(!vc.issuer) fail("falta issuer");
if(!vc.credentialSubject?.arkhePcs) fail("falta arkhePcs");
if(!vc.proof) fail("falta proof");

const emb = vc.credentialSubject.arkhePcs;
const gov = vc.credentialSubject.governance;
// Governance debe coincidir entre VC y PCS embebido
if(JSON.stringify(gov) !== JSON.stringify(emb.payload.governance)) fail("governance VC != governance PCS embebido");
if(gov.model !== "PCS-51-49" || gov.human_pct !== 51 || gov.ai_pct !== 49) fail("governance violada");

// Proof debe referenciar EXACTAMENTE lo que trae el PCS embebido, no el archivo externo
if(vc.proof.arkhe_canonical_payload_sha256 !== emb.signatures.canonical_payload_sha256) fail("canonical_payload_sha256 mismatch proof vs embebido");
if(vc.proof.arkhe_signing_input_sha256 !== emb.signatures.signing_input_sha256) fail("signing_input_sha256 mismatch proof vs embebido");
if(vc.proof.proofValue !== emb.signatures.ed25519.signature_base64) fail("proofValue Ed25519 mismatch vs embebido");
if(vc.proof.arkhe_mldsa65_proofValue !== emb.signatures["mldsa-65"]?.signature_base64) fail("mldsa-65 mismatch vs embebido");

console.log("VC PASS - VALIDO (autocontenido)");
console.log("issuer:", vc.issuer);
console.log("id:", vc.id);
console.log("governance:", gov.model, gov.human_pct + "/" + gov.ai_pct);
console.log("embedded canonical:", emb.signatures.canonical_payload_sha256.slice(0,16)+"...");
