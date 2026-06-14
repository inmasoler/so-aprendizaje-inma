---
title: "Herramientas de testing"
sidebar_position: 5
visibility: public
format: md
---

Ninguna herramienta automatizada detecta el 100% de los problemas de accesibilidad — se estima que cubren entre el 30–40%. Son el primer filtro, no el definitivo.

🪓

axe DevTools

Extensión browser

[↗](https://deque.com/axe)

El motor de testing de accesibilidad más usado. Integrable en CI/CD. Muestra problemas directamente sobre el DOM con explicaciones y enlaces a la documentación WCAG.

Chrome/Edge/Firefoxcero falsos positivosCI integrable

🌊

WAVE

Extensión browser

[↗](https://wave.webaim.org)

Visualiza los errores directamente sobre la página con iconos superpuestos. Muy visual para aprender qué está fallando y por qué.

visualeducativoWebAIM

🔦

Lighthouse

Integrado en Chrome

[↗](https://developer.chrome.com/docs/lighthouse)

Auditoría de accesibilidad, rendimiento, SEO y buenas prácticas integrada en Chrome DevTools. Puntúa de 0 a 100.

DevTools → Lighthousepuntuación 0–100CI

🎙️

NVDA

Lector de pantalla · Windows

[↗](https://nvaccess.org)

El lector de pantalla gratuito más usado en Windows. Prueba con NVDA + Chrome o Firefox para simular la experiencia real de un usuario con discapacidad visual.

Windowsgratuitoprueba real

🗣️

VoiceOver

Lector de pantalla · Apple

[↗](https://support.apple.com/guide/voiceover)

Integrado en macOS e iOS. Actívalo con Cmd+F5. Prueba con Safari en macOS para la combinación más usada en Apple.

macOS / iOSintegradoCmd+F5

🎨

Who Can Use

Web App · Contraste

[↗](https://www.whocanuse.com)

Visualiza cómo perciben un par de colores personas con diferentes tipos de daltonismo o baja visión. Imprescindible al definir paletas de color en un DS.

contrastedaltonismoDesign Systems
