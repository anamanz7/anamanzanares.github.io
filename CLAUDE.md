# Portfolio Web de Ana Manzanares — Contexto Global para Claude Code

## 🌐 Qué es este sitio

Portfolio profesional de Ana Manzanares, diseñadora de interiores con base en la Costa del Sol.
- **URL producción**: https://anamanzanares.github.io/my-life/
- **Repositorio**: https://github.com/anamanzanares/my-life
- **Hosting**: GitHub Pages (rama `main`, raíz del repositorio)
- **Stack**: HTML5 + CSS3 + Vanilla JS — sin frameworks, sin build tools, sin dependencias
- **Idiomas**: Español (principal) + Inglés (switchable en runtime)

---

## 📐 Arquitectura del sitio — Multi-página estática

El sitio tiene una página principal (`index.html`) y páginas independientes por sección. **No hay overlays ni modales.** Cada vista es una página real con su propia URL.

```
index.html       ← Home: carrusel + portfolio + cv mini + contacto
about.html       ← Página "Sobre mí" (bio + capacidades + stats)
cv.html          ← Página "Curriculum Vitae" completo
project.html     ← Plantilla de proyecto; lee ?id= de la URL
style.css        ← Todos los estilos compartidos (variables CSS en :root)
script.js        ← Lógica compartida: carrusel, idioma, lightbox, initProjectPage()
fonts/           ← Fuente custom Fabada (para el nombre del header)
PORTFOLIO/       ← Imágenes y PDFs de proyectos (ver PORTFOLIO/CLAUDE.md)
paleta-colores.png ← Referencia visual de la paleta
```

### Flujo de navegación
- **Home** (`index.html`) → carrusel, portfolio, mini-CV, contacto
- **Sobre mí** (`about.html`) → bio, capacidades, stats
- **CV** (`cv.html`) → experiencia, formación, herramientas, idiomas
- **Proyecto** (`project.html?id=bom`) → hero imagen + renders + planos + descripción

### Comportamiento del header en páginas interiores
- `about.html` y `cv.html` tienen `<body class="page-inner">` → header arranca con estilo claro (texto `--dark-mauve`) sin flash
- `project.html` no tiene `page-inner` → header transparente sobre la imagen hero oscura del proyecto

---

## 🎨 Sistema de Diseño

### Variables CSS — paleta metálica neutra
```css
--cream: #f8f6f4          /* Fondo principal muy claro */
--light-beige: #ebe6e3    /* Fondo secciones alternas */
--beige-accent: #d4c4ba   /* Acentos beige */
--sand: #c4a9a0           /* Arena rosácea */
--metallic-rose: #c9a9a1  /* Rosa metálico — COLOR DE MARCA */
--metallic-mauve: #b39b9a /* Malva metálico */
--dark-mauve: #8b7074     /* Malva oscuro — acentos/textos */
--dark-text: #2a2a2a      /* Texto principal */
--soft-gray: #666         /* Texto secundario */
--white: #ffffff
```

