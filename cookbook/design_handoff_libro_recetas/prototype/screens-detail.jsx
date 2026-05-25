// Pantalla de detalle de receta — 3 variaciones de layout + versión móvil.
// V1: Editorial clásico (foto full-bleed arriba, dos columnas debajo)
// V2: Doble columna desktop (sidebar de ingredientes sticky a la izquierda)
// V3: Revista (hero tipográfico grande, foto como activo lateral)

const POKE = RECIPES[0]; // la receta usada en las variaciones

function Servings({ value, setValue, base = 2 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button type="button" className="ph-stepper" onClick={() => setValue(Math.max(1, value - 1))}>−</button>
      <div style={{ minWidth: 78, textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', marginTop: 4, color: 'var(--accent)' }}>
          PORCIONES
        </div>
      </div>
      <button type="button" className="ph-stepper" onClick={() => setValue(value + 1)}>+</button>
    </div>
  );
}

function scaleQty(qty, base, servings) {
  if (!qty) return qty;
  const n = parseFloat(qty.replace(',', '.'));
  if (isNaN(n)) return qty;
  const v = (n / base) * servings;
  // formatear: enteros sin coma, fraccion con 1 decimal
  return Number.isInteger(v) ? String(v) : v.toFixed(1).replace('.', ',');
}

function IngredientList({ recipe, servings }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {recipe.ingredients.map((ing, i) => (
        <li key={i} style={{
          display: 'grid', gridTemplateColumns: '80px 1fr',
          gap: 16, alignItems: 'baseline',
          padding: '14px 0',
          borderBottom: '1px solid var(--accent)',
        }}>
          <span style={{
            fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em',
            color: 'var(--accent)',
          }}>
            {scaleQty(ing.qty, recipe.servings, servings)} {ing.unit}
          </span>
          <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>
            {ing.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function StepList({ recipe, completed, toggle }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {recipe.steps.map((step, i) => (
        <li key={i} style={{ marginTop: i ? 28 : 0 }}>
          <button
            type="button"
            onClick={() => toggle(i)}
            className="ph-step"
            data-done={completed.has(i) ? 'true' : null}
          >
            <span style={{
              fontSize: 20, fontWeight: 700, letterSpacing: '0.08em',
              color: 'var(--accent)', minWidth: 40,
              textDecoration: completed.has(i) ? 'line-through' : 'none',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <strong style={{
                fontSize: 20, fontWeight: 800, display: 'block',
                marginBottom: 6, lineHeight: 1.2,
                textDecoration: completed.has(i) ? 'line-through' : 'none',
              }}>
                {step.heading}
              </strong>
              <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.55 }}>
                {step.desc}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ol>
  );
}

function MetaRow({ recipe }) {
  return (
    <div style={{
      display: 'flex', gap: 'var(--sp-7)', alignItems: 'baseline',
      flexWrap: 'wrap',
    }}>
      {[
        ['Tiempo', `${recipe.time} min`],
        ['Método', recipe.method],
        ['Dificultad', recipe.difficulty],
        ['Categoría', recipe.category],
      ].map(([k, v]) => (
        <div key={k}>
          <Eyebrow style={{ fontSize: 12 }}>{k}</Eyebrow>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

// =============================================================
// V1 — EDITORIAL CLÁSICO
// =============================================================
function DetailV1({ theme, density, recipe = POKE }) {
  const [servings, setServings] = React.useState(recipe.servings);
  const [completed, setCompleted] = React.useState(new Set());
  const toggle = i => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <Frame theme={theme} density={density} scroll>
      <div>
        {/* HERO — foto full-bleed */}
        <div style={{ position: 'relative', height: 480 }}>
          <RecipeArt recipe={recipe} style={{ position: 'absolute', inset: 0 }} />
          <div style={{
            position: 'absolute', inset: 0,
            padding: 'var(--sp-9)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            color: 'var(--color-ink)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <a href="#" style={{ color: 'inherit', display: 'flex', gap: 10 }}>
                <span>←</span><Eyebrow as="span" style={{ color: 'inherit' }}>Índice</Eyebrow>
              </a>
              <Eyebrow as="span" style={{ color: 'inherit' }}>VARIACIÓN A · EDITORIAL</Eyebrow>
            </div>
            <Eyebrow style={{ color: 'inherit' }}>{recipe.category.toUpperCase()} · {recipe.time} MIN</Eyebrow>
          </div>
        </div>

        <div style={{ padding: 'var(--sp-8) var(--sp-10) var(--sp-10)' }}>
          {/* Título */}
          <h1 style={{
            fontSize: 88, fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.025em', maxWidth: 1100,
          }}>
            {recipe.title} —
            <em className="not-italic" style={{ color: 'var(--accent)' }}> {recipe.titleAccent}.</em>
          </h1>

          <p style={{
            marginTop: 'var(--sp-6)', maxWidth: 760,
            fontSize: 22, fontWeight: 700, lineHeight: 1.45,
          }}>
            {recipe.blurb}
          </p>

          <div style={{ marginTop: 'var(--sp-7)' }}>
            <MetaRow recipe={recipe} />
          </div>

          <Rule style={{ marginTop: 'var(--sp-8)' }} />

          {/* Cuerpo: ingredientes / pasos */}
          <div style={{
            marginTop: 'var(--sp-8)',
            display: 'grid', gridTemplateColumns: '1fr 1.6fr',
            gap: 'var(--sp-10)',
          }}>
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Eyebrow>Ingredientes</Eyebrow>
                <Servings value={servings} setValue={setServings} />
              </div>
              <div style={{ marginTop: 'var(--sp-4)' }}>
                <IngredientList recipe={recipe} servings={servings} />
              </div>
            </section>

            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Eyebrow>Pasos · {completed.size} de {recipe.steps.length}</Eyebrow>
                <a href="#" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>
                  COCINAR EN MODO PANTALLA →
                </a>
              </div>
              <div style={{ marginTop: 'var(--sp-5)' }}>
                <StepList recipe={recipe} completed={completed} toggle={toggle} />
              </div>
            </section>
          </div>

          {recipe.notes && (
            <>
              <Rule style={{ marginTop: 'var(--sp-8)' }} />
              <section style={{ marginTop: 'var(--sp-6)', maxWidth: 760 }}>
                <Eyebrow>Notas</Eyebrow>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 22, fontWeight: 700, lineHeight: 1.45 }}>
                  {recipe.notes}
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </Frame>
  );
}

// =============================================================
// V2 — DOBLE COLUMNA · SIDEBAR INGREDIENTES
// =============================================================
function DetailV2({ theme, density, recipe = POKE }) {
  const [servings, setServings] = React.useState(recipe.servings);
  const [completed, setCompleted] = React.useState(new Set());
  const toggle = i => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <Frame theme={theme} density={density} scroll>
      <div style={{
        display: 'grid', gridTemplateColumns: '420px 1fr',
        minHeight: '100%',
      }}>
        {/* Sidebar */}
        <aside style={{
          padding: 'var(--sp-9) var(--sp-7) var(--sp-9) var(--sp-9)',
          borderRight: '1px solid var(--accent)',
          background: 'var(--bg)',
          position: 'sticky', top: 0, alignSelf: 'start',
          maxHeight: '100%',
        }}>
          <a href="#" style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: 'var(--accent)' }}>←</span>
            <Eyebrow as="span">Índice</Eyebrow>
          </a>

          <Eyebrow style={{ marginTop: 'var(--sp-7)' }}>VARIACIÓN B · DOBLE COLUMNA</Eyebrow>
          <h1 style={{
            marginTop: 'var(--sp-3)',
            fontSize: 44, fontWeight: 800, lineHeight: 0.96,
            letterSpacing: '-0.02em',
          }}>
            {recipe.title} <em className="not-italic" style={{ color: 'var(--accent)' }}>{recipe.titleAccent}.</em>
          </h1>

          <div style={{ marginTop: 'var(--sp-5)' }}>
            <RecipeArt recipe={recipe} style={{ width: '100%', aspectRatio: '4/3' }} />
          </div>

          <div style={{
            marginTop: 'var(--sp-5)', display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--sp-3) var(--sp-4)',
          }}>
            {[
              ['Tiempo', `${recipe.time} min`],
              ['Método', recipe.method],
              ['Dificultad', recipe.difficulty],
              ['Categoría', recipe.category],
            ].map(([k, v]) => (
              <div key={k}>
                <Eyebrow style={{ fontSize: 11 }}>{k}</Eyebrow>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          <Rule style={{ marginTop: 'var(--sp-6)' }} />

          <div style={{ marginTop: 'var(--sp-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Eyebrow>Ingredientes</Eyebrow>
            <Servings value={servings} setValue={setServings} />
          </div>
          <div style={{ marginTop: 'var(--sp-4)' }}>
            <IngredientList recipe={recipe} servings={servings} />
          </div>
        </aside>

        {/* Main */}
        <main style={{ padding: 'var(--sp-9) var(--sp-10)' }}>
          <p style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4, maxWidth: 720 }}>
            {recipe.blurb}
          </p>

          <Rule style={{ marginTop: 'var(--sp-7)' }} />

          <div style={{ marginTop: 'var(--sp-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Eyebrow>Pasos</Eyebrow>
            <Eyebrow style={{ color: 'var(--text)' }}>
              {completed.size} / {recipe.steps.length} HECHOS
            </Eyebrow>
          </div>

          <div style={{ marginTop: 'var(--sp-5)' }}>
            <StepList recipe={recipe} completed={completed} toggle={toggle} />
          </div>

          {recipe.notes && (
            <>
              <Rule style={{ marginTop: 'var(--sp-8)' }} />
              <section style={{ marginTop: 'var(--sp-5)', maxWidth: 720 }}>
                <Eyebrow>Notas personales</Eyebrow>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 22, fontWeight: 700, lineHeight: 1.45 }}>
                  {recipe.notes}
                </p>
              </section>
            </>
          )}

          <Rule style={{ marginTop: 'var(--sp-8)' }} />

          <button type="button" className="ph-bigcta">
            Cocinar en modo pantalla
            <span style={{ color: 'var(--accent)' }}>→</span>
          </button>
        </main>
      </div>
    </Frame>
  );
}

// =============================================================
// V3 — REVISTA · TÍTULO GIGANTE + FOTO LATERAL
// =============================================================
function DetailV3({ theme, density, recipe = POKE }) {
  const [servings, setServings] = React.useState(recipe.servings);
  const [completed, setCompleted] = React.useState(new Set());
  const toggle = i => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <Frame theme={theme} density={density} scroll>
      <div>
        {/* HERO: título overlay sobre bloque de color */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          minHeight: 560,
        }}>
          <div style={{
            padding: 'var(--sp-9) var(--sp-10)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a href="#" style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--accent)' }}>←</span>
                <Eyebrow as="span">Volver</Eyebrow>
              </a>
              <Eyebrow as="span">VARIACIÓN C · REVISTA</Eyebrow>
            </div>

            <div>
              <Eyebrow>Receta n.º 01 · {recipe.category.toUpperCase()}</Eyebrow>
              <h1 style={{
                marginTop: 'var(--sp-4)',
                fontSize: 144, fontWeight: 800, lineHeight: 0.86,
                letterSpacing: '-0.035em',
              }}>
                {recipe.title}.
              </h1>
              <h1 style={{
                marginTop: 'var(--sp-2)',
                fontSize: 64, fontWeight: 400, lineHeight: 0.95,
                letterSpacing: '-0.015em',
                color: 'var(--accent)', fontStyle: 'italic',
              }}>
                {recipe.titleAccent}.
              </h1>
            </div>

            <p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.45, maxWidth: 600 }}>
              {recipe.blurb}
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <RecipeArt recipe={recipe} style={{ position: 'absolute', inset: 0 }} />
          </div>
        </div>

        {/* Métricas en una fila grande */}
        <Rule />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {[
            ['Tiempo', `${recipe.time}`, 'MIN'],
            ['Porciones', `${recipe.servings}`, 'PERS'],
            ['Dificultad', recipe.difficulty, ''],
            ['Método', recipe.method, ''],
          ].map(([k, v, unit], i) => (
            <div key={k} style={{
              padding: 'var(--sp-6) var(--sp-7)',
              borderRight: i < 3 ? '1px solid var(--accent)' : 'none',
              display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
            }}>
              <Eyebrow style={{ fontSize: 12 }}>{k}</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</span>
                {unit && <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--accent)' }}>{unit}</span>}
              </div>
            </div>
          ))}
        </div>
        <Rule />

        {/* Cuerpo: pasos a 2 col, ingredientes asomando como pull-quote */}
        <div style={{ padding: 'var(--sp-9) var(--sp-10)' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'var(--sp-10)',
          }}>
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Eyebrow>Ingredientes</Eyebrow>
                <Servings value={servings} setValue={setServings} />
              </div>
              <div style={{ marginTop: 'var(--sp-5)' }}>
                <IngredientList recipe={recipe} servings={servings} />
              </div>
              {recipe.notes && (
                <div style={{
                  marginTop: 'var(--sp-7)',
                  borderLeft: '1px solid var(--accent)',
                  paddingLeft: 'var(--sp-5)',
                }}>
                  <Eyebrow>Nota — un truco</Eyebrow>
                  <p style={{
                    marginTop: 12,
                    fontSize: 28, fontWeight: 800, lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }}>
                    "{recipe.notes}"
                  </p>
                </div>
              )}
            </section>

            <section>
              <Eyebrow>El método · {completed.size} de {recipe.steps.length} hechos</Eyebrow>
              <div style={{ marginTop: 'var(--sp-5)' }}>
                <StepList recipe={recipe} completed={completed} toggle={toggle} />
              </div>

              <Rule style={{ marginTop: 'var(--sp-7)' }} />

              <button type="button" className="ph-bigcta">
                Modo cocina <span style={{ color: 'var(--accent)' }}>→</span>
              </button>
            </section>
          </div>
        </div>
      </div>
    </Frame>
  );
}

Object.assign(window, { DetailV1, DetailV2, DetailV3, POKE });
