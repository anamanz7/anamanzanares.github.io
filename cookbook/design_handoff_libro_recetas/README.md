# Handoff — Libro de Recetas

Una app web personal para guardar, escribir y cocinar recetas. Editorial, cálida, con tipografía protagonista.

---

## Qué hay en este paquete

```
design_handoff_libro_recetas/
├── README.md                ← este archivo (la especificación)
├── screenshots/             ← una imagen por pantalla (referencia visual rápida)
│   ├── 01-home-desktop.png
│   ├── 02-home-mobile.png
│   ├── 03-categorias-mobile.png
│   ├── 04-indice-desktop.png
│   ├── 05-buscar-mobile.png
│   ├── 06-compra-mobile.png
│   ├── 07-detalle-v1-editorial.png
│   ├── 08-detalle-v2-doble-columna.png
│   ├── 09-detalle-v3-revista.png
│   ├── 10-cocinar-mobile.png
│   ├── 11-cocinar-desktop.png
│   └── 12-nueva-receta-desktop.png
└── prototype/               ← los archivos del prototipo (referencia visual)
    ├── index.html
    ├── tokens.css           ← tokens CSS (colores, tipografía, espaciado)
    ├── app.jsx              ← entry React: canvas + tweaks
    ├── recipes.jsx          ← datos de recetas + componentes compartidos
    ├── screens-overview.jsx ← Home, Categorías
    ├── screens-list.jsx     ← Índice, Buscar, Compra
    ├── screens-detail.jsx   ← 3 variaciones de detalle de receta
    ├── screens-cook.jsx     ← Modo cocina + Nueva receta
    ├── design-canvas.jsx    ← (solo para el prototipo, no se lleva a producción)
    ├── tweaks-panel.jsx     ← (solo para el prototipo)
    ├── image-slot.js        ← (solo para el prototipo)
    └── fonts/Syne-VariableFont_wght.ttf
```

> **Importante**: los archivos en `prototype/` son **referencias de diseño hechas en HTML**, no código para copiar literalmente. La tarea es **recrear estos diseños en tu codebase real** — Next.js, SvelteKit, Astro, Remix, lo que prefieras — usando los patrones y librerías que tengas. Los archivos `design-canvas.jsx`, `tweaks-panel.jsx` e `image-slot.js` son utilidades del entorno de prototipo y **no se llevan a producción** — son andamiaje del canvas/tweaks que solo sirve para presentar opciones.

> **Sobre las screenshots**: están escaladas para entrar en una vista de captura y algunas pueden mostrar la pantalla recortada (sobre todo las desktop altas). Para la versión sin recortes, abre `prototype/index.html` en un navegador — verás todas las pantallas en un canvas pan/zoom donde puedes ampliar cualquiera a pantalla completa con el botón ⤢ que aparece al pasar el ratón sobre la etiqueta.

---

## Fidelidad

**Alta fidelidad (hi-fi).** Los colores, tipografías, tamaños, espaciados y comportamientos están definidos con precisión. El desarrollador debe reproducirlos pixel-perfect en el codebase de destino.

---

## Stack recomendado

Pensado para un único usuario (tú) o pocos, con foco en lectura offline mientras se cocina:

- **Framework**: Next.js (App Router) o SvelteKit
- **Estilos**: CSS variables + módulos CSS (o Tailwind con preset custom). Los tokens están en `tokens.css` listos para portar
- **Tipografía**: Syne (variable, pesos 400–800) — incluida en `fonts/`. Self-host con `@font-face`
- **Persistencia**: comienzo simple — un JSON en `/recipes` + fotos en `/public/photos/{id}.jpg`. Si quieres más, SQLite local (Drizzle/Prisma) o Notion API
- **Estado UI**: `useState`/`useReducer` para porciones y pasos. `localStorage` para timer y pasos completados
- **Imágenes**: `next/image` para optimización + lazy loading
- **Routing**: file-system del framework
- **Sin auth en v1** — es un cuaderno personal

