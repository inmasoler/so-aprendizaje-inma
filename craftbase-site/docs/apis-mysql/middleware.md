---
title: "Middleware y Express"
sidebar_position: 4
visibility: public
format: md
---

**Un middleware es una función intermedia** que procesa la petición antes (o después) de que llegue a la ruta final. Express encadena middlewares como una línea de montaje.

¿Qué es un middleware?

*   Función con firma `(req, res, next) => {}`
*   Puede **leer/modificar** req y res, o **terminar** la petición (res.status().json())
*   Si todo OK, llama a `next()` para pasar al siguiente middleware
*   Si no llama a `next()` ni responde, la petición se queda colgada

Analogía del aeropuerto

*   **Control de seguridad** (logger) — registra quién entra y cuándo
*   **Control de pasaportes** (auth middleware) — verifica API key; sin ella → 401 y no pasas
*   **Puerta de embarque** (ruta) — te lleva al avión correcto (handler de /disponibilidad)
*   **Torre de control** (MySQL) — consulta datos y devuelve respuesta

Flujo: petición → logger → API key → ruta → MySQL → respuesta

Clientefetch() chatbot

→

Loggerregistra req.method + url

→

auth()verifica Bearer token

→

RutaGET /disponibilidad

→

MySQL poolquery parametrizada

→

JSON 200habitaciones\[\]

↳

401 Unauthorizedsi auth() falla — desvío, no llega a ruta

Escribir middleware de auth en Express

```javascript
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'API key requerida' });
  }
  const token = header.slice(7);  // quita "Bearer "
  if (token !== process.env.API_KEY) {
    return res.status(401).json({ error: 'API key inválida' });
  }
  next();  // ← pasa al siguiente middleware / ruta
}
```

Estructura real de un servidor Express

```javascript
const express = require('express');
const mysql   = require('mysql2/promise');
const app     = express();

// ── Setup global ──
app.use(express.json());          // parsea body JSON en todas las rutas
app.use(logger);                  // middleware global — todas las peticiones

// ── Rutas públicas (sin auth) ──
app.get('/health', (req, res) => res.json({ ok: true }));

// ── Rutas protegidas — auth inline por ruta ──
app.get('/api/disponibilidad', auth, async (req, res) => {
  const { entrada, salida } = req.query;
  const [rows] = await pool.execute(sqlDisponibilidad, [entrada, salida, entrada, salida]);
  res.json(rows);
});

app.post('/api/reservas', auth, async (req, res) => {
  const { habitacion_id, cliente_id, entrada, salida } = req.body;
  // ... insert con pool.execute
  res.status(201).json({ id: result.insertId, estado: 'pendiente' });
});

app.listen(3000);
```

app.use() — middleware global

*   Se ejecuta en **todas las peticiones** que lleguen después de su declaración.
*   Ejemplo: `app.use(express.json())`, `app.use(logger)`
*   Orden importa: primero json parser, luego logger, luego rutas.

Middleware por ruta — inline

*   Se pasa como argumento entre la ruta y el handler: `app.get('/ruta', auth, handler)`
*   Solo protege **esa ruta** — /health puede quedar público.
*   Puedes encadenar varios: `app.post('/x', auth, validate, handler)`
