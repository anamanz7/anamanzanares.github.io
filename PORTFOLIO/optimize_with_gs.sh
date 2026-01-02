#!/bin/bash
# Optimizador de PDFs profesional usando Ghostscript

echo "=========================================="
echo "🎨 OPTIMIZADOR DE PDFs - PORTFOLIO"
echo "=========================================="
echo ""

# Verificar que ghostscript está instalado
if ! command -v gs &> /dev/null; then
    echo "❌ Ghostscript no está instalado."
    echo "   Instalando con: brew install ghostscript"
    brew install ghostscript
fi

# Crear directorio de salida
mkdir -p "optimized"

# Configuración de calidad
# screen: 72 DPI (menor calidad, mucho más pequeño)
# ebook: 150 DPI (buena calidad para pantalla)
# printer: 300 DPI (calidad impresión)
# prepress: 300 DPI (mejor calidad)

QUALITY="ebook"  # Cambiar a "screen" para mayor reducción

echo "📊 Calidad seleccionada: $QUALITY (150 DPI)"
echo ""

# Procesar cada PDF
for pdf in *.pdf; do
    # Saltar si no existe o ya está optimizado
    [[ ! -f "$pdf" ]] && continue
    [[ "$pdf" == *"optimized"* ]] && continue

    filename="${pdf%.pdf}"
    output="optimized/${filename}_optimized.pdf"

    echo "📄 Procesando: $pdf"

    # Tamaño original
    original_size=$(stat -f%z "$pdf")
    original_mb=$(echo "scale=1; $original_size / 1048576" | bc)
    echo "   Tamaño original: ${original_mb} MB"
    echo "   ⚙️  Optimizando..."

    # Ejecutar Ghostscript
    gs -sDEVICE=pdfwrite \
       -dCompatibilityLevel=1.4 \
       -dPDFSETTINGS=/$QUALITY \
       -dNOPAUSE \
       -dQUIET \
       -dBATCH \
       -dDetectDuplicateImages=true \
       -dCompressFonts=true \
       -r150 \
       -sOutputFile="$output" \
       "$pdf" 2>/dev/null

    # Verificar resultado
    if [ -f "$output" ] && [ -s "$output" ]; then
        new_size=$(stat -f%z "$output")
        new_mb=$(echo "scale=1; $new_size / 1048576" | bc)
        reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)

        echo "   ✅ Tamaño optimizado: ${new_mb} MB"

        if (( $(echo "$reduction > 0" | bc -l) )); then
            echo "   💾 Reducción: ${reduction}%"
        else
            echo "   ⚠️  No se redujo el tamaño (ya estaba optimizado)"
        fi
    else
        echo "   ❌ Error en la optimización"
    fi

    echo ""
done

echo "=========================================="
echo "✨ Proceso completado"
echo "📂 Archivos en: optimized/"
echo ""
echo "💡 Tip: Si quieres más reducción, edita el script"
echo "   y cambia QUALITY=\"ebook\" por QUALITY=\"screen\""
echo "=========================================="
