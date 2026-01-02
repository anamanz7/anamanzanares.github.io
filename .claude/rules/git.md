---
paths: "**/*"
description: Reglas para commits de Git y control de versiones
---

# Reglas de Git

## Commits

### Formato de Mensajes
- Escribir commits en **español**
- Usar tiempo presente e imperativo
- Primera línea: resumen conciso (50 caracteres máximo)
- Líneas adicionales: detalles si es necesario
- Ejemplos:
  - ✅ "Añadir sección de contacto al portfolio"
  - ✅ "Optimizar imágenes para mejorar rendimiento"
  - ✅ "Actualizar CV con experiencia reciente"
  - ❌ "fix bug"
  - ❌ "updated files"

### Tipos de Commits
- `Añadir` - Nuevo contenido o funcionalidad
- `Actualizar` - Modificaciones a contenido existente
- `Optimizar` - Mejoras de rendimiento
- `Arreglar` - Corrección de bugs
- `Eliminar` - Remover contenido
- `Refactorizar` - Restructuración de código sin cambiar funcionalidad
- `Documentar` - Cambios en documentación

### Antes de Hacer Commit

1. **Optimizar archivos grandes**
   - PDFs > 5MB deben optimizarse antes de commit
   - Imágenes deben estar optimizadas para web
   - Usar scripts en PORTFOLIO/ para optimización

2. **Verificar archivos**
   - No commitear `.DS_Store`
   - No commitear archivos temporales
   - No commitear información sensible
   - Revisar `git status` antes de add

3. **Probar cambios**
   - Si se modifica HTML/CSS, probar en navegador
   - Si se modifica script, ejecutar para verificar funcionamiento
   - Asegurar que no se rompe el sitio de GitHub Pages

## Branches

- **main**: Branch principal, siempre estable
- Usar branches descriptivas para cambios grandes: `feature/nueva-seccion`, `fix/enlaces-rotos`
- Mergear a main cuando esté probado y listo

## Pull Requests

- Describir claramente qué cambios se hicieron y por qué
- Incluir screenshots si hay cambios visuales
- Verificar que GitHub Pages se actualiza correctamente

## GitHub Pages

- Los cambios en `main` se publican automáticamente
- Esperar 1-2 minutos después del push para ver cambios
- URL: https://anamanzanares.github.io/my-life/

## Comandos Git Útiles

```bash
# Ver cambios antes de commit
git diff

# Ver status
git status

# Add selectivo
git add -p

# Ver historial
git log --oneline -10

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1
```
