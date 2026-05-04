# Plan de Mejoras — Portfolio Ana Manzanares
_Fecha: 2026-05-04 · Estado: Pendiente de ejecutar_

---

## Resumen de fases

| Fase | Qué | Archivos | Bloqueado por |
|---|---|---|---|
| 1 | Meta tags SEO + Favicon | `index.html` | — |
| 2 | Migrar contenido del newdesign | `index.html`, `script.js` | — |
| 3 | Modo oscuro | `index.html`, `style.css`, `script.js` | — |
| 4 | Simplificación del código | `style.css`, `script.js`, `index.html` | — |
| 5 | Optimizar imágenes carrusel | `PORTFOLIO/` scripts | — |
| 6 | 4º proyecto + Planos Casa Mijas | `index.html`, `script.js` | Pendiente assets de Ana |

---

## Fase 1 — Técnico inmediato

### 1.1 Meta tags SEO
**Dónde:** `index.html` → dentro de `<head>`, después del `<title>`

Añadir:
```html
<meta name="description" content="Portfolio de Ana Manzanares, diseñadora de interiores en la Costa del Sol. Proyectos residenciales, comerciales y efímeros.">
<meta name="author" content="Ana Manzanares">
<meta property="og:title" content="Ana Manzanares — Diseñadora de Interiores">
<meta property="og:description" content="Proyectos llave en mano en la Costa del Sol. Residencial, comercial y efímero.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://anamanzanares.github.io/my-life/">
<meta property="og:image" content="https://anamanzanares.github.io/my-life/PORTFOLIO/MAS-CREATION/images/1 NOCHE.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Ana Manzanares — Diseñadora de Interiores">
<meta name="twitter:image" content="https://anamanzanares.github.io/my-life/PORTFOLIO/MAS-CREATION/images/1 NOCHE.jpg">
```

