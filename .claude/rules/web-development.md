---
paths: ["**/*.html", "**/*.css", "**/*.js"]
description: Estándares para desarrollo web del portfolio
---

# Reglas de Desarrollo Web

## HTML

### Estructura y Semántica
- Usar HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Mantener jerarquía lógica de encabezados (h1 > h2 > h3)
- Un solo `<h1>` por página
- Usar `<div>` solo cuando no hay alternativa semántica

### Accesibilidad
- Todos los `<img>` deben tener atributo `alt` descriptivo
- Usar atributos ARIA cuando sea necesario
- Enlaces descriptivos (evitar "click aquí")
- Contraste de colores adecuado (mínimo 4.5:1)
- Navegación con teclado funcional

### Rendimiento
- Preconectar a fuentes externas (`<link rel="preconnect">`)
- Usar `loading="lazy"` para imágenes below the fold
- Minificar HTML en producción si es posible
- Evitar inline styles excesivos

### Estructura
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título descriptivo</title>
    <!-- Meta tags SEO -->
    <meta name="description" content="Descripción">
    <!-- Estilos -->
</head>
<body>
    <!-- Contenido -->
</body>
</html>
```

### Indentación
- 4 espacios por nivel
- Cerrar tags apropiadamente
- Mantener código limpio y legible

## CSS

### Organización
1. Variables CSS (custom properties)
2. Reset/Normalize
3. Estilos globales (body, html)
4. Layout principal
5. Componentes
6. Utilidades
7. Media queries

### Nomenclatura
- Clases descriptivas en español o inglés consistente
- Kebab-case para clases: `.portfolio-item`, `.hero-content`
- BEM si se necesita mayor estructura
- Evitar IDs para estilos (usar clases)

### Mobile-First
```css
/* Estilos móvil por defecto */
.element {
    width: 100%;
}

/* Tablet y superior */
@media (min-width: 768px) {
    .element {
        width: 50%;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .element {
        width: 33.333%;
    }
}
```

### Variables CSS
```css
:root {
    --primary-color: #333;
    --secondary-color: #666;
    --spacing-unit: 1rem;
    --max-width: 1200px;
}
```

### Rendimiento
- Evitar selectores complejos y anidados profundos
- Minimizar uso de `!important`
- Agrupar media queries cuando sea posible
- Comentar secciones importantes

### Indentación
- 4 espacios por nivel
- Una propiedad por línea
- Espacio después de `:`

```css
.selector {
    property: value;
    another-property: value;
}
```

## JavaScript

### Cuando Usarlo
- Preferir CSS puro para animaciones y efectos simples
- Usar JS solo para interactividad que CSS no puede lograr
- Mantener JS mínimo para mejor rendimiento

### Estándares
- ES6+ (const/let, arrow functions, template literals)
- Evitar jQuery si no es necesario
- Código modular y reutilizable
- Comentarios para lógica compleja

### Ejemplo
```javascript
// Navegación smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
```

## Diseño Visual

### Paleta de Colores
- Mantener paleta consistente definida en variables CSS
- Tonos neutros con acentos sutiles
- Alto contraste para legibilidad
- Coherencia en todo el sitio

### Tipografía
- Fuente principal: Montserrat (o similar sans-serif)
- Escala tipográfica consistente
- Line-height: 1.5-1.6 para texto
- Tamaños responsivos

### Espaciado
- Usar sistema de espaciado consistente
- Múltiplos de 4px o 8px
- Breathing room adecuado
- Padding/margin coherentes

### Imágenes
- Formato WebP cuando sea posible (con fallback)
- Optimizar todas las imágenes antes de usar
- Tamaños apropiados (no usar 4000px cuando se necesitan 800px)
- Aspect ratio consistente en grids

## Testing

### Navegadores
- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

### Dispositivos
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

### Checklist Pre-Deploy
- [ ] Probar en diferentes navegadores
- [ ] Probar en diferentes tamaños de pantalla
- [ ] Verificar que todos los enlaces funcionan
- [ ] Verificar que PDFs se abren correctamente
- [ ] Validar HTML (W3C Validator)
- [ ] Validar CSS
- [ ] Optimizar imágenes y PDFs
- [ ] Revisar rendimiento (Lighthouse)
- [ ] Verificar accesibilidad básica

## SEO Básico

### Meta Tags Esenciales
```html
<meta name="description" content="Portfolio profesional de Ana Manzanares">
<meta name="keywords" content="portfolio, diseño, proyectos">
<meta name="author" content="Ana Manzanares">
<meta property="og:title" content="Ana Manzanares - Portfolio">
<meta property="og:description" content="Portfolio profesional">
<meta property="og:image" content="url-imagen.jpg">
```

### Buenas Prácticas
- URLs descriptivas
- Estructura de encabezados lógica
- Texto alt en imágenes
- Tiempo de carga rápido
- Mobile-friendly
- HTTPS (GitHub Pages lo provee automáticamente)
