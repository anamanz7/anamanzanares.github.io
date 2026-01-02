#!/bin/bash

# Auto Deploy to GitHub Pages
# Script que monitorea cambios y los publica automáticamente en GitHub Pages

set -e

# Colores para mensajes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuración
WATCH_FILES=("index.html" "style.css" "script.js" "PORTFOLIO/**/*.pdf" "PORTFOLIO/**/*.png" "PORTFOLIO/**/*.jpg")
CHECK_INTERVAL=5  # segundos entre verificaciones
LAST_COMMIT_FILE=".last_auto_deploy"

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}  Auto Deploy a GitHub Pages - Portfolio Ana${NC}"
echo -e "${BLUE}==================================================${NC}"
echo ""
echo -e "${GREEN}Monitoreando cambios en:${NC}"
for pattern in "${WATCH_FILES[@]}"; do
    echo -e "  - ${YELLOW}${pattern}${NC}"
done
echo ""
echo -e "${BLUE}Verificando cada ${CHECK_INTERVAL} segundos...${NC}"
echo -e "${YELLOW}Presiona Ctrl+C para detener${NC}"
echo ""

# Función para hacer commit y push
deploy_changes() {
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}Cambios detectados! Iniciando deploy...${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    # Mostrar qué archivos cambiaron
    echo -e "\n${BLUE}Archivos modificados:${NC}"
    git status --short

    # Agregar cambios
    echo -e "\n${BLUE}Agregando cambios...${NC}"
    git add index.html style.css script.js PORTFOLIO/ 2>/dev/null || true

    # Verificar si hay cambios staged
    if git diff --cached --quiet; then
        echo -e "${YELLOW}No hay cambios nuevos para commitear${NC}"
        return
    fi

    # Crear commit con timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    COMMIT_MSG="🚀 Auto-deploy: Actualización automática del portfolio - ${TIMESTAMP}

🤖 Generated with Claude Code Auto-Deploy

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

    echo -e "\n${BLUE}Creando commit...${NC}"
    git commit -m "$(echo "$COMMIT_MSG")"

    # Push a GitHub
    echo -e "\n${BLUE}Publicando en GitHub Pages...${NC}"
    if git push origin main; then
        echo -e "\n${GREEN}✅ Deploy exitoso!${NC}"
        echo -e "${GREEN}Tu portfolio está actualizado en GitHub Pages${NC}"
        echo -e "${BLUE}URL: https://anamanzanares.github.io/my-life/${NC}"

        # Guardar timestamp del último deploy
        date +%s > "$LAST_COMMIT_FILE"
    else
        echo -e "\n${RED}❌ Error al hacer push${NC}"
        echo -e "${YELLOW}Verifica tu conexión y permisos de GitHub${NC}"
    fi

    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Función para verificar si hay cambios
check_changes() {
    # Actualizar el índice de git
    git update-index --refresh >/dev/null 2>&1 || true

    # Verificar si hay cambios en los archivos monitoreados
    if ! git diff-index --quiet HEAD -- "${WATCH_FILES[@]}" 2>/dev/null; then
        return 0  # Hay cambios
    fi

    # Verificar archivos sin trackear
    if [ -n "$(git ls-files --others --exclude-standard -- "${WATCH_FILES[@]}" 2>/dev/null)" ]; then
        return 0  # Hay archivos nuevos
    fi

    return 1  # No hay cambios
}

# Verificar que estamos en un repositorio git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: No estás en un repositorio git${NC}"
    exit 1
fi

# Verificar que estamos en la rama main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}Advertencia: Estás en la rama '${CURRENT_BRANCH}', no en 'main'${NC}"
    read -p "¿Continuar de todas formas? (s/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

# Loop principal de monitoreo
echo -e "${GREEN}🔍 Monitoreo activo...${NC}\n"

while true; do
    if check_changes; then
        deploy_changes
        echo -e "${GREEN}Continuando monitoreo...${NC}\n"
    fi

    # Esperar antes de la siguiente verificación
    sleep $CHECK_INTERVAL
done
