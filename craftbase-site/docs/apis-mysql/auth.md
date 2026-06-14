---
title: "Bearer key y auth"
sidebar_position: 3
visibility: public
format: md
---

**La autenticación protege tu API.** Sin ella, cualquiera podría consultar disponibilidad, crear reservas falsas o borrar datos. En el proyecto de reservas, el chatbot envía una API key en cada petición.

¿Qué es una API key?

*   Una **cadena secreta** que identifica y autoriza al cliente (chatbot, app interna).
*   Se genera en el servidor y se comparte solo con clientes de confianza.
*   En producción va en **variables de entorno** (`process.env.API_KEY`), nunca hardcodeada en el código fuente.

¿Qué significa "Bearer"?

*   **Bearer** = "portador". Quien presenta el token, es el autorizado.
*   Formato estándar: `Authorization: Bearer sk-abc123xyz`
*   Es un esquema definido en RFC 6750, el más usado para API keys y JWT.

¿Por qué va en el header y no en la URL?

*   Las URLs quedan en **logs de servidores, proxies y historial del navegador**.
*   Una key en `?api_key=secret` se filtra fácilmente — cualquiera con acceso a logs la ve.
*   Los headers no aparecen en URLs compartidas ni en la barra de direcciones.
*   **Regla de oro:** credenciales siempre en headers, datos de negocio en query/body.

**Canales separados — no se mezclan:** la API key va en el header `Authorization`; las fechas de disponibilidad van en query params `?entrada=2026-06-10&salida=2026-06-15`. Son canales distintos de la misma petición HTTP — el middleware de auth lee el header, la ruta lee los query params.

fetch() real desde el chatbot

```javascript
// Chatbot pide habitaciones disponibles — key en header, fechas en query
const API_KEY = process.env.CHATBOT_API_KEY;  // nunca en el código fuente
const entrada = '2026-06-10';
const salida  = '2026-06-15';

const res = await fetch(
  `/api/disponibilidad?entrada=${entrada}&salida=${salida}`,
  {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,  // ← canal auth
      'Content-Type': 'application/json'
    }
  }
);

if (res.status === 401) throw new Error('API key inválida');
if (!res.ok) throw new Error(`Error ${res.status}`);

const habitaciones = await res.json();  // ← datos de negocio
console.log(habitaciones);
```
