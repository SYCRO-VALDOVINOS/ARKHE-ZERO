
<div align="center">

# 🔱 ARKHÉ-ZERO
### Índice Primigenio Soberano · Local-First · Humano-IA

> *«El legado no se hereda. Se firma.»*

[ARKHÉ-ZERO](https://img.shields.io/badge/ARKHE--ZERO-000000?style=for-the-badge&logo=github)
[PCS RFC 0001](https://img.shields.io/badge/PCS--RFC--0001-1F6FEB?style=for-the-badge)
[Estado: En desarrollo](https://img.shields.io/badge/ESTADO-EN%20DESARROLLO-00E5A0?style=for-the-badge)
[Licencia: Apache 2.0](https://img.shields.io/badge/LICENCIA-Apache--2.0-FF6B35?style=for-the-badge)

*ARKHÉ-ZERO es un ecosistema local-first para documentar autoría digital, procedencia y procesos de co-creación humano-IA mediante el Protocolo de Co-Creatividad Simbiótica (PCS).*

</div>

---

## 📖 Propósito

ARKHÉ-ZERO busca ofrecer herramientas para registrar y verificar, de forma transparente y auditable, cómo se crean, transforman y preservan los artefactos digitales.

El proyecto prioriza:

- La preservación de los archivos originales.
- La trazabilidad de las transformaciones.
- La verificación de integridad mediante huellas criptográficas.
- La separación clara entre evidencia, interpretación y afirmaciones.
- La documentación de la participación humana y de sistemas de IA.
- El funcionamiento local-first, con control del usuario sobre sus datos.

> ARKHÉ-ZERO es una herramienta técnica de documentación y verificación. No sustituye asesoría jurídica, peritaje independiente ni los requisitos de un prestador de servicios de confianza.

---

## 🧭 Principios

### Preservación primero

Los archivos fuente deben conservarse sin modificaciones. Las operaciones que generen derivados deben guardar el resultado por separado y documentar su relación con el original.

### Evidencia verificable

Las afirmaciones sobre autoría o procedencia deben acompañarse de evidencia que pueda inspeccionarse y verificarse. Un hash permite detectar cambios en los bytes, pero por sí solo no demuestra quién creó un archivo ni cuándo lo hizo.

### Transparencia del proceso

El sistema debe distinguir entre:

- Datos observados.
- Datos aportados por una persona.
- Resultados calculados por el software.
- Interpretaciones o conclusiones.
- Información que no pudo verificarse.

### Seguridad por diseño

Los secretos, claves privadas, tokens y credenciales no deben aparecer en el código fuente, los registros, las capturas de pantalla ni los repositorios públicos.

---

## 🧪 Resultado de pruebas

Resultado en el checkout verificado el 27 nov 2026:

| Suite | Resultado |
| --- | --- |
| Tests principales | 73 / 73 |
| Tests Marco MCP | 14 / 14 |
| **Total** | **87 / 87** |

Comando ejecutado:

```bash
node --test tests/**/*.test.js && cd marco.mcp && npm test
Entorno de esa ejecución: checkout local `ARKHE-RECUPERADO`, 27 nov 2026. Si cambias el código, vuelve a ejecutar y actualiza fecha, comando y resultado.

Esto verifica formato y sellos en JS en esa ejecución. No verifica por sí solo el contrato Solidity ni prevalencia jurídica.

No publiques la cifra `87/87` como vigente si no corresponde a una ejecución reproducible del estado actual del repositorio.

---

## 🔬 Protocolo de Co-Creatividad Simbiótica (PCS)

El PCS documenta la interacción entre una persona y herramientas de inteligencia artificial durante un proceso creativo o técnico.

Un registro puede incluir, según la configuración del proyecto:

- Identificadores de los artefactos de entrada y salida.
- Huellas criptográficas de los archivos.
- Versiones de las herramientas utilizadas.
- Fechas declaradas o generadas por el sistema.
- Acciones humanas y automatizadas.
- Relaciones entre versiones y derivados.
- Referencias a la evidencia conservada.

La presencia de un registro no convierte automáticamente una afirmación en un hecho probado. Cada campo debe interpretarse de acuerdo con su origen, método de obtención y limitaciones.

---

## ⚖️ Pacto 51/49/100

La regla 51/49/100 se plantea como un principio de diseño de atribución y responsabilidad dentro del proyecto:
Rol	Porcentaje	Alcance en este proyecto
Humano	51%	Responsabilidad y decisión humana documentada
IA	49%	Asistencia documentada, sin decisión autónoma
Total documentado	100%	Trazabilidad del proceso
Esta formulación es un principio de diseño del proyecto. No debe presentarse como una regla jurídica universal ni como una conclusión automática sobre titularidad, autoría o derechos de propiedad intelectual.

Diagrama conceptual, no contrato:
flowchart TD
    A[Humano 51 - Decisión] --> C[ARKHE-ZERO]
    B[IA 49 - Asistencia] --> C
    C --> D[Registro]
    C --> E[Sello KINTSUGI]
    D --> H[Artefacto documentado]
    E --> H
pie title Pacto 51/49/100 - Principio de diseño
    "Humano 51 - Decisión" : 51
    "IA 49 - Asistencia" : 49
---

## 🔐 Integridad criptográfica

ARKHÉ-ZERO puede utilizar funciones hash como SHA-256 para calcular huellas digitales de archivos.

Ejemplo conceptual:
archivo original -> SHA-256 -> huella de integridad
Una coincidencia de huellas indica que los bytes comparados son iguales con una probabilidad criptográficamente alta. No demuestra por sí sola:

- La identidad de quien creó el archivo.
- La fecha real de creación.
- La ausencia de manipulación anterior al cálculo.
- La validez jurídica de una firma o registro.

Para fortalecer una cadena de custodia, conserva también los originales, documenta cada operación, registra el contexto y protege los registros contra modificaciones no autorizadas.

---

## 🛠️ Tecnologías

### Implementado / verificado en tests

Verificar contra el código y la salida de `npm test` en el commit actual antes de afirmar cada punto en este README.
Categoría	Stack
Core	http://Node.js, JavaScript ES Modules
Pruebas	`node --test`
MCP	Claude, Gemini, Cursor, Copilot
### Referencia / previsto

Mencionar una norma no implica certificación, conformidad ni validación por parte de una entidad externa. Añade aquí únicamente referencias que hayas comprobado y que sean pertinentes para la versión actual del proyecto.
Categoría	Referencia
Cripto	SHA3-512, Ed25519, ML-DSA-87, ML-KEM-768
Estándares	C2PA 2.1, eIDAS QTSA, TSA RFC 3161, CARF, DAC8, NOM-151, GDPR
> Si una tecnología está en esta segunda tabla, significa que se cita como referencia o trabajo previsto, no que ya esté implementada y verificada en este repositorio.

---

## 👥 Enjambre - 12 Agentes (previsto)

Propuesta conceptual, no afirmar como implementado sin código y tests que lo cubran:
flowchart LR
    A[6 Culturales] --> Q[Quorum 4/5]
    B[6 Oficios] --> Q
    Q --> S[Sello]
    Q --> X[Veto Humano]
Criterios propuestos: 6 criterios obligatorios, cuarentena 72h, aval de 2 agentes, quórum 4/5, veto humano puede bloquear.

---

## ▶️ Cómo correrlo
git clone https://github.com/SYCRO-VALDOVINOS/ARKHE-ZERO.git
cd ARKHE-ZERO
npm install
cd marco.mcp && npm install && cd ..
npm test
Resultado esperado en el estado verificado: `73/73 + 14/14 = 87/87`.

---

## 🧱 Estado del proyecto

ARKHÉ-ZERO está en desarrollo. Las funciones, los formatos de registro y los procedimientos de verificación pueden cambiar.

No ejecutes cambios masivos ni sobrescribas archivos existentes sin revisar primero.

---

## 🛡️ Seguridad y uso responsable

Antes de ejecutar herramientas sobre datos importantes:

1. Trabaja sobre copias y conserva intactos los archivos originales.
2. Revisa los comandos antes de ejecutarlos, especialmente los que borran, reemplazan o cambian permisos.
3. No compartas claves privadas, frases semilla, tokens ni credenciales.
4. Verifica las dependencias y las versiones utilizadas.
5. Conserva los resultados, registros y hashes necesarios para reproducir la comprobación.
6. No atribuyas valor probatorio o jurídico a un resultado sin evaluar el procedimiento completo y su contexto.

Si encuentras una vulnerabilidad, evita publicar detalles que puedan facilitar un abuso. Coordina primero una divulgación responsable con las personas mantenedoras del proyecto.

---

## 📄 Licencia

Este proyecto indica como licencia *Apache License 2.0*. Consulta el archivo `LICENSE` del repositorio para verificar el texto aplicable y las condiciones de distribución.

---

<div align="center">

_La procedencia se documenta. La integridad se verifica. El legado se preserva._

`PCS-RFC-0001` - `Pacto 51/49/100`

</div>

 