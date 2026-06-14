---
title: "Estado y eventos"
sidebar_position: 3
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--react">
**El estado es la memoria privada de un componente.** Cuando cambia, React vuelve a ejecutar la función del componente (re-render) y actualiza el DOM con el nuevo resultado. Es el único mecanismo legítimo para cambiar la UI en respuesta a acciones del usuario.
</blockquote>

## useState — la base {#usestate-la-base}

### useState {#usestate}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Hook fundamental
</p>

Devuelve un array de dos elementos: el valor actual y una función para actualizarlo (setter). Llama al setter → React re-renderiza el componente con el nuevo valor.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Las variables normales no funcionan para la UI porque cuando las cambias React no se entera y no redibuja nada. El setter de useState le avisa a React: "este componente tiene datos nuevos, vuelve a renderizarlo".
</blockquote>

```tsx
import { useState } from 'react';

function Contador() {
  const [cuenta, setCuenta] = useState(0);
  //     ↑ valor  ↑ setter    ↑ valor inicial

  return (
    <div>
      <p>Clicks: {cuenta}</p>
      <button onClick={() => setCuenta(cuenta + 1)}>
        +1
      </button>
    </div>
  );
}

// MAL — React no se entera, no redibuja
let cuenta = 0;
cuenta++;           // ← invisible para React

// BIEN — React redibuja con el nuevo valor
setCuenta(cuenta + 1);
```
</div>

### El estado como instantánea {#el-estado-como-instantanea}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Concepto clave
</p>

El estado no es una variable que cambia — es una **fotografía** del valor en el momento del render. Cada render tiene su propia copia fija del estado.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Este es el concepto más contraintuitivo de React. Cuando llamas a `setCuenta(cuenta + 1)` tres veces en el mismo handler, las tres lecturas de `cuenta` son el mismo valor (el de este render). No acumulas +3, acumulas +1.
</blockquote>

```tsx
// Ejemplo — cuenta empieza en 0
function handler() {
  setCuenta(cuenta + 1); // programa: "pon el estado a 0+1 = 1"
  setCuenta(cuenta + 1); // programa: "pon el estado a 0+1 = 1"
  setCuenta(cuenta + 1); // programa: "pon el estado a 0+1 = 1"
  // Resultado: cuenta = 1, no 3
  // 'cuenta' es siempre 0 durante todo este render
}
```

<blockquote class="craft-aside craft-aside--tip craft-aside--react">
**Tip:** Para acumular múltiples cambios, usa la forma de función: `setCuenta(prev => prev + 1)` — ve la sección siguiente.
</blockquote>
</div>

### La forma prev => {#la-forma-prev}

<div class="craft-card craft-card--react">
<p class="craft-card-label">
Actualizaciones en cola
</p>

Cuando el nuevo estado depende del estado anterior, pasa una función al setter. React la llama con el valor más reciente, no con el del render actual.

```tsx
// Con función — acumula correctamente
function handler() {
  setCuenta(prev => prev + 1); // prev=0 → 1
  setCuenta(prev => prev + 1); // prev=1 → 2
  setCuenta(prev => prev + 1); // prev=2 → 3
  // Resultado: cuenta = 3 ✓
}

// Regla práctica:
// · El nuevo valor no depende del anterior → setCuenta(5)
// · El nuevo valor SÍ depende del anterior → setCuenta(prev => prev + 1)
// · Modificar objetos/arrays               → setCuenta(prev => ({ ...prev, campo: nuevo }))

// Ejemplo real — toggle
setExpandido(prev => !prev);

// Ejemplo real — añadir a array
setItems(prev => [...prev, nuevoItem]);
```
</div>

### Estado con objetos {#estado-con-objetos}

#### Actualizar objetos — spread {#actualizar-objetos-spread}

<div class="craft-card craft-card--react">
El estado en React es inmutable. Para cambiar un campo de un objeto, crea un objeto nuevo con todos los campos del anterior más el campo modificado. Usa el spread operator.

<blockquote class="craft-aside craft-aside--why craft-aside--react">
**Por qué:** Si mutas el objeto directamente (`usuario.nombre = 'Ana'`), React compara la referencia del objeto — y es la misma que antes, así que decide que no hay cambios y no redibuja. Siempre crea un objeto nuevo.
</blockquote>

```tsx
const [usuario, setUsuario] = useState({ nombre: 'Ana', edad: 25, ciudad: 'Valencia' });

// MAL — muta el objeto existente, React no redibuja
usuario.edad = 26;
setUsuario(usuario);

// BIEN — crea un objeto nuevo con spread
setUsuario({ ...usuario, edad: 26 });
//          ↑ copia todos los campos, luego sobreescribe solo 'edad'

// Con objeto anidado — hay que hacer spread en cada nivel
const [form, setForm] = useState({ nombre: 'Ana', direccion: { ciudad: 'Valencia', cp: '46001' } });
setForm({ ...form, direccion: { ...form.direccion, ciudad: 'Madrid' } });
```
</div>

### Estado con arrays {#estado-con-arrays}

#### Actualizar arrays — sin mutar {#actualizar-arrays-sin-mutar}

<div class="craft-card craft-card--react">
Igual que con objetos: nunca mutaciones directas. Los métodos de array se dividen en permitidos (crean array nuevo) y prohibidos (mutan el original).

```tsx
const [items, setItems] = useState(['Wifi', 'Parking', 'Piscina']);

// ✓ PERMITIDOS — crean array nuevo
setItems([...items, 'Gym']);               // añadir al final
setItems(['Nuevo', ...items]);             // añadir al principio
setItems(items.filter(i => i !== 'Parking')); // eliminar
setItems(items.map(i => i === 'Wifi' ? 'WiFi 6' : i)); // editar
setItems([...items].sort());              // sort (sobre copia)

// ✗ PROHIBIDOS — mutan el array original
items.push('Gym');          // ← React no redibuja
items.splice(1, 1);         // ← React no redibuja
items.sort();               // ← muta in-place
items.reverse();            // ← muta in-place
```

<blockquote class="craft-aside craft-aside--tip craft-aside--react">
**Tip:** Si el código de actualización se vuelve muy verboso con objetos anidados, considera la librería **Immer** — permite escribir mutaciones que internamente crea objetos nuevos.
</blockquote>
</div>

### Eventos {#eventos}

#### Manejadores de eventos {#manejadores-de-eventos}

<div class="craft-card craft-card--react">
Los eventos se pasan como props en camelCase. La diferencia clave: `onClick={fn}` pasa la función; `onClick={fn()}` la ejecuta durante el render — bug clásico.

```tsx
// onClick — click
<button onClick={() => setCuenta(cuenta + 1)}>+1</button>

// onClick con argumento
<button onClick={() => eliminar(item.id)}>Borrar</button>

// onChange — input (e.target.value = texto escrito)
<input onChange={(e) => setTexto(e.target.value)} value={texto} />

// onSubmit — formulario (siempre preventDefault)
<form onSubmit={(e) => {
  e.preventDefault();   // evita recarga de página
  enviar(texto);
}}>

// Pasar el manejador como prop (event handlers como props)
function Boton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
<Boton onClick={() => setCuenta(0)}>Reset</Boton>
```
</div>
