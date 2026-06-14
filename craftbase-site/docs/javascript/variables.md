---
title: "Variables"
sidebar_position: 3
visibility: public
format: md
---

*let · const · var · scope de bloque · hoisting · por qué evitar var*

## let vs const vs var — tabla comparativa {#let-vs-const-vs-var-tabla-comparativa}

| Característica | let | const | var |
| --- | --- | --- | --- |
| Scope | Bloque `{ }` | Bloque `{ }` | Función (no bloque) |
| Reasignable | Sí | No | Sí |
| Redeclarable | No | No | Sí ← peligroso |
| Hoisting | Sí (TDZ — no se puede usar antes) | Sí (TDZ — no se puede usar antes) | Sí (inicializada a undefined) |
| Propiedad de window | No | No | Sí ← contamina global |
| Uso recomendado | Cuando el valor cambia (contadores, acumuladores) | Cuando el valor no cambia (la mayoría de casos) | Nunca en código moderno |

## Scope de bloque — ejemplos {#scope-de-bloque-ejemplos}

```javascript
// let y const — scope de BLOQUE
{
  let x = 10;
  const y = 20;
  console.log(x, y);  // 10 20 — funciona dentro del bloque
}
console.log(x);  // ❌ ReferenceError — x no existe fuera

// var — scope de FUNCIÓN (el bloque no le importa)
{
  var z = 99;
}
console.log(z);  // 99 — ¡z "se escapa" del bloque!

// Ejemplo real: let en bucle for
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);  // 0, 1, 2 ✓
}
// Con var: imprimiría 3, 3, 3 (i se comparte entre todas las iteraciones)
```

## Hoisting — lo que hace JS antes de ejecutar {#hoisting-lo-que-hace-js-antes-de-ejecutar}

**Hoisting** = JS "sube" las declaraciones al inicio de su scope antes de ejecutar. Con `var` sube la declaración E inicializa a undefined. Con `let`/`const` sube la declaración pero NO inicializa → Temporal Dead Zone (TDZ): acceder antes de la línea de declaración lanza ReferenceError.

```javascript
// Con var — hoisting peligroso
console.log(nombre);  // undefined (no error, pero confuso)
var nombre = "Ana";
console.log(nombre);  // "Ana"

// Con let — Temporal Dead Zone (TDZ)
console.log(edad);  // ❌ ReferenceError: Cannot access 'edad' before initialization
let edad = 30;

// Las funciones declaradas SÍ se pueden llamar antes:
saludar();  // "Hola" — funciona, la función completa sube
function saludar() { console.log("Hola"); }

// Función expresión con const — NO hace hoisting
greet();  // ❌ ReferenceError
const greet = () => console.log("Hi");
```

## Por qué evitar var {#por-que-evitar-var}

Problema 1

No respeta el scope de bloque

Las variables con var "escapan" de ifs, bucles y otros bloques, contaminando el scope de la función o el global.

```javascript
function test() {
  if (true) {
    var x = 1;   // se eleva a test()
    let y = 2;   // queda en el bloque if
  }
  console.log(x); // 1 — var escapó
  console.log(y); // ❌ ReferenceError
}
```

Problema 2

Permite redeclaración silenciosa

Declarar la misma variable dos veces con var no da error: simplemente sobreescribe la primera. Con let/const es un SyntaxError inmediato.

```javascript
var nombre = "Ana";
// ... 100 líneas de código después ...
var nombre = "Luis";  // silencioso — sobreescribe

let edad = 30;
let edad = 25;  // ❌ SyntaxError — te avisa
```

Problema 3

Contamina el objeto global window

Las variables var declaradas en el scope global se convierten en propiedades de window, pudiendo sobreescribir APIs del navegador.

```javascript
var screen = "grande";
console.log(window.screen); // "grande" ← sobreescribió API

let screen2 = "grande";
console.log(window.screen2); // undefined — no contamina
```

**Regla práctica:** usa `const` por defecto. Cambia a `let` solo cuando necesites reasignar (contadores en bucles, valores que cambian en el tiempo). Nunca uses `var` en código moderno.
