---
name: pdf-optimization
description: Optimizar archivos PDF para reducir tamaño manteniendo calidad. Usar cuando se trabaje con PDFs grandes o se necesite optimización.
allowed-tools: Read, Bash(python3:*), Bash(gs:*), Bash(ls:*), Bash(file:*), Bash(du:*), Bash(chmod:*)
---

# PDF Optimization Skill

Esta skill proporciona expertise en optimización de archivos PDF usando diferentes métodos y herramientas.

## Herramientas Disponibles

### 1. Ghostscript (gs)
El método más efectivo y confiable para optimizar PDFs.

**Parámetros de Calidad:**
- `/screen` - 72 DPI, máxima compresión (para pantalla)
- `/ebook` - 150 DPI, buena calidad para lectura digital
- `/printer` - 300 DPI, calidad impresión
- `/prepress` - 300 DPI, calidad profesional

**Comando Básico:**
```bash
gs -sDEVICE=pdfwrite \
   -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output.pdf \
   input.pdf
```

### 2. Python (PyPDF2)
Útil para manipulación y optimización básica.

```python
import PyPDF2

def optimize_pdf(input_path, output_path):
    with open(input_path, 'rb') as input_file:
        pdf_reader = PyPDF2.PdfReader(input_file)
        pdf_writer = PyPDF2.PdfWriter()

        for page in pdf_reader.pages:
            pdf_writer.add_page(page)

        pdf_writer.compress_content_streams()

        with open(output_path, 'wb') as output_file:
            pdf_writer.write(output_file)
```

### 3. macOS Preview (sips/convert)
Métodos nativos de macOS para conversión.

```bash
# Usando sips (simple image processing system)
/usr/bin/python3 -c "
import Quartz
import sys
input_pdf = sys.argv[1]
output_pdf = sys.argv[2]
# ... código de optimización
" "input.pdf" "output.pdf"
```

## Scripts en el Proyecto

El proyecto tiene varios scripts de optimización en `PORTFOLIO/`:

1. **optimize_pdfs.sh** - Método principal con Ghostscript
2. **optimize_with_gs.sh** - Optimización avanzada
3. **optimize_with_preview.sh** - Usa Preview de macOS
4. **optimize_native.sh** - Métodos nativos
5. **optimize_simple.sh** - Optimización rápida
6. **optimize_pdfs.py** - Script Python

## Workflow de Optimización

### Paso 1: Evaluar el PDF
```bash
# Ver tamaño actual
ls -lh "archivo.pdf"

# Ver información del PDF
file "archivo.pdf"

# Ver tamaño detallado
du -h "archivo.pdf"
```

### Paso 2: Elegir Método

**Para portfolios profesionales:**
- Usar `/ebook` o `/printer` para mantener calidad
- Reducción típica: 40-70%

**Para documentos de referencia:**
- Usar `/screen` para máxima compresión
- Reducción típica: 70-90%

### Paso 3: Ejecutar Optimización
```bash
cd PORTFOLIO

# Hacer ejecutable si es necesario
chmod +x optimize_pdfs.sh

# Ejecutar con el nombre del archivo
./optimize_pdfs.sh "NOMBRE ARCHIVO.pdf"
```

### Paso 4: Verificar Resultado
```bash
# Comparar tamaños
ls -lh "archivo.pdf" optimized/"archivo.pdf"

# Abrir y verificar calidad visual
open optimized/"archivo.pdf"
```

### Paso 5: Aplicar si es Satisfactorio
```bash
# Backup del original (opcional)
cp "archivo.pdf" "archivo.original.pdf"

# Reemplazar con versión optimizada
mv optimized/"archivo.pdf" "archivo.pdf"
```

## Troubleshooting

### Error: Ghostscript no encontrado
```bash
# Verificar instalación
which gs

# Instalar con Homebrew si no está
brew install ghostscript
```

### Error: Permiso denegado
```bash
# Dar permisos de ejecución al script
chmod +x PORTFOLIO/optimize_pdfs.sh
```

### PDF corrupto después de optimización
- Reducir nivel de compresión (usar /printer en vez de /screen)
- Verificar que el PDF original no esté dañado
- Probar con método diferente

### Reducción insuficiente
- El PDF puede ya estar optimizado
- Contiene principalmente vectores (no se comprime mucho)
- Probar con parámetros más agresivos

## Mejores Prácticas

1. **Siempre hacer backup** del original antes de reemplazar
2. **Verificar calidad** visual antes de commitear
3. **Documentar** qué método se usó en commits
4. **Objetivo de tamaño**: < 2MB para web es ideal
5. **Batch processing**: Optimizar múltiples archivos a la vez cuando sea posible

## Ejemplos de Uso

### Optimizar un solo archivo
```bash
cd PORTFOLIO
./optimize_pdfs.sh "CURRICULUM ANA.pdf"
```

### Optimizar todos los PDFs en el directorio
```bash
cd PORTFOLIO
for pdf in *.pdf; do
    ./optimize_pdfs.sh "$pdf"
done
```

### Optimización con parámetros específicos
```bash
gs -sDEVICE=pdfwrite \
   -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook \
   -dNOPAUSE -dQUIET -dBATCH \
   -dCompressFonts=true \
   -dSubsetFonts=true \
   -dColorImageDownsampleType=/Bicubic \
   -dColorImageResolution=150 \
   -dGrayImageDownsampleType=/Bicubic \
   -dGrayImageResolution=150 \
   -dMonoImageDownsampleType=/Bicubic \
   -dMonoImageResolution=150 \
   -sOutputFile="optimized/output.pdf" \
   "input.pdf"
```

## Automatización

Claude Code puede automatizar el proceso:

1. Detectar PDFs grandes en el repositorio
2. Sugerir optimización antes de commit
3. Ejecutar scripts automáticamente
4. Verificar resultados
5. Reportar reducción de tamaño

## Referencias

- Ghostscript docs: https://www.ghostscript.com/
- PyPDF2 docs: https://pypdf2.readthedocs.io/
- Scripts del proyecto: `PORTFOLIO/optimize_*.sh`
