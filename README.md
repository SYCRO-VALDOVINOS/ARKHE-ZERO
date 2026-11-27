
<div align="center">

# 🔱 ARKHÉ-ZERO
### Índice Primigenio Soberano · Local-First · Humano-IA

> *«El legado no se hereda. Se firma.»*

![ARKHÉ-ZERO](https://img.shields.io/badge/ARKHE--ZERO-000000?style=for-the-badge&logo=github)
![PCS RFC 0001](https://img.shields.io/badge/PCS--RFC--0001-1F6FEB?style=for-the-badge)
![Estado: Building](https://img.shields.io/badge/ESTADO-EN%20DESARROLLO-00E5A0?style=for-the-badge)
![Licencia: Apache 2.0](https://img.shields.io/badge/LICENCIA-Apache--2.0-FF6B35?style=for-the-badge)

*ARKHÉ-ZERO es un ecosistema local-first para documentar autoría digital, procedencia y procesos de co-creación humano-IA mediante el Protocolo de Co-Creatividad Simbiótica (PCS).*

</div>

---

## 📖 Propósito

ARKHÉ-ZERO busca ofrecer herramientas para registrar y verificar, de forma transparente y auditable, cómo se crean, transforman y preservan los artefactos digitales.

El proyecto prioriza:

- La preservación de los archivos originales.
- La trazabilidad de las transformaciones.
- La verificación criptográfica de integridad.
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

## 🔬 Protocolo de Co-Creatividad Simbiótica

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

## 🔐 Integridad criptográfica

ARKHÉ-ZERO puede utilizar funciones hash como SHA-256 para calcular huellas digitales de archivos.

Ejemplo conceptual:

```text
archivo original → SHA-256 → huella de integridad
```

Una coincidencia de huellas indica que los bytes comparados son iguales con una probabilidad criptográficamente alta. No demuestra por sí sola:
```


```
- La identidad de quien creó el archivo.
- La fecha real de creación.
- La ausencia de manipulación anterior al cálculo.
- La validez jurídica de una firma o registro.

Para fortalecer una cadena de custodia, conserva también los originales, documenta cada operación, registra el contexto y protege los registros contra modificaciones no autorizadas.

---

## ⚖️ Pacto 51/49/100

La regla 51/49/100 se plantea como un marco de atribución y responsabilidad dentro del proyecto:

- **51 %**: contribución y responsabilidad humana.
- **49 %**: contribución asistida por sistemas de IA.
- **100 %**: trazabilidad documentada del proceso.

Esta formulación es un principio de diseño del proyecto; no debe presentarse como una regla jurídica universal ni como una conclusión automática sobre titularidad, autoría o derechos de propiedad intelectual.

---

## 📊 Estadísticas de GitHub

<div align="center">

<img
  src="https://github-readme-stats.vercel.app/api?username=SYCRO-VALDOVINOS&show_icons=true&theme=tokyonight&hide_border=true"
  height="165"
  alt="Estadísticas de GitHub"
/>

<img
  src="https://github-readme-stats.vercel.app/api/top-langs/?username=SYCRO-VALDOVINOS&layout=compact&theme=tokyonight&hide_border=true"
  height="165"
  alt="Lenguajes más utilizados"
/>

<br />

<img
  src="https://github-readme-streak-stats.herokuapp.com/?user=SYCRO-VALDOVINOS&theme=tokyonight&hide_border=true"
  alt="Racha de contribuciones"
/>

<br />

<img
  src="https://komarev.com/ghpvc/?username=SYCRO-VALDOVINOS&color=00E5A0&style=for-the-badge"
  alt="Visitas al perfil"
/>

</div>

---

## 🧱 Estado del proyecto

ARKHÉ-ZERO está en desarrollo. Las funciones, los formatos de registro y los procedimientos de verificación pueden cambiar.

No publiques cifras de pruebas —por ejemplo, “87/87”— hasta que correspondan a una ejecución reproducible de la suite en el estado actual del repositorio. Cuando añadas resultados, incluye el comando, la versión del entorno y la fecha de ejecución.

---

## 🗺️ Componentes previstos

La estructura concreta depende del repositorio y de la implementación actual. A nivel conceptual, el ecosistema puede organizarse en:

- **Captura:** incorporación controlada de archivos y datos de origen.
- **Integridad:** cálculo y comprobación de huellas criptográficas.
- **Procedencia:** relación entre originales, versiones y derivados.
- **Registro:** documentación legible y verificable de las operaciones.
- **Verificación:** comprobaciones reproducibles sobre los artefactos y sus registros.
- **Preservación:** conservación de originales y copias de trabajo sin sobrescritura accidental.

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

## 📚 Marco técnico y documental

Las referencias a estándares, normas o marcos legales deben vincularse con su fuente oficial y describir con precisión qué parte del proyecto los implementa o toma como referencia.
```




---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para proponer cambios:

1. Abre un issue describiendo el problema o la propuesta.
2. Explica el alcance y los posibles efectos sobre archivos existentes.
3. Incluye pruebas reproducibles cuando corresponda.
4. Evita incorporar secretos, datos personales o archivos que no deban publicarse.
5. Propón cambios pequeños y revisables.

No ejecutes cambios masivos ni sobrescribas archivos existentes sin revisar primero el diff.

---

## 📄 Licencia

Este proyecto indica como licencia **Apache License 2.0**. Consulta el archivo `LICENSE` del repositorio para verificar el texto aplicable y las condiciones de distribución.

---

<div align="center">

*La procedencia se documenta. La integridad se verifica. El legado se preserva.*

</div>
```

