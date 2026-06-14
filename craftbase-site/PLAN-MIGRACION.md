# CraftBase v1 — Plan de migración a Docusaurus

> **Estado:** Fases 0–1 ✅ · Migración masiva de contenido ✅ · **Legacy intacto:** `index.html`, `style.css`, `script.js` en la raíz del repo  
> **Ubicación v1:** `craftbase-site/` (app Docusaurus independiente)

### Decisiones Fase 0 (2026-06-03)

| Tema | Decisión |
|------|----------|
| Template | **Classic** + `@docusaurus/theme-live-codeblock` (JS interactivo; bash/SQL/Docker en bloques estáticos) |
| Nombre / navbar | **CraftBase** (provisional) |
| Puerto dev v1 | **4322** (legacy sigue en **4321**) |
| Visibilidad | Infra desde día 0: frontmatter `visibility`, carpeta `private-docs/`, `build:public` vs `build:full` — **por ahora todo público** |
| Locale | `es` |

---

## Principios

1. **Cero pérdida de contenido** — todas las secciones del legacy v0 deben existir en v1 (misma información; puede cambiar la presentación).
2. **Legacy no se toca** hasta cutover explícito — `npm run dev` en la raíz sigue sirviendo v0.
3. **Organización por dominio** — sidebar jerárquica en lugar de 12 pestañas horizontales; el mapa de abajo garantiza paridad 1:1.
4. **Componentes genéricos** — pocos primitivos React (`Table`, `Filter`, `Callout`, `Badge`, `TextSizeToggle`) parametrizados por `variant` / `type`, no un componente por cada pantalla.
5. **Accesibilidad desde el scaffold** — tokens de contraste, toggle A+, auditoría MCP weAAAre en CI.

---

## Inventario legacy → v1 (sin eliminar nada)

Cada fila es obligatoria en la migración.

| Legacy (pestaña / módulo) | Ruta v1 propuesta | Formato principal |
|---------------------------|-------------------|-------------------|
| Frameworks — Por criterio | `/docs/frameworks/matriz-criterios` | MDX + `<DataTable variant="criteria" />` |
| Frameworks — Perfiles | `/docs/frameworks/perfiles` | MD |
| Frameworks — Guía rápida | `/docs/frameworks/guia-rapida` | MD |
| Diseño — DS Métricas | `/docs/diseno/metricas` | MD |
| Diseño — DS Glosario | `/docs/diseno/glosario-ds` | MDX + `<Filter variant="dsg" />` |
| Diseño — DS Herramientas | `/docs/diseno/herramientas` | MDX + `<Filter variant="dstools" />` |
| Diseño — Gestión de color | `/docs/diseno/gestion-color` | MD |
| Diseño — Accesibilidad | `/docs/diseno/accesibilidad` | MD |
| Glosario técnico | `/docs/glosario` | MDX + `<Filter variant="glossary" />` |
| VibeTips | `/docs/vibetips` | MDX + `<Filter variant="vibetips" />` + copy |
| Hosting | `/docs/hosting` | MD |
| Despliegue — DNS | `/docs/despliegue/dns` | MDX + `<DataTable variant="dns" />` |
| Despliegue — cPanel | `/docs/despliegue/cpanel` | MD |
| Despliegue — Caché | `/docs/despliegue/cache` | MD |
| Despliegue — Docker/Nginx | `/docs/despliegue/docker-nginx` | MD |
| Despliegue — Seguridad | `/docs/despliegue/seguridad` | MD |
| Despliegue — Integraciones | `/docs/despliegue/integraciones` | MD |
| Docker · Curso (todas las UDs) | `/docs/docker-curso/*` | MD / MDX (sidebar anidada) |
| Roadmap | `/docs/roadmap` | MD |
| Git & Docs | `/docs/git-docs/*` | MD + tablas |
| Astro (Watan) | `/docs/astro/*` | MD |
| React | `/docs/react/*` | MD |
| JavaScript | `/docs/javascript/*` | MD (sidebar anidada como legacy) |
| APIs & MySQL | `/docs/apis-mysql/*` | MD + tablas |

**Checklist de cierre:** antes del cutover, revisar que cada `panel-*` del HTML y cada bloque de `script.js` tenga página o componente equivalente documentado.

---

## Estructura de carpetas

