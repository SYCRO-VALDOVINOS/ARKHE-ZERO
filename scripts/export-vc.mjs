import fs from 'node:fs';
const pcs = JSON.parse(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json','utf8'));
const mldsa = pcs.signatures["mldsa-65"];
const mldsaSig = typeof mldsa === "string" ? mldsa : (mldsa?.signature_base64 || mldsa?.signature || null);
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
    "arkhe_canonical_payload_sha256": pcs.signatures.canonical_payload_sha256,
    "arkhe_signing_input_sha256": pcs.signatures.signing_input_sha256
  }
};
fs.writeFileSync('spec/test-vectors/vc-v1-valid.json', JSON.stringify(vc, null, 2));
console.log("VC exportado, mldsaSig:", String(mldsaSig).slice(0,30));
