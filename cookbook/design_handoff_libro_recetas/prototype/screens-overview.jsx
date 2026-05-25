// Pantalla 1: Portada del libro (desktop + mobile)
// Pantalla 2: Categorías

function HomeDesktop({ theme, density }) {
  return (
    <Frame theme={theme} density={density}>
      <div style={{
        height: '100%', display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        padding: 'var(--sp-10) var(--sp-10)',
        gap: 'var(--sp-8)',
      }}>

        {/* TOP: monograma + nav */}
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <Eyebrow>UN CUADERNO · 2026</Eyebrow>
            <div style={{
              marginTop: 'var(--sp-3)',
              fontSize: 36, fontWeight: 800, letterSpacing: '-0.01em',
              lineHeight: 1.05,
            }}>
              libro-recetas
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 'var(--sp-7)', alignItems: 'center' }}>
            {['Índice', 'Categorías', 'Compra', 'Nueva'].map((n, i) => (
              <a key={n} href="#" className="ph-navlink" data-active={i === 0 ? 'true' : null}>
                <span className="ph-eyebrow" style={{ fontSize: 14 }}>0{i+1}</span>
                <span style={{ marginLeft: 12 }}>{n}</span>
              </a>
            ))}
          </nav>
        </header>

        {/* CENTER: título grande */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--sp-10)',
          alignItems: 'end', paddingTop: 'var(--sp-7)',
        }}>
          <div>
            <h1 style={{
              fontSize: 120, fontWeight: 800, lineHeight: 0.92,
              letterSpacing: '-0.025em', textWrap: 'pretty',
              margin: 0,
            }}>
              Recetas que ya cocinas — <em className="not-italic" style={{ color: 'var(--accent)' }}>escritas como las haces.</em>
            </h1>
            <p style={{
              marginTop: 'var(--sp-7)', maxWidth: 560,
              fontSize: 22, fontWeight: 700, lineHeight: 1.45,
            }}>
              Un cuaderno digital para cenas de viernes, comidas rápidas de martes y los trucos que solo recuerdas a medias. Sin pasos de relleno.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            <Rule />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Eyebrow>Últimas cocinadas</Eyebrow>
              <Eyebrow style={{ color: 'var(--text)' }}>05 / 22</Eyebrow>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {RECIPES.slice(0, 3).map((r) => (
                <li key={r.id} style={{
                  display: 'grid', gridTemplateColumns: '64px 1fr auto',
                  gap: 'var(--sp-4)', alignItems: 'center',
                  padding: 'var(--sp-4) 0',
                  borderTop: '1px solid var(--accent)',
                }}>
                  <div style={{ width: 64, height: 64 }}>
                    <RecipeArt recipe={r} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: 20, fontWeight: 800, display: 'block' }}>{r.title}</strong>
                    <span style={{ fontSize: 16, fontWeight: 700, opacity: 1, letterSpacing: '0.04em' }}>
                      {r.method.toUpperCase()} · {r.time} MIN
                    </span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--accent)' }}>→</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM: estadísticas tipo footer editorial */}
        <footer>
          <Rule style={{ marginBottom: 'var(--sp-5)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--sp-6)' }}>
            {[
              ['24', 'recetas guardadas'],
              ['6', 'colecciones'],
              ['142', 'veces cocinadas'],
              ['12', 'esta semana en la compra'],
            ].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{num}</div>
                <Eyebrow style={{ marginTop: 'var(--sp-2)' }}>{label}</Eyebrow>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </Frame>
  );
}

function HomeMobile({ theme, density }) {
  return (
    <Frame theme={theme} density={density}>
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        padding: '28px 24px',
      }}>
        {/* Status bar fake */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 13, fontWeight: 700, marginBottom: 'var(--sp-6)',
          letterSpacing: '0.04em',
        }}>
          <span>9:41</span>
          <span style={{ letterSpacing: '0.16em' }}>● ● ●</span>
        </div>

        <Eyebrow>UN CUADERNO · 2026</Eyebrow>
        <h1 style={{
          fontSize: 48, fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.02em',
          marginTop: 'var(--sp-3)', textWrap: 'balance',
        }}>
          Recetas — <em className="not-italic" style={{ color: 'var(--accent)' }}>como las cocinas.</em>
        </h1>

        <p style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.45, marginTop: 'var(--sp-5)' }}>
          Cenas rápidas, trucos y la lista de la compra. Todo en un sitio.
        </p>

        <Rule style={{ marginTop: 'var(--sp-7)' }} />

        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--sp-3)' }}>
          {[
            ['01', 'Índice', '24 recetas'],
            ['02', 'Categorías', '6 colecciones'],
            ['03', 'Compra', '12 ingredientes'],
            ['04', 'Nueva receta', '—'],
          ].map(([num, name, meta]) => (
            <a key={num} href="#" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: 'var(--sp-4) 0',
              borderBottom: '1px solid var(--accent)',
            }}>
              <span style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'baseline' }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--accent)' }}>{num}</span>
                <span style={{ fontSize: 24, fontWeight: 800 }}>{name}</span>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', opacity: 1 }}>
                {meta.toUpperCase()}
              </span>
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 'var(--sp-6)' }}>
          <Eyebrow>Últimas cocinadas</Eyebrow>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-3)' }}>
            {RECIPES.slice(0, 3).map(r => (
              <div key={r.id} style={{ flex: 1 }}>
                <div style={{ aspectRatio: '1', width: '100%' }}>
                  <RecipeArt recipe={r} style={{ width: '100%', height: '100%' }} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, marginTop: 8, lineHeight: 1.2 }}>{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function CategoriesMobile({ theme, density }) {
  return (
    <Frame theme={theme} density={density} scroll>
      <div style={{ padding: '28px 24px 40px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 13, fontWeight: 700, marginBottom: 'var(--sp-6)',
        }}>
          <a href="#" style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: 'var(--accent)' }}>←</span> Inicio
          </a>
          <span style={{ letterSpacing: '0.16em' }}>● ● ●</span>
        </div>

        <Eyebrow>0 2 · CATEGORÍAS</Eyebrow>
        <h1 style={{
          fontSize: 42, fontWeight: 800, lineHeight: 1,
          letterSpacing: '-0.02em', marginTop: 'var(--sp-3)',
        }}>
          Cómo lo agrupas — <em className="not-italic" style={{ color: 'var(--accent)' }}>cómo lo encuentras.</em>
        </h1>

        <Rule style={{ marginTop: 'var(--sp-6)' }} />

        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <a href="#" style={{
                display: 'block', padding: 'var(--sp-5) 0',
                borderBottom: '1px solid var(--accent)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.01em' }}>{cat.name}</strong>
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--accent)' }}>
                    {String(cat.count).padStart(2, '0')}
                  </span>
                </div>
                {cat.count > 0 && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    {RECIPES.filter(r => r.category === cat.name).slice(0, 3).map(r => (
                      <div key={r.id} style={{ width: 48, height: 48 }}>
                        <RecipeArt recipe={r} style={{ width: '100%', height: '100%' }} />
                      </div>
                    ))}
                  </div>
                )}
                {cat.count === 0 && (
                  <p style={{ fontSize: 15, fontWeight: 700, marginTop: 8, color: 'var(--accent)' }}>
                    Aún por escribir.
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

Object.assign(window, { HomeDesktop, HomeMobile, CategoriesMobile });
