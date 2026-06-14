---
title: "Las 15 capas"
sidebar_position: 3
visibility: public
format: md
---

Ejemplos basados en el proyecto real · **watan-astro** · los conceptos son genéricos de Astro

<blockquote class="craft-intro craft-intro--astro">
**15 capas, 3 grupos.** Datos (qué hay), Renderizado (cómo se muestra), Soporte (cómo funciona todo junto).
</blockquote>

## Grupo A · Datos — dónde vive la información {#grupo-a-datos-donde-vive-la-informacion}

### Capa 1 · Contenido · Ficheros .md {#capa-1-contenido-ficheros-md}

<div class="craft-card craft-card--astro">
**Ruta:** `src/content/es/ · en/ · ar/`

Puro contenido en YAML (frontmatter). Un .md por página por idioma. Sin HTML ni lógica — solo datos estructurados.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para que cambiar un texto no requiera tocar código. El .md es lo único que cambia entre la versión española e inglesa de la misma página — el template es idéntico.
</blockquote>

```typescript
src/content/
  es/vacation-rental.md   ← textos en español
  en/vacation-rental.md   ← textos en inglés
  ar/vacation-rental.md   ← textos en árabe
```
</div>

### Capa 2 · Validación · Schemas .schema.ts {#capa-2-validacion-schemas-schemats}

<div class="craft-card craft-card--astro">
**Ruta:** `src/schemas/`

Contratos Zod. Cada campo del .md tiene su pareja aquí con su tipo y si es obligatorio. `z.strictObject` rechaza también los campos que no están definidos.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe porque los .md los edita gente que no es developer. Sin schema, un error tipográfico en el frontmatter llegaría a producción sin que nadie lo detecte. El schema lo atrapa en build, antes de publicar nada.
</blockquote>

```typescript
z.string()              // obligatorio — falta → error
z.string().optional()   // puede no estar en el .md
z.string().default('x') // si falta, usa 'x'
z.array(z.strictObject({ num: z.string() }))
z.coerce.number()       // convierte '42' → 42
```
</div>

### Capa 3 · Registro · content.config.ts {#capa-3-registro-contentconfigts}

<div class="craft-card craft-card--astro">
**Ruta:** `src/content.config.ts`

El índice central de todo el contenido. Le dice a Astro: "busca estos ficheros con este patrón, valídalos con este schema, y llama a esta colección con este nombre".

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para que `getEntry('vacationRentalPages', ...)` funcione desde cualquier template. Sin este registro, Astro no sabe qué ficheros existen ni cómo tratarlos. El patrón `**/vacation-rental.md` recoge los tres idiomas con una sola línea.
</blockquote>

```typescript
const vacationRentalPages = defineCollection({
  loader: glob({ pattern: '**/vacation-rental.md', base }),
  schema: vacationRentalSchema,  // ← valida con Zod
});
export const collections = { vacationRentalPages };
```
</div>

### Capa 4 · Traducciones UI · i18n/ {#capa-4-traducciones-ui-i18n}

<div class="craft-card craft-card--astro">
**Ruta:** `src/i18n/`

Textos de interfaz que son iguales en todas las páginas: items del nav, labels de botones, textos del footer. No pertenecen a ninguna página concreta.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para separar dos tipos de texto: el *contenido* (varía por página, va en .md) y la *interfaz* (igual en todas las páginas, va aquí). Sin esta capa, habría que poner "Ver más" en el frontmatter de cada .md de cada idioma — duplicación masiva.
</blockquote>

```typescript
export const nav = {
  vacation: { en: 'Vacation Rental', es: 'Alquiler vacacional', ar: '...' },
};
// La función t() devuelve el texto del locale activo:
const label = t(nav.vacation, locale); // → 'Alquiler vacacional'
```
</div>

## Grupo B · Renderizado — cómo los datos se convierten en HTML {#grupo-b-renderizado-como-los-datos-se-convierten-en-html}

### Capa 5 · Maquetación · Templates .astro {#capa-5-maquetacion-templates-astro}

