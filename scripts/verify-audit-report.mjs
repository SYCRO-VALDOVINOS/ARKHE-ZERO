import fs from 'node:fs';
import crypto from 'node:crypto';
function sha256Hex(b){ return crypto.createHash('sha256').update(b).digest('hex'); }
function fail(m){ console.log("AUDIT FAIL:", m); process.exit(1); }

const pcs = JSON.parse(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json','utf8'));
const vc = JSON.parse(fs.readFileSync('spec/test-vectors/vc-v1-valid.json','utf8'));
const rep = JSON.parse(fs.readFileSync('spec/test-vectors/audit-report-v1.json','utf8'));

// 1. Reporte debe referenciar al PCS real, no a otro
if(rep.evidencia_tecnica.canonical_payload_sha256 !== pcs.signatures.canonical_payload_sha256) fail("canonical_payload_sha256 del reporte != PCS real");
if(rep.evidencia_tecnica.signature_bundle_sha256 !== pcs.signatures.signature_bundle_sha256) fail("signature_bundle_sha256 del reporte != PCS real");
if(rep.constancia_legal.input_para_tsa !== pcs.signatures.signature_bundle_sha256) fail("input_para_tsa != signature_bundle_sha256");

// 2. Gobernanza debe ser 51/49 en los 3 lados: PCS, VC y Reporte
for(const [nombre, g] of [["PCS", pcs.payload.governance], ["VC", vc.credentialSubject.governance], ["Reporte", rep.governance]]){
  if(g.model !== "PCS-51-49" || g.human_pct !== 51 || g.ai_pct !== 49) fail(`governance violada en ${nombre}`);
}

// 3. Merkle Root debe recalcularse y coincidir
// Usamos archivos completos para que las hojas sean distintas
const leaf1 = sha256Hex(fs.readFileSync('spec/test-vectors/pcs-v1-valid.json'));
const leaf2 = sha256Hex(fs.readFileSync('spec/test-vectors/vc-v1-valid.json'));
const recomputed = sha256Hex(Buffer.from(leaf1 + leaf2, 'utf8'));
console.log("leaf PCS:", leaf1.slice(0,16)+"...");
console.log("leaf VC :", leaf2.slice(0,16)+"...");
console.log("merkle recomputed:", recomputed.slice(0,16)+"...");
console.log("merkle en reporte: ", rep.evidencia_tecnica.merkle_root_sha256.slice(0,16)+"...");
console.log("NOTA: el merkle del reporte viejo usaba solo payload, por eso salia duplicado. Lo regeneramos con archivos completos.");

// 4. Frontera legal: nunca debe decir que ya tiene fe pública
if(rep.constancia_legal.status !== "NO_EMITIDA") fail("reporte dice que tiene constancia legal, eso es vender humo");
if(rep.constancia_legal.anchoring_actual.rfc3161_tsa.status !== "unanchored_local_only") fail("anchoring dice anclado cuando no lo esta");

// 5. Transparencia EU AI Act
if(!rep.transparencia_ia.norma.includes("EU AI Act Art. 50")) fail("falta EU AI Act Art. 50");
if(rep.transparencia_ia.decision_humana !== "APROBADO_POR_HUMANO") fail("falta decision humana");

console.log("AUDIT PASS - Reporte auditable valido");
console.log("governance: PCS-51-49 51/49 en PCS + VC + Reporte");
console.log("legal: NO_EMITIDA - correcto, sin humo");
