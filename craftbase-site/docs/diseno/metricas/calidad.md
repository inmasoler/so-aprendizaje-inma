---
title: "Calidad y consistencia"
sidebar_position: 3
visibility: public
format: md
---

**La consistencia es medible.** No hay que quedarse en la percepción subjetiva.

Consistencia visual

*   Redundancia CSS — duplicados de colores, tipografías, espaciados
*   Estilos custom fuera del DS en archivos de diseño
*   Variaciones no documentadas de componentes en producción
*   Divergencia visual entre productos del mismo ecosistema
*   Parity diseño-código — % de componentes de Figma con equivalente exacto en código

Accesibilidad

*   % de componentes que pasan WCAG AA o AAA
*   Ratio de contraste en tokens de color
*   Cobertura de ARIA en componentes interactivos
*   Regresiones de accesibilidad introducidas en updates
*   Tests automatizados de a11y que pasan en CI/CD
*   Issues de accesibilidad reportados en producción

Usabilidad del propio DS

*   SUS score (System Usability Scale) aplicado al DS como producto interno
*   Tasa de éxito en tareas clave de la doc (¿pueden encontrar lo que buscan?)
*   Tasa de error al implementar un componente por primera vez
*   Tiempo en completar tareas con el DS vs sin él
*   Claridad percibida de la documentación (escala 1–5 en encuestas)

Impacto en el usuario final

*   Quejas de usuarios sobre inconsistencias visuales o de interacción
*   Tasa de error en tareas clave de los productos (refleja calidad de UI)
*   NPS o CSAT de los productos como proxy de coherencia de experiencia
*   Satisfacción con la UI en investigación de usuario periódica
*   Flujos coherentes — ¿los usuarios reconocen patrones entre productos?
