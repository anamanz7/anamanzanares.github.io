#!/bin/bash
# Script de Auto-Commit y Push para Portfolio
# Uso: ./auto-commit.sh ["mensaje personalizado opcional"]

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  Auto-Commit Portfolio - My Life${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# Verificar si hay cambios (incluyendo archivos sin rastrear)
if [[ -z $(git status --porcelain) ]]; then
    echo -e "${YELLOW}⚠️  No hay cambios para commitear${NC}"
    echo ""
    git status
    exit 0
fi

# Mostrar cambios
echo -e "${YELLOW}📋 Cambios detectados:${NC}"
git status --short
echo ""

# Obtener mensaje personalizado o usar uno automático
if [ -n "$1" ]; then
    CUSTOM_MESSAGE="$1"
else
    # Analizar cambios para crear mensaje inteligente
    MODIFIED=$(git diff --name-only --cached --diff-filter=M | wc -l | xargs)
    ADDED=$(git diff --name-only --cached --diff-filter=A | wc -l | xargs)
    DELETED=$(git diff --name-only --cached --diff-filter=D | wc -l | xargs)

    CHANGES_SUMMARY="Actualización del portfolio"

    if [ "$MODIFIED" -gt 0 ]; then
        CHANGES_SUMMARY="$CHANGES_SUMMARY - $MODIFIED archivo(s) modificado(s)"
    fi
    if [ "$ADDED" -gt 0 ]; then
        CHANGES_SUMMARY="$CHANGES_SUMMARY - $ADDED archivo(s) nuevo(s)"
    fi
    if [ "$DELETED" -gt 0 ]; then
        CHANGES_SUMMARY="$CHANGES_SUMMARY - $DELETED archivo(s) eliminado(s)"
    fi

    CUSTOM_MESSAGE="$CHANGES_SUMMARY"
fi

# Crear mensaje de commit
COMMIT_MSG="$CUSTOM_MESSAGE

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Añadir todos los cambios
echo -e "${YELLOW}📦 Añadiendo cambios...${NC}"
git add -A

# Hacer commit
echo -e "${YELLOW}💾 Creando commit...${NC}"
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al crear commit${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Commit creado exitosamente${NC}"
echo ""

# Preguntar si hacer push
echo -e "${YELLOW}¿Hacer push a GitHub? (y/n)${NC}"
read -r RESPONSE

if [[ "$RESPONSE" =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}🚀 Haciendo push a origin/main...${NC}"
    git push origin main

    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}════════════════════════════════════════${NC}"
        echo -e "${GREEN}✅ ¡Portfolio actualizado exitosamente!${NC}"
        echo -e "${GREEN}🌐 GitHub Pages se actualizará en breve${NC}"
        echo -e "${GREEN}════════════════════════════════════════${NC}"
    else
        echo -e "${RED}❌ Error al hacer push${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}ℹ️  Commit guardado localmente. Usa 'git push' cuando estés listo.${NC}"
fi

echo ""
