---
title: "Flujo Git y Rebase"
sidebar_position: 5
visibility: public
format: md
---

<blockquote class="craft-intro craft-intro--git">
**Flujo base seguro:** trabaja en rama, haz commits pequeños, sincroniza con pull --rebase y luego push.
</blockquote>

<ol class="craft-steps craft-steps--git">
<li class="craft-step">
**Traer cambios**

```bash
git pull --rebase origin main
```
</li>

<li class="craft-step">
**Preparar cambios**

```bash
git add .
```
</li>

<li class="craft-step">
**Crear commit**

```bash
git commit -m "feat(scope): mensaje"
```
</li>

<li class="craft-step">
**Subir rama**

```bash
git push origin mi-rama
```
</li>
</ol>

### Pull vs Rebase {#pull-vs-rebase}

<div class="craft-card craft-card--git">
*   **merge:** conserva ramas tal cual, crea merge commit.
*   **rebase:** reescribe tus commits encima de la rama base.
*   **ventaja rebase:** historial lineal y limpio.
*   **regla:** no rebasees commits ya compartidos por todo el equipo.
</div>

### Comandos útiles {#comandos-utiles}

<div class="craft-card craft-card--git">
```bash
git status
git log --oneline --graph --decorate
git diff
git rebase -i HEAD~3
git commit --amend
git push --force-with-lease
```
</div>
