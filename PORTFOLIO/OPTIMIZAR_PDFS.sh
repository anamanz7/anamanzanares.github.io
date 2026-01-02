#!/bin/bash
# Script maestro para optimizar PDFs

clear

echo "=========================================="
echo "🎨 OPTIMIZADOR DE PDFs - PORTFOLIO"
echo "=========================================="
echo ""

# Verificar si Ghostscript está disponible
if command -v gs &> /dev/null; then
    echo "✅ Ghostscript encontrado!"
    echo "   Usando método automático profesional..."
    echo ""

    # Ejecutar optimización con Ghostscript
    ./optimize_with_gs.sh

else
    echo "⏳ Ghostscript aún no está disponible"
    echo ""
    echo "Tienes 2 opciones:"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📖 OPCIÓN 1: MANUAL (5 minutos)"
    echo "   Más rápido, hazlo ahora mismo"
    echo ""
    echo "   1. Abre: INSTRUCCIONES_MANUAL.md"
    echo "   2. Sigue el Método 1 (Preview)"
    echo "   3. Toma 30 segundos por PDF"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "⚙️  OPCIÓN 2: AUTOMÁTICO (esperar ~10 min)"
    echo "   Mejor calidad, totalmente automático"
    echo ""
    echo "   • Ghostscript se está instalando"
    echo "   • Vuelve a ejecutar este script después"
    echo "   • O ejecuta: ./optimize_with_gs.sh"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Mostrar progreso de instalación
    if ps aux | grep -i "brew install" | grep -v grep > /dev/null; then
        echo "📊 Estado: Instalación en progreso..."
        echo ""
        echo "   Puedes:"
        echo "   • Esperar aquí y presionar Ctrl+C"
        echo "   • O hacer la optimización manual ahora"
        echo ""
    else
        echo "❓ Ghostscript no está instalando"
        echo ""
        echo "   Para instalar manualmente:"
        echo "   $ brew install ghostscript"
        echo ""
    fi

    # Preguntar qué hacer
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    read -p "¿Abrir instrucciones manuales? (s/n): " respuesta

    if [[ "$respuesta" == "s" || "$respuesta" == "S" ]]; then
        # Abrir el archivo de instrucciones
        open "INSTRUCCIONES_MANUAL.md" || cat "INSTRUCCIONES_MANUAL.md"
    fi
fi

echo ""
echo "=========================================="
echo "Archivos originales:"
ls -lh *.pdf | awk '{print "  📄", $9, "-", $5}'
echo ""
echo "Carpeta optimizados:"
echo "  📁 optimized/"
if ls optimized/*.pdf 1> /dev/null 2>&1; then
    ls -lh optimized/*.pdf | awk '{print "  ✅", $9, "-", $5}'
else
    echo "  (vacía)"
fi
echo "=========================================="
