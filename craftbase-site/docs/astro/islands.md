---
title: "React · Islands"
sidebar_position: 4
visibility: public
format: md
---

Ejemplos basados en el proyecto real · **watan-astro** · los conceptos son genéricos de Astro

<blockquote class="craft-intro craft-intro--astro">
**React solo vive en `src/islands/*.tsx`** — los componentes que necesitan responder a acciones del usuario. Todo lo demás es Astro puro (HTML estático, sin React).
</blockquote>

## JSX vs HTML — diferencias {#jsx-vs-html-diferencias}

HTML normal

class="tarjeta"className="tarjeta"

for="campo"htmlFor="campo"

<br><br />

<!-- comentario -->{/\* comentario \*/}

onclick="fn()"onClick={fn}

style="color: red"style={{ color: 'red' }}

Expresiones en JSX

{variable}inserta el valor

{cond && <X />}renderiza X solo si cond es truthy

{a ? <X/> : <Y/>}ternario (uno u otro)

{arr.map(...)}itera y renderiza lista

## Hooks — cuándo usar cada uno {#hooks-cuando-usar-cada-uno}

useState

Cuando necesitas datos que cambian y que React redibuje al cambiar. Siempre usa el setter, nunca modifiques la variable directamente.

```astro
const [expanded, setExpanded] = useState<Record<number, boolean>>({});
//     ↑ valor actual  ↑ setter para cambiarlo  ↑ valor inicial

// Al hacer click en el FAQ número i — forma de función para estado que depende de estado anterior
onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
//                                    ↑ spread: copia todos los demás, cambia solo [i]

// MAL — React no redibuja
expanded[i] = true;
// BIEN — React redibuja
setExpanded(prev => ({ ...prev, [i]: true }));
```

useRef

Cuando necesitas acceso directo a un elemento del DOM (medir su altura, hacer .focus(), etc.) sin que el componente se redibuje.

```astro
// Un ref por cada respuesta de FAQ — para animar la altura
const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

// Se conecta al elemento real del DOM
<div ref={(el) => { answerRefs.current[i] = el; }}>

// Luego en useLayoutEffect se mide y anima:
const el = answerRefs.current[i];
el.style.maxHeight = expanded[i] ? `${el.scrollHeight}px` : '0';
//                                   ↑ scrollHeight = altura real aunque esté oculto
```

useLayoutEffect

Como useEffect pero **síncrono** — corre antes de que el navegador pinte. Úsalo cuando necesitas medir o modificar el DOM sin que el usuario vea un parpadeo.

```typescript
useLayoutEffect(() => {
  items.forEach((_, i) => {
    const el = answerRefs.current[i];
    if (!el) return;
    // Cambia maxHeight ANTES de que el navegador pinte → sin parpadeo
    el.style.maxHeight = expanded[i] ? `${el.scrollHeight}px` : '0';
  });
}, [expanded, items]);  // ← array de dependencias: re-ejecuta cuando cambian
```

useEffect

Efectos **después** del paint: fetch de datos, suscripciones a eventos, inicializar librerías externas (como Leaflet) que necesitan el DOM real.

```typescript
useEffect(() => {
  // Aquí el DOM ya existe — Leaflet puede inicializarse
  const map = L.map(mapRef.current).setView([39.47, -0.37], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Función de limpieza — corre al desmontar el componente
  return () => { map.remove(); };
}, []);  // [] vacío → solo corre una vez al montar
```

useId

Genera un ID único y estable por instancia. Necesario para atributos `aria-controls` / `id` de accesibilidad — evita colisiones si hay dos FAQs en la misma página.

```astro
const uid = useId().replace(/:/g, '');  // uid → 'r0' (único por instancia)

<button aria-controls={`${uid}-answer-${i}`} aria-expanded={expanded[i] ? 'true' : 'false'}>
  {item.q}
</button>
<div id={`${uid}-answer-${i}`}>{item.a}</div>
```

## Cuándo usar isla vs componente .astro {#cuando-usar-isla-vs-componente-astro}

| ¿Qué necesitas? | Usa |
| --- | --- |
| Reaccionar a clicks, inputs, cambios del usuario | Island .tsx con useState / useRef |
| Medir el DOM y animar antes de que el usuario lo vea | Island .tsx con useLayoutEffect + useRef |
| Inicializar una librería externa (Leaflet, charts) | Island .tsx con useEffect |
| HTML que no cambia — texto, imagen, layout | Componente .astro (sin JS) |

## Islands de este proyecto {#islands-de-este-proyecto}

| Fichero | Hook principal | Para qué |
| --- | --- | --- |
| FAQAccordionList.tsx | useState + useLayoutEffect + useRef + useId | Acordeón de preguntas con animación de altura |
| BeforeAfterSlider.tsx | useState + useRef | Slider de comparación antes/después |
| SuccessCaseCarousel.tsx | useState | Carrusel de casos de éxito con filtros |
| ProgressStepper.tsx | useState | Stepper de pasos con navegación |
| ZoneMapIsland.tsx | useEffect + useRef | Mapa interactivo con Leaflet — init tras render |

## Manejadores de eventos — patrón importante {#manejadores-de-eventos-patron-importante}

<blockquote class="craft-intro craft-intro--astro">
**Diferencia clave:** `onClick={fn}` pasa la función; `onClick={fn()}` la ejecuta ahora (en el render). Siempre usa arrow function: `onClick={() => setCuenta(n + 1)}`
</blockquote>

```text
// Click
<button onClick={() => setCuenta(cuenta + 1)}>Click</button>

// Input — e.target.value es el texto que escribió el usuario
<input onChange={(e) => setTexto(e.target.value)} />

// Submit — evitar recarga de página
<form onSubmit={(e) => { e.preventDefault(); enviarFormulario(); }}>

// Hover
<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
```