---

## Design tokens

### Paleta

5 colores cálidos + 1 derivado oscuro para textos:

| Token            | Hex        | Uso                                     |
|------------------|------------|-----------------------------------------|
| `--color-beige`  | `#D9C8B4`  | Fondo principal (tema Crema), texto sobre Tinta |
| `--color-peach`  | `#F2B680`  | Fondo de fotos placeholder, acento suave |
| `--color-orange` | `#F2884B`  | Fondo de fotos, acento medio            |
| `--color-coral`  | `#D95A4E`  | Acento principal, fondo (tema Coral)    |
| `--color-red`    | `#F20505`  | Acento ocasional, fondo en una receta   |
| `--color-ink`    | `#2B0F0A`  | Texto sobre fondos claros, fondo (tema Tinta) |

### Roles semánticos (tres temas que rotan los 3 colores principales)

| Variable    | Tema Crema (default) | Tema Coral       | Tema Tinta       |
|-------------|---------------------|------------------|------------------|
| `--bg`      | `#D9C8B4` beige     | `#D95A4E` coral  | `#2B0F0A` tinta  |
| `--text`    | `#D95A4E` coral     | `#D9C8B4` beige  | `#D9C8B4` beige  |
| `--accent`  | `#2B0F0A` tinta     | `#2B0F0A` tinta  | `#D95A4E` coral  |
| `--border`  | = `--accent`        | = `--accent`     | = `--accent`     |

Activar tema con `[data-theme="a|m|c"]` en el `<html>` o en un wrapper:
- `a` = Crema (light)
- `m` = Coral (mid)
- `c` = Tinta (dark)

> **Nota de contraste**: el tema Coral tiene un ratio bg/text de ~2.7:1 (por debajo de WCAG AA 3:1). El sistema lo compensa exigiendo texto **siempre** ≥20px en peso 700+ o ≥24px en cualquier peso. Si tu codebase tiene un requisito estricto de a11y, considera oscurecer un poco el coral cuando se usa de bg.

### Tipografía — Syne variable

Una sola familia, tres pesos: 400 / 700 / 800.

| Token              | Tamaño | Peso | Line-height | Uso                                       |
|--------------------|--------|------|-------------|-------------------------------------------|
| `--fs-card-h1`     | 30px   | 800  | 1.2         | H1 de tarjeta                             |
| `--fs-item-desc`   | 24px   | 400  | 1.6         | Descripciones de pasos / items de lista   |
| `--fs-body`        | 22px   | 700  | 1.75        | Cuerpo de párrafo                         |
| `--fs-card-label`  | 20px   | 700  | —           | Eyebrow UPPERCASE, tracking 0.18em        |
| `--fs-item-h`      | 20px   | 800  | —           | Heading de lista / paso                   |
| `--fs-step-num`    | 20px   | 700  | —           | Número de paso (acento), tracking 0.08em  |
| `--fs-footer`      | 20px   | 700  | —           | Footer                                    |

**Display sizes** (no están en los tokens — usados inline en los hero):

| Pantalla              | Tamaño  | Peso | Letter-spacing |
|-----------------------|---------|------|----------------|
| Home title (desktop)  | 120px   | 800  | -0.025em       |
| Detalle V1 title      | 88px    | 800  | -0.025em       |
| Detalle V3 title      | 144px   | 800  | -0.035em       |
| Detalle V3 accent     | 64px    | 400  | italic         |
| Modo cocina nº paso   | 220px   | 800  | -0.06em        |
| Modo cocina título    | 64px    | 800  | -0.025em       |

**Reglas**:
- **Sentence case** en prosa y botones; **UPPERCASE + 0.18em tracking** en eyebrows y nav
- Nunca Title Case, nunca SCREAMING en body
- Nunca opacidad sobre texto
- `text-wrap: pretty` recomendado en cuerpos largos; `balance` en H1

**El patrón `titleAccent`**: dentro de un `<h1>`, un span en cursiva-anulada (`em.not-italic`) renderiza esa porción en color `--accent`. Así se consiguen dos colores en un mismo título:

