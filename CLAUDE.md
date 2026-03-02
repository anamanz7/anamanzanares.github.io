# Portfolio Web de Ana Manzanares — Contexto Global para Claude Code

## 🌐 Qué es este sitio

Portfolio profesional de Ana Manzanares, diseñadora de interiores con base en la Costa del Sol.
- **URL producción**: https://anamanzanares.github.io/my-life/
- **Repositorio**: https://github.com/anamanzanares/my-life
- **Hosting**: GitHub Pages (rama `main`, raíz del repositorio)
- **Stack**: HTML5 + CSS3 + Vanilla JS — sin frameworks, sin build tools, sin dependencias
- **Idiomas**: Español (principal) + Inglés (switchable en runtime)

---

## 📐 Arquitectura del sitio — SPA manual

El sitio es una única página `index.html` con secciones verticales. Las "vistas" secundarias son overlays CSS/JS que se superponen con `position: fixed` y clase `.show`.

```
index.html       ← Toda la estructura HTML
style.css        ← Todos los estilos (con variables CSS en :root)
script.js        ← Toda la lógica: carrusel, proyectos, idioma, lightbox, CV
fonts/           ← Fuente custom Fabada (para el nombre del header)
emojis/          ← Assets de emojis (no usados actualmente)
PORTFOLIO/       ← Imágenes y PDFs de proyectos (ver PORTFOLIO/CLAUDE.md)
paleta-colores.png ← Referencia visual de la paleta
```

### Flujo de vistas (3 estados)
1. **Página principal** → secciones: Carrusel → Sobre mí → Portfolio → CV → Contacto
2. **Vista de proyecto** (`#project/[id]`) → overlay fullscreen con renders + planos + descripción
3. **Vista de CV** (`#cv-view`) → overlay fullscreen con CV detallado

### Sistema de URL/hash
```js
history.pushState({ projectId }, '', `#project/mas-creation`);  // abre proyecto
history.pushState({ cvView: true }, '', '#cv-view');             // abre CV
// Al cargar: detecta hash → restaura vista
// popstate: cierra vistas al navegar atrás
```

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
- **Sobre fondo oscuro** (carrusel/hero): texto color `--light-beige`, hamburger claro
- **Sobre fondo claro** (secciones): clase `.light-bg` → texto `--dark-mauve`, hamburger oscuro
- **Al hacer scroll >200px**: clase `.scrolled` → header compacto, fuente más pequeña
- **Menú lateral** (hamburger): aparece desde la izquierda, fondo crema degradado

### Filosofía visual
- Minimalista, mucho espacio en blanco, sin colores saturados
- Animaciones sutiles (fade-in con IntersectionObserver, transiciones 0.4s ease)
- Grid del portfolio: irregular (asimétrico), no cuadrícula perfecta

---

## 📋 Secciones del sitio

| ID | Nombre | Contenido |
|---|---|---|
| `#carousel-hero` | Carrusel | 3 slides fullscreen, caption clickable → abre proyecto |
| `#about` | Sobre mí | Bio profesional, 2-3 párrafos |
| `#portfolio` | Portfolio | Grid irregular, 3 tarjetas con hover overlay |
| `#cv` | Curriculum | Enlace para abrir overlay del CV |
| `#contact` | Contacto | Instagram + email |
| `#project-view` | Vista Proyecto | Overlay: hero + grid renders + grid planos + descripción |
| `#cv-view` | Vista CV | Overlay: experiencia, formación, herramientas (círculos SVG), idiomas |

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
3. Añadir `<article class="portfolio-card">` en `#portfolio` en `index.html`
4. Añadir slide en `#carousel-hero` si se desea destacar

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
// - Si hay proyecto abierto al cambiar idioma → se recarga automáticamente
// - Las descripciones en projectsData también son billingüe: { es: '...', en: '...' }
```

---

## ⚙️ Funciones JavaScript clave

| Función | Descripción |
|---|---|
| `openProject(event, id)` | Rellena y muestra overlay de proyecto desde `projectsData` |
| `closeProject()` | Cierra overlay de proyecto |
| `openCVView(event)` | Abre overlay del CV completo |
| `closeCVView()` | Cierra overlay del CV |
| `openLightbox(images, idx)` | Lightbox de imágenes con navegación (teclado, click) |
| `switchLanguage(lang)` | Cambia idioma global, guarda en localStorage |

**Variables globales** (necesarias porque `onclick` en HTML las llama directamente):
- `currentLanguage` — idioma actual ('es' o 'en')
- `projectsData` — objeto con todos los datos de proyectos

---

## 🖼️ Carrusel Hero

```
Slide 1 → MAS-CREATION/images/1 NOCHE.jpg   → openProject('mas-creation')
Slide 2 → BOM/imagenes/render-escaparate-1-ok.png → openProject('bom')
Slide 3 → ECI/mijas/dormitorio-ppal.png     → openProject('residencial')
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
- **CV PDF**: `PORTFOLIO/CURRICULUM ANA .pdf` (tiene espacio en el nombre — no renombrar sin actualizar HTML)

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
- **JS**: funciones globales para `onclick` HTML, secciones con `// ====` comentarios
- **Versioning de assets**: `style.css?v=X.X.X` y `script.js?v=X.X.X` — incrementar al hacer cambios importantes para invalidar caché
- **Commits**: descriptivos en español

---

## 📋 TODOs / Mejoras Pendientes

- [ ] Meta tags SEO (description, og:image, twitter:card)
- [ ] Favicon personalizado
- [ ] Añadir 4º proyecto (villa-1 de ECI u otro trabajo reciente)
- [ ] Planos técnicos para "Casa Mijas" (actualmente `planos: []`)
- [ ] Optimizar imágenes del carrusel (son las más pesadas en carga inicial)
- [ ] Sección "Proceso / Servicios" o "Sobre mi trabajo"
- [ ] Formulario de contacto funcional (actualmente solo son links)
- [ ] Analytics (Google Analytics o Plausible.io)

---

## 🚫 Reglas Importantes

- NUNCA commitear `.DS_Store`, `.env*`, archivos de log grandes
- El nombre del PDF tiene espacio: `CURRICULUM ANA .pdf` — no renombrar sin actualizar `index.html`
- Las imágenes con espacios en nombre (ej. `1 DIA HORIZ.jpg`) funcionan directamente en `src=`
- Las variables `projectsData` y `currentLanguage` deben permanecer globales en `script.js`
- Mantener coherencia visual: NO añadir colores fuera de la paleta de variables CSS
