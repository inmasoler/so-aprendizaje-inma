# Visibilidad del contenido

CraftBase v1 prepara **contenido público y privado** desde el inicio. Por ahora todo es visible.

## Frontmatter

En cualquier doc:

```yaml
visibility: public   # default — incluido en build público
visibility: private  # reservado para builds full (convención futura)
```

## Carpeta `private-docs/`

Contenido solo para build **full**. Vive fuera de `docs/` para evitar conflictos con el plugin principal. Se publica bajo `/private/` cuando `CRAFTBASE_BUILD=full`.

## Builds

| Comando | Qué incluye |
|---------|-------------|
| `npm run build:public` | Solo `docs/` (sin `_private`) |
| `npm run build:full` | `docs/` + `docs/_private/` en `/private/` |

En desarrollo (`npm run start`) todo es accesible para editar.