### Tipografía
- **Nombre "Ana Manzanares" en header**: `Fabada` (custom, `fonts/Fabada-regular.ttf`) — elegante, única
- **Todo el resto**: `Montserrat` (Google Fonts, pesos 300/400/500/600)
- Fallbacks: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`

### Comportamiento del header
- **Sobre fondo oscuro** (carrusel/hero de proyecto): texto `--light-beige`, hamburger claro
- **Sobre fondo claro** (secciones claras o páginas interiores): clase `.light-bg` → texto `--dark-mauve`
- **Al hacer scroll >200px**: clase `.scrolled` → header compacto, fuente más pequeña
- **Menú lateral** (hamburger): aparece desde la izquierda, fondo crema degradado

### Filosofía visual
- Minimalista, mucho espacio en blanco, sin colores saturados
- Animaciones sutiles (fade-in con IntersectionObserver, transiciones 0.4s ease)
- Grid del portfolio: irregular (asimétrico), no cuadrícula perfecta
- **Sin overlays/modales** — toda navegación usa URLs reales

---

## 📋 Páginas del sitio

| Archivo | URL | Contenido |
|---|---|---|
| `index.html` | `/` | Carrusel hero + portfolio grid + mini-CV + contacto |
| `about.html` | `/about.html` | Bio + capacidades (4 áreas) + stats numéricos |
| `cv.html` | `/cv.html` | Perfil + experiencia + formación + software + idiomas |
| `project.html?id=bom` | `/project.html?id=bom` | Proyecto BOM |
| `project.html?id=mas-creation` | `/project.html?id=mas-creation` | Proyecto MAS Creation |
| `project.html?id=residencial` | `/project.html?id=residencial` | Casa Mijas |

### Estructura del header en las páginas secundarias
El `<h1>` lleva un `<a href="index.html" class="header-home-link">` para que el nombre sea clickable y lleve al home.

---

## 📁 Proyectos del Portfolio

Los datos completos viven en `script.js` → objeto `projectsData`. Ver rutas exactas en `PORTFOLIO/CLAUDE.md`.

### BOM (2024) — `projectsData['bom']`
Bombonería boutique art déco en Almería, edificio protegido patrimonio.
- 4 renders + 6 planos/docs técnicos

### MAS Creation (2018) — `projectsData['mas-creation']`
Flagship store en container marítimo 12m para Masquespacio. Inspirado en la "Too Much Chair".
- 8 renders (día/noche) + 7 planos/docs

### Casa Mijas (2024) — `projectsData['residencial']`
Vivienda residencial en Mijas, estilo contemporáneo mediterráneo.
- 6 renders de estancias + planos: vacío [] (pendiente añadir)

### Para añadir un nuevo proyecto
1. Añadir imágenes en `PORTFOLIO/[NOMBRE]/`
2. Añadir objeto en `projectsData` en `script.js` con: `title`, `year`, `category {es, en}`, `heroImage`, `description {es, en}`, `renderizados[]`, `planos[]`
3. Añadir `<article class="feat-card">` en `#portfolio` en `index.html` con `href="project.html?id=[nuevo-id]"`
4. Añadir slide en `#carousel-hero` si se desea destacar (también actualizar enlace a `project.html?id=...`)

---

## 🔄 Sistema de Traducción ES/EN

```html
<!-- Patrón en HTML — SIEMPRE usar en textos visibles nuevos: -->
<p data-es="Texto en español" data-en="English text">Texto en español</p>
```

```js
// En script.js:
// - switchLanguage(lang) actualiza TODOS los [data-es][data-en]
// - Se persiste en localStorage('preferredLanguage')
// - En project.html, al cambiar idioma → llama initProjectPage() para refrescar contenido
// - Las descripciones en projectsData también son bilingüe: { es: '...', en: '...' }
```

---

## ⚙️ Funciones JavaScript clave

| Función | Dónde se usa | Descripción |
|---|---|---|
| `initProjectPage()` | `project.html` (auto) | Lee `?id=` de la URL, puebla el DOM con datos de `projectsData` |
| `openLightbox(images, idx)` | `project.html` | Lightbox de imágenes con navegación (teclado, click) |
| `switchLanguage(lang)` | Todas las páginas | Cambia idioma global, guarda en localStorage |
| `toggleDarkMode()` | Todas las páginas | Alterna tema claro/oscuro |

**Variables globales** (necesarias para que `initProjectPage()` y la traducción funcionen):
- `currentLanguage` — idioma actual ('es' o 'en')
- `projectsData` — objeto con todos los datos de proyectos

**`initProjectPage()` se auto-invoca**: el `DOMContentLoaded` de `script.js` detecta si existe `#project-title` en el DOM y llama la función automáticamente — no hace falta `onclick`.

---

## 🖼️ Carrusel Hero (solo en index.html)

