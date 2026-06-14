---
title: "Funciones"
sidebar_position: 4
visibility: public
format: md
---

*Declarada · Expresión · Arrow · Parámetros · Return · Callbacks*

## Tipos de función y sus diferencias {#tipos-de-funcion-y-sus-diferencias}

Función declarada

function declaration

Se declara con la palabra clave `function` como sentencia independiente. Tiene hoisting completo: se puede llamar antes de su definición en el código.

Tiene su propio `this`. Tiene el objeto `arguments`. Se puede usar como constructor con `new`. Aparece en stack traces con su nombre.

```javascript
// Se puede llamar ANTES de la definición
saludar("Ana");  // "Hola, Ana" — funciona por hoisting

function saludar(nombre) {
  return "Hola, " + nombre;
}

// Con múltiples parámetros:
function sumar(a, b) {
  return a + b;
}
```

Función expresión

function expression

La función se asigna a una variable. No tiene hoisting: no se puede usar antes de la línea de declaración. Se puede pasar como argumento (callback).

Útil cuando quieres controlar exactamente cuándo está disponible la función, o cuando necesitas asignarla condicionalmente.

```javascript
// No se puede llamar antes
suma(1, 2);  // ❌ ReferenceError si usa const/let

const suma = function(a, b) {
  return a + b;
};

// Función anónima vs nombrada:
const multiplicar = function mult(a, b) {
  return a * b;  // "mult" útil en stack traces
};
```

Arrow function (ES6)

() => {}

Sintaxis compacta. No tiene su propio `this` (hereda el del contexto donde se define). No tiene `arguments`. No puede usarse como constructor.

Perfecta para callbacks, métodos de array y código funcional. La herencia de `this` es fundamental en React y en event handlers dentro de clases.

```javascript
// Forma completa:
const saludar = (nombre) => {
  return "Hola, " + nombre;
};

// Un parámetro — sin paréntesis:
const doble = n => n * 2;

// Sin parámetros — paréntesis obligatorios:
const saludar2 = () => "Hola";

// Return implícito (sin llaves):
const cuadrado = n => n * n;

// Return implícito de objeto (llaves → paréntesis):
const crearUser = (n) => ({ nombre: n });
```

Parámetros

Valores por defecto y rest

Los parámetros con valor por defecto se usan cuando el argumento es undefined. El parámetro rest (...) recoge los argumentos sobrantes en un array.

```javascript
// Valores por defecto:
function saludar(nombre = "visitante", saludo = "Hola") {
  return `${saludo}, ${nombre}!`;
}
saludar();              // "Hola, visitante!"
saludar("Ana");        // "Hola, Ana!"
saludar("Luis", "Buenas"); // "Buenas, Luis!"

// Parámetro rest — siempre el último:
function sumarTodos(primero, ...resto) {
  return resto.reduce((acc, n) => acc + n, primero);
}
sumarTodos(1, 2, 3, 4);  // 10
```

Return

Retorno de valores

Una función sin return (o con return vacío) devuelve undefined. La ejecución se detiene en el primer return encontrado. Se puede devolver cualquier tipo, incluso otra función.

```javascript
// return detiene la función:
function dividir(a, b) {
  if (b === 0) return null;  // salida temprana
  return a / b;
}

// Retornar objeto:
function crearPersona(nombre, edad) {
  return { nombre, edad };  // shorthand
}

// Retornar función (closure):
function multiplicadorDe(factor) {
  return (n) => n * factor;
}
const doble = multiplicadorDe(2);
doble(5);  // 10
```

Callbacks

Funciones como argumentos

Una función pasada como argumento a otra función. Patrón fundamental en JS para eventos, métodos de array y código asíncrono.

```javascript
// Callback en evento del DOM:
const btn = document.querySelector("#miBtn");

btn.addEventListener("click", function() {
  console.log("Clic con function");
});

btn.addEventListener("click", () => {
  console.log("Clic con arrow");
});

// Callback en métodos de array:
[1, 2, 3].forEach(function(num) {
  console.log(num * 2);
});

// Callback personalizado:
function ejecutar(callback) {
  console.log("Antes");
  callback();
  console.log("Después");
}
ejecutar(() => console.log("Ejecutando callback"));
```
