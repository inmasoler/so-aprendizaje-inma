# CraftBase (SO-aprendizaje-inma)

Base de conocimiento técnico y de diseño — HTML estático (`index.html`, `style.css`, `script.js`).

No hay Vite, Astro ni bundler: es una web estática. Aun así puedes usar **`npm run dev`** como en otros proyectos; solo sirve los ficheros con un mini-servidor local (`serve` vía npx).

## Ver la web en el navegador

**Requisito (solo la primera vez):** Node 24 local en `.tools/node/`:

```powershell
npm run setup
```

(o `powershell -ExecutionPolicy Bypass -File scripts\setup-node.ps1`)

**Opción habitual — servidor local:**

```powershell
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321). Para parar: `Ctrl+C`.

> Usa el Node del proyecto: `cmd /c "scripts\npm.cmd run dev"` si `npm` global no apunta a `.tools/node/`.

**Servidor + abrir navegador automático:**

```powershell
npm run dev:open
```

(o `powershell -ExecutionPolicy Bypass -File scripts\dev.ps1`)

### Abrir el HTML directo (sin servidor)

```powershell
start index.html
```

Válido para una vista rápida; el servidor local es preferible (caché, comportamiento más parecido a producción).

## MCPs de accesibilidad

Configurados en `.cursor/mcp.json` (`@weaaare/mcp-a11y-color`, `@weaaare/mcp-a11y-readability`).
