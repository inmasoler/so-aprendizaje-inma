# CraftBase → Docusaurus (v1)

Plan de migración paralela. **No modifica** el sitio legacy (`index.html`, `style.css`, `script.js` en la raíz).

---

## Principios

1. **Coexistencia:** legacy v0 sigue en la raíz; v1 vive en `craftbase-site/`.
2. **Paridad de contenido:** ninguna sección del legacy se elimina; solo se reubica y reformatea.
3. **Componentes genéricos:** UI reutilizable (filtro, tabla, callout, badge, toggle texto) parametrizada por `type` / props, no un componente por dominio.
4. **Accesibilidad:** portar tokens, contraste, toggle A+ y reglas de `.cursor/rules/craftbase-a11y.mdc`.
5. **Conocimiento público + privado:** soportado por estrategia de build/deploy (ver sección Acceso).

---

## Estructura del repo

```
so-aprendizaje-inma/
├── index.html, style.css, script.js   ← LEGACY v0 (intacto)
├── package.json                         ← dev legacy + scripts dev:v1 / build:v1
│
├── craftbase-site/                      ← Docusaurus v1
│   ├── MIGRATION.md                     ← este archivo
│   ├── package.json
│   ├── docusaurus.config.ts
│   ├── sidebars.ts
│   ├── docs/                            ← Markdown / MDX
│   ├── src/
│   │   ├── components/                  ← biblioteca genérica
│   │   ├── css/custom.css               ← tokens CraftBase
│   │   ├── data/                        ← JSON (extraído de script.js)
│   │   └── theme/
│   └── static/
│
├── .agents/skills/
└── .cursor/
```

### Scripts (raíz, cuando exista v1)

| Comando | Puerto | Qué sirve |
|---------|--------|-----------|
| `npm run dev` | 4321 | Legacy estático |
| `npm run dev:v1` | 4322 | Docusaurus |
| `npm run build:v1` | — | Build producción v1 |
| `npm run build:v1:public` | — | Sin `private-docs/` |
| `npm run build:v1:full` | — | Con `/private/` |

---

## Mapa legacy → v1 (sin perder secciones)

Cada pestaña / módulo del legacy tiene destino explícito en v1:

| Legacy (tab / módulo) | Ubicación v1 | Formato |
|----------------------|--------------|---------|
| Frameworks | `docs/frameworks/` | MD + MDX (`CraftTable` type=criteria, perfiles, guía) |
| Diseño (hub) | `docs/diseno/` | MD + MDX (métricas, DS glosario, tools, color, a11y) |
| Glosario técnico | `docs/glosario/` | MDX + `CraftFilter` + datos JSON |
| VibeTips | `docs/vibetips/` | MDX + `CraftFilter` + copy |
| Hosting | `docs/hosting/` | MD |
| Despliegue | `docs/despliegue/` | MD + MDX (`CraftTable` type=dns, etc.) |
| Docker · Curso | `docs/docker-curso/` | MD (sidebar anidada) |
| Roadmap | `docs/roadmap/` | MD |
| Git & Docs | `docs/git-docs/` | MD + tablas |
| Astro (Watan) | `docs/astro/` | MD |
| React | `docs/react/` | MD |
| JavaScript | `docs/javascript/` | MD |
| APIs & MySQL | `docs/apis-mysql/` | MD + tablas |

**Organización por dominio** en sidebar, pero el índice anterior garantiza **100 % paridad** con el checklist de migración por fase.

---

## Arquitectura de contenido

### `docs/`

- **`.md`:** prosa, listas, tablas simples en Markdown.
- **`.mdx`:** páginas que usan componentes genéricos + datos JSON.
- **`_category_.json`:** label, posición y color de acento por dominio en sidebar.

### `src/data/`

JSON extraído de `script.js` (copia inicial, no enlace en runtime al legacy):

```
src/data/
├── glossary.json
├── dns-records.json
├── frameworks.json          # FWS, CRITERIA, GUIDE_RULES
├── vibetips.json
├── hosting.json
├── phases.json
└── …
```

### Biblioteca de componentes genéricos (`src/components/`)

| Componente | Responsabilidad | Props clave |
|------------|-----------------|-------------|
| `CraftFilter` | Chips + búsqueda | `type: 'glossary' \| 'vibetips' \| …`, `items`, `categories`, `onFilter` |
| `CraftTable` | Tablas de datos | `type: 'dns' \| 'criteria' \| 'http-methods' \| 'git-commands' \| …`, `columns?`, `rows` o `dataRef` |
| `CraftCallout` | Notas / avisos | `variant: 'info' \| 'warn' \| 'tip'`, `accent?` (token color dominio) |
| `CraftBadge` | live / wip / plan | `status`, `label?` |
| `TextSizeToggle` | 16px ↔ 18px | `storageKey` (default `craftbase-text-size`) |

Los `type` definen columnas, estilos y comportamiento por defecto (p. ej. `CraftTable type="dns"` → columna precaución en rojo oscuro; `type="criteria"` → celdas ★/◆/·).

