---
title: "Arrays"
sidebar_position: 6
visibility: public
format: md
---

*Tabla de métodos · forEach · map · filter · reduce · sort · splice vs slice*

Rojo = muta el array original · Verde = devuelve nuevo / no modifica

| Método | ¿Muta? | Qué hace | Ejemplo |
| --- | --- | --- | --- |
| push(val) | MUTA | Añade al final. Devuelve nueva longitud. | `[1,2].push(3) → 3` |
| pop() | MUTA | Elimina el último. Devuelve el elemento eliminado. | `[1,2,3].pop() → 3` |
| unshift(val) | MUTA | Añade al inicio. Devuelve nueva longitud. | `[2,3].unshift(1) → 3` |
| shift() | MUTA | Elimina el primero. Devuelve el elemento eliminado. | `[1,2,3].shift() → 1` |
| splice(i,n,...) | MUTA | Elimina n elementos desde índice i. Opcionalmente inserta. Devuelve los eliminados. | `[1,2,3].splice(1,1) → [2]` |
| sort(fn) | MUTA | Ordena en sitio. Sin función: ordena como strings. Con función comparadora: numérico. | `arr.sort((a,b) => a-b)` |
| reverse() | MUTA | Invierte el array en sitio. | `[1,2,3].reverse() → [3,2,1]` |
| fill(val,i,j) | MUTA | Rellena con un valor desde i hasta j. | `[1,2,3].fill(0,1,2) → [1,0,3]` |
| copyWithin() | MUTA | Copia parte del array sobre sí mismo. | Raro en la práctica |
| map(fn) | NO | Devuelve nuevo array transformando cada elemento. | `[1,2].map(n => n*2) → [2,4]` |
| filter(fn) | NO | Devuelve nuevo array con los elementos que pasan el test. | `[1,2,3].filter(n => n>1) → [2,3]` |
| reduce(fn, init) | NO | Acumula todos los elementos en un único valor. | `[1,2,3].reduce((a,c)=>a+c, 0) → 6` |
| forEach(fn) | NO | Ejecuta una función por cada elemento. No devuelve nada (undefined). | Solo efectos secundarios |
| find(fn) | NO | Devuelve el primer elemento que cumple el test. | `[1,2,3].find(n=>n>1) → 2` |
| findIndex(fn) | NO | Devuelve el índice del primer elemento que cumple el test. | `[1,2,3].findIndex(n=>n>1) → 1` |
| some(fn) | NO | ¿Algún elemento cumple el test? → boolean | `[1,2,3].some(n=>n>2) → true` |
| every(fn) | NO | ¿Todos los elementos cumplen el test? → boolean | `[1,2,3].every(n=>n>0) → true` |
| includes(val) | NO | ¿Contiene ese valor? → boolean. Usa ===. | `[1,2,3].includes(2) → true` |
| indexOf(val) | NO | Índice de la primera ocurrencia. -1 si no existe. | `[1,2,3].indexOf(2) → 1` |
| slice(i,j) | NO | Copia superficial desde i hasta j (sin incluir j). | `[1,2,3,4].slice(1,3) → [2,3]` |
| concat(...arrs) | NO | Une arrays en uno nuevo. | `[1,2].concat([3,4]) → [1,2,3,4]` |
| flat(depth) | NO | Aplana arrays anidados. | `[[1,2],[3]].flat() → [1,2,3]` |
| flatMap(fn) | NO | map + flat(1) en un solo paso. | `[1,2].flatMap(n=>[n,n*2]) → [1,2,2,4]` |
| join(sep) | NO | Une elementos como string con separador. | `["a","b"].join("-") → "a-b"` |
| Array.from(iter) | NO | Crea array desde iterable o array-like. | `Array.from("hola") → ["h","o","l","a"]` |
| Array.isArray(v) | NO | ¿Es un array? → boolean. | `Array.isArray([]) → true` |

forEach no devuelve nada

Ejecuta una función para cada elemento. No devuelve array. No tiene return implícito. Úsalo solo para efectos secundarios (imprimir, modificar DOM, acumular en variable externa).

Si necesitas transformar o filtrar, usa map/filter. forEach es el hermano sin retorno.

```javascript
const frutas = ["🍎", "🍌", "🍇"];

frutas.forEach((fruta, indice) => {
  console.log(`${indice}: ${fruta}`);
});
// 0: 🍎 / 1: 🍌 / 2: 🍇

// No se puede break/continue — usa for...of para eso
// No devuelve nada útil:
const result = frutas.forEach(f => f);  // undefined
```

map devuelve nuevo array mismo tamaño