```html
<h1>Recetas que ya cocinas — <em class="not-italic">escritas como las haces.</em></h1>
```

### Espaciado

Base 8px con excepciones documentadas.

| Token    | px   | Uso                                      |
|----------|------|------------------------------------------|
| `--sp-1` | 4    |                                          |
| `--sp-2` | 8    |                                          |
| `--sp-3` | 16   |                                          |
| `--sp-4` | 20   | Gap entre items de lista                 |
| `--sp-5` | 24   | Gap entre secciones                      |
| `--sp-6` | 28   | Padding horizontal de panel              |
| `--sp-7` | 36   | Padding vertical de tarjeta              |
| `--sp-8` | 40   | Footer py                                |
| `--sp-9` | 56   | Offset izquierdo de nav                  |
| `--sp-10`| 64   | Footer px                                |

**Densidad** (tweak del prototipo) — escala los tokens 3–10:
- `compact`: ≈70 % de los valores base
- `comfy`: valores base (default)
- `roomy`: ≈140 % de los valores base
- Los tamaños de fuente **NO cambian** con la densidad — solo el espaciado

### Bordes y radios

- **1px** en todas las reglas y separadores (`--bw-rule: 1px`)
- **0px** de border-radius en layout — diseño totalmente cuadrado
- **2px** solo en focus rings y skip-link (`--radius-focus: 2px`)
- Todos los bordes/reglas usan `var(--border)` = `var(--accent)` — es decir, los separadores siempre son del color de acento, no del color de texto

### Sombras

**Cero**. No usar `box-shadow` en componentes del libro. Si necesitas separar un bloque del fondo, usa una regla 1px.

### Motion

Dos sistemas, no más:

1. **Transición de tema** — `500ms ease` en `background-color, color, border-color, fill, stroke`
   ```css
   --t-colors: background-color 500ms ease, color 500ms ease,
               border-color 500ms ease, fill 500ms ease, stroke 500ms ease;
   ```
2. **Hover de link** — color shift al `--accent`, misma curva

**No** usar scale, fade, parallax, scroll-triggered reveals. La sobriedad es parte del lenguaje.

### Focus

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

---

## Modelo de datos

```ts
type Recipe = {
  id: string;               // slug; sirve también como nombre del archivo de foto
  title: string;
  titleAccent?: string;     // parte en color acento dentro del <h1>
  category: 'Bowls' | 'Pasta' | 'Cenas rápidas' | 'Brunch' | 'Postres';
  method: 'Sin horno' | 'Sin cocina' | 'Sartén' | 'Olla' | 'Airfryer' | 'Horno' | 'Tostadora';
  time: number;             // minutos
  servings: number;         // porciones base — se escalan en el detalle
  difficulty: 'Muy fácil' | 'Fácil' | 'Media' | 'Difícil';
  blurb: string;            // 1–2 frases para el índice/hero
  photo?: string;           // ruta a la imagen real (cuando exista)
  photoTone?: 'ink' | 'coral' | 'beige' | 'peach' | 'orange' | 'red';
                            // tono del placeholder SVG si no hay foto
  ingredients: { qty: string; unit: string; name: string }[];
  steps: { heading: string; desc: string }[];
  notes?: string;           // nota personal opcional al final
};

type ShoppingItem = {
  name: string;
  qty: string;
  recipe: string;     // de qué receta proviene
  done: boolean;
};

type ShoppingList = {
  fresco: ShoppingItem[];
  despensa: ShoppingItem[];
  nevera: ShoppingItem[];
};

type Category = { name: string; count: number };
```

**Datos seed** — usar los 8 ejemplos en `prototype/recipes.jsx` como contenido placeholder hasta que escribas las tuyas reales:
poke, ñoquis con pollo, calabacín airfryer, pasta al limón, tostada aguacate, ensalada garbanzos, curry rápido, salmón al horno.

---

