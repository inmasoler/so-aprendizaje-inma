---
title: "Flujo completo"
sidebar_position: 2
visibility: public
format: md
---

Ejemplos basados en el proyecto real · **watan-astro** · los conceptos son genéricos de Astro

<blockquote class="craft-intro craft-intro--astro">
**El flujo de datos va siempre en una dirección:** los ficheros `.md` son la fuente de verdad, los schemas los validan, y los templates los renderizan. Nunca al revés.
</blockquote>

```text
Usuario visita /es/vacation-rental
        ↓
pages/es/vacation-rental.astro          ← define la URL, pasa locale="es"
        ↓
templates/VacationRentalPage.astro      ← maquetación completa, carga datos
        ↓ getEntry('vacationRentalPages', 'es/vacation-rental')
        ↓ Astro valida con vacationRentalSchema ← schemas/vacation-rental.schema.ts
        ↓ datos vienen de ← content/es/vacation-rental.md
        ↓
Monta HTML con components/ dentro de layouts/BaseLayout.astro
        ↓
Genera HTML estático (+ islands React donde hay interactividad)
```

## Los tres pilares {#los-tres-pilares}

### Pilar 1 · Contenido · los .md {#pilar-1-contenido-los-md}

<div class="craft-card craft-card--astro">
**Ruta:** `src/content/es/ · en/ · ar/`

La fuente de verdad del sitio. Todo texto visible —títulos, estadísticas, listas, testimonios— vive aquí en YAML estructurado, separado completamente del código.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Sin esta separación, los textos estarían dentro del HTML del template. Cambiar "75% de ocupación" requeriría abrir código y hacer un deploy. Con .md, lo edita cualquier persona que sepa escribir — sin abrir el editor, sin tocar TypeScript.
</blockquote>

```yaml
---
meta:
  title: 'Gestión de Alquiler Vacacional'
hero:
  heading: 'Máxima rentabilidad'
stats:
  - num: '75%'
    label: 'ocupación media anual'
---
```
</div>

### Pilar 2 · Validación · los schemas Zod {#pilar-2-validacion-los-schemas-zod}

<div class="craft-card craft-card--astro">
**Ruta:** `src/schemas/`

El contrato entre el .md y el template. Define exactamente qué campos existen, de qué tipo son, y si son obligatorios u opcionales. Astro valida en build —nunca en producción.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Sin schema, escribir "ttle" en vez de "title" en el .md generaría silenciosamente una página rota que llegaría a los usuarios. `z.strictObject` lo detecta en tu terminal. También evita el caso inverso: si el template espera `d.hero.heading` y ese campo no existe en el schema, TypeScript te avisa antes de compilar.
</blockquote>

```typescript
export const vacationRentalSchema = z.strictObject({
  meta: metaSchema,          // obligatorio — falta → error en build
  hero: heroSchema,          // obligatorio
  stats: z.array(
    z.strictObject({
      num: z.string(),
      label: z.string(),
    })
  ).optional(),              // puede no existir en el .md
});
```
</div>

### Pilar 3 · Renderizado · templates + pages {#pilar-3-renderizado-templates-pages}

<div class="craft-card craft-card--astro">
**Ruta:** `src/templates/ · src/pages/`

Los templates transforman datos en HTML: cargan el .md correcto según el locale, validan que exista, y componen los componentes visuales. Las pages son solo el mapeado URL → template.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Sin templates, tendrías 3 copias idénticas de toda la maquetación (una por idioma). Si cambias la sección hero, la cambias en 3 sitios a la vez, y puedes desincronizarlos. El template rompe ese patrón: hay exactamente un sitio donde vive el layout de cada página.
</blockquote>

```astro
// pages/es/vacation-rental.astro — solo 3 líneas
import VacationRentalPage from '../../templates/...';
<VacationRentalPage locale="es" />

// template — carga el .md del idioma correcto
const page = await getEntry('vacationRentalPages', `${locale}/vacation-rental`);
const d = page.data;  // TypeScript ya sabe el tipo exacto de d
```
</div>

## Por qué esta separación {#por-que-esta-separacion}

| Separación | Beneficio |
| --- | --- |
| Contenido en .md | No-desarrolladores pueden editar textos sin tocar código |
| Schemas en .ts | Errores detectados antes de publicar, no en producción |
| Templates separados de pages | Un template sirve para 3 idiomas — no se duplica código |
| Islands solo donde hay interactividad | La web es rápida porque manda poco JavaScript |
| Schemas shared | `metaSchema` y `heroSchema` definidos una vez, usados en todos los schemas |

## Reglas YAML que más usarás {#reglas-yaml-que-mas-usaras}

<blockquote class="craft-intro craft-intro--astro">
YAML solo acepta espacios, no tabs. Los strings con `:` o `#` necesitan comillas simples.
</blockquote>

```text
titulo: 'Mi título'          # string — con comillas si tiene : o #
precio: 42                   # número — sin comillas
visible: true                # booleano

hero:                        # objeto — campos indentados 2 espacios
  heading: 'Hola'
  sub: 'Descripción'

amenidades:                  # array de strings
  - 'Wifi'
  - 'Parking'

stats:                       # array de objetos — guión en primer campo de cada item
  - num: '75%'
    label: 'ocupación media'
  - num: '4.8★'
    label: 'valoración'
```
