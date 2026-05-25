// Modo cocina + Nueva receta

// ==================================================
// MODO COCINA · MOBILE
// ==================================================
function CookMobile({ theme, density, recipe = POKE }) {
  const [step, setStep] = React.useState(1); // 0-based
  const [timer, setTimer] = React.useState(null);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (!timer) return;
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [timer]);

  React.useEffect(() => {
    if (seconds === 0 && timer) setTimer(null);
  }, [seconds, timer]);

  const total = recipe.steps.length;
  const s = recipe.steps[step];

  return (
    <Frame theme={theme} density={density}>
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        padding: '28px 24px',
      }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em' }}>
            <span style={{ color: 'var(--accent)' }}>×</span> SALIR
          </a>
          <Eyebrow as="span" style={{ fontSize: 12 }}>
            PASO {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </Eyebrow>
        </div>

        {/* Progreso por pasos */}
        <div style={{ display: 'flex', gap: 4, marginTop: 'var(--sp-3)' }}>
          {recipe.steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3,
              background: i <= step ? 'var(--accent)' : 'transparent',
              border: '1px solid var(--accent)',
            }} />
          ))}
        </div>

        {/* Receta meta */}
        <div style={{ marginTop: 'var(--sp-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>
            {recipe.title}
          </h2>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>
            {recipe.time} MIN · {recipe.servings} PERS
          </span>
        </div>

        <Rule style={{ marginTop: 'var(--sp-3)' }} />

        {/* Paso */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'var(--sp-5)' }}>
          <div style={{
            fontSize: 96, fontWeight: 800, lineHeight: 1,
            letterSpacing: '-0.04em', color: 'var(--accent)',
          }}>
            {String(step + 1).padStart(2, '0')}
          </div>
          <h1 style={{
            fontSize: 36, fontWeight: 800, lineHeight: 0.98,
            letterSpacing: '-0.02em', marginTop: 'var(--sp-4)',
          }}>
            {s.heading}.
          </h1>
          <p style={{
            fontSize: 22, fontWeight: 400, lineHeight: 1.5,
            marginTop: 'var(--sp-5)',
          }}>
            {s.desc}
          </p>
        </div>

        {/* Timer */}
        <div style={{
          marginTop: 'var(--sp-5)',
          padding: 'var(--sp-3) 0',
          borderTop: '1px solid var(--accent)',
          borderBottom: '1px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Eyebrow as="span" style={{ fontSize: 12 }}>TEMPORIZADOR</Eyebrow>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{
              fontSize: 28, fontWeight: 800, letterSpacing: '0.02em',
              fontVariantNumeric: 'tabular-nums', minWidth: 90, textAlign: 'right',
            }}>
              {String(Math.floor(seconds/60)).padStart(2, '0')}:{String(seconds%60).padStart(2, '0')}
            </span>
            {!timer && seconds === 0 && (
              <button type="button" className="ph-chip" onClick={() => { setSeconds(600); setTimer(true); }}>
                10:00
              </button>
            )}
            {!timer && seconds > 0 && (
              <button type="button" className="ph-chip" onClick={() => setTimer(true)}>
                ▶ START
              </button>
            )}
            {timer && (
              <button type="button" className="ph-chip" data-active="true" onClick={() => setTimer(null)}>
                ❚❚ PAUSA
              </button>
            )}
          </div>
        </div>

        {/* Nav */}
        <div style={{ marginTop: 'var(--sp-5)', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12 }}>
          <button
            type="button"
            className="ph-bigcta ph-bigcta--ghost"
            disabled={step === 0}
            onClick={() => setStep(Math.max(0, step - 1))}
          >
            ← Anterior
          </button>
          <button
            type="button"
            className="ph-bigcta"
            disabled={step === total - 1}
            onClick={() => setStep(Math.min(total - 1, step + 1))}
          >
            {step === total - 1 ? 'Hecho' : 'Siguiente'} <span style={{ color: 'var(--accent)' }}>→</span>
          </button>
        </div>
      </div>
    </Frame>
  );
}