## Rutas y pantallas

| Ruta                     | Pantalla                          | Componente sugerido | Archivo de referencia            |
|--------------------------|-----------------------------------|---------------------|----------------------------------|
| `/`                      | Home / portada del libro          | `HomePage`          | `screens-overview.jsx`           |
| `/recetas`               | Índice (cuadrícula + lista)       | `IndexPage`         | `screens-list.jsx`               |
| `/categorias`            | Listado de colecciones            | `CategoriesPage`    | `screens-overview.jsx`           |
| `/categorias/[slug]`     | Recetas de una categoría          | `CategoryPage`      | (variante del índice filtrado)   |
| `/buscar`                | Buscar por nombre/ingrediente     | `SearchPage`        | `screens-list.jsx`               |
| `/recetas/[id]`          | Detalle de receta                 | `RecipePage`        | `screens-detail.jsx`             |
| `/recetas/[id]/cocinar`  | Modo cocina (full-screen)         | `CookModePage`      | `screens-cook.jsx`               |
| `/nueva`                 | Crear/editar receta               | `RecipeFormPage`    | `screens-cook.jsx`               |
| `/compra`                | Lista de la compra                | `ShoppingPage`      | `screens-list.jsx`               |

---

## Especificación por pantalla

> **Convención**: cuando hablo de un "eyebrow" me refiero al label uppercase de 13–20px con tracking 0.18em en color `--accent`, p.ej. `"01 · ÍNDICE"`. Es un componente reutilizable: `<Eyebrow>...</Eyebrow>`.

### 1 · Home (`/`)

**Propósito**: portada del libro. Punto de entrada con identidad fuerte + navegación + actividad reciente.

**Layout desktop (1440 px ancho)** — grid 3 filas: header / centro / footer
- **Padding**: `var(--sp-10)` en todos los lados
- **Header** (flex space-between):
  - Izq: eyebrow "UN CUADERNO · 2026" + título `libro-recetas` (36px, 800, leading 1.05)
  - Der: nav `Índice / Categorías / Compra / Nueva` con número 0N delante de cada uno (eyebrow + label inline)
- **Centro** (grid 1.3fr / 1fr, gap `--sp-10`):
  - Izq: H1 gigante (120px, 800, leading 0.92, tracking -0.025em) — *"Recetas que ya cocinas — escritas como las haces."* La segunda parte (después del em-dash) va en `--accent` vía `<em class="not-italic">`.
  - Bajo el H1: párrafo introductorio (22px, 700, max-width 560px)
  - Der: bloque "Últimas cocinadas" — eyebrow + lista de las 3 últimas recetas. Cada item: thumbnail SVG/foto 64×64 + título 20px/800 + meta "MÉTODO · X MIN" en eyebrow style + flecha `→` en `--accent`. Separadas por reglas 1px.
- **Footer** (grid 4 columnas): stats grandes (56px/800) — `24 recetas guardadas`, `6 colecciones`, `142 veces cocinadas`, `12 esta semana en la compra`. Por encima del grid, una regla 1px.

**Layout móvil (390 px)**:
- Status bar fake arriba (hora 9:41 + indicador `● ● ●`)
- Eyebrow + H1 (48px, 800, balance)
- Párrafo (18px, 700)
- Nav vertical: cada link es una fila con `0N` + nombre (24px/800) + meta a la derecha + regla 1px abajo
- Bloque "Últimas cocinadas" pegado abajo: 3 mini-thumbnails en grid horizontal, 48×48 + título 13px

### 2 · Categorías (`/categorias`)

**Móvil (390 px)** — pantalla scrolleable:
- Top bar: link "← Inicio" + indicador
- Eyebrow "02 · CATEGORÍAS"
- H1 (42px, 800, tracking -0.02em)
- Lista de categorías: cada categoría es un row con
  - Nombre (28px, 800)
  - Contador (`02`, eyebrow, color `--accent`)
  - Si tiene recetas: hilera de 3 thumbnails 48×48 debajo
  - Si vacía: "Aún por escribir." en `--accent`
  - Separadas por reglas 1px

