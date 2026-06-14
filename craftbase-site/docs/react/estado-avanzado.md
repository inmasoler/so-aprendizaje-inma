---
title: "Gestión del estado"
sidebar_position: 4
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--react">
**Cuándo el estado en un componente ya no es suficiente.** Hay cuatro problemas frecuentes: estado mal estructurado, estado que necesitan varios componentes, prop drilling (pasar props 5 niveles), y lógica de actualización muy compleja. Cada uno tiene su solución.
</blockquote>

## Estructura del estado {#estructura-del-estado}

### Qué no guardar en estado {#que-no-guardar-en-estado}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Principio DRY
</p>

Si un valor se puede **calcular** a partir del estado o las props, no es estado — es estado derivado. Calcularlo en el render, no guardarlo en `useState`.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Guardar estado derivado crea duplicación y fuente de verdad ambigua: si `nombre` cambia, ¿se actualiza también `nombreCompleto`? Con la sincronización manual siempre hay un momento en que los dos están desincronizados.
</blockquote>

```tsx
// MAL — nombreCompleto es derivado, no estado propio
const [nombre, setNombre] = useState('Ana');
const [apellido, setApellido] = useState('García');
const [nombreCompleto, setNombreCompleto] = useState('Ana García'); // ← innecesario

// BIEN — se calcula en el render, siempre sincronizado
const [nombre, setNombre] = useState('Ana');
const [apellido, setApellido] = useState('García');
const nombreCompleto = `${nombre} ${apellido}`; // ← calculado, no estado

// Otros ejemplos de estado derivado (no usar useState):
const totalItems = carrito.length;          // derivado de carrito
const precioTotal = items.reduce(...);      // derivado de items
const itemsFiltrados = items.filter(...);   // derivado de items + filtro
```
</div>

### Reglas de estructura del estado {#reglas-de-estructura-del-estado}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Principio
</p>

Cinco reglas de la documentación oficial para tener un estado bien diseñado.

```tsx
// 1. Agrupa lo que siempre cambia junto
// MAL:
const [x, setX] = useState(0);
const [y, setY] = useState(0);
// BIEN:
const [pos, setPos] = useState({ x: 0, y: 0 });

// 2. Evita el estado contradictorio
// MAL: cargando=true y error="algo" al mismo tiempo → imposible en prod
// BIEN: un solo campo 'status': 'idle' | 'loading' | 'success' | 'error'

// 3. Evita duplicar datos del padre
// MAL: recibir usuario como prop y también guardarlo en estado propio
// BIEN: usar directamente la prop

// 4. Evita anidado profundo — aplana la estructura
// MAL: { pais: { ciudad: { barrio: { calle: '...' } } } }
// BIEN: { pais: 'ES', ciudad: 'Valencia', barrio: 'Ruzafa', calle: '...' }
```
</div>

### Levantar el estado al padre {#levantar-el-estado-al-padre}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Compartir estado
</p>

Cuando dos componentes hermanos necesitan compartir datos o sincronizarse, el estado sube al ancestro común más cercano. Los hijos reciben el valor y los callbacks como props.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** El flujo de datos en React es unidireccional (solo hacia abajo). Si dos hermanos comparten estado local propio, están desincronizados. La única forma de sincronizarlos es que el padre sea el propietario del estado y lo comparta hacia abajo.
</blockquote>

```tsx
// Dos paneles que se sincronizan — solo uno abierto a la vez
function Acordeon() {
  const [abierto, setAbierto] = useState(null); // ← estado en el padre

  return (
    <>
      <Panel titulo="Servicios" esActivo={abierto === 0} onToggle={() => setAbierto(0)} />
      <Panel titulo="Precios"   esActivo={abierto === 1} onToggle={() => setAbierto(1)} />
    </>
  );
}

// Panel no tiene estado propio — recibe todo del padre
function Panel({ titulo, esActivo, onToggle }) {
  return (
    <div>
      <button onClick={onToggle}>{titulo}</button>
      {esActivo && <div>Contenido...</div>}
    </div>
  );
}
```
</div>

### Context — evitar pasar props en cadena {#context-evitar-pasar-props-en-cadena}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Prop drilling
</p>

Cuando una prop tiene que pasar por 4 componentes intermedios que no la usan, Context la hace disponible en cualquier descendiente sin pasarla manualmente.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Context no es un sustituto de las props — es para datos que son genuinamente "globales" al árbol: el locale activo, el usuario autenticado, el tema visual. Para datos que solo comparten 2-3 componentes cercanos, levanta el estado y pasa props normales.
</blockquote>

```tsx
// 1. Crear el contexto
const LocaleContext = createContext('es');

// 2. Proveedor — envuelve el árbol donde quieres que esté disponible
function App() {
  const [locale, setLocale] = useState('es');
  return (
    <LocaleContext.Provider value={locale}>
      <Pagina />   {/* Pagina → Seccion → Componente → ... */}
    </LocaleContext.Provider>
  );
}

// 3. Consumir en cualquier descendiente (sin pasar props)
function BotonIdioma() {
  const locale = useContext(LocaleContext);
  return <span>Idioma: {locale}</span>;
}
```
</div>

### Lógica compleja {#logica-compleja}

#### useReducer — consolidar actualizaciones {#usereducer-consolidar-actualizaciones}

<div class="craft-card craft-card--react">
Sustituye a `useState` cuando la lógica de actualización es compleja: múltiples sub-valores relacionados, actualizaciones que dependen del estado anterior, lógica repartida en muchos handlers.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Con useState, si tienes 5 acciones distintas que modifican el mismo estado, la lógica queda dispersa en 5 handlers. Con useReducer, toda la lógica vive en una función pura (`reducer`) que es fácil de testear, leer y compartir.
</blockquote>

```tsx
// El reducer — función pura: (estadoActual, acción) → nuevoEstado
function reducer(state, action) {
  switch (action.type) {
    case 'añadir':   return [...state, action.item];
    case 'eliminar': return state.filter(i => i.id !== action.id);
    case 'limpiar':  return [];
    default: throw new Error(`Acción desconocida: ${action.type}`);
  }
}

function Lista() {
  const [items, dispatch] = useReducer(reducer, []);

  return (
    <>
      <button onClick={() => dispatch({ type: 'añadir', item: nuevoItem })}>
        Añadir
      </button>
      <button onClick={() => dispatch({ type: 'limpiar' })}>
        Limpiar todo
      </button>
    </>
  );
}
```
</div>

## Cuándo usar cada herramienta {#cuando-usar-cada-herramienta}

| Herramienta | Cuándo | No usar cuando |
| --- | --- | --- |
| useState | Estado simple e independiente de un componente. La mayoría de casos. | La lógica de actualización es muy compleja o hay muchas acciones. |
| useReducer | Estado con múltiples sub-valores relacionados. Muchas acciones distintas. Necesitas testear la lógica por separado. | Estado simple con 1-2 valores. No añade valor frente a useState. |
| Levantar estado | Dos componentes hermanos necesitan los mismos datos o sincronizarse. | Están muy lejos en el árbol — crear prop drilling de 5+ niveles. |
| Context | Datos globales al árbol: locale, usuario autenticado, tema. | Datos que solo necesitan 2-3 componentes cercanos — usa props normales. |
