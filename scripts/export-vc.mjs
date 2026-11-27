import fs from 'node:fs';

// Lee tu sobre PCS v1 que ya tienes verificado en Fase 1
const pcs = JSON.parse(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json', 'utf8'));

const vc = {
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://arkhe-zero.sycro.dev/contexts/pcs-v1.jsonld"
  ],
  "id": "urn:arkhe:pcs:pcs-v1-valid",
  "type": ["VerifiableCredential", "ArkhePcsCredential"],
  "issuer": "did:arkhe:sycro-valdovinos",
  "validFrom": "2026-11-27T00:00:00Z",
  "credentialSubject": {
    "id": "did:arkhe:sycro-valdovinos",
    "arkhePcs": {
      "spec_version": pcs.spec_version,
      "domain_separation": pcs.domain_separation,
      "payload": pcs.payload,
      "signatures": pcs.signatures
    },
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
    "arkhe_mldsa65_proofValue": pcs.signatures["mldsa-65"]?.signature_base64 || null,
    "arkhe_canonical_payload_sha256": pcs.signatures.canonical_payload_sha256,
    "arkhe_signing_input_sha256": pcs.signatures.signing_input_sha256
  }
};

fs.mkdirSync('spec/test-vectors', { recursive: true });
fs.writeFileSync('spec/test-vectors/vc-v1-valid.json', JSON.stringify(vc, null, 2));
console.log("VC exportado: spec/test-vectors/vc-v1-valid.json");
console.log("type:", vc.type);
console.log("issuer:", vc.issuer);
console.log("governance:", vc.credentialSubject.governance);