```
Slide 1 → MAS-CREATION/images/1 NOCHE.jpg       → project.html?id=mas-creation
Slide 2 → BOM/imagenes/render-escaparate-1-ok.png → project.html?id=bom
Slide 3 → ECI/mijas/dormitorio-ppal.jpg          → project.html?id=residencial
```
- Autoplay: 5 segundos
- Pausa: hover del mouse
- Navegación: flechas, dots, teclado (←/→), swipe táctil

---

## 👩‍💼 Identidad Profesional de Ana

- **Profesión**: Diseñadora de Interiores
- **Empresa**: Decor Studio, El Corte Inglés Puerto Banús (2022-actualidad)
- **Escala**: ~30 proyectos/año, >1.000.000€ ventas anuales
- **Formación**: Estudios Superiores Diseño de Interiores, Escuela de Artes Almería (2018-2022)
- **Idiomas**: Español nativo, Inglés B2 en progreso (III School, Marbella)
- **Software**: AutoCAD, SketchUp, Vray, Enscape, Photoshop, InDesign, Illustrator, Procreate, Dialux, MS Office
- **Contacto web**: @anamanz_ (Instagram), anamanzanaresg@gmail.com
- **CV PDF**: `PORTFOLIO/CURRICULUM ANA .pdf` (tiene espacio en el nombre — no renombrar sin actualizar `cv.html`)

---

## 🤖 Infraestructura Automática

### Auto-commit (Launchd macOS)
- Commits cada 10 minutos → push → GitHub Pages actualizado
- Logs: `.auto-commit.log`, `.auto-commit-stderr.log`
- Control: `./manage-autocommit.sh [status|logs|now|stop|start]`
- Manual: `./auto-commit.sh "mensaje"`

### Scripts en PORTFOLIO/
- `OPTIMIZAR_PDFS.sh` — Ghostscript para PDFs
- `optimize_images.sh` — optimiza imágenes para web
- `convert_bom_pdf.py` — convierte PDF a imágenes

### Desarrollo local
```bash
python3 -m http.server 8000  # luego abrir http://localhost:8000
```

---

## 📝 Convenciones de Código

- **Indentación**: 4 espacios (HTML, CSS, JS)
- **HTML**: semántico, `alt` en todas las imágenes, `aria-label` en botones
- **CSS**: variables CSS para colores, comentarios de sección, mobile-first
- **JS**: funciones globales para detección automática de página, secciones con `// ====` comentarios
- **Versioning de assets**: `style.css?v=X.X.X` y `script.js?v=X.X.X` — incrementar al hacer cambios importantes para invalidar caché
- **Commits**: descriptivos en español

---

## 📋 TODOs / Mejoras Pendientes

- [ ] Añadir 4º proyecto (villa-1 de ECI u otro trabajo reciente)
- [ ] Planos técnicos para "Casa Mijas" (actualmente `planos: []`)
- [ ] Foto/retrato profesional de Ana en `about.html` (actualmente placeholder)
- [ ] Formulario de contacto funcional (actualmente solo links a email/Instagram)
- [ ] Optimizar imágenes del carrusel (son las más pesadas en carga inicial)
- [ ] Analytics (Google Analytics o Plausible.io)
- [ ] Meta tags OG específicos por página (og:image, og:url diferente por proyecto)

---

## 🚫 Reglas Importantes

- NUNCA commitear `.DS_Store`, `.env*`, archivos de log grandes
- El nombre del PDF tiene espacio: `CURRICULUM ANA .pdf` — no renombrar sin actualizar `cv.html`
- Las imágenes con espacios en nombre (ej. `1 DIA HORIZ.jpg`) funcionan directamente en `src=`
- Las variables `projectsData` y `currentLanguage` deben permanecer globales en `script.js`
- Mantener coherencia visual: NO añadir colores fuera de la paleta de variables CSS
- **NO volver a overlays/modales** — la arquitectura es de páginas independientes
- Los enlaces entre páginas usan rutas relativas simples (`about.html`, `cv.html`, `project.html?id=X`)