Transforma cada elemento y devuelve un nuevo array de la misma longitud. El callback debe devolver el nuevo valor. No modifica el original.

Usa map cuando necesites transformar datos: multiplicar números, extraer propiedades de objetos, cambiar formato.

```javascript
const nums = [1, 2, 3, 4];

const dobles = nums.map(n => n * 2);
// [2, 4, 6, 8] — original intacto

// Extrae propiedad de array de objetos:
const discos = [
  { titulo: "Abbey Road", anio: 1969 },
  { titulo: "Nevermind",  anio: 1991 },
];
const titulos = discos.map(d => d.titulo);
// ["Abbey Road", "Nevermind"]

// Transformar a HTML (patrón común en React):
const items = discos.map(d =>
  `<li>${d.titulo} (${d.anio})</li>`
).join("");
```

filter devuelve nuevo array (puede ser más pequeño)

Devuelve un nuevo array con los elementos para los que el callback devuelve true. El original no se modifica.

Usa filter para buscar/filtrar: mostrar solo activos, mayores de X, que contienen string...

```javascript
const nums = [1, 2, 3, 4, 5, 6];

const pares = nums.filter(n => n % 2 === 0);
// [2, 4, 6]

// Filtrar objetos:
const clasicos = discos.filter(d => d.anio < 1990);
// [{ titulo: "Abbey Road", anio: 1969 }]

// Encadenar filter + map:
const titulosModernos = discos
  .filter(d => d.anio >= 1990)
  .map(d => d.titulo);
// ["Nevermind"]
```

reduce devuelve un único valor acumulado

Reduce el array a un único valor. El callback recibe el acumulador y el elemento actual. El segundo argumento de reduce es el valor inicial del acumulador.

El método más versátil y complejo. Puede hacer lo mismo que map y filter, pero su principal uso es calcular totales, agrupar datos, construir objetos desde arrays.

```javascript
const nums = [1, 2, 3, 4];

// Sumar todos los valores:
const total = nums.reduce((acc, n) => acc + n, 0);
// 10 (0+1=1, 1+2=3, 3+3=6, 6+4=10)

// Agrupar por propiedad:
const discos = [
  { genero: "rock", titulo: "Abbey Road" },
  { genero: "rock", titulo: "Nevermind" },
  { genero: "jazz", titulo: "Kind of Blue" },
];
const porGenero = discos.reduce((acc, d) => {
  acc[d.genero] = acc[d.genero] || [];
  acc[d.genero].push(d.titulo);
  return acc;
}, {});
// { rock: ["Abbey Road","Nevermind"], jazz: ["Kind of Blue"] }
```

sort muta el original

Ordena el array en su lugar. Sin función comparadora, convierte a string y ordena lexicográficamente (1, 10, 2…). Con función: si devuelve negativo, a va antes que b.

Siempre pasa una función comparadora cuando ordenas números. La ordenación por defecto produce resultados incorrectos para numéricos.

```javascript
// ❌ Sort sin función — ordena como strings:
[10, 1, 21, 2].sort()  // [1, 10, 2, 21] — MAL

// ✓ Sort numérico ascendente:
[10, 1, 21, 2].sort((a, b) => a - b)  // [1, 2, 10, 21]

// ✓ Sort numérico descendente:
[10, 1, 21, 2].sort((a, b) => b - a)  // [21, 10, 2, 1]

// Sort por string (locale):
["banana", "álamo", "cereza"].sort((a, b) =>
  a.localeCompare(b)  // respeta acentos y ñ
);

// Para no mutar: copia primero:
const ordenado = [...arr].sort((a, b) => a - b);
```

splice vs slice splice muta · slice no muta

Los dos trabajan con porciones del array pero de formas muy diferentes. `splice` modifica el array original (elimina/inserta). `slice` extrae una copia sin tocar el original.

```javascript
// splice(inicio, cuántos, ...nuevos) — MUTA
const arr = ["a", "b", "c", "d"];

// Eliminar 1 elemento en índice 1:
arr.splice(1, 1);        // arr = ["a","c","d"], devuelve ["b"]

// Reemplazar elemento:
arr.splice(1, 1, "X");   // arr = ["a","X","d"]

// Insertar sin eliminar:
arr.splice(1, 0, "Z");   // arr = ["a","Z","X","d"]

// ─────────────────────────────────────
// slice(inicio, fin) — NO MUTA
const arr2 = ["a", "b", "c", "d"];

arr2.slice(1, 3)   // ["b","c"] — arr2 intacto
arr2.slice(-2)    // ["c","d"] — los 2 últimos
arr2.slice()      // ["a","b","c","d"] — copia completa
```
