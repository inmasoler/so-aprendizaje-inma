---
title: "Promesas"
sidebar_position: 8
visibility: public
format: md
---

*new Promise · .then/.catch/.finally · async/await · Promise.all*

<blockquote class="craft-intro craft-intro--js">
Las **Promesas** representan una operación asíncrona que puede terminar en éxito (resolve) o en error (reject). Son la base de async/await. Tienen tres estados: **pending** (en curso), **fulfilled** (resuelta) y **rejected** (rechazada).
</blockquote>

## new Promise — constructor {#new-promise-constructor}

```javascript
// Anatomía de una promesa:
const miPromesa = new Promise((resolve, reject) => {
  // Código asíncrono aquí (setTimeout, fetch, fs.readFile…)
  const exito = true;

  if (exito) {
    resolve("¡Todo fue bien!");   // → fulfilled
  } else {
    reject(new Error("Algo falló"));  // → rejected
  }
});

// Promesa que simula una petición con retraso:
function esperarSegundos(n) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Pasaron ${n} segundos`), n * 1000);
  });
}
```

## .then / .catch / .finally {#then-catch-finally}

```javascript
fetch("https://api.ejemplo.com/datos")
  .then(response => {
    if (!response.ok) throw new Error("HTTP error: " + response.status);
    return response.json();   // devuelve otra promesa
  })
  .then(datos => {
    console.log(datos);       // se encadenan automáticamente
    renderizar(datos);
  })
  .catch(error => {
    console.error("Error:", error.message);  // captura cualquier error de la cadena
    mostrarMensajeError();
  })
  .finally(() => {
    ocultarSpinner();          // siempre se ejecuta, haya error o no
  });

// Encadenamiento — cada .then devuelve una nueva promesa:
obtenerUsuario(1)
  .then(user => obtenerPosts(user.id))  // recibe el resultado del anterior
  .then(posts => mostrar(posts))
  .catch(err => console.error(err));
```

## async / await {#async-await}

`async/await` es "azúcar sintáctico" sobre las Promesas. Una función `async` siempre devuelve una Promesa. `await` pausa la ejecución hasta que la Promesa se resuelva, pero sin bloquear el hilo principal. Solo se puede usar dentro de una función `async`.

```javascript
// Equivalente async/await al .then/.catch anterior:
async function cargarDatos() {
  try {
    const response = await fetch("https://api.ejemplo.com/datos");
    if (!response.ok) throw new Error("HTTP error");
    const datos = await response.json();
    renderizar(datos);
  } catch (error) {
    console.error(error.message);
  } finally {
    ocultarSpinner();
  }
}

// Arrow function async:
const obtenerUser = async (id) => {
  const res  = await fetch(`/api/users/${id}`);
  return res.json();  // devuelve promesa automáticamente
};

// Llamada (recuerda que async siempre devuelve promesa):
cargarDatos();                    // fire and forget
const user = await obtenerUser(1); // solo dentro de otra async
```

## Promise.all y otros combinadores {#promiseall-y-otros-combinadores}

Paralelo — todos o nada

Promise.all

Espera a que TODAS las promesas resuelvan. Si una rechaza, rechaza inmediatamente (fail-fast). Ideal para peticiones paralelas independientes.

```javascript
const [user, posts, fotos] = await Promise.all([
  fetch("/api/user/1").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
  fetch("/api/fotos").then(r => r.json()),
]);
// Las 3 peticiones van en paralelo
```

Paralelo — todas las respuestas

Promise.allSettled

Espera a que TODAS terminen (resuelvan O rechacen). No falla si una rechaza. Devuelve array con status "fulfilled"/"rejected" y value/reason de cada una.

```javascript
const resultados = await Promise.allSettled([
  fetch("/api/a"),
  fetch("/api/b"),  // si falla, no cancela las otras
]);
resultados.forEach(r => {
  if (r.status === "fulfilled") /* ok */;
  else /* r.reason = error */;
});
```

La más rápida

Promise.race

Resuelve o rechaza con la primera promesa que termine. Útil para implementar timeouts.

```javascript
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
}
const resultado = await Promise.race([
  fetch("/api/datos"),
  timeout(5000),  // 5 segundos max
]);
```
