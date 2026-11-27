import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ml_dsa65 } from '@noble/post-quantum/ml-dsa.js';
import { canonicalizeJCS, DOMAIN_SEPARATION_V1 } from '../packages/core/jcs.mjs';
const ROOT = process.cwd();
const VECTORS_DIR = path.join(ROOT, 'spec', 'test-vectors');
const VALID_PATH = path.join(VECTORS_DIR, 'pcs-v1-valid.json');
const TAMPERED_PATH = path.join(VECTORS_DIR, 'pcs-v1-tampered.json');
function sha256Hex(input) { return crypto.createHash('sha256').update(input).digest('hex'); }
export function verifyEnvelope(envelope) {
  const errors = [];
  if (!envelope || typeof envelope !== 'object') return { valid: false, errors: ['Envelope debe ser objeto'] };
  if (envelope.spec_version !== 'arkhe-pcs/1.0') errors.push('spec_version invalido');
  if (envelope.domain_separation !== DOMAIN_SEPARATION_V1) errors.push('domain_separation invalido');
  const { payload, signatures, anchoring } = envelope;
  if (!payload || !signatures) return { valid: false, errors: ['Falta payload o signatures'] };
  if (payload.governance?.model !== 'PCS-51-49' || payload.governance?.human_pct !== 51 || payload.governance?.ai_pct !== 49) errors.push('Gobernanza PCS-51-49 violada');
  if (payload.algorithms?.hash !== 'SHA-256' || payload.algorithms?.canonicalization !== 'RFC-8785' || !payload.algorithms?.signatures?.includes('Ed25519') || !payload.algorithms?.signatures?.includes('ML-DSA-65')) errors.push('Suite algoritmos no soportada');
  const canonicalJson = canonicalizeJCS(payload);
  const recomputedCanonicalHash = sha256Hex(Buffer.from(canonicalJson, 'utf8'));
  if (recomputedCanonicalHash !== signatures.canonical_payload_sha256) errors.push('canonical_payload_sha256 mismatch (payload alterado)');
  const signingBytes = Buffer.from(`${DOMAIN_SEPARATION_V1}${canonicalJson}`, 'utf8');
  const recomputedSigningInputHash = sha256Hex(signingBytes);
  if (recomputedSigningInputHash !== signatures.signing_input_sha256) errors.push('signing_input_sha256 mismatch');
  try {
    const spkiDer = Buffer.from(signatures.ed25519.public_key_spki_base64, 'base64');
    const edPubKey = crypto.createPublicKey({ key: spkiDer, format: 'der', type: 'spki' });
    const edSig = Buffer.from(signatures.ed25519.signature_base64, 'base64');
    if (!crypto.verify(null, signingBytes, edPubKey, edSig)) errors.push('Ed25519 FAILED');
  } catch (e) { errors.push('Ed25519 error: ' + e.message); }
  try {
    const mlPub = new Uint8Array(Buffer.from(signatures.ml_dsa.public_key_base64, 'base64'));
    const mlSig = new Uint8Array(Buffer.from(signatures.ml_dsa.signature_base64, 'base64'));
    if (!ml_dsa65.verify(mlPub, new Uint8Array(signingBytes), mlSig)) errors.push('ML-DSA-65 FAILED');
  } catch (e) { errors.push('ML-DSA-65 error: ' + e.message); }
  const bundleCanonical = canonicalizeJCS({ canonical_payload_sha256: signatures.canonical_payload_sha256, ed25519: signatures.ed25519, ml_dsa: signatures.ml_dsa });
  if (sha256Hex(Buffer.from(bundleCanonical, 'utf8')) !== signatures.signature_bundle_sha256) errors.push('signature_bundle_sha256 mismatch');
  if (anchoring?.rfc3161_tsa && anchoring.rfc3161_tsa.anchored_digest_sha256 !== signatures.signature_bundle_sha256) errors.push('anchoring no coincide con signature_bundle');
  return { valid: errors.length === 0, errors };
}
function generateVectors() {
  fs.mkdirSync(VECTORS_DIR, { recursive: true });
  const edSeed = sha256Hex(Buffer.from('ARKHE-ZERO-TEST-VECTOR-ED25519-SEED-V1', 'utf8'));
  const edPkcs8Prefix = Buffer.from('302e020100300506032b657004220420', 'hex');
  const edPrivKey = crypto.createPrivateKey({ key: Buffer.concat([edPkcs8Prefix, Buffer.from(edSeed, 'hex')]), format: 'der', type: 'pkcs8' });
  const edPubDer = crypto.createPublicKey(edPrivKey).export({ format: 'der', type: 'spki' });
  const mlKeys = ml_dsa65.keygen();
  const sampleBytes = Buffer.from('ARKHE-ZERO :: PCS v1 Canonical Reference Artifact\n', 'utf8');
  const artifactSha256 = sha256Hex(sampleBytes);
  const payload = {
    issued_at: '2026-11-27T18:00:00Z',
    id: 'arkhe-pcs-vector-0001',
    metadata: { rights: 'CC-BY-4.0 / PCS-51-49', title: 'ARKHE-ZERO PCS v1 Reference Vector', identifier: `urn:sha256:${artifactSha256}`, creator: 'Marco Antonio Rojas Valdovinos' },
    governance: { ai_pct: 49, human_pct: 51, model: 'PCS-51-49', human_author: 'Marco Antonio Rojas Valdovinos', ai_agents: [{ name: 'arkhe-architect-agent', role: 'canonical-schema-and-crypto-verification' }] },
    algorithms: { signatures: ['Ed25519', 'ML-DSA-65'], canonicalization: 'RFC-8785', hash: 'SHA-256' },
    artifact: { mime_type: 'text/plain', size_bytes: sampleBytes.length, file_name: 'arkhe-reference-artifact.txt', sha256: artifactSha256 }
  };
  const canonicalJson = canonicalizeJCS(payload);
  const canonicalPayloadSha256 = sha256Hex(Buffer.from(canonicalJson, 'utf8'));
  const signingBytes = Buffer.from(`${DOMAIN_SEPARATION_V1}${canonicalJson}`, 'utf8');
  const signingInputSha256 = sha256Hex(signingBytes);
  const edSig = crypto.sign(null, signingBytes, edPrivKey);
  const mlSig = ml_dsa65.sign(mlKeys.secretKey, new Uint8Array(signingBytes));
  const edBlock = { public_key_spki_base64: Buffer.from(edPubDer).toString('base64'), signature_base64: edSig.toString('base64') };
  const mlBlock = { variant: 'ML-DSA-65', public_key_base64: Buffer.from(mlKeys.publicKey).toString('base64'), signature_base64: Buffer.from(mlSig).toString('base64') };
  const bundleCanonical = canonicalizeJCS({ canonical_payload_sha256: canonicalPayloadSha256, ed25519: edBlock, ml_dsa: mlBlock });
  const signatureBundleSha256 = sha256Hex(Buffer.from(bundleCanonical, 'utf8'));
  const validEnvelope = { spec_version: 'arkhe-pcs/1.0', domain_separation: DOMAIN_SEPARATION_V1, payload, signatures: { canonical_payload_sha256: canonicalPayloadSha256, signing_input_sha256: signingInputSha256, ed25519: edBlock, ml_dsa: mlBlock, signature_bundle_sha256: signatureBundleSha256 }, anchoring: { rfc3161_tsa: { status: 'unanchored_local_only', anchored_digest_sha256: signatureBundleSha256 } } };
  const tampered = JSON.parse(JSON.stringify(validEnvelope));
  tampered.payload.governance.human_author = 'Tampered Attacker';
  fs.writeFileSync(VALID_PATH, JSON.stringify(validEnvelope, null, 2) + '\n', 'utf8');
  fs.writeFileSync(TAMPERED_PATH, JSON.stringify(tampered, null, 2) + '\n', 'utf8');
  console.log('Vectores generados en spec/test-vectors/');
}
const verifyOnly = process.argv.includes('--verify-only');
if (!verifyOnly) generateVectors();
const validDoc = JSON.parse(fs.readFileSync(VALID_PATH, 'utf8'));
const tamperedDoc = JSON.parse(fs.readFileSync(TAMPERED_PATH, 'utf8'));
const validResult = verifyEnvelope(validDoc);
const tamperedResult = verifyEnvelope(tamperedDoc);
console.log('[VERIFY pcs-v1-valid.json]:', validResult.valid ? 'PASS' : 'FAIL', validResult.errors);
console.log('[VERIFY pcs-v1-tampered.json]:', !tamperedResult.valid ? 'PASS (rejected)' : 'FAIL (tamper no detectado)', tamperedResult.errors);
if (!validResult.valid || tamperedResult.valid) process.exit(1);