### 1.2 Favicon SVG
**Qué:** Crear `favicon.svg` en la raíz con las iniciales "AM" en `--metallic-rose` (#c9a9a1) sobre fondo oscuro.  
**Dónde:** `index.html` → añadir `<link rel="icon" type="image/svg+xml" href="favicon.svg">` en `<head>`

---

## Fase 2 — Migrar contenido del newdesign

Todo el contenido ya existe en `newdesign/data.js`. No hay que inventar nada, solo trasladarlo al sitio actual.

### 2.1 Sección "Capacidades"
**Qué:** Nueva sección con 4 tarjetas de servicios, entre el portfolio y el CV.  
**Fuente:** `newdesign/data.js` → array `SERVICES` (ya tiene ES + EN):

- **Gestión integral** — proyectos de principio a fin, llave en mano
- **Documentación técnica** — AutoCAD, plantas, alzados, memorias
- **Visualización 3D** — SketchUp + Vray + Enscape, renders y vídeos
- **Cliente internacional** — experiencia en Costa del Sol, español e inglés

**Archivos afectados:** `index.html` (nueva `<section id="capacidades">`), `style.css` (estilos tarjetas), `script.js` (textos bilingüe si aplica)

### 2.2 Stats en overlay "Sobre mí"
**Qué:** 4 números clave debajo del texto de presentación.  
**Fuente:** `newdesign/data.js` → `COPY.about.stats`:
- `30+` Proyectos al año
- `1M€+` Ventas anuales
- `2022` En la práctica
- `ES · EN` Idiomas de trabajo

**Dónde:** `index.html` → dentro de `#about-view`, al final del bloque de texto

### 2.3 Enriquecer fichas de proyectos
**Qué:** Añadir a cada proyecto en `projectsData` (script.js): párrafos de historia (`story`), lista de materiales (`materials`), location, client y role.  
**Fuente:** `newdesign/data.js` → objetos dentro de `PROJECTS`  
**Cómo se muestra:** En `#project-view`, añadir bloque "Historia del proyecto" + "Materiales" bajo la descripción actual.  
Ejemplo para MAS Creation ya tiene 3 párrafos de story en ES y EN listos para copiar.

### 2.4 Texto de contacto mejorado
**Qué:** Reemplazar el texto actual de contacto por el copy del newdesign, más directo sobre buscar estudio.  
**Fuente:** `newdesign/data.js` → `COPY.contact.body` (ES + EN)  
**Dónde:** `index.html` → `<section id="contact">` → párrafo de presentación

### 2.5 Eyebrow en el carrusel hero
**Qué:** Añadir línea de contexto encima del título en el hero.  
**Fuente:** `newdesign/data.js` → `COPY.hero.eyebrow`  
**Texto:** "Estudio independiente · Costa del Sol" / "Independent practice · Costa del Sol"  
**Dónde:** Cada slide del carrusel, encima del título del proyecto

---

## Fase 3 — UX y funcionalidad

### 3.1 Modo oscuro
**Archivos:** `style.css`, `script.js`, `index.html`

**Implementación:**
1. `style.css` — Duplicar las variables de `:root` bajo `[data-theme="dark"]`:
   - Fondos: `--cream: #1a1717`, `--light-beige: #221e1e`, etc.
   - Conservar `--metallic-rose` y `--metallic-mauve` intactos (son la marca)
   - Textos: `--dark-text: #f0ece9`, `--soft-gray: #b0a8a5`
2. `index.html` — Añadir botón sol/luna en el menú lateral, junto al toggle de idioma
3. `script.js` — Función `toggleDarkMode()`:
   - `document.documentElement.setAttribute('data-theme', 'dark'/'light')`
   - Persiste en `localStorage('preferredTheme')`
   - Al cargar: leer preferencia guardada y aplicar

**Criterio de paleta oscura:** No negro puro OLED — usar tonos oscuros cálidos coherentes con los `--dark-*` existentes.

---

## Fase 4 — Simplificación del código

### 4.1 Auditar CSS (`style.css`)
- Identificar variables CSS duplicadas o sin usar tras los rediseños recientes
- Consolidar media queries del mismo breakpoint que estén dispersas
- Eliminar reglas solapadas o contradictorias del rediseño del footer y portfolio grid
- Objetivo: reducir el archivo sin cambiar nada visual

### 4.2 Auditar JS (`script.js`)
- Revisar funciones similares que se puedan unificar
- Eliminar `console.log` o código comentado
- Verificar que no hay event listeners duplicados tras los últimos cambios

### 4.3 Auditar HTML (`index.html`)
- Eliminar `<div>` wrapper innecesarios (divs sin clase ni función)
- Simplificar atributos redundantes
- Verificar que todos los `data-es`/`data-en` están correctamente puestos en los textos nuevos

---

## Fase 5 — Rendimiento

### 5.1 Optimizar imágenes del carrusel
Las 3 imágenes del hero son las más pesadas en carga inicial:
- `PORTFOLIO/MAS-CREATION/images/1 NOCHE.jpg`
- `PORTFOLIO/BOM/imagenes/render-escaparate-1-ok.png`
- `PORTFOLIO/ECI/mijas/dormitorio-ppal.png`

**Cómo:** Ejecutar `PORTFOLIO/optimize_images.sh` sobre estas 3 imágenes específicamente.  
**Criterio:** Reducir a máximo 300KB por imagen manteniendo calidad visual aceptable en pantalla.

---

## Fase 6 — Pendiente de assets (Ana)

### 6.1 4º proyecto
**Necesito:**
- Carpeta con imágenes de renders y planos
- Título, año, categoría
- Descripción breve (o usar el formato story de los proyectos del newdesign)
- ¿Es el proyecto villa ECI mencionado en CLAUDE.md?

**Cuando llegue:** Añadir objeto en `projectsData` en `script.js` + `<article>` en `#portfolio` + slide en carrusel si se quiere destacar.

### 6.2 Planos técnicos Casa Mijas
**Necesito:** Archivos de planos (imágenes o PDF convertido a imágenes)  
**Cuando llegue:** Añadir paths al array `planos: []` vacío en `projectsData['residencial']`

---

## Orden de ejecución recomendado

1. Fase 1 (meta tags + favicon) — rápido, sin riesgo
2. Fase 2.1–2.5 (migrar contenido newdesign) — mejora de contenido visible
3. Fase 4 (simplificación) — saneamiento del código
4. Fase 3.1 (modo oscuro) — el más complejo
5. Fase 5 (imágenes) — optimización final
7. Fase 6 (cuando Ana tenga los assets)

---

## Notas técnicas

- Incrementar versión en `style.css?v=X.X.X` y `script.js?v=X.X.X` en cada cambio importante
- Todo texto nuevo debe seguir el patrón `data-es="..." data-en="..."` para respetar el sistema de traducción
- Los colores del modo oscuro deben usar exclusivamente variables CSS ya existentes — no introducir nuevos valores hex