// ==================================================
// MODO COCINA · DESKTOP (a 2 columnas: paso + ingredientes)
// ==================================================
function CookDesktop({ theme, density, recipe = POKE }) {
  const [step, setStep] = React.useState(2);
  const total = recipe.steps.length;
  const s = recipe.steps[step];

  return (
    <Frame theme={theme} density={density}>
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>

        {/* Top */}
        <header style={{
          padding: 'var(--sp-7) var(--sp-9)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--accent)',
        }}>
          <a href="#" style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: 'var(--accent)' }}>×</span>
            <Eyebrow as="span">SALIR DEL MODO COCINA</Eyebrow>
          </a>
          <Eyebrow as="span">{recipe.title.toUpperCase()} · {recipe.time} MIN</Eyebrow>
          <Eyebrow as="span">PASO {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</Eyebrow>
        </header>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', minHeight: 0 }}>
          <section style={{
            padding: 'var(--sp-9) var(--sp-9) var(--sp-7)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 220, fontWeight: 800, lineHeight: 0.85,
              letterSpacing: '-0.06em', color: 'var(--accent)',
            }}>
              {String(step + 1).padStart(2, '0')}
            </div>
            <h1 style={{
              marginTop: 'var(--sp-5)',
              fontSize: 64, fontWeight: 800, lineHeight: 0.96,
              letterSpacing: '-0.025em',
            }}>
              {s.heading}.
            </h1>
            <p style={{
              marginTop: 'var(--sp-6)', maxWidth: 720,
              fontSize: 28, fontWeight: 400, lineHeight: 1.45,
            }}>
              {s.desc}
            </p>
          </section>

          <aside style={{
            borderLeft: '1px solid var(--accent)',
            padding: 'var(--sp-8) var(--sp-7)',
            overflowY: 'auto',
          }}>
            <Eyebrow>Ingredientes a mano</Eyebrow>
            <IngredientList recipe={recipe} servings={recipe.servings} />

            <div style={{ marginTop: 'var(--sp-7)' }}>
              <Eyebrow>Próximo paso</Eyebrow>
              <p style={{
                marginTop: 12, fontSize: 18, fontWeight: 700, lineHeight: 1.4,
                opacity: step < total - 1 ? 1 : 1,
              }}>
                {step < total - 1
                  ? recipe.steps[step + 1].heading
                  : '— último paso, ya casi —'}
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom */}
        <footer style={{
          padding: 'var(--sp-6) var(--sp-9)',
          borderTop: '1px solid var(--accent)',
          display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', alignItems: 'center', gap: 'var(--sp-5)',
        }}>
          <button
            type="button"
            className="ph-bigcta ph-bigcta--ghost"
            disabled={step === 0}
            onClick={() => setStep(Math.max(0, step - 1))}
          >
            ← Paso anterior
          </button>

          <div style={{ display: 'flex', gap: 6 }}>
            {recipe.steps.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 6,
                background: i <= step ? 'var(--accent)' : 'transparent',
                border: '1px solid var(--accent)',
              }} />
            ))}
          </div>

          <button
            type="button"
            className="ph-bigcta"
            onClick={() => setStep(Math.min(total - 1, step + 1))}
            disabled={step === total - 1}
          >
            {step === total - 1 ? 'Terminar' : 'Siguiente'} <span style={{ color: 'var(--accent)' }}>→</span>
          </button>
        </footer>
      </div>
    </Frame>
  );
}

