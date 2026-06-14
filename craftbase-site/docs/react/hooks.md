---
title: "Hooks y efectos"
sidebar_position: 5
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--react">
**Los hooks son funciones que empiezan por `use`.** Solo pueden llamarse en el nivel superior de un componente o de otro hook — nunca dentro de condicionales, bucles o funciones anidadas. Esta regla garantiza que React siempre los llama en el mismo orden.
</blockquote>

## Hooks de referencia y efectos {#hooks-de-referencia-y-efectos}

### useRef · referencia al DOM · valor sin re-render {#useref-referencia-al-dom-valor-sin-re-render}

<div class="craft-card craft-card--hook craft-card--react">
**Cuándo:** Cuando necesitas acceso directo a un elemento del DOM (medir su altura, hacer .focus(), inicializar una librería) o guardar un valor que no debe provocar re-render cuando cambia.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** A diferencia de useState, cambiar `ref.current` no redibuja el componente. Útil para valores de "infraestructura" que el usuario no necesita ver: un timer ID, una instancia de mapa Leaflet, el valor anterior de un estado.
</blockquote>

```tsx
import { useRef } from 'react';

// Caso 1 — referencia al DOM
function Formulario() {
  const inputRef = useRef<HTMLInputElement>(null);

  const enfocar = () => inputRef.current?.focus(); // ?. porque puede ser null inicialmente

  return <>
    <input ref={inputRef} type="text" />
    <button onClick={enfocar}>Enfocar</button>
  </>;
}

// Caso 2 — array de refs (uno por elemento de lista)
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
<div ref={(el) => { itemRefs.current[i] = el; }}>

// Caso 3 — valor que no provoca re-render (ej: ID de timer)
const timerId = useRef<number | null>(null);
timerId.current = setTimeout(() => { ... }, 1000);
clearTimeout(timerId.current);
```
</div>

### useEffect · efectos después del paint {#useeffect-efectos-despues-del-paint}

<div class="craft-card craft-card--hook craft-card--react">
**Cuándo:** Cuando necesitas sincronizar el componente con algo externo: llamar a una API, suscribirte a eventos del DOM, inicializar una librería que necesita el DOM real, conectar a un websocket.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Los efectos corren después de que React haya pintado en pantalla. El usuario ya ve el resultado antes de que el efecto corra. Si el efecto tarda mucho (un fetch lento), el componente ya está visible con el estado de carga — la UX no se bloquea.
</blockquote>

```tsx
import { useEffect, useState } from 'react';

function Perfil({ userId }: { userId: number }) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    // Este código corre DESPUÉS de que React pinte
    fetch(`/api/usuario/${userId}`)
      .then(r => r.json())
      .then(d => setDatos(d));

    // Función de limpieza — corre antes del próximo efecto o al desmontar
    return () => {
      // Cancelar la petición, desuscribirse, limpiar timers, etc.
    };
  }, [userId]); // ← dependencias: re-ejecuta cuando userId cambia

  // Variantes del array de dependencias:
  // []          → solo corre al montar (nunca más)
  // [a, b]      → corre al montar y cuando a o b cambian
  // (sin array) → corre en cada render — casi siempre un bug

  return <div>{datos?.nombre}</div>;
}
```
</div>

### useLayoutEffect · efectos antes del paint {#uselayouteffect-efectos-antes-del-paint}

<div class="craft-card craft-card--hook craft-card--react">
**Cuándo:** Solo cuando necesitas medir o modificar el DOM antes de que el usuario lo vea. Si lo haces con useEffect, el usuario verá un parpadeo (el estado incorrecto un frame antes de corregirse).

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Corre síncronamente después del commit de React pero antes de que el navegador pinte. Es más caro que useEffect porque bloquea el paint. Úsalo solo para animaciones y medidas del DOM que necesitan ser invisibles para el usuario.
</blockquote>

