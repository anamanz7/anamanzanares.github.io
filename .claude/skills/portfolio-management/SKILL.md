---
name: portfolio-management
description: Gestión de portfolio web, actualización de contenido, optimización de assets y mantenimiento del sitio. Usar cuando se trabaje con el portfolio o GitHub Pages.
allowed-tools: Read, Edit, Write, Bash(git:*), Bash(open:*), Grep, Glob
---

# Portfolio Management Skill

Esta skill proporciona expertise en gestión y mantenimiento del portfolio web personal.

## Arquitectura del Portfolio

### Estructura del Sitio
```
my-life/
├── index.html          # Página principal
├── style.css           # Estilos
├── README.md           # Documentación del repo
└── PORTFOLIO/          # Assets y proyectos
    ├── *.pdf          # Documentos de proyectos
    └── optimized/     # Versiones optimizadas
```

### Secciones del Sitio
1. **Hero** - Presentación inicial
2. **About** - Sobre mí
3. **Portfolio** - Proyectos destacados
4. **CV** - Curriculum
5. **Contact** - Información de contacto

## Gestión de Contenido

### Añadir Nuevo Proyecto

**Paso 1: Preparar Assets**
```bash
# Copiar PDF al directorio PORTFOLIO
cp ~/Downloads/nuevo-proyecto.pdf PORTFOLIO/

# Optimizar el PDF
cd PORTFOLIO
./optimize_pdfs.sh "nuevo-proyecto.pdf"

# Verificar tamaño
ls -lh "nuevo-proyecto.pdf" optimized/"nuevo-proyecto.pdf"
```

**Paso 2: Actualizar HTML**

Localizar la sección de portfolio en [index.html](index.html):

```html
<section id="portfolio">
    <div class="container">
        <h2>Portfolio</h2>
        <div class="portfolio-grid">
            <!-- Añadir nuevo item -->
            <div class="portfolio-item">
                <h3>Título del Proyecto</h3>
                <p>Descripción breve y atractiva del proyecto</p>
                <a href="PORTFOLIO/nuevo-proyecto.pdf" target="_blank" class="btn">Ver Proyecto</a>
            </div>
        </div>
    </div>
</section>
```

**Paso 3: Commit y Deploy**
```bash
git add PORTFOLIO/nuevo-proyecto.pdf index.html
git commit -m "Añadir proyecto: Título del Proyecto"
git push origin main
```

### Actualizar CV

**Opción 1: Reemplazar PDF**
```bash
# Backup del actual
cp PORTFOLIO/"CURRICULUM ANA.pdf" PORTFOLIO/curriculum-backup.pdf

# Copiar nuevo CV
cp ~/Downloads/nuevo-cv.pdf PORTFOLIO/"CURRICULUM ANA.pdf"

# Optimizar
cd PORTFOLIO
./optimize_pdfs.sh "CURRICULUM ANA.pdf"

# Commit
git add PORTFOLIO/"CURRICULUM ANA.pdf"
git commit -m "Actualizar CV con experiencia reciente"
git push
```

**Opción 2: Actualizar Sección CV en HTML**

Si tienes información de CV en HTML directamente:

```html
<section id="cv">
    <div class="container">
        <h2>Curriculum</h2>
        <!-- Actualizar contenido aquí -->
        <a href="PORTFOLIO/CURRICULUM ANA.pdf" target="_blank" class="btn">
            Descargar CV (PDF)
        </a>
    </div>
</section>
```

### Modificar Información Personal

Editar secciones en [index.html](index.html):

```html
<!-- Hero Section -->
<section id="hero">
    <div class="hero-content">
        <h2>Creatividad & Pasión</h2>
        <p>Texto descriptivo actualizado</p>
    </div>
</section>

<!-- About Section -->
<section id="about">
    <div class="container">
        <h2>Sobre mí</h2>
        <p>Descripción profesional actualizada...</p>
    </div>
</section>
```

## Optimización y Rendimiento

### Checklist de Performance

**Antes de cada deploy:**
- [ ] Optimizar todos los PDFs nuevos (< 2MB ideal)
- [ ] Optimizar imágenes si hay nuevas
- [ ] Verificar que enlaces funcionan
- [ ] Probar en navegador local
- [ ] Verificar responsive design
- [ ] Revisar tiempo de carga

### Optimizar Assets Existentes

**PDFs:**
```bash
cd PORTFOLIO
for pdf in *.pdf; do
    size=$(du -m "$pdf" | cut -f1)
    if [ $size -gt 5 ]; then
        echo "Optimizando $pdf (${size}MB)..."
        ./optimize_pdfs.sh "$pdf"
    fi
done
```

**Imágenes:**
```bash
cd PORTFOLIO
./optimize_images.sh
```

### Audit de Performance

```bash
# Ver tamaños de todos los PDFs
ls -lh PORTFOLIO/*.pdf

# Total de espacio usado
du -sh PORTFOLIO/

# Encontrar archivos grandes
find PORTFOLIO -type f -size +5M
```

