# ARKHE-ZERO

[![ARKHE-ZERO CI](https://github.com/SYCRO-VALDOVINOS/ARKHE-ZERO/actions/workflows/ci.yml/badge.svg)](https://github.com/SYCRO-VALDOVINOS/ARKHE-ZERO/actions/workflows/ci.yml)

Protocolo local-first para sellar autoria humano-IA PCS 51/49 con SHA-256, RFC 8785 y firmas hibridas Ed25519 + ML-DSA.
- URL: https://sycro-valdovinos.github.io/ARKHE-ZERO
- Spec: spec/arkhe-pcs-v1.schema.json CC-BY-4.0
- Codigo: Apache-2.0
## Quickstart
npm install
node scripts/generate-and-verify-vectors.mjs --verify-only
## Flujo
Archivo -> SHA-256 -> Payload PCS 51/49 -> RFC 8785 -> Prefijo ARKHE-PCS-V1 -> Firma Ed25519 + ML-DSA -> SHA-256 bundle -> Anclaje RFC 3161 opcional
## Frontera
- Integridad SHA-256: Si, matematico
- Autenticidad Ed25519 + ML-DSA: Si, matematico
- Fecha cierta NOM-151 / eIDAS: NO, requiere PSC / QTSA via RFC 3161
- Identidad civil: NO, requiere e.firma / certificado cualificado