Extensión futura: registro central `src/components/registry.ts` que mapea `type` → schema de columnas / filtros.

### Tema (`src/css/custom.css`)

- Fuentes: Source Sans 3 (prose), Syne (títulos), JetBrains Mono (código).
- Tokens `--craftbase-*` portados del legacy.
- `html[data-text-size="large"]` para escala +2px.
- Acentos por dominio vía CSS + `_category_.json`.

---

## Acceso: partes públicas vs privadas

Docusaurus **no trae login integrado**. Opciones viables para un repo de conocimiento personal + open source:

### A. Por contenido (recomendado para empezar)

| Mecanismo | Uso |
|-----------|-----|
| `draft: true` en frontmatter | Oculto en build de producción; visible en `npm run start` dev |
| `unlisted: true` | Fuera de sidebar/búsqueda; accesible solo con URL directa |
| Carpeta `docs-private/` | Segundo plugin `@docusaurus/plugin-content-docs` con `routeBasePath: 'internal'` |

### B. Por build (contenido solo tuyo)

- Variable de entorno en CI: `CRAFTBASE_INCLUDE_PRIVATE=true`
- Script pre-build incluye/excluye carpetas o sidebar según env
- Repo público en GitHub **sin** la carpeta privada (submodule privado o repo separado)

### C. Por deploy (protección real)

- Sitio público: GitHub Pages / Vercel (docs abiertas)
- Sitio privado: mismo build desplegado en URL con **Vercel Password Protection**, **Cloudflare Access**, o **Basic Auth** en nginx
- Dos deploys: `build:public` vs `build:full` desde ramas o env distintos

### Recomendación CraftBase

1. **Fase 0–2:** todo en `docs/`; marcar borradores con `draft: true`.
2. **Fase 3+:** `docs-internal/` + plugin second instance; en OSS publicar solo `docs/`.
3. **Si necesitas auth fuerte:** deploy privado separado, no confiar solo en “security through obscurity” de URLs.

---

## Accesibilidad

- Portar toggle A+, skip link, tokens de contraste, `--prose` / `--fs-*`.
- Patrones APG en filtros y tabs (skill `aria-patterns`).
- Auditoría MCP `@weaaare/mcp-a11y-color` y `a11y-readability` sobre theme y contenido piloto.
- Regla Cursor: ampliar `craftbase-a11y.mdc` a `craftbase-site/**`.

---

## Plan por fases

### Fase 0 — Scaffold (1–2 días)

- [ ] `create-docusaurus` en `craftbase-site/`
- [ ] Fuentes + `custom.css` (tokens + toggle A+)
- [ ] `TextSizeToggle` en navbar
- [ ] `intro.md` + sidebar con **todas** las categorías (placeholders “próximamente” OK)
- [ ] Scripts raíz: `dev:v1`, `build:v1`
- **Criterio:** legacy intacto; `npm run dev:v1` funciona

### Fase 1 — Piloto (3–5 días)

- [ ] `glossary.json` + página Glosario (`CraftFilter` + listado)
- [ ] Despliegue / DNS (`CraftTable type="dns"` + `CraftCallout`)
- [ ] Checklist paridad: categorías glosario incl. **Ecosistema dev**

### Fase 2 — Docs planas (~1 semana)

- [ ] Git & Docs, Hosting, Roadmap, APIs & MySQL
- [ ] Tablas simples en MD; compuestas con `CraftTable`

### Fase 3 — Interactivo MDX (1–2 semanas)

- [ ] VibeTips (`CraftFilter type="vibetips"`, copy)
- [ ] Frameworks (`CraftTable type="criteria"`, perfiles)
- [ ] DS Tools (evaluar localStorage vs estático)

### Fase 4 — Módulos grandes (2–3 semanas)

- [ ] Docker curso, Diseño hub, Astro, React, JavaScript
- [ ] Verificar mapa legacy → v1 completo

### Fase 5 — Open source + cutover

- [ ] README, CONTRIBUTING, licencia
- [ ] Deploy público; estrategia `docs-internal/` si aplica
- [ ] Redirect o `/v0/` para legacy cuando v1 sea default

---

## Trabajo ya hecho en legacy (referencia para portar)

- Tokens tipografía `--fs-*`, `--lh-*`, `--prose`, toggle `data-text-size="large"`.
- Glosario: 37 términos, categoría Ecosistema dev (14 términos), legibilidad ~87 MCP.
- ARIA tabs principales, skip link, MCP weAAAre configurados.
- `npm run dev`, `scripts/dev.ps1`, `package.json` raíz.

---

## Decisiones pendientes antes de Fase 0

- [ ] ¿Alguna sección marcada como **privada desde el día 1** (lista para `docs-internal/`)?
- [ ] ¿Deploy objetivo? (GitHub Pages público / Vercel / solo local)
- [ ] ¿TypeScript estricto en Docusaurus? (recomendado: sí)

---

*Última actualización: plan acordado en conversación de migración. Iniciar Fase 0 solo tras confirmación explícita.*
