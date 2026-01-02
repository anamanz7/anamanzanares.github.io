#!/bin/bash
# Daemon de Auto-Commit - Se ejecuta automáticamente cada 10 minutos
# Este script es llamado por Launchd para hacer commits automáticos

# Directorio del repositorio
REPO_DIR="/Users/anamanzanares/my-life"

# Archivo de log
LOG_FILE="$REPO_DIR/.auto-commit.log"

# Función para escribir en log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Cambiar al directorio del repositorio
cd "$REPO_DIR" || exit 1

log "=== Iniciando verificación automática ==="

# Verificar si hay cambios (incluyendo archivos sin rastrear)
if [[ -z $(git status --porcelain) ]]; then
    log "No hay cambios para commitear"
    exit 0
fi

log "Cambios detectados, creando commit..."

# Obtener resumen de cambios
MODIFIED=$(git status --porcelain | grep -c "^ M" || echo "0")
ADDED=$(git status --porcelain | grep -c "^??" || echo "0")
DELETED=$(git status --porcelain | grep -c "^ D" || echo "0")

# Crear mensaje de commit
CHANGES_SUMMARY="Auto-commit: "

if [ "$MODIFIED" -gt 0 ]; then
    CHANGES_SUMMARY="${CHANGES_SUMMARY}$MODIFIED modificado(s)"
fi

if [ "$ADDED" -gt 0 ]; then
    if [ "$MODIFIED" -gt 0 ]; then
        CHANGES_SUMMARY="${CHANGES_SUMMARY}, "
    fi
    CHANGES_SUMMARY="${CHANGES_SUMMARY}$ADDED nuevo(s)"
fi

if [ "$DELETED" -gt 0 ]; then
    if [ "$MODIFIED" -gt 0 ] || [ "$ADDED" -gt 0 ]; then
        CHANGES_SUMMARY="${CHANGES_SUMMARY}, "
    fi
    CHANGES_SUMMARY="${CHANGES_SUMMARY}$DELETED eliminado(s)"
fi

# Obtener lista de archivos (primeros 5)
FILES_LIST=$(git status --short | head -5)

COMMIT_MSG="${CHANGES_SUMMARY}

Archivos modificados:
$FILES_LIST

🤖 Auto-commit generado cada 10 minutos
Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Añadir todos los cambios
git add -A >> "$LOG_FILE" 2>&1

# Hacer commit
if git commit -m "$COMMIT_MSG" >> "$LOG_FILE" 2>&1; then
    log "✅ Commit creado exitosamente"

    # Hacer push automático
    if git push origin main >> "$LOG_FILE" 2>&1; then
        log "✅ Push realizado exitosamente a GitHub"
    else
        log "❌ Error al hacer push"
        exit 1
    fi
else
    log "❌ Error al crear commit"
    exit 1
fi

log "=== Verificación completada ==="
