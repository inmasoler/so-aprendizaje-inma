---
title: "Guía completa"
sidebar_position: 3
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--git">
**Guía completa de comandos Git:** acciones clave, comando recomendado y para qué sirve cada uno en el flujo diario.
</blockquote>

| Acción | Comando | Explicación |
| --- | --- | --- |
| Configurar usuario | `git config --global user.name "Nombre"` | Define quién realiza los cambios. |
| Inicializar | `git init` | Crea un repositorio local nuevo. |
| Clonar | `git clone [URL]` | Descarga un proyecto remoto a tu PC. |
| Estado actual | `git status` | Muestra qué archivos has modificado. |
| Preparar cambios | `git add [archivo]` | Añade archivos al área de staging. |
| Guardar cambios | `git commit -m "mensaje"` | Crea una foto o versión del proyecto. |
| Ver cambios | `git diff` | Muestra las líneas exactas que modificaste. |
| Crear nueva rama | `git switch -c [nombre]` | Crea y te posiciona en una nueva rama. |
| Cambiar de rama | `git switch [nombre]` | Cambia a una rama existente. |
| Salto rápido | `git switch -` | Vuelve a la rama donde estabas antes. |
| Fusionar ramas | `git merge [rama]` | Une el trabajo de una rama a la actual. |
| Historial | `git log --oneline` | Muestra los commits realizados. |
| Subir cambios | `git push -u origin [rama]` | Sube tus commits a GitHub. |
| Descargar cambios | `git pull` | Trae y une el trabajo del servidor. |
| Deshacer cambios | `git restore [archivo]` | Descarta cambios locales no deseados. |
| Guardar temporal | `git stash` | Esconde cambios actuales para trabajar en otra cosa. |
| Recuperar guardado | `git stash pop` | Aplica los cambios que tenías escondidos. |

### Consejo para tu flujo {#consejo-para-tu-flujo}

<div class="craft-card craft-card--git">
<blockquote class="craft-intro craft-intro--git">
Si alguna vez sientes que Git se ha vuelto muy complejo, vuelve a este flujo seguro:
</blockquote>

```bash
git pull
git switch -c tu-rama
git add .
git commit -m "..."
git push
```
</div>