### 3 · Índice (`/recetas`)

**Desktop (1440 px)** — pantalla scrolleable.

- **Top bar**: "← Inicio" + contador "08 / 08 RECETAS" en eyebrow
- **H1 (96px/800)**: *"Todo lo que sabes cocinar — en una sola página."* (segunda parte en accent)
- **Barra de filtros**:
  - Chips a la izquierda: `Todas`, `< 20 min`, `Bowls`, `Pasta`, `Airfryer`, `Sin horno`
  - Toggle a la derecha: `Cuadrícula` / `Lista`
  - Chip = `border: 1px solid var(--accent); padding: 8px 14px; fontSize: 14px/700; letterSpacing: 0.06em; background: transparent` — al hover, color `--accent`. Activo: `background: var(--accent); color: var(--bg)`. **Sin border-radius**.
- **Vista cuadrícula**: grid 4 columnas, gap `var(--sp-6)`. Cada tarjeta es un link con:
  - Imagen 4:3 (full width)
  - Eyebrow `0N · CATEGORÍA` (13px)
  - H2 (24px, 800, leading 1.1)
  - Meta `XX MIN · MÉTODO` (14px, 700, tracking 0.08em)
  - Hover: el H2 cambia a `--accent`
- **Vista lista**: grid 7 columnas (`60px 80px 1.6fr 1fr 0.6fr 0.4fr auto`):
  - Nº `0N`, thumb 80×60, título+blurb, categoría, tiempo, método, flecha
  - Filas separadas por regla 1px

### 4 · Buscar (`/buscar`)

**Móvil** — full screen:
- Top bar: "← Cerrar"
- Eyebrow "BUSCAR · POR INGREDIENTE O NOMBRE"
- Input grande (28px, 800, sin caja, solo regla 1px debajo). Placeholder en `--accent`.
- Chips de sugerencias debajo (`limón`, `salmón`, `rápido`, etc.) — click rellena el input
- Eyebrow "N RESULTADOS"
- Lista de resultados: row 3 col `52px 1fr auto` con thumb + título resaltando coincidencias + flecha. El highlight se hace envolviendo el match en `<em class="not-italic" style="color: var(--accent)">`.

### 5 · Detalle de receta — 3 variaciones

> El usuario aún no ha elegido cuál es la canónica. Implementa **una sola** (la que prefieras) y guarda las otras dos como referencia. Mi recomendación: **V1 (Editorial clásico)** es la más universal; V2 funciona muy bien en desktop si tienes muchas recetas largas; V3 es para una sensación más "libro de mesa".

#### V1 · Editorial clásico

Hero full-bleed (480 px alto) con la foto + overlay:
- Padding `var(--sp-9)`. Color del texto del overlay: `var(--color-ink)` (para que se lea sobre cualquier foto).
- Top: "← Índice" izq, "VARIACIÓN A · EDITORIAL" der (en producción esto sería el nombre de categoría)
- Bottom: eyebrow `CATEGORÍA · XX MIN`

Body con padding `var(--sp-8) var(--sp-10) var(--sp-10)`:
- H1 (88px, 800, tracking -0.025em) con accent en `titleAccent`
- Blurb (22px/700, max-width 760px)
- MetaRow: 4 columnas inline — Tiempo, Método, Dificultad, Categoría. Cada una: eyebrow encima (12px) + valor 20px/800.
- Regla 1px
- Grid 1fr / 1.6fr (`--sp-10` gap):
  - Izq: Eyebrow "Ingredientes" + stepper de porciones (botones cuadrados 36×36 con `−` y `+` en `border: 1px solid accent`, hover invierte colores) + lista de ingredientes. Cantidades en `--accent`, nombre en texto normal. Cada row: grid `80px 1fr`, regla 1px abajo.
  - Der: Eyebrow "Pasos · N de N" + link "COCINAR EN MODO PANTALLA →" + lista numerada. Cada paso clickable (marca como hecho → texto con `line-through` y color `--accent`). Layout: nº en `--accent` 20px/700 tracking 0.08em + heading 20px/800 + desc 18px/400 leading 1.55.
