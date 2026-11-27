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
if(JSON.stringify(gov) !== JSON.stringify(emb.payload.governance)) fail("governance VC != governance PCS embebido");
if(gov.model !== "PCS-51-49" || gov.human_pct !== 51 || gov.ai_pct !== 49) fail("governance violada");
if(vc.proof.arkhe_canonical_payload_sha256 !== emb.signatures.canonical_payload_sha256) fail("canonical_payload_sha256 mismatch");
if(vc.proof.arkhe_signing_input_sha256 !== emb.signatures.signing_input_sha256) fail("signing_input_sha256 mismatch");
if(vc.proof.proofValue !== emb.signatures.ed25519.signature_base64) fail("proofValue Ed25519 mismatch");
// ML-DSA-65 REAL, no null
const mldsaSig = emb.signatures.ml_dsa?.signature_base64 || emb.signatures["mldsa-65"]?.signature_base64 || null;
if(!mldsaSig) fail("falta firma ML-DSA-65 en PCS embebido");
if(emb.signatures.ml_dsa && emb.signatures.ml_dsa.variant !== "ML-DSA-65") fail("variant ml_dsa != ML-DSA-65");
if(vc.proof.arkhe_mldsa65_proofValue !== mldsaSig) fail("mldsa-65 mismatch vs embebido");
if(!vc.proof.arkhe_mldsa65_proofValue || vc.proof.arkhe_mldsa65_proofValue.length < 100) fail("mldsa-65 proof demasiado corto, sospechoso");
console.log("VC PASS - VALIDO (autocontenido + ML-DSA-65 real)");
console.log("issuer:", vc.issuer);
console.log("governance:", gov.model, gov.human_pct + "/" + gov.ai_pct);
console.log("mldsa-65 len:", mldsaSig.length);