```
so-aprendizaje-inma/
│
├── index.html, style.css, script.js   ← LEGACY v0 (no modificar en migración)
├── package.json                       ← dev legacy + scripts dev:v1 / build:v1
│
├── craftbase-site/                    ← Docusaurus v1
│   ├── PLAN-MIGRACION.md              ← este archivo
│   ├── package.json
│   ├── docusaurus.config.ts
│   ├── sidebars.ts
│   │
│   ├── docs/                          ← Markdown / MDX (por dominio)
│   │   ├── intro.md
│   │   ├── glosario/
│   │   ├── frameworks/
│   │   ├── diseno/
│   │   ├── despliegue/
│   │   ├── docker-curso/
│   │   ├── git-docs/
│   │   ├── apis-mysql/
│   │   ├── astro/
│   │   ├── react/
│   │   ├── javascript/
│   │   ├── hosting/
│   │   └── VISIBILITY.md              ← convención public/private
│   ├── private-docs/                  ← solo build full (`CRAFTBASE_BUILD=full`)
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CraftCallout.tsx
│   │   │   ├── CraftBadge.tsx
│   │   │   └── TextSizeToggle.tsx
│   │   ├── data/                      ← JSON extraído de script.js (fuente v1)
│   │   ├── css/custom.css             ← tokens CraftBase + Infima overrides
│   │   └── theme/                     ← Layout, navbar (toggle A+)
│   │
│   └── static/
│
├── .agents/skills/                    ← compartido (aria-patterns, a11y MCP)
└── .cursor/rules/
```

---

## Componentes genéricos (diseño)

### `DataTable`

Una sola tabla accesible; el `variant` define columnas, estilos y renderizado de celdas.

```tsx
<DataTable
  variant="dns"       // dns | criteria | http-methods | git-commands | generic
  data={dnsRecords}   // o path a JSON en src/data/
  caption="Registros DNS"
/>
```

| `variant` | Uso legacy | Particularidades |
|-----------|------------|------------------|
| `dns` | DNS_RECORDS | col. precaución, ejemplo mono |
| `criteria` | Matriz frameworks | sticky cols, iconos ★/◆ |
| `http-methods` | APIs HTTP | badges de status |
| `generic` | Resto | columnas vía props `columns[]` |

### `ContentFilter`

```tsx
<ContentFilter
  variant="glossary"   // glossary | vibetips | dsg | dstools
  data={items}
  renderItem={(item) => …}
/>
```

Categorías y colores (p. ej. ecosistema morado) vienen de config por `variant`, no hardcoded en cada página.

### `Callout`

```tsx
<Callout variant="note" accent="deploy">
  El DNS es la agenda de teléfonos de internet…
</Callout>
```

`accent` mapea a tokens `--craftbase-t-*` (deploy, git, ecosystem, …).

### `Badge`

```tsx
<Badge status="live" />   // live | wip | plan
```

### `TextSizeToggle`

Port del toggle A+ actual: `localStorage`, `html[data-text-size="large"]`, `aria-pressed`.

---

## Contenido público vs privado / oculto

Docusaurus genera **sitios estáticos**: todo lo que entra en el build acaba en HTML/JS descargable. No hay “login nativo” seguro solo con Docusaurus.

### Opciones realistas

| Enfoque | Público ve | Privado | Seguridad real |
|---------|------------|---------|----------------|
| **A. Dos builds / dos deploys** | `docs/` sin `_private/` | Build completo en URL con auth (Vercel, Netlify, Cloudflare Access) | Alta |
| **B. Variable de entorno en build** | `CRAFTBASE_PUBLIC=1` excluye carpetas `private` y frontmatter `visibility: private` | Tu deploy local/branch con flag off | Alta si el hosting privado está protegido |
| **C. `unlisted: true` + sin sidebar** | No aparece en nav/búsqueda | URL adivinable — **no es seguridad** | Baja |
| **D. Repo privado + fork público** | Subconjunto en repo público | Resto solo en repo privado | Alta |
| **E. Plugin docs i18n / multi-instance** | Plugin `publicDocs` | Segundo plugin `internalDocs` en ruta `/internal` + middleware en host | Media-alta |

**Recomendación para CraftBase:**

1. Frontmatter en cada doc: `visibility: public | private | unlisted`.
2. Script pre-build (`scripts/filter-docs.ts`) que, si `PUBLIC_BUILD=true`, **no copia** `docs/_private/**` ni docs con `visibility: private`.
3. Dos comandos:
   - `npm run build:public` → GitHub Pages / dominio abierto
   - `npm run build:full` → tu instancia con auth o localhost
4. Secciones candidatas a privado (ejemplo): notas personales, prompts internos, roadmap borrador — tú decides por archivo.

`unlisted` sirve para “no promocionar” (WIP), no para secretos.

---

## Tema, colores y tipografía

- Portar tokens de `style.css`: `--prose`, `--fs-*`, `--lh-*`, acentos `--t1`…`--tapi`.
- Infima overrides en `src/css/custom.css`.
- Categorías sidebar: `_category_.json` + CSS por slug.
- Toggle 16px / 18px igual que legacy.

---

## Coexistencia y scripts

### Raíz (`package.json` legacy — ampliar sin romper)

```json
{
  "scripts": {
    "dev": "npx --yes serve . -l 4321",
    "dev:open": "powershell -ExecutionPolicy Bypass -File scripts/dev.ps1",
    "setup": "powershell -ExecutionPolicy Bypass -File scripts/setup-node.ps1",
    "dev:v1": "npm run start --prefix craftbase-site",
    "build:v1": "npm run build --prefix craftbase-site",
    "build:v1:public": "npm run build:public --prefix craftbase-site",
    "build:v1:full": "npm run build:full --prefix craftbase-site"
  }
}
```

