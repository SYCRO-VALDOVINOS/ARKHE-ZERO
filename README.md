<div align="center">
<img src="assets/images/arkhe-banner.jpg" alt="ARKHE ZERO BANNER" width="100%" />
</div>

# ◯_● ARKHE-ZERO
> **El legado no se hereda. Se firma.**

**ARKHE-ZERO** es un protocolo de verificación documental y preservación digital inmutable. Construido desde Toluca para el mundo. Su objetivo es garantizar que la información no pueda ser alterada, ni siquiera por la inteligencia artificial.

## 🏛️ Filosofía Kintsugi
Al igual que el arte japonés de reparar cerámica con oro, ARKHE-ZERO no oculta las fracturas de la información: las sella con criptografía para que su historia sea visible y verificable. 
* **51% Humano · 49% IA · 100% Real.**

## 🚀 Características Principales
* **Verificación Inmutable:** Cada documento recibe un sello SHA-256 encadenado al anterior.
* **Preservación Digital (OSINT):** Extracción y sellado de archivos públicos (FBI Vault) para evitar su censura o modificación.
* **Contratos Inteligentes:** Registro de identidad y atribución de responsabilidad en la blockchain (Ethereum/Polygon).
* **Firma Criptográfica:** Uso de GPG y firmas post-cuánticas (ML-DSA).

## 🛠️ Stack Técnico
* **Backend:** Python 3 (OSINT, hashing, automatización)
* **Smart Contracts:** Solidity (Registro de Atribución)
* **Blockchain:** Ethereum / Polygon
* **Almacenamiento:** IPFS (CIDs inmutables)

## 📂 Estructura del Repositorio
```text
ARKHE-ZERO/
├── 01-spec/           # Especificaciones y JSON Schemas
├── 02-legal/          # Marcos legales (Agent Liability Framework)
├── contracts/         # Contratos inteligentes en Solidity
├── scripts/           # Automatización y OSINT
│   ├── arkhe-watch.py # Escáner de la FBI Vault
│   ├── validar-contrato.py
│   └── arkhe-status.py
├── tests/             # Pruebas de integridad
└── verify.html        # Verificador estático
