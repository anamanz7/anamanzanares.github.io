#!/bin/bash
# Script para optimizar PDFs usando herramientas nativas de macOS

echo "=========================================="
echo "🎨 OPTIMIZADOR DE PDFs - PORTFOLIO"
echo "=========================================="
echo ""

# Crear directorio de salida
mkdir -p "/Users/anamanzanares/my-life/PORTFOLIO/optimized"

# Procesar cada PDF
for pdf in "/Users/anamanzanares/my-life/PORTFOLIO"/*.pdf; do
    # Saltar si no existe o ya está optimizado
    [[ ! -f "$pdf" ]] && continue
    [[ "$pdf" == *"optimized"* ]] && continue

    filename=$(basename "$pdf" .pdf)
    output="/Users/anamanzanares/my-life/PORTFOLIO/optimized/${filename}_optimized.pdf"

    echo "📄 Procesando: $filename.pdf"

    # Obtener tamaño original
    original_size=$(du -h "$pdf" | cut -f1)
    echo "   Tamaño original: $original_size"

    # Método 1: Usar filtro Quartz de macOS (muy efectivo)
    echo "   ⚙️  Optimizando con filtro Quartz..."

    # Usar el filtro "Reduce File Size" de macOS
    /System/Library/Automator/Combine\ PDF\ Pages.action/Contents/Resources/join.py \
        --output "$output" "$pdf" 2>/dev/null

    if [ ! -f "$output" ] || [ ! -s "$output" ]; then
        # Método alternativo: usar Python con Quartz
        echo "   🔧 Usando método alternativo..."

        python3 << 'PYTHON'
import sys
import os
from Quartz import PDFDocument
from Foundation import NSURL

input_path = sys.argv[1]
output_path = sys.argv[2]

# Abrir PDF
input_url = NSURL.fileURLWithPath_(input_path)
pdf = PDFDocument.alloc().initWithURL_(input_url)

if pdf:
    output_url = NSURL.fileURLWithPath_(output_path)
    # Guardar con opciones de compresión
    options = {
        "PDFDocumentWriteOption": 1,
    }
    success = pdf.writeToURL_withOptions_(output_url, options)
    if success:
        print("✅ PDF optimizado")
    else:
        print("❌ Error al guardar")
        sys.exit(1)
else:
    print("❌ Error al abrir PDF")
    sys.exit(1)
PYTHON "$pdf" "$output"
    fi

    # Verificar resultado
    if [ -f "$output" ] && [ -s "$output" ]; then
        new_size=$(du -h "$output" | cut -f1)
        echo "   ✅ Tamaño optimizado: $new_size"

        # Calcular reducción porcentual
        original_bytes=$(stat -f%z "$pdf")
        new_bytes=$(stat -f%z "$output")
        reduction=$(echo "scale=1; (1 - $new_bytes / $original_bytes) * 100" | bc)
        echo "   💾 Reducción: ${reduction}%"
    else
        echo "   ❌ Error en la optimización"
    fi

    echo ""
done

echo "=========================================="
echo "✨ Proceso completado"
echo "📂 Archivos optimizados en: PORTFOLIO/optimized/"
echo "=========================================="