<div class="craft-card craft-card--astro">
**Ruta:** `src/templates/`

El cerebro de cada página. Carga los datos del .md con `getEntry()`, los recibe ya validados y tipados por el schema, y compone los componentes visuales en el orden correcto.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para que la maquetación viva en un solo sitio. Sin templates, la página de alquiler vacacional existiría 3 veces (es/en/ar) con código idéntico. Si cambias el orden de dos secciones, lo cambias en los 3 ficheros, y puedes cometer un error en uno de ellos.
</blockquote>

```astro
const page = await getEntry('vacationRentalPages', `${locale}/vacation-rental`);
if (!page) throw new Error(`Entry no encontrada: ${locale}`);
const d = page.data; // TypeScript conoce el tipo exacto gracias al schema

// Renderizado condicional: solo si el campo existe en el .md
{d.stats && <StatsBar stats={d.stats} />}
```
</div>

### Capa 6 · URLs · Pages .astro {#capa-6-urls-pages-astro}

<div class="craft-card craft-card--astro">
**Ruta:** `src/pages/`

Cada fichero en `src/pages/` es una URL del sitio. La ruta del fichero es la URL: `pages/es/contacto.astro` → `/es/contacto`. Solo 3 líneas de código — delegan todo al template.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para separar "qué URL existe" de "cómo se ve esa URL". El template no sabe ni le importa en qué URL vive — es reutilizable. La page es el pegamento mínimo entre una URL y su template.
</blockquote>

```astro
// pages/es/vacation-rental.astro
import VacationRentalPage from '../../templates/VacationRentalPage.astro';
<VacationRentalPage locale="es" />

// pages/en/vacation-rental.astro — idéntico salvo el locale
<VacationRentalPage locale="en" />
```
</div>

### Capa 7 · Componentes · Components .astro {#capa-7-componentes-components-astro}

<div class="craft-card craft-card--astro">
**Ruta:** `src/components/`

Los "ladrillos" del HTML. Cada componente hace una cosa concreta y recibe sus datos como props. No tienen JavaScript — generan HTML estático. `<slot />` permite pasar contenido HTML arbitrario dentro.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para no repetir el mismo bloque HTML en varios templates. `HeroSection` se usa en 5 páginas distintas — si cambias el layout del hero, lo cambias en un fichero y todas las páginas se actualizan.
</blockquote>

```astro
// Definición del componente
interface Props { heading: string; sub?: string; }
const { heading, sub } = Astro.props;

// Uso desde el template (pasa datos del .md directamente)
<HeroSection heading={d.hero.heading} sub={d.hero.sub} />
```
</div>

### Capa 8 · Esqueleto · Layout BaseLayout.astro {#capa-8-esqueleto-layout-baselayoutastro}

<div class="craft-card craft-card--astro">
**Ruta:** `src/layouts/`

La envoltura que comparten todas las páginas: el `<html>`, el `<head>` con metatags SEO, el Nav y el Footer. El contenido específico de cada template entra por `<slot />`.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe para que el `<head>`, el Nav y el Footer estén definidos exactamente en un sitio. Sin layout, cada template tendría que repetir todo el esqueleto HTML — y si añades una etiqueta meta, la tienes que añadir en 10 templates a la vez.
</blockquote>

```astro
<BaseLayout title={d.meta.title} locale={locale}>
  <!-- todo lo que va aquí → entra en <slot /> del layout -->
  <HeroSection heading={d.hero.heading} />
  <StatsBar stats={d.stats} />
</BaseLayout>
```
</div>

### Capa 9 · Islands · Islands .tsx {#capa-9-islands-islands-tsx}

<div class="craft-card craft-card--astro">
**Ruta:** `src/islands/`

Componentes React para partes interactivas: acordeones, sliders, carruseles, mapas. Solo estos ficheros cargan JavaScript en el browser. El resto del sitio es HTML puro.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Astro genera HTML estático por defecto (0 KB de JS). Las islands son las "islas de interactividad" dentro de ese océano estático. Si meteras todo en React, el browser descargaría cientos de KB de JS para una web mayoritariamente de contenido. Con islands, solo los trozos que necesitan interactividad tienen JS.
</blockquote>

