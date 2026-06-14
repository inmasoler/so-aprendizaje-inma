---
title: "Objetos y JSON"
sidebar_position: 7
visibility: public
format: md
---

*Objeto literal · Array de objetos · Desestructuración · Spread/Rest · JSON*

## Objeto literal {#objeto-literal}

```javascript
// Definición y acceso:
const disco = {
  titulo:  "Abbey Road",
  artista: "The Beatles",
  anio:    1969,
  genero:  "rock",
  activo:  true,
};

// Acceso por punto (preferido si la clave es válida como identificador):
console.log(disco.titulo);   // "Abbey Road"

// Acceso por corchetes (necesario si la clave es dinámica o tiene caracteres especiales):
const clave = "artista";
console.log(disco[clave]);   // "The Beatles"

// Añadir o modificar propiedades:
disco.sello = "Apple Records";
disco.anio = 1969;

// Eliminar propiedad:
delete disco.activo;

// Comprobar si existe una propiedad:
"titulo" in disco         // true
disco.hasOwnProperty("titulo")  // true

// Iterar claves:
Object.keys(disco)    // ["titulo","artista","anio","genero","sello"]
Object.values(disco)  // ["Abbey Road","The Beatles",1969,"rock","Apple Records"]
Object.entries(disco) // [["titulo","Abbey Road"],["artista","The Beatles"],...]
```

## Array de objetos — estructura habitual {#array-de-objetos-estructura-habitual}

```javascript
const discografia = [
  { id: 1, titulo: "Abbey Road",  artista: "The Beatles", anio: 1969, genero: "rock"  },
  { id: 2, titulo: "Nevermind",   artista: "Nirvana",       anio: 1991, genero: "rock"  },
  { id: 3, titulo: "Kind of Blue",artista: "Miles Davis",  anio: 1959, genero: "jazz"  },
  { id: 4, titulo: "Thriller",    artista: "Michael Jackson",anio:1982, genero: "pop"   },
];

// Buscar uno por id:
const encontrado = discografia.find(d => d.id === 2);
// { id:2, titulo:"Nevermind", ... }

// Filtrar por género:
const soloRock = discografia.filter(d => d.genero === "rock");

// Ordenar por año:
const porAnio = [...discografia].sort((a, b) => a.anio - b.anio);

// Extraer solo los títulos:
const titulos = discografia.map(d => d.titulo);

// Comprobar si alguno es de jazz:
discografia.some(d => d.genero === "jazz");  // true
```

## Desestructuración {#desestructuracion}

```javascript
// Desestructuración de objeto:
const { titulo, artista, anio } = disco;
console.log(titulo);   // "Abbey Road"

// Con alias (renombrar):
const { titulo: nombre, anio: año } = disco;
console.log(nombre);   // "Abbey Road"

// Con valor por defecto:
const { genero = "desconocido", rating = 0 } = disco;

// En parámetros de función:
function mostrarDisco({ titulo, artista, anio }) {
  console.log(`${titulo} — ${artista} (${anio})`);
}

// Desestructuración de array:
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];
// primero=1, segundo=2, resto=[3,4,5]

// Intercambiar variables:
let a = 1, b = 2;
[a, b] = [b, a];  // a=2, b=1
```

## Spread (...) y Rest (...) {#spread-y-rest}

```javascript
// ── SPREAD — expande / copia / fusiona ──

// Copiar array (sin referencia):
const copia = [...discografia];

// Fusionar arrays:
const todos = [...clasicos, ...modernos];

// Copiar objeto:
const copiaDisco = { ...disco };

// Fusionar objetos (el segundo sobreescribe al primero):
const actualizado = { ...disco, anio: 2024, rating: 5 };

// Pasar array como argumentos:
const nums = [3, 1, 4, 1, 5];
Math.max(...nums);   // 5

// ── REST — agrupa argumentos sobrantes ──

function log(nivel, ...mensajes) {
  mensajes.forEach(m => console.log(`[${nivel}] ${m}`));
}
log("INFO", "Cargando…", "Listo", "OK");
```

## JSON — serialización y parseo {#json-serializacion-y-parseo}

```javascript
// Objeto → JSON string (para enviar a API, guardar en localStorage):
const json = JSON.stringify(disco);
// '{"titulo":"Abbey Road","artista":"The Beatles","anio":1969}'

// Con formato (indentado — para leer/debug):
const jsonBonito = JSON.stringify(disco, null, 2);

// JSON string → objeto:
const obj = JSON.parse(json);
console.log(obj.titulo);  // "Abbey Road"

// Guardar en localStorage:
localStorage.setItem("discografia", JSON.stringify(discografia));

// Leer de localStorage:
const guardado = JSON.parse(localStorage.getItem("discografia") || "[]");

// Clonar profundo (truco rápido):
const clone = JSON.parse(JSON.stringify(disco));
// Pero no funciona con funciones, undefined, Date, Map, Set…
```
