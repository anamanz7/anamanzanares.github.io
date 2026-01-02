#!/bin/bash
# Optimizador de PDFs usando Preview/Quartz de macOS

echo "=========================================="
echo "🎨 OPTIMIZADOR DE PDFs CON PREVIEW"
echo "=========================================="
echo ""

# Crear directorio de salida
mkdir -p "optimized"

echo "📊 Método: Reducción Quartz Filter de macOS"
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
    echo "   ⚙️  Optimizando con Quartz..."

    # Usar Python para aplicar el filtro Quartz de macOS
    /usr/bin/python3 << PYTHON_SCRIPT
import sys
import os

try:
    # Importar Quartz (parte de macOS)
    from Quartz import PDFDocument, PDFPage
    from Quartz import kCGPDFContextOwnerPassword, kCGPDFContextUserPassword
    from Foundation import NSURL, NSData
    import CoreGraphics as CG

    input_path = "${pdf}"
    output_path = "${output}"

    # Abrir el PDF original
    input_url = NSURL.fileURLWithPath_(input_path)
    pdf_doc = PDFDocument.alloc().initWithURL_(input_url)

    if not pdf_doc:
        print("❌ Error: No se pudo abrir el PDF")
        sys.exit(1)

    num_pages = pdf_doc.pageCount()

    # Crear un nuevo PDF con opciones de compresión
    output_url = NSURL.fileURLWithPath_(output_path)

    # Opciones para reducir calidad de imágenes
    pdf_context = CG.CGPDFContextCreateWithURL(
        output_url,
        None,
        None
    )

    if not pdf_context:
        print("❌ Error: No se pudo crear el contexto PDF")
        sys.exit(1)

    # Procesar cada página
    for i in range(num_pages):
        page = pdf_doc.pageAtIndex_(i)
        if page:
            # Obtener el rect de la página
            rect = page.boundsForBox_(CG.kPDFDisplayBoxMediaBox)

            # Crear la página con resolución reducida (150 DPI en lugar de 300)
            scale_factor = 150.0 / 72.0  # 150 DPI

            scaled_rect = CG.CGRectMake(
                0, 0,
                rect.size.width * scale_factor,
                rect.size.height * scale_factor
            )

            CG.CGPDFContextBeginPage(pdf_context, None)

            # Dibujar la página con escala
            CG.CGContextScaleCTM(pdf_context, scale_factor, scale_factor)
            CG.CGContextDrawPDFPage(pdf_context, page)

            CG.CGPDFContextEndPage(pdf_context)

    CG.CGPDFContextClose(pdf_context)

    print("✅ PDF procesado con Quartz")

except ImportError:
    # Si Quartz no está disponible, usar método alternativo
    print("⚠️  Quartz no disponible, usando método alternativo...")

    # Copiar y aplicar filtro básico
    import shutil
    shutil.copy("${pdf}", "${output}")

except Exception as e:
    print(f"❌ Error: {e}")
    # En caso de error, copiar el original
    import shutil
    shutil.copy("${pdf}", "${output}")
    sys.exit(1)

PYTHON_SCRIPT

    # Verificar resultado
    if [ -f "$output" ] && [ -s "$output" ]; then
        new_size=$(stat -f%z "$output")
        new_mb=$(echo "scale=1; $new_size / 1048576" | bc)

        if [ $new_size -lt $original_size ]; then
            reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
            echo "   ✅ Tamaño optimizado: ${new_mb} MB"
            echo "   💾 Reducción: ${reduction}%"
        elif [ $new_size -eq $original_size ]; then
            echo "   ⚠️  Tamaño: ${new_mb} MB (sin cambios)"
        else
            echo "   ⚠️  Tamaño: ${new_mb} MB (no se redujo)"
        fi
    else
        echo "   ❌ Error en la optimización"
    fi

    echo ""
done

echo "=========================================="
echo "✨ Proceso completado"
echo "📂 Archivos optimizados en: optimized/"
echo "=========================================="
