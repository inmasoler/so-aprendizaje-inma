---
title: "Conventional Commits"
sidebar_position: 4
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--git">
**Conventional Commits** ayuda a tener historial legible, changelogs automáticos y releases limpias.
</blockquote>

| Tipo | Cuándo usarlo | Ejemplo |
| --- | --- | --- |
| feat | Nueva funcionalidad | feat(auth): agregar login con magic link |
| fix | Corrección de bug | fix(api): manejar null en respuesta de perfil |
| docs | Cambios de documentación | docs(readme): explicar setup de Docker |
| refactor | Mejora interna sin cambiar comportamiento | refactor(ui): extraer card base reusable |
| test | Tests nuevos o ajustes de tests | test(user): cubrir flujo de registro |
| chore | Tareas de mantenimiento | chore(deps): actualizar eslint a v9 |

```bash
Formato recomendado:
type(scope): mensaje corto en imperativo

Ejemplos:
feat(docs): crear sección de flujo git
fix(glosario): mejorar contraste de etiquetas
docs(commits): añadir guía de conventional commits
```
