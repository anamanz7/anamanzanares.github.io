#!/bin/bash
# Optimizador de PDFs: convirtiendo a imágenes y reconstruyendo

echo "=========================================="
echo "🎨 OPTIMIZADOR DE PDFs VÍA IMÁGENES"
echo "=========================================="
echo ""
echo "Este método convierte cada página a imagen"
echo "y crea un nuevo PDF más ligero."
echo ""

# Verificar que imagemagick o similar está disponible
# Si no, intentar instalar

# Crear directorio de salida
mkdir -p "optimized"

# Instalar imagemagick si es necesario
if ! command -v convert &> /dev/null; then
    echo "📦 ImageMagick no encontrado. Instalando..."
    brew install imagemagick 2>&1 | tail -20 &
    install_pid=$!
fi

# Mientras tanto, intentar con método manual usando Preview
echo "🔄 Método alternativo: Usando comandos nativos de macOS"
echo ""

for pdf in *.pdf; do
    # Saltar si no existe o ya está optimizado
    [[ ! -f "$pdf" ]] && continue
    [[ "$pdf" == *"optimized"* ]] && continue

    filename="${pdf%.pdf}"
    output="optimized/${filename}_optimized.pdf"
    tmpdir="tmp_${filename}"

    echo "📄 Procesando: $pdf"

    # Tamaño original
    original_size=$(stat -f%z "$pdf")
    original_mb=$(echo "scale=1; $original_size / 1048576" | bc)
    echo "   Tamaño original: ${original_mb} MB"

    # Crear directorio temporal
    mkdir -p "$tmpdir"

    echo "   ⚙️  Extrayendo páginas como imágenes..."

    # Método 1: Usar qlmanage para generar previews
    # Copiar PDF al temporal
    cp "$pdf" "$tmpdir/input.pdf"

    # Intentar dividir con pdftk o similar (no disponible por defecto)
    # En su lugar, usar AppleScript para abrir en Preview

    # Método simplificado: Usar screencapture de cada página
    # Esto es complicado, mejor usar un enfoque diferente

    # NUEVO MÉTODO: Usar el comando 'convert' de ImageMagick SI está disponible
    if command -v convert &> /dev/null; then
        echo "   🖼️  Convirtiendo con ImageMagick..."

        # Convertir PDF a imágenes JPG con calidad reducida
        convert -density 150 \
                -quality 85 \
                -compress JPEG \
                "$pdf" \
                "$tmpdir/page-%04d.jpg" 2>/dev/null

        # Reconvertir imágenes a PDF
        if ls $tmpdir/page-*.jpg 1> /dev/null 2>&1; then
            convert $tmpdir/page-*.jpg \
                    -compress JPEG \
                    -quality 85 \
                    "$output" 2>/dev/null

            if [ -f "$output" ] && [ -s "$output" ]; then
                echo "   ✅ PDF reconstruido desde imágenes"
            fi
        fi
    else
        # Sin ImageMagick, usar enfoque más simple
        echo "   ⚠️  ImageMagick no disponible aún"
        echo "   📋 Copiando original por ahora..."
        cp "$pdf" "$output"
    fi

    # Limpiar
    rm -rf "$tmpdir"

    # Verificar resultado
    if [ -f "$output" ] && [ -s "$output" ]; then
        new_size=$(stat -f%z "$output")
        new_mb=$(echo "scale=1; $new_size / 1048576" | bc)

        if [ $new_size -lt $original_size ]; then
            reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
            echo "   ✅ Tamaño optimizado: ${new_mb} MB"
            echo "   💾 Reducción: ${reduction}%"
        else
            echo "   ⚠️  Tamaño: ${new_mb} MB"
        fi
    fi

    echo ""
done

# Esperar instalación si está en proceso
if [ ! -z "$install_pid" ]; then
    echo "⏳ Esperando instalación de ImageMagick..."
    wait $install_pid
    echo "✅ ImageMagick instalado. Puedes volver a ejecutar este script."
fi

echo "=========================================="
echo "✨ Proceso completado"
echo "📂 Archivos en: optimized/"
echo ""
echo "💡 Nota: Si ImageMagick se acaba de instalar,"
echo "   ejecuta este script nuevamente para optimizar."
echo "=========================================="
