---
title: "Patrones ARIA"
sidebar_position: 4
visibility: public
format: md
---

**ARIA (Accessible Rich Internet Applications)** añade semántica a elementos que HTML no describe por sí solo. Regla de oro: **usa siempre HTML semántico nativo primero** — ARIA complementa, no reemplaza.

Botones

Usa `<button>` nativo siempre que sea posible. Añade `aria-label` cuando el texto visible no sea suficientemente descriptivo.

```html
<button>Guardar cambios</button>

<button aria-label="Cerrar diálogo">×</button>

<!-- Si no puedes usar button: -->
<div role="button" tabindex="0"
     aria-pressed="false">Toggle</div>
```

Formularios

Cada input necesita un `<label>` asociado. Usa `aria-describedby` para instrucciones y `aria-invalid` + `aria-errormessage` para errores.

```html
<label for="email">Correo electrónico</label>
<input type="email" id="email"
       aria-describedby="email-hint"
       aria-invalid="false">
<p id="email-hint">Nunca compartiremos tu email.</p>
```

Navegación

Usa `<nav>` con `aria-label` para distinguir múltiples navs. Indica la página actual con `aria-current="page"`.

```html
<nav aria-label="Principal">
  <ul>
    <li><a href="/" aria-current="page">Inicio</a></li>
    <li><a href="/sobre">Sobre nosotros</a></li>
  </ul>
</nav>
```

Modales / Diálogos

Usa `role="dialog"` + `aria-modal="true"` + `aria-labelledby`. El foco debe moverse al modal al abrirse y volver al trigger al cerrarse.

```html
<div role="dialog" aria-modal="true"
     aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirmar acción</h2>
  <button autofocus>Cancelar</button>
</div>
```

Links externos

Informa siempre que un link abre en pestaña nueva. Usa texto visualmente oculto para lectores de pantalla.

```html
<a href="https://externo.com"
   target="_blank" rel="noopener">
  Sitio externo
  <span class="visually-hidden">
    (abre en nueva pestaña)
  </span>
</a>
```

Live Regions

Para anunciar contenido dinámico sin mover el foco. `aria-live="polite"` espera; `assertive` interrumpe.

```html
<!-- Notificaciones no urgentes -->
<div aria-live="polite" aria-atomic="true">
  Guardado correctamente
</div>

<!-- Errores críticos -->
<div role="alert">
  Error: el campo es obligatorio
</div>
```
