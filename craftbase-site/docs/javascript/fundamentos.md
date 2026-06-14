---
title: "Fundamentos"
sidebar_position: 2
visibility: public
format: md
---

*Tipos · Operadores · Estructuras de control*

<blockquote class="craft-intro craft-intro--js">
**JavaScript** es un lenguaje interpretado, de tipado dinámico y orientado a eventos. Corre en el navegador e interactúa con el HTML a través del DOM. También funciona en el servidor con Node.js. El motor V8 (Chrome/Node) compila JS a código máquina en tiempo de ejecución.
</blockquote>

## Tipos de datos primitivos {#tipos-de-datos-primitivos}

| Tipo | Descripción | Ejemplos |
| --- | --- | --- |
| number | Enteros y decimales. Solo hay un tipo numérico (no int/float). NaN e Infinity también son number. | `42, 3.14, -7, NaN, Infinity` |
| string | Texto entre comillas simples, dobles o backticks (template literals). Inmutable. | `` "hola", 'mundo', `${variable}` `` |
| boolean | Solo dos valores posibles. Resultado de comparaciones y condiciones. | `true, false` |
| null | Ausencia intencional de valor. Lo asigna el programador explícitamente. | `let x = null` |
| undefined | Variable declarada pero sin valor asignado. También es lo que devuelve una función sin return. | `let x; // → undefined` |
| symbol | Identificador único e irrepetible. Útil para claves de objeto que no deben colisionar. | `Symbol("id")` |
| bigint | Enteros de precisión arbitraria. Para números mayores que Number.MAX\_SAFE\_INTEGER. | `9007199254740991n` |
| object | Tipo no primitivo. Colección de pares clave:valor. Los arrays, funciones y fechas también son objetos. | `{nombre: "Ana", edad: 30}` |
| array | Lista ordenada de valores (técnicamente es un objeto). Acceso por índice numérico desde 0. | `[1, "hola", true, null]` |

**typeof** devuelve el tipo como string. Atención: `typeof null === "object"` es un bug histórico de JS que no se puede corregir por retrocompatibilidad. Para comprobar null usa `=== null`.

```javascript
typeof 42          // "number"
typeof "hola"      // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" ← bug histórico
typeof {}           // "object"
typeof []           // "object" ← los arrays son objetos
typeof function(){} // "function"
typeof Symbol()     // "symbol"

// Para distinguir array de objeto:
Array.isArray([])   // true
```

## Tabla de operadores {#tabla-de-operadores}

| Operador | Nombre | Ejemplo | Resultado | Nota clave |
| --- | --- | --- | --- | --- |
| \== | Igualdad débil (loose) | `"5" == 5` | true | Convierte tipos antes de comparar (coerción). Evitar. |
| \=== | Igualdad estricta | `"5" === 5` | false | Sin coerción. Compara valor Y tipo. Usar siempre. |
| != | Desigualdad débil | `"5" != 5` | false | Igual que == pero negado. Evitar. |
| !== | Desigualdad estricta | `"5" !== 5` | true | Sin coerción. Usar siempre. |
| typeof | Tipo del operando | `typeof 42` | `"number"` | Devuelve string. Ver tabla de tipos. |
| instanceof | Instancia de clase | `[] instanceof Array` | true | Verifica la cadena de prototipos. |
| ? : | Ternario | `x > 0 ? "pos" : "neg"` | `"pos"/"neg"` | Versión corta de if/else. Devuelve valor. |
| ?? | Nullish coalescing | `null ?? "default"` | `"default"` | Solo activa si el valor es null o undefined (no 0 ni ""). |
| ?. | Optional chaining | `obj?.prop?.sub` | `undefined` | Corta la cadena sin lanzar error si algo es null/undefined. |
| && | AND lógico | `true && false` | false | Devuelve el primer falsy o el último valor. |
| || | OR lógico | `false || "x"` | `"x"` | Devuelve el primer truthy o el último valor. |
| ! | NOT lógico | `!true` | false | Invierte el booleano. !! convierte a boolean. |
| \+ - \* / % \*\* | Aritméticos | `2 ** 3` | `8` | \*\* es potencia. % es módulo (resto). + con strings concatena. |
| ++ -- | Incremento/decremento | `i++` | prev valor | Prefijo (++i) devuelve nuevo valor; sufijo (i++) devuelve el anterior. |

