---
title: "Frontmatter vs script"
sidebar_position: 5
visibility: public
format: md
---

Conceptos genéricos de Astro · aplica a cualquier componente .astro con interactividad

<blockquote class="craft-intro craft-intro--astro">
**Un fichero .astro tiene dos zonas de ejecución completamente distintas** — no es una cuestión de estilo, es física: se ejecutan en máquinas diferentes, en momentos distintos, con acceso a cosas distintas.
</blockquote>

## Las dos zonas en un mismo fichero {#las-dos-zonas-en-un-mismo-fichero}

\--- Frontmatter ---

Build time · Node.js · tu máquina

```
---
import ReservationCard from '../components/...'
const locale = Astro.props.locale
const entry  = await getEntry('pages', locale)
const d      = entry.data
---
```

`<script>` ... `</script>`

Browser · V8 del usuario · cuando carga la página

```
import flatpickr from 'flatpickr'

const input = document.getElementById('fecha')
flatpickr(input, {
  minDate: 'today',
  disableMobile: true
})
```

## Comparativa completa {#comparativa-completa}

|  | `---` Frontmatter | ``<script>`` |
| --- | --- | --- |
| Cuándo ejecuta | Al hacer `npm run build` (o dev) | Cuando el navegador carga la página |
| Dónde ejecuta | Node.js — servidor / tu máquina | V8 — el navegador del usuario |
| ¿Existe `document`? | No — el DOM no existe todavía | Sí — el HTML ya está en pantalla |
| ¿Existe `window`? | No | Sí |
| Qué produce | HTML como string (construye) | Manipula HTML ya construido |
| Para qué | Fetch datos, leer props, imports de componentes | Interactividad, eventos, librerías que usan el DOM |
| Ejemplo típico | `await getEntry()`, `Astro.props`, `import` | Flatpickr, `addEventListener`, Leaflet |

## Por qué Flatpickr tiene que ir en `<script>` — no en --- {#por-que-flatpickr-tiene-que-ir-en-script-no-en-}

✗ MAL — en el frontmatter

```text
---
import flatpickr from 'flatpickr'

// Node.js no tiene document.
// Este código corre ANTES de que
// exista ningún HTML en ningún sitio.
flatpickr('#fecha', { minDate: 'today' })
// → TypeError: document is not defined
---
```

Flatpickr hace internamente `document.querySelector('#fecha')`. En Node.js no hay `document`, ni hay `#fecha`, ni hay nada — el HTML ni se ha generado todavía.

✓ BIEN — en `<script>`

```text
---
// Solo props e imports de componentes
const { minDate } = Astro.props
---

<input id="fecha" />

<script>
  import flatpickr from 'flatpickr'

  // El DOM YA EXISTE aquí.
  // El <input id="fecha"> está en la
  // página y Flatpickr puede encontrarlo.
  flatpickr('#fecha', { minDate: 'today' })
</script>
```

Astro empaqueta este bloque y lo envía al browser. Cuando ejecuta, el `#fecha` ya está en el DOM.

## Cómo pasar datos del frontmatter al script {#como-pasar-datos-del-frontmatter-al-script}

El frontmatter y el script no comparten variables — son dos mundos. El único canal de comunicación es el HTML: el frontmatter mete los datos como atributos `data-*` y el script los lee del DOM.

```text
---
const { minDate, locale } = Astro.props
---

<!-- Los datos del frontmatter viajan en el HTML como atributos data-* -->
<div id="reservation-root"
     data-min-date={minDate}
     data-locale={locale}>
  <input id="fecha" />
</div>

<script>
  import flatpickr from 'flatpickr'

  // El script los lee del DOM — así cruzan la frontera build → browser
  const root    = document.getElementById('reservation-root')
  const minDate = root.dataset.minDate   // 'today' o una fecha real
  const locale  = root.dataset.locale   // 'es', 'en', 'ar'

  flatpickr('#fecha', { minDate, locale })
</script>
```

Es el patrón estándar en Astro para componentes con interactividad vanilla (sin React). `data-*` es el puente.

## La pregunta para decidir dónde va el código {#la-pregunta-para-decidir-donde-va-el-codigo}

<blockquote class="craft-intro craft-intro--astro">
**¿Necesita acceder al DOM? ¿Responde a eventos del usuario? ¿Inicializa una librería como Flatpickr, Leaflet, Swiper?**  
→ **Sí** · va en ``<script>``  
→ **No** (fetch de datos, leer props, importar componentes Astro/React) · va en `---`
</blockquote>

## Librerías que siempre van en `<script>` {#librerias-que-siempre-van-en-script}

| Librería | Por qué necesita `<script>` |
| --- | --- |
| Flatpickr | Hace `document.getElementById()` y escucha eventos de click/teclado |
| Leaflet | Necesita un `<div>` real en el DOM para montar el mapa |
| Swiper | Mide el tamaño del contenedor con `getBoundingClientRect()` |
| Alpine.js | Escucha el evento `DOMContentLoaded` y recorre el DOM completo |
| Cualquier `addEventListener` | Los elementos del DOM tienen que existir para poder escucharlos |
