---
title: "DOM y Eventos"
sidebar_position: 5
visibility: public
format: md
---

*Selectores · Modificadores · Eventos más comunes*

<blockquote class="craft-intro craft-intro--js">
El **DOM (Document Object Model)** es la representación en árbol del HTML que JS puede leer y modificar. Cada elemento HTML es un nodo del árbol. JS accede a él mediante `document`.
</blockquote>

## Tabla de selectores {#tabla-de-selectores}

| Método | Selecciona | Devuelve | Nota |
| --- | --- | --- | --- |
| getElementById(id) | Elemento con ese ID | Elemento | null | El más rápido. Solo IDs únicos. |
| getElementsByClassName(cls) | Elementos con esa clase | HTMLCollection (live) | Se actualiza automáticamente si el DOM cambia. Índice numérico. |
| getElementsByTagName(tag) | Elementos con ese tag | HTMLCollection (live) | Por ejemplo "div", "p", "button". |
| querySelector(css) | Primer elemento que coincide con el selector CSS | Elemento | null | Acepta cualquier selector CSS válido: "#id", ".clase", "div > p". |
| querySelectorAll(css) | Todos los elementos que coinciden | NodeList (static) | No se actualiza en vivo. Iterable con forEach. |
| closest(css) | Ancestro más cercano que coincide | Elemento | null | Sube por el árbol desde el elemento actual. Muy útil en eventos delegados. |
| matches(css) | ¿Este elemento coincide con el selector? | boolean | Útil en event delegation para filtrar el target. |

## Tabla de modificadores y propiedades {#tabla-de-modificadores-y-propiedades}

| Propiedad / Método | Qué hace | Uso típico |
| --- | --- | --- |
| textContent | Texto plano del elemento y sus descendientes. No interpreta HTML. | Mostrar texto seguro (input de usuario) |
| innerHTML | HTML interno como string. Interpreta etiquetas. | Insertar HTML dinámico. Peligroso con input de usuario (XSS). |
| innerText | Texto visible (respeta CSS: no incluye display:none). Más lento que textContent. | Cuando necesitas el texto tal como lo ve el usuario |
| value | Valor actual de inputs, textarea y select. | Leer o escribir el valor de un campo de formulario |
| setAttribute(name, val) | Establece un atributo HTML. | el.setAttribute("disabled","") o "src", "href"… |
| getAttribute(name) | Lee el valor de un atributo HTML. | el.getAttribute("data-id") |
| removeAttribute(name) | Elimina un atributo. | Quitar disabled, hidden, etc. |
| classList.add(cls) | Añade una clase CSS. | Activar estilos dinámicamente |
| classList.remove(cls) | Elimina una clase CSS. | Desactivar estilos |
| classList.toggle(cls) | Añade si no está, elimina si está. | Menú hamburgesa, modo oscuro |
| classList.contains(cls) | ¿Tiene esa clase? → boolean | Comprobar estado visual |
| style.propiedad | Estilos inline (camelCase). Sobreescribe CSS. | el.style.backgroundColor = "red" |
| dataset.clave | Lee/escribe atributos data-\*. | el.dataset.id (de data-id="...") |
| appendChild(nodo) | Añade nodo al final del elemento. | Construir DOM dinámicamente |
| remove() | Elimina el elemento del DOM. | Borrar tarjetas, items de lista… |
| createElement(tag) | Crea un nuevo elemento HTML. | document.createElement("div") |

## Eventos más comunes {#eventos-mas-comunes}

Mouse

click · dblclick · mouseover · mouseout

`click` se dispara al soltar el botón. `dblclick` al hacer doble clic. `mouseover` al entrar el ratón (también en hijos). `mouseenter` solo al entrar en el propio elemento.

```javascript
const btn = document.querySelector("#boton");

btn.addEventListener("click", (e) => {
  console.log("Clicado", e.target);
});

btn.addEventListener("mouseover", () => {
  btn.style.background = "#e6a817";
});
btn.addEventListener("mouseout", () => {
  btn.style.background = "";
});
```

Teclado

keydown · keyup · keypress

`keydown` se dispara al presionar (antes de soltar). `keyup` al soltar. `keypress` está deprecado. `e.key` da el valor legible, `e.code` la tecla física.

```javascript
document.addEventListener("keydown", (e) => {
  console.log(e.key);   // "Enter", "a", "ArrowLeft"…
  console.log(e.code);  // "KeyA", "Enter", "Space"…

  if (e.key === "Enter") enviarFormulario();
  if (e.key === "Escape") cerrarModal();
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();  // evitar Guardar del browser
    guardar();
  }
});
```

Formularios

change · input · submit

`input` se dispara con cada pulsación. `change` solo cuando el campo pierde el foco con un valor diferente. `submit` en el envío del formulario.

```javascript
const campo = document.querySelector("#nombre");
const form  = document.querySelector("form");

// input: se dispara en cada tecla
campo.addEventListener("input", (e) => {
  console.log(e.target.value);  // valor actual
});

// submit: prevenir recarga de página
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(form);
  console.log(datos.get("nombre"));
});
```

Documento

DOMContentLoaded · load

`DOMContentLoaded` se dispara cuando el HTML está parseado y el DOM listo, sin esperar imágenes ni CSS. `load` espera a que todo (imágenes, CSS) haya cargado.

```javascript
// DOMContentLoaded — el script puede ejecutarse al inicio
document.addEventListener("DOMContentLoaded", () => {
  // Aquí el DOM ya está disponible
  const app = document.querySelector("#app");
  inicializar(app);
});

// Alternativa: script al final del body o con defer
// <script defer src="app.js"></script>
// defer = espera al DOM, ejecuta en orden, no bloquea
```

Coloca los scripts al final del <body> o usa el atributo defer. Así el DOM ya existe cuando ejecuta y no necesitas DOMContentLoaded.

## Event delegation — delegación de eventos {#event-delegation-delegacion-de-eventos}

**Event delegation:** en lugar de añadir un listener a cada elemento hijo, se añade uno solo al padre. Cuando ocurre el evento, burbujea (bubble) hacia arriba. Con `e.target` identificas qué hijo lo disparó. Es más eficiente y funciona con elementos añadidos dinámicamente.

```javascript
// Sin delegación — un listener por botón (ineficiente):
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => { /* ... */ });
});

// Con delegación — un listener en el contenedor:
const lista = document.querySelector("#lista");
lista.addEventListener("click", (e) => {
  if (e.target.matches(".btn-borrar")) {
    e.target.closest("li").remove();
  }
  if (e.target.matches(".btn-editar")) {
    const id = e.target.dataset.id;
    editar(id);
  }
});
```