- Regla 1px
- Notas: eyebrow + párrafo 22px/700

#### V2 · Doble columna

Grid `420px 1fr`:
- **Sidebar izquierda** (sticky, alto = viewport, padding `var(--sp-9) var(--sp-7) var(--sp-9) var(--sp-9)`, border-right 1px):
  - Link "← Índice"
  - Eyebrow + H1 (44px, 800, leading 0.96)
  - Foto 4:3 (max width sidebar)
  - Grid 2×2 de metadatos
  - Regla
  - Eyebrow Ingredientes + stepper porciones (mismo)
  - Lista de ingredientes
- **Main derecha** (padding `var(--sp-9) var(--sp-10)`):
  - Blurb grande (24px/700, leading 1.4)
  - Regla
  - Eyebrow "Pasos" + counter "N / N HECHOS" a la derecha
  - StepList igual que V1
  - Regla + Notas
  - Regla + CTA grande "Cocinar en modo pantalla →"

#### V3 · Revista

Hero grid `1.4fr 1fr` (al menos 560 px alto):
- **Izquierda** (padding `var(--sp-9) var(--sp-10)`, flex column space-between):
  - Top: "← Volver" izq, "VARIACIÓN C · REVISTA" der
  - Bottom: eyebrow "Receta n.º 01 · CATEGORÍA" → H1 (144px, 800, leading 0.86, tracking -0.035em) "Título." → H1 en italic 64px, 400, color accent "subtítulo." → blurb 22px/700
- **Derecha**: foto full-bleed (`position:absolute inset:0`)

Bajo el hero, una fila grande de métricas:
- Regla 1px arriba/abajo
- Grid 4 columnas, cada columna padding `var(--sp-6) var(--sp-7)`, divisores 1px
- Cada celda: eyebrow + número grande (40px/800) + unidad pequeña (14px/700/tracking 0.16em) en accent

Cuerpo (padding `var(--sp-9) var(--sp-10)`, grid 1fr / 1fr, gap `--sp-10`):
- Izq: ingredientes + porciones + un **pull-quote** abajo con la nota (border-left 1px accent, padding-left, "Nota — un truco" eyebrow + texto 28px/800)
- Der: "El método · N de N hechos" + StepList + CTA "Modo cocina →"

### 6 · Modo cocina (`/recetas/[id]/cocinar`)

**Móvil** — full screen, sin scroll:
- Top: "× SALIR" izq + eyebrow "PASO 0N / 0N" der
- Progress: barra de N segmentos (1 segmento por paso). Segmentos completados: bg `--accent`. Vacíos: transparente con border 1px accent.
- Receta info: título a la izquierda + "XX MIN · N PERS" a la derecha
- Regla
- **Paso** (centrado vertical, flex: 1):
  - Número gigante (96px, 800, color `--accent`, leading 1, tracking -0.04em)
  - Heading (36px, 800)
  - Descripción (22px, 400, leading 1.5)
- **Timer** (caja con borde top/bottom):
  - Eyebrow "TEMPORIZADOR" izq + tiempo monospace tabular-nums + chip "10:00" o controles ▶/❚❚ der
  - El timer cuenta atrás en segundos; cuando llega a 0, se para automáticamente
- **Nav** (grid 1fr / 1.4fr):
  - Botón "← Anterior" (ghost: transparent bg, accent border)
  - Botón "Siguiente →" (sólido: accent bg, --bg color)

**Desktop**:
- 3 filas (header / body / footer)
- Body en grid `1.6fr / 1fr`:
  - Izq (centrada vertical): número GIGANTE 220px/800/leading 0.85 en accent + heading 64px/800 + descripción 28px/400
  - Der (sidebar, border-left 1px): eyebrow "Ingredientes a mano" + lista + "Próximo paso" abajo