```astro
<FAQAccordionList items={d.faq.items} client:visible />
// client:load    → JS carga al cargar la página
// client:visible → JS carga cuando entra en pantalla ← más eficiente
// client:idle    → JS carga cuando el browser está libre
```
</div>

## Grupo C · Soporte — infraestructura que hace funcionar el resto {#grupo-c-soporte-infraestructura-que-hace-funcionar-el-resto}

### Capa 10 · Config Astro · astro.config.ts {#capa-10-config-astro-astroconfigts}

<div class="craft-card craft-card--astro">
**Ruta:** `raíz/`

El cerebro de Astro. Define los idiomas del sitio, activa las integrations (React, sitemap), y configura Vite y Tailwind. Sin este fichero, los .tsx no funcionarían y el i18n no existiría.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe porque Astro por defecto no sabe que el proyecto tiene múltiples idiomas, ni que quieres usar React en los islands, ni que usas Tailwind. Cada capacidad extra necesita estar declarada aquí. Si añades una integration y no la registras, simplemente no funciona.
</blockquote>

```typescript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'ar'],
  routing: { prefixDefaultLocale: true }, // /en/... no se omite
},
integrations: [react(), sitemap()],       // activa soporte .tsx
vite: { plugins: [tailwindcss()] }
```
</div>

### Capa 11 · Estilos · Tailwind CSS v4 + Design Tokens {#capa-11-estilos-tailwind-css-v4-design-tokens}

<div class="craft-card craft-card--astro">
**Ruta:** `src/styles/global.css`

Dos capas de variables CSS: *primitivos* (qué color es: `navy-400`) y *semánticos* (para qué sirve: `surface`, `action`). Los componentes usan siempre semánticos.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** La capa semántica existe para que cambiar la paleta de color sea editar un fichero, no buscar y reemplazar en 50 componentes. Si mañana `--color-action` pasa de verde a azul, cambias una línea en global.css y toda la web se actualiza. Si hubieras usado el primitivo directamente (`#a8c065`), tendrías que encontrar y cambiar cada instancia.
</blockquote>

```css
--color-surface: white;        // semántico ← usa esto en componentes
--color-action: #a8c065;       // semántico ← usa esto en componentes
--color-navy-400: #161f40;     // primitivo ← solo para definir semánticos

// En HTML (Tailwind v4):
<p class="text-text bg-surface">  ← correcto
<p class="text-navy-400">         ← evitar
```
</div>

### Capa 12 · Datos estáticos · src/data/ {#capa-12-datos-estaticos-srcdata}

<div class="craft-card craft-card--astro">
**Ruta:** `src/data/`

Datos estructurados que no encajan en el frontmatter de un .md. Typically: galerías de imágenes con decenas de entradas, listas de configuración, mapeos. TypeScript puro, con tipado completo.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe porque no todo dato pertenece al .md. Una galería de 30 fotos con rutas "before/after" haría el frontmatter ilegible y frágil. `src/data/` es para datos que son TypeScript, no YAML — puedes exportar funciones, hacer lógica, y los tipos son exactos sin schema.
</blockquote>

```astro
// Record<string, T[]> = objeto con claves string y valores T[]
export const successCaseGalleries: Record<string, GalleryItem[]> = {
  'numancia-sagunto': [
    { before: 'antes/01-bano.jpeg', after: 'despues/01-bano.jpeg' },
    { before: 'antes/02-salon.jpeg', after: 'despues/02-salon.jpeg' },
  ],
};
```
</div>

### Capa 13 · Utils · src/utils/ {#capa-13-utils-srcutils}

<div class="craft-card craft-card--astro">
**Ruta:** `src/utils/`

