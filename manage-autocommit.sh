#!/bin/bash
# Script de Gestión del Servicio de Auto-Commit
# Uso: ./manage-autocommit.sh [start|stop|restart|status|logs]

PLIST_FILE="$HOME/Library/LaunchAgents/com.anamanzanares.portfolio.autocommit.plist"
SERVICE_NAME="com.anamanzanares.portfolio.autocommit"
REPO_DIR="/Users/anamanzanares/my-life"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

show_header() {
    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo -e "${BLUE}   Gestión Auto-Commit Portfolio${NC}"
    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo ""
}

show_status() {
    show_header
    if launchctl list | grep -q "$SERVICE_NAME"; then
        echo -e "${GREEN}✅ Servicio ACTIVO${NC}"
        echo ""
        echo "Detalles del servicio:"
        launchctl list | grep "$SERVICE_NAME"
        echo ""
        echo -e "${BLUE}Configuración:${NC}"
        echo "  • Intervalo: Cada 10 minutos"
        echo "  • Repositorio: $REPO_DIR"
        echo "  • Log principal: .auto-commit.log"
        echo ""

        # Mostrar últimas líneas del log si existe
        if [ -f "$REPO_DIR/.auto-commit.log" ]; then
            echo -e "${BLUE}Últimas actividades:${NC}"
            tail -10 "$REPO_DIR/.auto-commit.log"
        fi
    else
        echo -e "${RED}❌ Servicio INACTIVO${NC}"
        echo ""
        echo "Usa: ./manage-autocommit.sh start"
    fi
}

start_service() {
    show_header
    echo -e "${YELLOW}Iniciando servicio...${NC}"

    if launchctl list | grep -q "$SERVICE_NAME"; then
        echo -e "${YELLOW}⚠️  El servicio ya está activo${NC}"
        exit 0
    fi

    launchctl load "$PLIST_FILE"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicio iniciado exitosamente${NC}"
        echo ""
        echo "El sistema ahora hará commits automáticos cada 10 minutos."
        echo "Usa './manage-autocommit.sh logs' para ver la actividad."
    else
        echo -e "${RED}❌ Error al iniciar el servicio${NC}"
        exit 1
    fi
}

stop_service() {
    show_header
    echo -e "${YELLOW}Deteniendo servicio...${NC}"

    if ! launchctl list | grep -q "$SERVICE_NAME"; then
        echo -e "${YELLOW}⚠️  El servicio ya está inactivo${NC}"
        exit 0
    fi

    launchctl unload "$PLIST_FILE"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicio detenido exitosamente${NC}"
        echo ""
        echo "Los commits automáticos se han pausado."
        echo "Usa './manage-autocommit.sh start' para reactivar."
    else
        echo -e "${RED}❌ Error al detener el servicio${NC}"
        exit 1
    fi
}

restart_service() {
    show_header
    echo -e "${YELLOW}Reiniciando servicio...${NC}"

    if launchctl list | grep -q "$SERVICE_NAME"; then
        launchctl unload "$PLIST_FILE"
        sleep 1
    fi

    launchctl load "$PLIST_FILE"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Servicio reiniciado exitosamente${NC}"
    else
        echo -e "${RED}❌ Error al reiniciar el servicio${NC}"
        exit 1
    fi
}

show_logs() {
    show_header
    echo -e "${BLUE}Logs del Auto-Commit:${NC}"
    echo ""

    if [ -f "$REPO_DIR/.auto-commit.log" ]; then
        echo -e "${YELLOW}=== Log Principal ===${NC}"
        tail -30 "$REPO_DIR/.auto-commit.log"
        echo ""
    else
        echo -e "${YELLOW}No hay logs disponibles todavía${NC}"
    fi

    if [ -f "$REPO_DIR/.auto-commit-stderr.log" ]; then
        if [ -s "$REPO_DIR/.auto-commit-stderr.log" ]; then
            echo -e "${RED}=== Errores ===${NC}"
            tail -20 "$REPO_DIR/.auto-commit-stderr.log"
        fi
    fi
}

trigger_now() {
    show_header
    echo -e "${YELLOW}Ejecutando commit manual inmediato...${NC}"
    echo ""

    cd "$REPO_DIR" || exit 1
    bash "$REPO_DIR/auto-commit-daemon.sh"

    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Ejecución completada${NC}"
        echo "Revisa los logs con: ./manage-autocommit.sh logs"
    else
        echo ""
        echo -e "${RED}❌ Error en la ejecución${NC}"
        exit 1
    fi
}

show_help() {
    show_header
    echo "Uso: ./manage-autocommit.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  start      - Iniciar el servicio de auto-commit"
    echo "  stop       - Detener el servicio de auto-commit"
    echo "  restart    - Reiniciar el servicio"
    echo "  status     - Ver estado del servicio"
    echo "  logs       - Ver logs de actividad"
    echo "  now        - Ejecutar commit/push inmediatamente"
    echo "  help       - Mostrar esta ayuda"
    echo ""
    echo "Ejemplos:"
    echo "  ./manage-autocommit.sh start"
    echo "  ./manage-autocommit.sh status"
    echo "  ./manage-autocommit.sh logs"
    echo ""
}

# Procesar comando
case "${1:-status}" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        restart_service
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    now)
        trigger_now
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}Comando desconocido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
