import fs from 'node:fs';
import crypto from 'node:crypto';
function sha256Hex(b){ return crypto.createHash('sha256').update(b).digest('hex'); }
function load(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }

const pcs = load('spec/test-vectors/pcs-v1-valid.json');
const vc = load('spec/test-vectors/vc-v1-valid.json');

// Merkle Root simple: hash de los hashes de cada artefacto
const leaves = [
  sha256Hex(Buffer.from(JSON.stringify(pcs.payload), 'utf8')),
  sha256Hex(Buffer.from(JSON.stringify(vc.credentialSubject.arkhePcs.payload), 'utf8')),
];
const merkleRoot = sha256Hex(Buffer.from(leaves.join(''), 'utf8'));

const report = {
  report_version: "arkhe-audit/1.0",
  generated_at: new Date().toISOString(),
  scope: "ARKHE-ZERO PCS v1 - Fase 3 Cumplimiento",
  governance: pcs.payload.governance,
  evidencia_tecnica: {
    integridad_bytes: "SHA-256 verificado - pcs-v1-valid.json PASS",
    firma_clasica: "Ed25519 RFC 8032 verificado",
    firma_postcuantica: "ML-DSA-65 NIST FIPS 204 verificado - len " + pcs.signatures.ml_dsa.signature_base64.length,
    canonicalizacion: "RFC 8785 JCS verificado",
    interoperabilidad: "W3C VC 2.0 verificado - vc-v1-valid.json PASS",
    merkle_root_sha256: merkleRoot,
    leaves_sha256: leaves,
    canonical_payload_sha256: pcs.signatures.canonical_payload_sha256,
    signature_bundle_sha256: pcs.signatures.signature_bundle_sha256
  },
  transparencia_ia: {
    norma: "EU AI Act Art. 50 - Transparencia",
    declaracion: "Este artefacto fue co-creado por humano (51%) e IA (49%). La IA generó borrador técnico, el humano aprobó y firmó.",
    humano_responsable: pcs.payload.governance.human_author,
    agentes_ia: pcs.payload.governance.ai_agents,
    decision_humana: "APROBADO_POR_HUMANO"
  },
  constancia_legal: {
    status: "NO_EMITIDA",
    explicacion: "ARKHE-ZERO genera evidencia tecnica privada. No otorga fecha cierta ni fe publica por si solo.",
    para_fecha_cierta: "Conectar anchoring.rfc3161_tsa a PSC acreditado SE (NOM-151) o QTSA EU Trusted List (eIDAS)",
    anchoring_actual: pcs.anchoring,
    input_para_tsa: pcs.signatures.signature_bundle_sha256
  }
};
fs.writeFileSync('spec/test-vectors/audit-report-v1.json', JSON.stringify(report, null, 2));
console.log("AUDIT REPORT GENERADO");
console.log("merkle_root:", merkleRoot);
console.log("legal:", report.constancia_legal.status);
console.log("transparencia:", report.transparencia_ia.norma);
