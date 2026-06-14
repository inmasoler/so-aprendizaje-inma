---
title: "Temporizadores"
sidebar_position: 9
visibility: public
format: md
---

*setTimeout · setInterval · cancelación · requestAnimationFrame*

## Tabla de funciones de tiempo {#tabla-de-funciones-de-tiempo}

| Función | Qué hace | Devuelve | Cancelar con |
| --- | --- | --- | --- |
| setTimeout(fn, ms) | Ejecuta fn una vez tras ms milisegundos. | ID (número) | `clearTimeout(id)` |
| setInterval(fn, ms) | Ejecuta fn repetidamente cada ms milisegundos. | ID (número) | `clearInterval(id)` |
| clearTimeout(id) | Cancela un setTimeout antes de que se ejecute. | undefined | — |
| clearInterval(id) | Para un setInterval en ejecución. | undefined | — |
| requestAnimationFrame(fn) | Ejecuta fn antes del próximo repintado (~60fps). Ideal para animaciones fluidas. | ID | `cancelAnimationFrame(id)` |
| queueMicrotask(fn) | Encola una microtarea (más prioritaria que setTimeout). Para asincronía sin delay. | undefined | No cancelable |

**Los delays no son exactos.** `setTimeout(fn, 0)` no ejecuta inmediatamente: encola el callback en el event loop, que lo procesará cuando el call stack esté vacío. El mínimo real en navegadores es ~4ms. En tabs en segundo plano se limita a ~1000ms.

## setTimeout — detalle y cancelación {#settimeout-detalle-y-cancelacion}

setTimeout una sola ejecución

Programa una función para que se ejecute una sola vez después de un retraso. Guarda el ID para poder cancelarlo antes de que ocurra.

```javascript
// Uso básico:
const id = setTimeout(() => {
  console.log("Han pasado 3 segundos");
}, 3000);

// Cancelar antes de los 3 segundos:
clearTimeout(id);  // el callback nunca se ejecuta

// Caso real: cerrar notificación automáticamente (con cancelación al pasar el ratón):
function mostrarNotificacion(mensaje, duracion = 4000) {
  const notif = document.createElement("div");
  notif.className = "notificacion";
  notif.textContent = mensaje;
  document.body.appendChild(notif);

  let timerId = setTimeout(() => notif.remove(), duracion);

  // Pausa el cierre al pasar el ratón:
  notif.addEventListener("mouseenter", () => clearTimeout(timerId));
  notif.addEventListener("mouseleave", () => {
    timerId = setTimeout(() => notif.remove(), 1000);
  });
}

// setTimeout con argumentos adicionales:
setTimeout((nombre) => console.log("Hola, " + nombre), 1000, "Ana");
```

## setInterval — detalle y cancelación {#setinterval-detalle-y-cancelacion}

setInterval ejecución repetida

Ejecuta una función repetidamente cada N ms. Siempre guarda el ID y llama a clearInterval cuando ya no se necesite — de lo contrario seguirá ejecutándose aunque navegues fuera.

```javascript
// Reloj en tiempo real:
const display = document.querySelector("#reloj");

const intervalo = setInterval(() => {
  display.textContent = new Date().toLocaleTimeString();
}, 1000);

// Detener al hacer clic:
document.querySelector("#parar").addEventListener("click", () => {
  clearInterval(intervalo);
});

// Contador regresivo con auto-parada:
function iniciarCuentaAtras(segundos, onTick, onFin) {
  let restantes = segundos;
  const id = setInterval(() => {
    onTick(restantes);
    restantes--;
    if (restantes < 0) {
      clearInterval(id);   // ← se para solo
      onFin();
    }
  }, 1000);
  return id;  // devuelve el id por si se necesita cancelar desde fuera
}

iniciarCuentaAtras(
  10,
  n => console.log(`Quedan ${n}s`),
  () => console.log("¡Tiempo!")
);
```

## requestAnimationFrame — animaciones {#requestanimationframe-animaciones}

requestAnimationFrame sincronizado con el repintado del navegador

Más eficiente que setInterval para animaciones: se sincroniza con el refresco de pantalla (~60fps), se pausa automáticamente en tabs en segundo plano y evita visual tearing.

```javascript
// Animación de posición:
let posX = 0;
let animId;

function animar() {
  posX += 2;
  elemento.style.transform = `translateX(${posX}px)`;

  if (posX < 400) {
    animId = requestAnimationFrame(animar);  // se llama a sí misma
  }
}

animId = requestAnimationFrame(animar);  // arrancar

// Parar:
cancelAnimationFrame(animId);
```