```tsx
import { useLayoutEffect, useRef } from 'react';

// Animar altura de un acordeón sin parpadeo
function Acordeon({ abierto, children }) {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contenedorRef.current;
    if (!el) return;
    // Cambia la altura ANTES de que el usuario vea el render
    // → sin parpadeo, animación suave
    el.style.maxHeight = abierto ? `${el.scrollHeight}px` : '0';
  }, [abierto]); // re-ejecuta cada vez que cambia 'abierto'

  return (
    <div ref={contenedorRef} style={{ overflow: 'hidden', transition: 'max-height 0.3s' }}>
      {children}
    </div>
  );
}

// Regla práctica:
// Empieza siempre con useEffect.
// Si ves un parpadeo visual, cambia a useLayoutEffect.
```
</div>

### useId · IDs únicos para accesibilidad {#useid-ids-unicos-para-accesibilidad}

<div class="craft-card craft-card--hook craft-card--react">
**Cuándo:** Cuando necesitas conectar elementos de formulario o ARIA con `id` y `htmlFor` / `aria-controls`, y el componente puede instanciarse varias veces en la misma página.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Si inventas IDs estáticos (`id="faq-1"`) y tienes dos instancias del componente FAQ en la misma página, los IDs se repiten — eso rompe la accesibilidad y los lectores de pantalla. `useId` garantiza un ID único por instancia, sea cual sea el número de instancias.
</blockquote>

```tsx
import { useId } from 'react';

function CampoFormulario({ label, tipo = 'text' }) {
  const id = useId(); // genera: ':r0:', ':r1:', etc. — único por instancia

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={tipo} />
    </div>
  );
}

// Dos instancias — cada una tiene su ID único, no hay conflictos
<CampoFormulario label="Nombre" />
<CampoFormulario label="Email" tipo="email" />

// En acordeones — conecta botón con contenido (aria)
const uid = useId().replace(/:/g, '');
<button aria-controls={`${uid}-panel-${i}`} aria-expanded={abierto[i]}>
<div id={`${uid}-panel-${i}`}>
```
</div>

### Custom hooks — use... · extraer lógica reutilizable {#custom-hooks-use-extraer-logica-reutilizable}

<div class="craft-card craft-card--hook craft-card--react">
**Cuándo:** Cuando la misma lógica con hooks aparece en dos o más componentes. Un custom hook extrae esa lógica en una función reutilizable con su propio estado.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Los custom hooks no son una API especial de React — son simplemente funciones que empiezan por `use` y pueden llamar a otros hooks. La convención del prefijo es obligatoria: React usa el nombre para aplicar las reglas de hooks (linters, herramientas).
</blockquote>

```tsx
// Custom hook — extrae lógica de fetch reutilizable
function useFetch<T>(url: string) {
  const [datos, setDatos] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCargando(true);
    fetch(url)
      .then(r => r.json())
      .then(d => { setDatos(d); setCargando(false); })
      .catch(e => { setError(e.message); setCargando(false); });
  }, [url]);

  return { datos, cargando, error };
}

// Uso — limpio, sin repetir la lógica de fetch
function Apartamentos() {
  const { datos, cargando, error } = useFetch('/api/apartamentos');
  if (cargando) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  return <Lista items={datos} />;
}
```
</div>

## Resumen — cuándo usar cada hook {#resumen-cuando-usar-cada-hook}

| Hook | Para qué | Provoca re-render |
| --- | --- | --- |
| useState | Datos que cambian y que la UI debe reflejar | Sí — al llamar al setter |
| useReducer | Como useState pero con lógica compleja centralizada | Sí — al hacer dispatch |
| useRef | Referencia al DOM · Valores que no deben redibujar | No |
| useEffect | Sincronizar con sistemas externos, fetch, suscripciones | Indirectamente (si llama setState) |
| useLayoutEffect | Medir/modificar el DOM antes del paint, sin parpadeo | Indirectamente |
| useId | IDs únicos por instancia para accesibilidad | No |
| useContext | Leer datos de un Context sin prop drilling | Sí — cuando el Context cambia |
| useCallback | Memorizar una función para no recrearla en cada render | No |
| useMemo | Memorizar un valor calculado caro de computar | No |
