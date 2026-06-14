---
title: "Pensar en React"
sidebar_position: 6
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--react">
**El método oficial de la documentación de React para atacar cualquier UI nueva.** 5 pasos en orden. La clave: construir primero sin estado, añadir estado solo al final.
</blockquote>

## Los 5 pasos {#los-5-pasos}

<ol class="rt-step-list craft-steps craft-steps--react">
<li class="rt-step craft-step">
#### Separa la UI en una jerarquía de componentes

Dibuja cajas en el boceto. Cada caja que hace una sola cosa es un componente candidato (principio de responsabilidad única). Si un componente crece demasiado, se divide. El resultado es una jerarquía en árbol.

```tsx
// Ejemplo: buscador de apartamentos
App
├── BarraBusqueda       ← input de texto + checkbox
└── TablaApartamentos  ← tabla con datos filtrados
    ├── FilaCategoria  ← fila de encabezado (Playas, Centros...)
    └── FilaApartamento ← una fila por apartamento
```
</li>

<li class="rt-step craft-step">
#### Construye una versión estática primero

Implementa los componentes con props y datos fijos — **sin useState, sin eventos**. Solo renderizado. Esto requiere escribir mucho código pero pensar poco (sin interactividad aún). El estado se añade en el paso 3.

```tsx
// Versión estática — datos hardcodeados, sin estado
function App() {
  return <TablaApartamentos apartamentos={DATOS_EJEMPLO} />;
}

function TablaApartamentos({ apartamentos }) {
  return (
    <table>
      {apartamentos.map(apt => (
        <FilaApartamento key={apt.id} apt={apt} />
      ))}
    </table>
  );
}
// Sin useState. Sin onClick. Solo JSX y props.
```
</li>

<li class="rt-step craft-step">
#### Identifica el estado mínimo necesario

Pregúntate por cada dato: ¿se puede calcular a partir de otra cosa? → no es estado. ¿Es siempre igual (constante)? → no es estado. ¿Viene de un padre como prop? → no es estado. Lo que queda es el estado real.

```tsx
// Datos del ejemplo:
// - Lista de apartamentos     → prop (viene del padre) — NO es estado
// - Texto de búsqueda         → cambia, no se calcula → SÍ es estado
// - Checkbox "solo disponibles" → cambia, no se calcula → SÍ es estado
// - Lista filtrada             → se calcula de las dos anteriores → NO es estado

const [textoBusqueda, setTextoBusqueda] = useState('');
const [soloDisponibles, setSoloDisponibles] = useState(false);

// Derivado — se calcula en render, no es estado
const aptsFiltrados = apartamentos
  .filter(a => !soloDisponibles || a.disponible)
  .filter(a => a.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()));
```
</li>

<li class="rt-step craft-step">
#### Decide dónde vive cada estado

Para cada estado: ¿qué componentes lo necesitan? Sube hasta el ancestro común más cercano. Si no existe un componente apropiado, crea uno nuevo solo para contener ese estado.

```tsx
// textoBusqueda y soloDisponibles los necesitan:
// - BarraBusqueda (para mostrar el valor actual del input)
// - TablaApartamentos (para filtrar)
//
// Ancestro común: App → el estado vive en App

function App() {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  return (
    <>
      <BarraBusqueda texto={textoBusqueda} soloDisp={soloDisponibles} />
      <TablaApartamentos texto={textoBusqueda} soloDisp={soloDisponibles} />
    </>
  );
}
```
</li>

<li class="rt-step craft-step">
#### Añade el flujo de datos inverso

Los hijos no pueden modificar el estado del padre directamente. El padre les pasa callbacks como props. El hijo llama al callback cuando el usuario interactúa — el estado cambia en el padre y baja de nuevo al hijo.

```tsx
// El padre pasa los setters como callbacks
function App() {
  const [texto, setTexto] = useState('');
  const [soloDisp, setSoloDisp] = useState(false);

  return (
    <>
      <BarraBusqueda
        texto={texto}
        soloDisp={soloDisp}
        onTexto={setTexto}        // ← callback hacia arriba
        onSoloDisp={setSoloDisp}  // ← callback hacia arriba
      />
      <TablaApartamentos texto={texto} soloDisp={soloDisp} />
    </>
  );
}

// El hijo llama al callback — no modifica estado directamente
function BarraBusqueda({ texto, soloDisp, onTexto, onSoloDisp }) {
  return (
    <>
      <input value={texto} onChange={e => onTexto(e.target.value)} />
      <input type="checkbox" checked={soloDisp} onChange={e => onSoloDisp(e.target.checked)} />
    </>
  );
}
```
</li>
</ol>

## Resumen del flujo completo {#resumen-del-flujo-completo}

| Paso | Qué haces | Sin estado todavía |
| --- | --- | --- |
| 1 · Jerarquía | Dibuja cajas en el boceto, nombra los componentes | Sí |
| 2 · Estático | Implementa con props y datos fijos, sin eventos | Sí |
| 3 · Estado mínimo | Identifica qué cambia que NO es calculable ni prop | No (primer useState) |
| 4 · Dónde vive | Sube el estado hasta el ancestro común que lo necesite | No |
| 5 · Flujo inverso | Pasa callbacks de padre a hijo, hijo los llama | No |

<blockquote class="craft-intro craft-intro--react">
**La trampa más común:** añadir estado demasiado pronto. Los pasos 1 y 2 son estáticos a propósito. Entender primero la estructura de componentes y el flujo de datos hace que decidir el estado en el paso 3 sea obvio.
</blockquote>
