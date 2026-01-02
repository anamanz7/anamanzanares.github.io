#!/bin/bash
# Método 100% nativo de macOS usando ColorSync y filtros Quartz

echo "=========================================="
echo "🎨 OPTIMIZADOR NATIVO MACOS"
echo "=========================================="
echo ""

mkdir -p "optimized"

# Los filtros Quartz están en esta ubicación
FILTERS_DIR="/System/Library/Filters"

echo "🔍 Buscando filtros disponibles..."

# Listar filtros disponibles
if [ -d "$FILTERS_DIR" ]; then
    echo "   ✓ Filtros encontrados"
else
    echo "   ⚠️  Directorio de filtros no encontrado"
fi

echo ""
echo "📊 Procesando PDFs..."
echo ""

for pdf in *.pdf; do
    [[ ! -f "$pdf" ]] && continue
    [[ "$pdf" == *"optimized"* ]] && continue

    filename="${pdf%.pdf}"
    output="optimized/${filename}_optimized.pdf"

    echo "📄 $pdf"

    original_size=$(stat -f%z "$pdf")
    original_mb=$(echo "scale=1; $original_size / 1048576" | bc)
    echo "   Original: ${original_mb} MB"

    # Método 1: Usar el comando 'cupsfilter' que viene con macOS
    echo "   ⚙️  Método 1: cupsfilter..."

    /usr/sbin/cupsfilter "$pdf" 2>/dev/null | \
    /usr/sbin/cupsfilter -m application/pdf > "$output" 2>/dev/null

    # Si falló, método 2: textutil (funciona con algunos PDFs)
    if [ ! -s "$output" ]; then
        echo "   ⚙️  Método 2: textutil..."
        rm -f "$output"

        # Crear RTF intermedio y luego PDF
        /usr/bin/textutil -convert rtf "$pdf" -output "tmp.rtf" 2>/dev/null
        /usr/bin/textutil -convert pdf "tmp.rtf" -output "$output" 2>/dev/null
        rm -f "tmp.rtf"
    fi

    # Si falló, método 3: usar AppleScript con Preview
    if [ ! -s "$output" ]; then
        echo "   ⚙️  Método 3: Preview + AppleScript..."
        rm -f "$output"

        osascript <<EOF 2>/dev/null
set inputFile to POSIX file "$PWD/$pdf"
set outputFile to POSIX file "$PWD/$output"

tell application "Preview"
    activate
    open inputFile
    delay 0.5

    -- Intentar exportar con calidad reducida
    tell application "System Events"
        tell process "Preview"
            keystroke "s" using {command down, shift down}
            delay 0.3
            keystroke "g" using {command down, shift down}
            delay 0.2
            keystroke "$PWD/optimized"
            delay 0.2
            keystroke return
            delay 0.2
            keystroke "${filename}_optimized"
            delay 0.2

            -- Seleccionar formato PDF
            click menu button "Format:" of sheet 1 of window 1
            delay 0.2
            click menu item "PDF" of menu 1 of menu button "Format:" of sheet 1 of window 1
            delay 0.2

            -- Guardar
            click button "Save" of sheet 1 of window 1
            delay 0.5
        end tell
    end tell

    close every window
    quit
end tell
EOF
    fi

    # Si todo falló, simplemente copiar (ya lo tenemos)
    if [ ! -s "$output" ]; then
        echo "   📋 Métodos automáticos fallaron, copiando original..."
        cp "$pdf" "$output"
    fi

    # Resultado
    if [ -f "$output" ] && [ -s "$output" ]; then
        new_size=$(stat -f%z "$output")
        new_mb=$(echo "scale=1; $new_size / 1048576" | bc)

        if [ $new_size -lt $original_size ]; then
            reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
            echo "   ✅ Optimizado: ${new_mb} MB (-${reduction}%)"
        else
            echo "   ⚠️  Final: ${new_mb} MB (sin reducción automática)"
        fi
    fi

    echo ""
done

echo "=========================================="
echo "✨ Completado"
echo ""
echo "📂 Archivos en: optimized/"
echo ""
echo "💡 RECOMENDACIÓN:"
echo "   Los métodos nativos tienen limitaciones."
echo "   Para mejor compresión, espera a que"
echo "   Ghostscript termine de instalarse"
echo "   y ejecuta: ./optimize_with_gs.sh"
echo "=========================================="
