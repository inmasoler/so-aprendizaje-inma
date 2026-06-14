---
title: "Fundamentos"
sidebar_position: 2
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--react">
**La UI en React es un árbol de componentes.** Cada componente es una función JS que devuelve JSX. Los datos fluyen de padre a hijo mediante props. Nada más — el resto es consecuencia de este modelo.
</blockquote>

## Componentes {#componentes}

### ¿Qué es un componente? {#que-es-un-componente}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Concepto base
</p>

Una función JavaScript que empieza en **PascalCase** y devuelve JSX. React la convierte en un elemento de la UI reutilizable, anidable y que puede recibir datos.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** La mayúscula no es convención — es obligatoria. React usa eso para distinguir componentes (`<Boton>`) de tags HTML nativos (`<button>`). Un componente en minúscula se trata como HTML y no funciona.
</blockquote>

```tsx
// Componente correcto — PascalCase, devuelve JSX
export default function Tarjeta() {
  return <div className="tarjeta">Hola</div>;
}

// Reutilizable: úsalo tantas veces como quieras
<Tarjeta />
<Tarjeta />
<Tarjeta />
```

<blockquote class="craft-aside craft-aside--tip craft-aside--react">
**Tip:** Un componente solo puede devolver UN elemento raíz. Si necesitas devolver varios, envuélvelos en `<>...</>` (Fragment) — no añade nodos al DOM.
</blockquote>
</div>

### JSX {#jsx}

#### JSX no es HTML {#jsx-no-es-html}

<div class="craft-card craft-card--react">
JSX parece HTML pero es JavaScript disfrazado. El compilador lo transforma en `React.createElement()`. Por eso sigue las reglas de JS, no de HTML.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Dado que JSX es JS, las palabras reservadas de JS (`class`, `for`) están prohibidas como atributos — de ahí `className` y `htmlFor`. Todos los tags deben cerrarse porque JS no tiene HTML implícito.
</blockquote>

```tsx
// HTML              → JSX
class="btn"          → className="btn"
for="campo"          → htmlFor="campo"
<br>                 → <br />
<img src="x.png">   → <img src="x.png" />
<!-- comentario --> → {/* comentario */}
onclick="fn()"       → onClick={fn}
style="color:red"    → style={{ color: 'red' }}

// Expresiones JS dentro de JSX — con llaves {}
<h1>{titulo}</h1>
<img src={usuario.foto} alt={usuario.nombre} />
<div className={activo ? 'btn-on' : 'btn-off'}>
```
</div>

### Props {#props}

#### Props — datos de padre a hijo {#props-datos-de-padre-a-hijo}

<div class="craft-card craft-card--react">
Las props son los "argumentos" de un componente. Fluyen siempre de padre a hijo (**unidireccional**). Dentro del componente son de solo lectura — nunca se modifican.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Las props hacen los componentes reutilizables con datos diferentes. Sin props, `<Tarjeta>` siempre mostraría lo mismo. Con props, `<Tarjeta titulo="Airbnb" precio="500€" />` lo hace configurable. Cualquier intento de modificar una prop dentro del componente es un bug.
</blockquote>

```tsx
// Definición — desestructuración + tipos + valor por defecto
function Tarjeta({ titulo, precio = 'Consultar', destacada = false }: {
  titulo: string;
  precio?: string;
  destacada?: boolean;
}) {
  return <div className={destacada ? 'card card--top' : 'card'}>
    <h3>{titulo}</h3>
    <p>{precio}</p>
  </div>;
}

// Uso desde el padre
<Tarjeta titulo="Airbnb Valencia" precio="500€" destacada />
```
</div>

### Props especiales {#props-especiales}

#### La prop children {#la-prop-children}

<div class="craft-card craft-card--react">
`children` es la prop especial que recibe el contenido HTML que el padre pone entre las etiquetas del componente. Sirve para componentes "contenedor" que no saben qué tendrán dentro.

```tsx
// Componente contenedor genérico
function Panel({ titulo, children }: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel">
      <h2>{titulo}</h2>
      <div className="panel-body">
        {children}  {/* ← aquí entra lo que el padre ponga */}
      </div>
    </div>
  );
}

// Uso — lo que está entre las etiquetas va a children
<Panel titulo="Resultados">
  <p>3 apartamentos encontrados</p>
  <ListaApartamentos />
</Panel>
```
</div>

### Pureza {#pureza}

#### Componente puro {#componente-puro}

<div class="craft-card craft-card--react">
Con las mismas props, siempre devuelve el mismo JSX. No modifica nada fuera de la función durante el render (sin efectos secundarios).

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** React puede re-renderizar un componente cuando quiera y tantas veces como quiera. Si el render tiene efectos secundarios (modificar variables externas, llamar APIs, leer la hora), el resultado será impredecible. En Strict Mode, React renderiza dos veces a propósito para detectar impurezas.
</blockquote>

```tsx
// MAL — efecto secundario en render
let visitas = 0;
function Impuro() {
  visitas++;          // ← modifica algo externo durante render
  return <p>Visitas: {visitas}</p>;
}

// BIEN — solo depende de sus props
function Puro({ nombre }: { nombre: string }) {
  const saludo = `Hola, ${nombre}`;   // ← calculado a partir de props
  return <p>{saludo}</p>;           // mismas props → mismo JSX
}
```
</div>

### Renderizado condicional {#renderizado-condicional}

#### Mostrar u ocultar elementos {#mostrar-u-ocultar-elementos}

<div class="craft-card craft-card--react">
En JSX no hay `if` directo — pero hay tres patrones equivalentes. Cada uno tiene su caso de uso.

```tsx
// 1. && — cuando solo hay un caso (mostrar o nada)
{tieneFotos && <Galeria fotos={fotos} />}

// ⚠ cuidado con 0: {count && <X />} pinta "0" si count=0
// Solución: {count > 0 && <X />}

// 2. Ternario — cuando hay dos casos (esto o aquello)
{cargando ? <Spinner /> : <Contenido />}
<button className={activo ? 'btn-on' : 'btn-off'}>

// 3. Variable precomputada — condición compleja
let contenido;
if (cargando) contenido = <Spinner />;
else if (error) contenido = <Error msg={error} />;
else contenido = <Contenido datos={datos} />;
return <div>{contenido}</div>;
```
</div>

### Listas {#listas}

#### Renderizar arrays con .map() {#renderizar-arrays-con-map}

<div class="craft-card craft-card--react">
Para renderizar una lista de elementos, transforma el array en JSX con `.map()`. Cada elemento necesita una prop `key` única y estable.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** `key` permite a React identificar qué elemento cambió, se añadió o se eliminó sin re-renderizar toda la lista. Sin `key` funciona, pero lento y con bugs en animaciones. Con el índice funciona si el orden nunca cambia — si puede cambiar (filtros, reordenación), usa el ID del dato.
</blockquote>

```tsx
// Correcto — key es el ID del dato (estable y único)
{apartamentos.map((apt) => (
  <Tarjeta key={apt.id} titulo={apt.titulo} precio={apt.precio} />
))}

// Aceptable solo si el orden NUNCA cambia
{items.map((item, i) => <li key={i}>{item}</li>)}

// Filtrar + mapear
{apartamentos
  .filter(apt => apt.disponible)
  .map(apt => <Tarjeta key={apt.id} {...apt} />)}
```

<blockquote class="craft-aside craft-aside--tip craft-aside--react">
**Tip:** Nunca uses Math.random() como key — cambia en cada render y React re-monta el componente entero cada vez.
</blockquote>
</div>
