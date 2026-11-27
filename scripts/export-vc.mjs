import fs from 'node:fs';
const pcs = JSON.parse(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json','utf8'));
const mldsaSig = pcs.signatures.ml_dsa?.signature_base64 || pcs.signatures["mldsa-65"]?.signature_base64 || null;
if(!mldsaSig) { console.log("EXPORT FAIL: no se encontro firma ML-DSA-65 en pcs"); process.exit(1); }
if(pcs.signatures.ml_dsa?.variant !== "ML-DSA-65") { console.log("EXPORT FAIL: variant ml_dsa != ML-DSA-65"); process.exit(1); }
const vc = {
  "@context": ["https://www.w3.org/ns/credentials/v2","https://arkhe-zero.sycro.dev/contexts/pcs-v1.jsonld"],
  "id": "urn:arkhe:pcs:pcs-v1-valid",
  "type": ["VerifiableCredential", "ArkhePcsCredential"],
  "issuer": "did:arkhe:sycro-valdovinos",
  "validFrom": "2026-11-27T00:00:00Z",
  "credentialSubject": {
    "id": "did:arkhe:sycro-valdovinos",
    "arkhePcs": pcs,
    "governance": pcs.payload.governance,
    "human_pct": pcs.payload.governance.human_pct,
    "ai_pct": pcs.payload.governance.ai_pct
  },
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-rdfc-2022",
    "verificationMethod": "did:arkhe:sycro-valdovinos#ed25519-1",
    "proofPurpose": "assertionMethod",
    "proofValue": pcs.signatures.ed25519.signature_base64,
    "arkhe_mldsa65_proofValue": mldsaSig,
    "arkhe_mldsa65_variant": "ML-DSA-65",
    "arkhe_canonical_payload_sha256": pcs.signatures.canonical_payload_sha256,
    "arkhe_signing_input_sha256": pcs.signatures.signing_input_sha256
  }
};
fs.writeFileSync('spec/test-vectors/vc-v1-valid.json', JSON.stringify(vc, null, 2));
console.log("VC exportado, mldsaSig:", mldsaSig.slice(0,30)+"... len="+mldsaSig.length);