- Footer: anterior izq + barra de segmentos centro + siguiente der

### 7 · Nueva receta / editar (`/nueva`)

**Desktop** — formulario editorial. Grid `1.4fr 1fr`, gap `--sp-9`:

**Izquierda — campos**:
- Top: "← Cancelar" + eyebrow "04 · NUEVA RECETA"
- H1 (72px/800): "Escribe — una receta tuya."
- Regla
- **Título** (eyebrow + input grande 40px/800 sin caja, regla 1px debajo)
- **Subtítulo** (parte accent) — input grande con texto en color accent
- Grid 1.4fr / 1fr / 1fr: Categoría (select), Tiempo (number + "min"), Porciones (number)
- **Ingredientes**:
  - Header con "+ AÑADIR" en accent
  - Lista: grid `70px 70px 1fr auto` por row (cant. + unidad + nombre + grip `≡`)
- **Pasos**:
  - Header con "+ AÑADIR"
  - Cada row: nº en accent + textarea editorial (sin caja, autosize)

**Derecha — vista previa** (sticky):
- Eyebrow "Vista previa"
- Caja con border 1px accent y padding `--sp-5`:
  - Foto/SVG 4:3
  - Eyebrow "CATEGORÍA · XX MIN"
  - H3 (28px/800) con accent
  - Meta "N ingredientes · N pasos"
- CTA grande "Guardar receta →"
- Texto "Auto-guardado hace X segundos" en accent

### 8 · Lista de la compra (`/compra`)

**Móvil** — scrolleable, con FAB fijo abajo.
- Top: "← Inicio"
- Eyebrow "03 · COMPRA · SEMANA 21"
- H1 (44px/800): *"N de TOTAL — faltan N."* (faltan en accent)
- Regla
- 3 secciones: **Fresco**, **Despensa**, **Nevera**. Cada una:
  - Eyebrow
  - Lista de items, cada uno un botón:
    - **Checkbox cuadrado 26×26** (border 1px accent). Al marcado: bg accent, check blanco SVG dentro.
    - Texto: nombre 18px/800 + meta "qty · receta" 13px/700.
    - Si está marcado: line-through + color accent en el nombre.
- **FAB** fijo bottom (24px de los lados, 28px abajo): `padding: 18px 22px; background: --accent; color: --bg; tracking: 0.16em` — "+ AÑADIR"

---

## Componentes reutilizables (extraer)

| Nombre              | Props                                      | Notas                                                                 |
|---------------------|--------------------------------------------|----------------------------------------------------------------------|
| `Eyebrow`           | `children`, `as`                           | 13–20px / 700 / uppercase / tracking 0.18em / color accent           |
| `Rule`              | `vertical`                                 | 1px en color accent — para separadores                               |
| `Chip`              | `active`, `onClick`, `children`            | Pill cuadrado con border accent — sin radius                         |
| `Stepper` (`±`)     | `value`, `onChange`, `min`                 | Botones 36×36 con `−` y `+`                                          |
| `BigCta`            | `ghost`, `disabled`                        | Sólido (accent bg) o ghost (transparente con accent border)          |
| `IngredientList`    | `recipe`, `servings`                       | Escala cantidades automáticamente: `(qty / baseServings) * servings` |
| `StepList`          | `recipe`, `completed`, `toggle`            | Cada paso clickable, marca con line-through + color accent           |
| `Servings`          | `value`, `setValue`, `base`                | Stepper + label "PORCIONES"                                          |
| `RecipePhoto`       | `recipe`, `slot?`                          | Slot: arrastrar foto encima; SVG abstracto como placeholder          |
| `RecipeArtSvg`      | `recipe`                                   | Solo el SVG de fondo (sin slot) — para Open Graph cards, etc.        |

### Escalado de porciones

