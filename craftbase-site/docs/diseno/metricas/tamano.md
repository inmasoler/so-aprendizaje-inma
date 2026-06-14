---
title: "Por tamaño de equipo"
sidebar_position: 6
visibility: public
format: md
---

**El tamaño del equipo cambia qué medir, cómo medirlo y qué hacer con los datos.**

Equipos grandes (10+ diseñadores)

*   Adopción por equipo/squad — identifica quién no usa y por qué
*   Gobernanza formal — métricas de contribuciones, PRs, aprobaciones
*   Cobertura en código con herramientas automáticas (react-scanner, Omlet)
*   Versión adoptada por repositorio — evitar fragmentación de versiones
*   Dashboards en tiempo real de uso de componentes
*   SUS score del DS como producto interno formal
*   NPS interno con encuestas periódicas estructuradas
*   Embajadores por equipo como multiplicadores de adopción
*   ROI documentado para justificar inversión ejecutiva
*   OKRs formales del equipo del DS alineados con la empresa
*   Tiempo de respuesta a peticiones de equipos consumidores

Equipos pequeños (2–5 diseñadores)

*   Adopción binaria primero — ¿se usa? ¿lo conocen todos?
*   Conversaciones directas en vez de encuestas — más fácil y más rico
*   Tiempo ahorrado percibido por los propios diseñadores
*   Detach rate en Figma — señal práctica de gaps sin necesitar herramientas
*   Backlog de componentes pendientes — proxy de salud del DS
*   Riesgo de abandono — si no se siente útil, el DS muere solo
*   Documentación accesible — ¿puedes explicarlo a alguien nuevo en 10 min?
*   Coste de mantenimiento — ¿cabe en la carga del equipo?
*   Flexibilidad percibida — si es muy rígido, se abandona
*   Métricas cualitativas primero; automatizar solo cuando haya masa crítica

Tríada: 1 designer + 1 PM + 1–3 devs

Qué medir

*   Fricción en handoff — el dev trabaja directamente con el diseñador, cualquier ambigüedad del DS se nota inmediatamente
*   Tiempo de implementación por componente — el dev es quien más sufre si el DS no tiene tokens o doc clara
*   Detach rate — en triadas es normal que el dev adapte porque el DS no cubre el caso de uso exacto
*   Alineación PM-diseño — ¿el PM conoce qué existe en el DS antes de definir features?
*   Velocidad de prototipado — si el DS acelera las demos al PM o los primeros wireframes
*   Deuda acumulada — componentes custom que "ya arreglaremos" y nunca se arreglan

Particularidades clave

*   El designer hace y consume el DS — es al mismo tiempo quien lo mantiene y quien lo usa, lo que crea un sesgo enorme
*   El dev puede volverse el DS — si hay 2–3 devs, uno puede desarrollar un sistema propio en código que diverge del diseño
*   El PM decide sin datos de DS — si el PM no tiene visibilidad de qué componentes existen, pedirá cosas que ya están resueltas
*   No hay quién mida — en una tríada nadie tiene el rol de DesignOps, así que medir tiene que ser casi automático
*   El DS puede ser informal — a veces es solo una librería de Figma y un Notion; lo relevante es si reduce las conversaciones repetidas

Señales prácticas (sin infraestructura)

*   ¿Cuántas veces por sprint el dev pregunta al designer sobre estilos o comportamientos ya definidos?
*   ¿El PM revisa el DS antes de escribir una historia de usuario?
*   ¿Hay componentes en código que el designer no sabe que existen?
*   ¿Cuánto tarda un nuevo dev en entender qué hay en el DS y empezar a usarlo?
*   ¿Se abre Figma para reusar o se clona código de otro sitio?
*   ¿El DS aparece en la retro? — si aparece como problema, está fallando

**Riesgo principal de la tríada:** que el DS sea invisible para el PM y el dev acabe construyendo su propio sistema de facto en código. La métrica más valiosa aquí es si los tres hablan el mismo lenguaje cuando se refieren a un componente — si no, el DS no está funcionando.