| Comando | Puerto / salida |
|---------|-----------------|
| `npm run dev` | Legacy → `:4321` |
| `npm run dev:v1` | Docusaurus → `:4322` |
| `npm run build:v1:public` | `craftbase-site/build` sin `private-docs/` |
| `npm run build:v1:full` | Incluye `/private/` |

### Deploy (fase tardía)

- Legacy en `/v0/` o congelado en tag git.
- v1 pública en `/`.
- v1 completa en subdominio privado (`docs.interno.tudominio`) con auth del hosting.

---

## Fases de migración

### Fase 0 — Scaffold (1–2 días) ✅

- [x] `create-docusaurus` classic + TypeScript + live codeblock en `craftbase-site/`
- [x] Theme: fuentes, `custom.css`, `TextSizeToggle`, `CraftCallout`, `CraftBadge`
- [x] `intro.mdx` + sidebar con **todas** las categorías del inventario (stubs)
- [x] Visibilidad: `VISIBILITY.md`, `private-docs/`, `build:public` / `build:full`
- [x] Scripts `dev:v1` / `build:v1*` en raíz
- [x] `.gitignore` para `craftbase-site/node_modules`, `build`
- **Criterio:** v1 arranca; legacy intacto; inventario visible en sidebar

### Fase 1 — Piloto (3–5 días) ✅

- [x] Extraer `GLOSSARY` → `src/data/glossary.json` (+ Frontmatter, Zod en glosario)
- [x] `CraftFilter variant="glossary"` + página `/docs/glosario`
- [x] Despliegue DNS: `CraftDataTable variant="dns"` + callouts + conceptos
- [x] Script `npm run extract-data` para re-sincronizar desde legacy
- [ ] Auditoría MCP contraste + legibilidad *(manual cuando MCP weAAAre esté activo)*
- **Criterio:** paridad glosario + DNS; búsqueda funcional

### Fase 2 — Docs planas (~1 semana) ✅

- [x] Git, Hosting, Roadmap, APIs (MD + tablas genéricas)
- [x] Astro, React, JavaScript (HTML legacy → MD vía `migrate-content`)
- [x] Diseño: métricas, accesibilidad (subpáginas migradas)
- [x] Índices de sección con enlaces absolutos `/docs/...`

### Fase 3 — Interactivo MDX (1–2 semanas) ✅

- [x] VibeTips (`CraftVibeTips`)
- [x] Frameworks (`CraftFrameworks`)
- [x] DS Glosario / Herramientas / Color (`CraftDsGlosario`, `CraftDsTools`, `CraftColorTips`)
- [x] Despliegue: cPanel, caché, Docker, seguridad, integraciones (`CraftDepSections`)
- [x] Docker curso (`CraftDockerCurso`)
- [x] APIs MySQL interactivas (`CraftApiMysql`)

### Fase 4 — Módulos grandes (2–3 semanas) ✅ (contenido)

- [x] Docker curso, Diseño hub, Astro, React, JavaScript
- [x] Script `npm run migrate-content` — 20 JSON + HTML → MD/MDX
- [x] `npm run build` pasa sin enlaces rotos
- [ ] Checklist inventario 100 % *(revisión manual pre-cutover)*

### Fase 5 — Pulido (siguiente)

- [ ] Colores / tema visual alineado con legacy
- [ ] Accesibilidad: contraste, APG, auditoría MCP
- [ ] `visibility` en frontmatter + `build:public` operativo
- [ ] README, CONTRIBUTING, licencia
- [ ] Deploy público + deploy privado
- [ ] Cutover opcional; legacy archivado

---

## Extracción de datos desde legacy

Orden sugerido (copiar arrays de `script.js` → JSON en `src/data/`):

1. `glossary.json`
2. `dns-records.json`
3. `vibetips.json`
4. `frameworks.json` (+ `criteria.json`)
5. Resto por módulo en Fase 2–4

No borrar `script.js` hasta verificar checklist.

---

## Accesibilidad

- Regla Cursor: ampliar `craftbase-a11y.mdc` con glob `craftbase-site/**`
- Patrones APG en `Filter` (combobox/listbox) y tabs si se usan
- CI (futuro): MCP `@weaaare/mcp-a11y-color` sobre tokens del theme

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Doble mantenimiento | Tras Fase 1, solo editar contenido nuevo en v1 |
| Pérdida de sección | Inventario + stubs día 0; checklist pre-cutover |
| “Privado” falso en estático | Dos builds; no confiar en `unlisted` para secretos |
| Scope creep en componentes | Solo 5 primitivos; variants en config |

---

## Referencias

- Legacy: `index.html`, `script.js`, `style.css`
- Skills: `.agents/skills/aria-patterns`, MCP weAAAre en `.cursor/mcp.json`
- Regla a11y: `.cursor/rules/craftbase-a11y.mdc`

---

*Última actualización: 2026-06-03 — migración masiva de contenido completada; build OK; siguiente: colores y a11y.*