**Regla de oro:** usa siempre `===` y `!==`. El operador `==` aplica coerción de tipos con reglas complejas que producen resultados inesperados (`[] == false` es true, `null == undefined` es true...).

```javascript
// Truthy vs Falsy — valores falsos en JS:
false, 0, "", '', null, undefined, NaN  // ← son falsy
// Todo lo demás es truthy: [], {}, "0", -1, Infinity

// Nullish vs falsy
const a = 0 || "default"   // "default" (0 es falsy)
const b = 0 ?? "default"   // 0 (0 no es null/undefined)

// Optional chaining
const user = null;
const ciudad = user?.direccion?.ciudad;  // undefined (sin error)
const ciudad2 = user.direccion.ciudad;   // ❌ TypeError
```

## Estructuras de control {#estructuras-de-control}

Condicional

if / else if / else

Ejecuta un bloque si la condición es verdadera. Encadena con else if para múltiples ramas. El else captura el resto de casos.

```javascript
if (edad >= 18) {
  alert("Mayor de edad");
} else if (edad >= 12) {
  alert("Adolescente");
} else {
  alert("Menor");
}
```

Condicional múltiple

switch

Compara una expresión contra múltiples valores. Cada `case` necesita `break` para no caer al siguiente. `default` actúa como el else.

```javascript
switch (dia) {
  case "lunes":
    alert("Inicio de semana");
    break;
  case "viernes":
    alert("¡Por fin!");
    break;
  default:
    alert("Día normal");
}
```

Sin break, la ejecución "cae" al siguiente case (fall-through). Puede ser intencional para agrupar casos.

Bucle clásico

for

Tres partes: inicialización, condición e incremento. Ideal cuando sabes cuántas iteraciones necesitas.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// Recorrer array con índice:
const frutas = ["🍎", "🍌", "🍇"];
for (let i = 0; i < frutas.length; i++) {
  console.log(i, frutas[i]);
}
```

Bucle condicionado

while

Ejecuta mientras la condición sea true. Ideal cuando no sabes cuántas iteraciones hay. Variante `do...while` ejecuta al menos una vez.

```javascript
let contador = 0;
while (contador < 3) {
  console.log(contador);
  contador++;  // ¡sin esto: bucle infinito!
}

// do...while — ejecuta al menos una vez
do {
  contador++;
} while (contador < 10);
```

Bucle sobre valores de array

for...of

Itera sobre los **valores** de cualquier iterable (array, string, Set, Map…). Más limpio que el for clásico para arrays. No da acceso al índice directamente.

```javascript
const colores = ["rojo", "verde", "azul"];

for (const color of colores) {
  console.log(color);  // "rojo", "verde", "azul"
}

// Con índice: usa entries()
for (const [i, color] of colores.entries()) {
  console.log(i, color);  // 0 "rojo", 1 "verde"…
}

// También funciona con strings:
for (const letra of "hola") console.log(letra);
```

Bucle sobre claves de objeto

for...in

Itera sobre las **claves enumerables** de un objeto. No usar con arrays (puede incluir propiedades heredadas del prototipo). Ideal para objetos literales.

```javascript
const persona = { nombre: "Ana", edad: 30, ciudad: "Málaga" };

for (const clave in persona) {
  console.log(clave, persona[clave]);
}
// "nombre" "Ana"
// "edad" 30
// "ciudad" "Málaga"

// Para arrays usa for...of o forEach, no for...in
```

En arrays usa for...of o forEach. for...in puede iterar propiedades heredadas del prototipo y el orden no está garantizado.