// ==================================================
// NUEVA RECETA · DESKTOP
// ==================================================
function CreateDesktop({ theme, density }) {
  const [title, setTitle] = React.useState('Curry rápido de coco');
  const [accent, setAccent] = React.useState('y garbanzos');
  const [category, setCategory] = React.useState('Cenas rápidas');
  const [time, setTime] = React.useState(25);
  const [servings, setServings] = React.useState(2);
  const [ingredients, setIngredients] = React.useState([
    { qty: '1', unit: 'lata', name: 'leche de coco' },
    { qty: '1', unit: 'bote', name: 'garbanzos cocidos' },
    { qty: '2', unit: 'cdas', name: 'pasta de curry rojo' },
    { qty: '', unit: '', name: '' },
  ]);
  const [steps, setSteps] = React.useState([
    'Sofríe la cebolla con la pasta de curry.',
    'Suma coco, garbanzos. Hierve 10 min.',
    '',
  ]);

  const setIng = (i, key, val) => setIngredients(arr => arr.map((it, j) => j === i ? { ...it, [key]: val } : it));
  const addIng = () => setIngredients(arr => [...arr, { qty: '', unit: '', name: '' }]);
  const setStep = (i, val) => setSteps(arr => arr.map((s, j) => j === i ? val : s));
  const addStep = () => setSteps(arr => [...arr, '']);

  return (
    <Frame theme={theme} density={density} scroll>
      <div style={{ padding: 'var(--sp-9) var(--sp-10) var(--sp-10)' }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'flex', gap: 8 }}>
            <span style={{ color: 'var(--accent)' }}>←</span>
            <Eyebrow as="span">Cancelar</Eyebrow>
          </a>
          <Eyebrow as="span">0 4 · NUEVA RECETA</Eyebrow>
        </div>

        <h1 style={{
          marginTop: 'var(--sp-7)',
          fontSize: 72, fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.025em',
        }}>
          Escribe — <em className="not-italic" style={{ color: 'var(--accent)' }}>una receta tuya.</em>
        </h1>

        <Rule style={{ marginTop: 'var(--sp-7)' }} />

        <div style={{
          marginTop: 'var(--sp-7)',
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 'var(--sp-9)',
        }}>
          <div>
            {/* Título */}
            <Eyebrow>Título</Eyebrow>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="ph-input ph-input--big"
            />
            <Rule />

            <div style={{ marginTop: 'var(--sp-5)' }}>
              <Eyebrow>Subtítulo (parte en color acento)</Eyebrow>
              <input
                type="text"
                value={accent}
                onChange={e => setAccent(e.target.value)}
                className="ph-input ph-input--big"
                style={{ color: 'var(--accent)' }}
              />
              <Rule />
            </div>

            {/* Meta */}
            <div style={{
              marginTop: 'var(--sp-7)', display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr',
              gap: 'var(--sp-5)',
            }}>
              <div>
                <Eyebrow>Categoría</Eyebrow>
                <select className="ph-input" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
                <Rule />
              </div>
              <div>
                <Eyebrow>Tiempo</Eyebrow>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <input type="number" value={time} onChange={e => setTime(+e.target.value)} className="ph-input" style={{ maxWidth: 80 }} />
                  <span style={{ fontSize: 16, fontWeight: 700 }}>min</span>
                </div>
                <Rule />
              </div>
              <div>
                <Eyebrow>Porciones</Eyebrow>
                <input type="number" value={servings} onChange={e => setServings(+e.target.value)} className="ph-input" style={{ maxWidth: 80 }} />
                <Rule />
              </div>
            </div>

            {/* Ingredientes */}
            <div style={{ marginTop: 'var(--sp-8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Eyebrow>Ingredientes</Eyebrow>
                <button onClick={addIng} type="button" style={{
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.18em',
                  color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer',
                }}>+ AÑADIR</button>
              </div>

              <ul style={{ listStyle: 'none', margin: 'var(--sp-3) 0 0', padding: 0 }}>
                {ingredients.map((ing, i) => (
                  <li key={i} style={{
                    display: 'grid', gridTemplateColumns: '70px 70px 1fr auto',
                    gap: 12, alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--accent)',
                  }}>
                    <input className="ph-input ph-input--inline" placeholder="Cant." value={ing.qty} onChange={e => setIng(i, 'qty', e.target.value)} />
                    <input className="ph-input ph-input--inline" placeholder="ud" value={ing.unit} onChange={e => setIng(i, 'unit', e.target.value)} />
                    <input className="ph-input ph-input--inline" placeholder="Nombre" value={ing.name} onChange={e => setIng(i, 'name', e.target.value)} />
                    <span style={{ color: 'var(--accent)', fontSize: 18 }}>≡</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pasos */}
            <div style={{ marginTop: 'var(--sp-7)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Eyebrow>Pasos</Eyebrow>
                <button onClick={addStep} type="button" style={{
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.18em',
                  color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer',
                }}>+ AÑADIR</button>
              </div>

              <ol style={{ listStyle: 'none', margin: 'var(--sp-3) 0 0', padding: 0 }}>
                {steps.map((stp, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--accent)', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent)', minWidth: 32, paddingTop: 6 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <textarea
                      className="ph-input ph-input--inline ph-textarea"
                      value={stp}
                      onChange={e => setStep(i, e.target.value)}
                      placeholder="Describe este paso —"
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar preview */}
          <aside style={{
            position: 'sticky', top: 'var(--sp-7)', alignSelf: 'start',
          }}>
            <Eyebrow>Vista previa</Eyebrow>
            <div style={{
              marginTop: 'var(--sp-3)',
              border: '1px solid var(--accent)',
              padding: 'var(--sp-5)',
            }}>
              <RecipeArt recipe={{ id: 'preview', photo: 'curry', photoTone: 'terra' }} style={{ width: '100%', aspectRatio: '4/3' }} />
              <Eyebrow style={{ marginTop: 'var(--sp-4)', fontSize: 12 }}>{category.toUpperCase()} · {time} MIN</Eyebrow>
              <h3 style={{
                marginTop: 8,
                fontSize: 28, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.01em',
              }}>
                {title} <em className="not-italic" style={{ color: 'var(--accent)' }}>{accent}.</em>
              </h3>
              <p style={{ fontSize: 14, fontWeight: 700, marginTop: 12 }}>
                {ingredients.filter(i => i.name).length} ingredientes · {steps.filter(s => s).length} pasos
              </p>
            </div>

            <button type="button" className="ph-bigcta" style={{ marginTop: 'var(--sp-5)', width: '100%' }}>
              Guardar receta <span style={{ color: 'var(--accent)' }}>→</span>
            </button>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', marginTop: 12, color: 'var(--accent)' }}>
              Auto-guardado hace 12 segundos
            </p>
          </aside>
        </div>
      </div>
    </Frame>
  );
}

Object.assign(window, { CookMobile, CookDesktop, CreateDesktop });