Funciones de utilidad reutilizables. No son datos, no son componentes — son lógica pura que se repite en varios sitios. `image-resolver.ts` y `success-cases.ts` son los dos utils principales.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** `resolveProjectImage` existe porque Astro no puede optimizar una imagen si le pasas el path como string. Necesita un objeto `ImageMetadata` que solo obtiene cargando el fichero en build time con `import.meta.glob`. Sin este resolvedor, las imágenes no se redimensionarían ni se convertirían a WebP.
</blockquote>

```typescript
// import.meta.glob precarga TODAS las imágenes en build time
const imageModules = import.meta.glob('/src/assets/**/*.{jpg,png}', { eager: true });

// Convierte un path string del .md → ImageMetadata que Astro puede optimizar
export function resolveProjectImage(path?: string): ImageMetadata | null {
  if (!path) return null;
  return imageModules[`/src/assets/projects/${path}`]?.default ?? null;
}
```
</div>

### Capa 14 · Rutas dinámicas · \[id\].astro + getStaticPaths {#capa-14-rutas-dinamicas-idastro-getstaticpaths}

<div class="craft-card craft-card--astro">
**Ruta:** `src/pages/es/vacation-rental/[id].astro`

Para URLs que dependen de datos: `/es/vacation-rental/airbnb-valencia`. El nombre `[id]` indica que ese segmento es variable. `getStaticPaths()` dice a Astro qué valores concretos puede tomar.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Sin rutas dinámicas, tendrías que crear un fichero `airbnb-valencia.astro`, `numancia-sagunto.astro`, etc. por cada apartamento — y si añades un caso nuevo al .md, tendrías que crear el fichero a mano. Con `[id].astro` y `getStaticPaths()`, Astro genera todas las páginas automáticamente leyendo el .md en build time.
</blockquote>

```typescript
export async function getStaticPaths() {
  const page = await getEntry('vacationRentalPages', 'es/vacation-rental');
  return (page?.data.cases ?? []).map((item) => ({
    params: { id: item.id },    // → /es/vacation-rental/airbnb-valencia
    props:  { caseItem: item }, // → disponible en Astro.props
  }));
}
const { caseItem } = Astro.props; // TypeScript lo tipea correctamente
```
</div>

### Capa 15 · API · Endpoints de servidor {#capa-15-api-endpoints-de-servidor}

<div class="craft-card craft-card--astro">
**Ruta:** `src/pages/api/`

Funciones que responden a peticiones HTTP (POST, GET...). El formulario de contacto envía datos a `/api/send-email`, que los valida y los reenvía por SMTP. Las credenciales viven en `.env`, nunca en el código.

<blockquote class="craft-aside craft-aside--why craft-aside--astro">
**Por qué:** Existe porque enviar un email desde el browser expondría las credenciales SMTP a cualquiera que inspeccione el código fuente. El endpoint corre en el servidor: recibe los datos del formulario, valida que sean correctos, y usa las variables de entorno para enviar el email sin que el browser las vea jamás.
</blockquote>

```typescript
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  if (!body.name?.trim()) // ?. = optional chaining: no falla si name es null
    return new Response(JSON.stringify({ error: 'Name required' }), { status: 400 });

  const smtpPass = import.meta.env.SMTP_PASS; // ← del .env, nunca en git
  await transporter.sendMail({ ... });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
```
</div>

## Resumen de tipos de fichero {#resumen-de-tipos-de-fichero}

| Extensión | Dónde vive | Para qué |
| --- | --- | --- |
| .md | src/content/ | Contenido: textos, datos en YAML frontmatter |
| .schema.ts | src/schemas/ | Validar la forma de los datos con Zod |
| content.config.ts | src/ | Registrar colecciones para Astro |
| .astro (layout) | src/layouts/ | Esqueleto HTML de todas las páginas |
| .astro (template) | src/templates/ | Maquetación completa de una página |
| .astro (page) | src/pages/ | Define la URL, delega al template |
| .astro (component) | src/components/ | Bloque reutilizable de UI estático |
| .tsx (island) | src/islands/ | Componente React con interactividad |
| .ts (i18n) | src/i18n/ | Traducciones de textos de interfaz fijos |