```ts
function scaleQty(qty: string, base: number, servings: number): string {
  if (!qty) return qty;
  const n = parseFloat(qty.replace(',', '.'));
  if (isNaN(n)) return qty; // p.ej. "al gusto"
  const v = (n / base) * servings;
  return Number.isInteger(v) ? String(v) : v.toFixed(1).replace('.', ',');
}
```

### Marcar pasos como hechos

`useState<Set<number>>(new Set())`. Toggle con `next.has(i) ? next.delete(i) : next.add(i)`. Persistir en `localStorage` por receta (`cooked-steps:${recipeId}`) para que sobreviva recargas mientras cocinas.

### Temporizador

Cuenta atrás simple con `setInterval`. Cuando llega a 0, pausa automáticamente. **Importante**: en producción usa `Notification` API y/o vibración (`navigator.vibrate`) cuando termina, ya que el usuario probablemente tiene las manos ocupadas.

### Fotos (sustituir el image-slot del prototipo)

En producción, el placeholder SVG cálido sigue siendo útil mientras no haya foto. Estructura:

```tsx
function RecipePhoto({ recipe, className }: Props) {
  if (recipe.photo) {
    return (
      <Image
        src={recipe.photo}
        alt={recipe.title}
        fill
        className={className}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }
  return <RecipeArtSvg recipe={recipe} className={className} />;
}
```

El SVG abstracto está implementado en `recipes.jsx` → función `ArtBody`. Hay 8 composiciones (`circle`, `ovals`, `slices`, `swirl`, `stacked`, `dots`, `curry`, `fish`) más un grain pattern por encima. Pórtalo tal cual a un componente React/SVG.

---

## Funcionalidades clave (priorizar)

### Must-have v1
1. CRUD de recetas (crear, leer, editar, borrar)
2. Vista índice con filtros por categoría/tiempo/método
3. Vista detalle con escalado de porciones
4. Modo cocina full-screen con pasos navegables
5. Marcar pasos como completados (sesión)
6. Subir foto por receta
7. Notas personales

### Nice-to-have v2
8. Búsqueda por nombre/ingrediente
9. Lista de la compra agrupada por sección de supermercado
10. Timer integrado en pasos
11. Conversor de unidades (gramos ↔ tazas, °C ↔ °F)
12. Marcar receta como "cocinada hoy" → historial

### Explícitamente fuera de scope para v1
- Auth / multi-usuario
- Sharing público
- Comentarios
- Ratings
- Sugerencias automáticas

---

## Accesibilidad

Heredado del design system base — mantener:
- Skip link a `#main-content`
- Landmarks `<header> <main> <nav> <footer>`
- Nunca opacidad sobre texto
- Texto siempre ≥20px en 700+ **o** ≥24px en cualquier peso
- Focus ring 2px accent visible
- Lang `es` en `<html>`
- Botones de step clickeables con `<button>` (no `<div>`)
- Inputs con `<label>` asociados (incluso si es visual eyebrow)

---

## Notas finales para la implementación

- El prototipo usa **React 18 con Babel inline** — eso es solo para que se pueda iterar sin build. En producción usa el framework normalmente con su pipeline.
- `design-canvas.jsx`, `tweaks-panel.jsx` e `image-slot.js` son **andamiaje del prototipo** — no se llevan a producción.
- Las recetas placeholder están escritas con un tono concreto (warm, grounded, direct — sin fluff ni hedging). Mantén ese tono cuando escribas las propias.
- El sistema de temas (Crema/Coral/Tinta) puede convertirse en **modo claro/oscuro** del sistema operativo si quieres: Crema = light, Tinta = dark. Coral lo dejas como tema opcional.
- Considera **PWA**: install-prompt + manifest + service worker para que funcione offline en el teléfono mientras cocinas.
- Para la fuente Syne en producción: descárgala de [Google Fonts](https://fonts.google.com/specimen/Syne) o usa la variable que ya está en `prototype/fonts/`.

¿Dudas? El prototipo en `prototype/index.html` es la fuente de la verdad — ábrelo en el navegador para ver el comportamiento exacto de cada interacción.