## Estilos y Diseño

### Paleta de Colores

Actualizar en [style.css](style.css):

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --bg-color: #f8f9fa;
    --border-color: #ddd;
}
```

### Tipografía

```css
:root {
    --font-primary: 'Montserrat', sans-serif;
    --font-size-base: 16px;
    --line-height: 1.6;
}
```

### Layout Responsive

```css
/* Mobile First */
.portfolio-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

/* Tablet */
@media (min-width: 768px) {
    .portfolio-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .portfolio-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

## GitHub Pages

### Verificar Deploy

**Después de push:**
1. Esperar 1-2 minutos
2. Visitar: https://anamanzanares.github.io/my-life/
3. Verificar cambios están visibles
4. Probar en diferentes dispositivos

### Troubleshooting

**Cambios no aparecen:**
```bash
# Verificar último commit
git log -1

# Verificar estado del repo
git status

# Force refresh en navegador
# Chrome/Firefox: Ctrl+Shift+R (Cmd+Shift+R en Mac)
```

**404 Error:**
- Verificar que branch es `main`
- Verificar que GitHub Pages está habilitado en settings
- Verificar que [index.html](index.html) está en la raíz

## SEO y Metadata

### Meta Tags Esenciales

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ana Manzanares - Portfolio Profesional</title>

    <!-- SEO -->
    <meta name="description" content="Portfolio profesional de Ana Manzanares. Proyectos creativos y diseño.">
    <meta name="keywords" content="portfolio, diseño, proyectos, Ana Manzanares">
    <meta name="author" content="Ana Manzanares">

    <!-- Open Graph (redes sociales) -->
    <meta property="og:title" content="Ana Manzanares - Portfolio">
    <meta property="og:description" content="Portfolio profesional y proyectos creativos">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://anamanzanares.github.io/my-life/">
    <meta property="og:image" content="URL-de-imagen-preview.jpg">
</head>
```

### Favicon

Añadir favicon al proyecto:

```html
<link rel="icon" type="image/png" href="favicon.png">
```

## Mantenimiento Regular

### Mensual
- [ ] Revisar enlaces rotos
- [ ] Actualizar información si es necesario
- [ ] Verificar rendimiento en Lighthouse
- [ ] Revisar analytics si están configurados

### Trimestral
- [ ] Actualizar proyectos destacados
- [ ] Refrescar CV
- [ ] Revisar diseño y hacer mejoras incrementales
- [ ] Optimizar assets antiguos si es necesario

### Anual
- [ ] Redesign parcial si es necesario
- [ ] Actualizar stack tecnológico
- [ ] Revisar accesibilidad completa
- [ ] Actualizar todos los contenidos

## Testing Checklist

### Pre-Deploy
```bash
# 1. Verificar HTML válido
# Usar: https://validator.w3.org/

# 2. Verificar CSS válido
# Usar: https://jigsaw.w3.org/css-validator/

# 3. Probar localmente
open index.html

# 4. Verificar git status
git status

# 5. Verificar tamaño de archivos
ls -lh PORTFOLIO/*.pdf
```

### Post-Deploy
- [ ] Sitio carga correctamente
- [ ] Todos los enlaces funcionan
- [ ] PDFs se abren en nueva pestaña
- [ ] Responsive funciona en móvil
- [ ] No hay errores en consola del navegador

## Workflows Comunes

### Actualización Rápida de Texto
```bash
# 1. Editar index.html
# 2. Commit y push
git add index.html
git commit -m "Actualizar descripción en sección About"
git push
```

### Añadir Múltiples Proyectos
```bash
# 1. Copiar todos los PDFs
cp ~/Downloads/proyecto*.pdf PORTFOLIO/

# 2. Optimizar todos
cd PORTFOLIO
for pdf in proyecto*.pdf; do
    ./optimize_pdfs.sh "$pdf"
    mv "optimized/$pdf" "$pdf"
done

# 3. Actualizar HTML con todos los proyectos
# 4. Commit
git add PORTFOLIO/*.pdf index.html
git commit -m "Añadir 3 nuevos proyectos al portfolio"
git push
```

### Refresh Completo del Diseño
```bash
# 1. Actualizar style.css
# 2. Probar localmente
open index.html

# 3. Ajustar según necesidad
# 4. Commit
git add style.css
git commit -m "Actualizar diseño con nueva paleta de colores"
git push
```

## Recursos Útiles

- **GitHub Pages Docs**: https://docs.github.com/pages
- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/
- **Lighthouse**: Chrome DevTools > Lighthouse
- **Google Fonts**: https://fonts.google.com/

## Comandos Rápidos

```bash
# Ver el sitio
open index.html

# Servidor local
python3 -m http.server 8000

# Git status
git status

# Optimizar PDFs
cd PORTFOLIO && ./optimize_pdfs.sh "archivo.pdf"

# Ver tamaños
ls -lh PORTFOLIO/*.pdf

# Push rápido
git add . && git commit -m "mensaje" && git push
```
