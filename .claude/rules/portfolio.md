---
paths: ["PORTFOLIO/**/*", "**/*.pdf"]
description: Reglas para gestión de archivos de portfolio
---

# Reglas de Portfolio

## Gestión de Archivos PDF

### Optimización Obligatoria
- **NUNCA** commitear PDFs > 5MB sin optimizar
- Usar scripts de optimización en `PORTFOLIO/` antes de commit
- Verificar tamaño antes y después: `ls -lh archivo.pdf`

### Scripts Disponibles

1. **optimize_pdfs.sh** - Optimización básica con Ghostscript
2. **optimize_with_gs.sh** - Optimización avanzada con Ghostscript
3. **optimize_with_preview.sh** - Usando Preview de macOS
4. **optimize_native.sh** - Métodos nativos de macOS
5. **optimize_simple.sh** - Método rápido
6. **optimize_pdfs.py** - Script Python para optimización

### Uso de Scripts
```bash
cd PORTFOLIO

# Hacer ejecutable si no lo es
chmod +x optimize_pdfs.sh

# Ejecutar optimización
./optimize_pdfs.sh "NOMBRE ARCHIVO.pdf"

# Verificar resultado
ls -lh "NOMBRE ARCHIVO.pdf" optimized/"NOMBRE ARCHIVO.pdf"
```

### Directorio de Salida
- Archivos optimizados se guardan en `PORTFOLIO/optimized/`
- Revisar calidad antes de reemplazar original
- Si la calidad es buena, reemplazar original con optimizado

### Niveles de Calidad

- **Alta calidad** (`/screen` o `/ebook` en Ghostscript)
  - Para portfolios y documentos importantes
  - Reducción moderada de tamaño
  - Calidad visual excelente

- **Calidad media** (`/printer`)
  - Balance entre calidad y tamaño
  - Recomendado para la mayoría de casos

- **Baja calidad** (`/default`)
  - Solo para documentos muy grandes
  - Máxima compresión
  - Revisar legibilidad

## Gestión de Imágenes

### Formatos
- Preferir WebP para web (con fallback a JPG/PNG)
- PNG para imágenes con transparencia
- JPG para fotografías
- SVG para iconos y gráficos vectoriales

### Optimización
```bash
cd PORTFOLIO
./optimize_images.sh
```

### Dimensiones Recomendadas
- **Imágenes de portfolio**: 1200px ancho máximo
- **Thumbnails**: 400px ancho
- **Hero images**: 1920px ancho máximo
- **Iconos**: 64px o SVG

### Peso Objetivo
- Hero image: < 300KB
- Portfolio images: < 200KB
- Thumbnails: < 50KB
- Iconos: < 10KB

## Nomenclatura de Archivos

### Convenciones
- Usar nombres descriptivos en MAYÚSCULAS o minúsculas consistente
- Espacios permitidos, pero preferir guiones o underscores para scripts
- Evitar caracteres especiales (#, %, &, etc.)

### Ejemplos
- ✅ `CURRICULUM ANA.pdf`
- ✅ `BOM PROJECT.pdf`
- ✅ `portfolio-web-design.pdf`
- ❌ `doc1.pdf`
- ❌ `archivo#2.pdf`

## Organización de Archivos

### Estructura Actual
```
PORTFOLIO/
├── BOM PROJECT.pdf              # Proyecto 1
├── CURRICULUM ANA.pdf           # CV
├── MAS CREATION RED.pdf         # Proyecto 2
├── PORTFOLIO INTERACTIVO.pdf    # Proyecto 3
├── optimize_*.sh                # Scripts de optimización
├── optimize_images.sh           # Optimización de imágenes
├── optimize_pdfs.py             # Script Python
└── optimized/                   # Salida de scripts
```

### Mejores Prácticas
- Mantener archivos organizados por tipo/proyecto
- Limpiar `optimized/` periódicamente después de usar archivos
- Documentar cambios importantes en commits
- Mantener respaldo de originales si es necesario

## Control de Versiones

### Qué Commitear
- ✅ PDFs optimizados finales
- ✅ Scripts de optimización
- ✅ Imágenes optimizadas para web
- ❌ PDFs sin optimizar > 5MB
- ❌ Versiones temporales
- ❌ Archivos `.DS_Store`

### Workflow de Actualización
1. Agregar nuevo archivo a PORTFOLIO/
2. Optimizar con script apropiado
3. Verificar calidad del resultado
4. Si es bueno, usar versión optimizada
5. Actualizar index.html si es necesario
6. Commit con mensaje descriptivo
7. Push a GitHub

## Calidad y Presentación

### Checklist de Calidad
- [ ] PDF legible y claro
- [ ] Tamaño < 5MB (preferiblemente < 2MB)
- [ ] Se abre correctamente en navegadores
- [ ] Mantiene aspecto profesional
- [ ] Metadatos apropiados (título, autor)

### Metadata de PDFs
Considerar agregar metadata profesional:
- Título del documento
- Autor: Ana Manzanares
- Asunto/Descripción
- Palabras clave

### Accesibilidad
- PDFs deben ser accesibles
- Texto seleccionable (no solo imágenes)
- Estructura de encabezados si aplica
- Alternativas textuales para gráficos importantes

## Backups

### Estrategia
- Git ya provee historial de versiones
- Considerar backup local de originales antes de optimizar
- GitHub mantiene historial completo de cambios

### Recuperación
```bash
# Ver historial de un archivo
git log -- "PORTFOLIO/archivo.pdf"

# Recuperar versión anterior
git checkout HASH -- "PORTFOLIO/archivo.pdf"
```

## Performance Web

### Carga de PDFs
- PDFs se cargan en nueva pestaña (`target="_blank"`)
- Considerar usar thumbnails o previews en vez de PDFs directos
- Avisar de tamaño de archivo si es grande (> 2MB)

### Enlaces en HTML
```html
<!-- Bueno -->
<a href="PORTFOLIO/proyecto.pdf" target="_blank" class="btn">
    Ver Proyecto (PDF, 1.5MB)
</a>

<!-- Mejor con preview -->
<div class="portfolio-item">
    <img src="previews/proyecto-thumb.jpg" alt="Preview Proyecto">
    <a href="PORTFOLIO/proyecto.pdf" target="_blank">Ver Completo</a>
</div>
```

## Troubleshooting

### PDF No Se Abre
- Verificar permisos del archivo
- Verificar que no está corrupto
- Probar en diferentes navegadores
- Verificar ruta en HTML

### PDF Muy Grande Después de Optimizar
- Probar con script diferente
- Ajustar parámetros de calidad
- Verificar si tiene imágenes de alta resolución
- Considerar dividir en múltiples archivos

### Script No Ejecuta
```bash
# Dar permisos de ejecución
chmod +x PORTFOLIO/optimize_pdfs.sh

# Verificar dependencias
which gs  # Ghostscript
which python3
```
