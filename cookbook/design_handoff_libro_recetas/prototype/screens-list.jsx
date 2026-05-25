// Pantalla: Lista/Índice desktop, Buscar mobile, Lista de la compra mobile.

function IndexDesktop({ theme, density }) {
  const [view, setView] = React.useState('grid'); // 'grid' | 'list'
  const [filter, setFilter] = React.useState('Todas');
  const filters = ['Todas', '< 20 min', 'Bowls', 'Pasta', 'Airfryer', 'Sin horno'];

  const visible = React.useMemo(() => {
    if (filter === 'Todas') return RECIPES;
    if (filter === '< 20 min') return RECIPES.filter(r => r.time < 20);
    if (filter === 'Airfryer') return RECIPES.filter(r => r.method === 'Airfryer');
    if (filter === 'Sin horno') return RECIPES.filter(r => r.method === 'Sin horno' || r.method === 'Sin cocina');
    return RECIPES.filter(r => r.category === filter);
  }, [filter]);

  return (
    <Frame theme={theme} density={density} scroll>
      <div style={{ padding: 'var(--sp-10) var(--sp-10) var(--sp-8)' }}>
        {/* Breadcrumb / nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'inline-flex', gap: 10 }}>
            <span style={{ color: 'var(--accent)' }}>←</span>
            <Eyebrow as="span">Inicio</Eyebrow>
          </a>
          <Eyebrow as="span">{String(visible.length).padStart(2, '0')} / {String(RECIPES.length).padStart(2, '0')} RECETAS</Eyebrow>
        </div>

        {/* Header */}
        <header style={{ marginTop: 'var(--sp-7)' }}>
          <Eyebrow>0 1 · ÍNDICE</Eyebrow>
          <h1 style={{
            marginTop: 'var(--sp-4)',
            fontSize: 96, fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.025em', maxWidth: 1200,
          }}>
            Todo lo que sabes cocinar — <em className="not-italic" style={{ color: 'var(--accent)' }}>en una sola página.</em>
          </h1>
        </header>

        {/* Filtros */}
        <div style={{
          marginTop: 'var(--sp-8)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="ph-chip"
                data-active={filter === f ? 'true' : null}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
            <button className="ph-chip" data-active={view === 'grid' ? 'true' : null} onClick={() => setView('grid')} type="button">Cuadrícula</button>
            <button className="ph-chip" data-active={view === 'list' ? 'true' : null} onClick={() => setView('list')} type="button">Lista</button>
          </div>
        </div>

        <Rule style={{ marginTop: 'var(--sp-5)' }} />

        {/* Contenido */}
        {view === 'grid' && (
          <div style={{
            marginTop: 'var(--sp-6)',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--sp-6)',
          }}>
            {visible.map((r, i) => (
              <a key={r.id} href="#" style={{ display: 'block' }} className="ph-card">
                <div style={{ aspectRatio: '4/3', width: '100%' }}>
                  <RecipeArt recipe={r} style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ paddingTop: 'var(--sp-3)' }}>
                  <Eyebrow style={{ fontSize: 13 }}>{String(i+1).padStart(2, '0')} · {r.category}</Eyebrow>
                  <h2 style={{
                    fontSize: 24, fontWeight: 800, lineHeight: 1.1,
                    marginTop: 6, letterSpacing: '-0.01em',
                  }}>{r.title}</h2>
                  <div style={{
                    fontSize: 14, fontWeight: 700, letterSpacing: '0.08em',
                    marginTop: 8, display: 'flex', gap: 12,
                  }}>
                    <span>{r.time} MIN</span>
                    <span style={{ color: 'var(--accent)' }}>·</span>
                    <span>{r.method.toUpperCase()}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {view === 'list' && (
          <ol style={{ listStyle: 'none', margin: 'var(--sp-3) 0 0', padding: 0 }}>
            {visible.map((r, i) => (
              <li key={r.id}>
                <a href="#" style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 80px 1.6fr 1fr 0.6fr 0.4fr auto',
                  gap: 'var(--sp-5)', alignItems: 'center',
                  padding: 'var(--sp-4) 0',
                  borderBottom: '1px solid var(--accent)',
                }}>
                  <Eyebrow as="span" style={{ fontSize: 13 }}>{String(i+1).padStart(2, '0')}</Eyebrow>
                  <div style={{ width: 80, height: 60 }}>
                    <RecipeArt recipe={r} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div>
                    <strong style={{ fontSize: 22, fontWeight: 800, display: 'block', letterSpacing: '-0.01em' }}>{r.title}</strong>
                    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.04em' }}>{r.blurb}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.16em' }}>{r.category.toUpperCase()}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em' }}>{r.time} MIN</span>
                  <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em' }}>{r.method.toUpperCase()}</span>
                  <span style={{ color: 'var(--accent)', fontSize: 18, fontWeight: 700 }}>→</span>
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Frame>
  );
}

function SearchMobile({ theme, density }) {
  const [q, setQ] = React.useState('limón');
  const results = RECIPES.filter(r =>
    !q || r.title.toLowerCase().includes(q.toLowerCase()) ||
    r.ingredients.some(i => i.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <Frame theme={theme} density={density}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '28px 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 'var(--sp-5)' }}>
          <a href="#" style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: 'var(--accent)' }}>←</span> Cerrar
          </a>
          <span style={{ letterSpacing: '0.16em' }}>● ● ●</span>
        </div>

        <Eyebrow>BUSCAR · POR INGREDIENTE O NOMBRE</Eyebrow>

        <div style={{ marginTop: 'var(--sp-3)', position: 'relative' }}>
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="ph-search"
            placeholder="¿Qué te apetece cocinar?"
          />
          <Rule />
        </div>

        <div style={{ marginTop: 'var(--sp-4)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['limón', 'salmón', 'rápido', 'sin horno', 'pasta'].map(tag => (
            <button
              key={tag}
              onClick={() => setQ(tag)}
              className="ph-chip"
              data-active={q === tag ? 'true' : null}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>

        <Eyebrow style={{ marginTop: 'var(--sp-6)' }}>
          {results.length} RESULTADO{results.length !== 1 ? 'S' : ''}
        </Eyebrow>

        <ol style={{ listStyle: 'none', margin: 'var(--sp-3) 0 0', padding: 0, flex: 1, overflow: 'auto' }}>
          {results.map((r, i) => (
            <li key={r.id}>
              <a href="#" style={{
                display: 'grid', gridTemplateColumns: '52px 1fr auto',
                gap: 14, alignItems: 'center',
                padding: '14px 0',
                borderBottom: '1px solid var(--accent)',
              }}>
                <div style={{ width: 52, height: 52 }}>
                  <RecipeArt recipe={r} style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <strong style={{ fontSize: 18, fontWeight: 800, display: 'block', lineHeight: 1.15 }}>
                    <Highlight text={r.title} q={q} />
                  </strong>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>
                    {r.method.toUpperCase()} · {r.time} MIN
                  </span>
                </div>
                <span style={{ color: 'var(--accent)' }}>→</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

function Highlight({ text, q }) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  const parts = text.split(re);
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase()
      ? <em key={i} className="not-italic" style={{ color: 'var(--accent)' }}>{p}</em>
      : p
  );
}

function ShoppingMobile({ theme, density }) {
  const [items, setItems] = React.useState(SHOPPING);
  const toggle = (group, idx) => {
    setItems(prev => ({
      ...prev,
      [group]: prev[group].map((it, i) => i === idx ? { ...it, done: !it.done } : it),
    }));
  };
  const total = Object.values(items).flat().length;
  const done = Object.values(items).flat().filter(i => i.done).length;
  const groupNames = { fresco: 'Fresco', despensa: 'Despensa', nevera: 'Nevera' };

  return (
    <Frame theme={theme} density={density} scroll>
      <div style={{ padding: '28px 24px 100px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 'var(--sp-5)' }}>
          <a href="#" style={{ display: 'flex', gap: 6 }}>
            <span style={{ color: 'var(--accent)' }}>←</span> Inicio
          </a>
          <span style={{ letterSpacing: '0.16em' }}>● ● ●</span>
        </div>

        <Eyebrow>0 3 · COMPRA · SEMANA 21</Eyebrow>
        <h1 style={{
          marginTop: 'var(--sp-3)',
          fontSize: 44, fontWeight: 800, lineHeight: 0.95,
          letterSpacing: '-0.02em',
        }}>
          {done} de {total} —
          <em className="not-italic" style={{ color: 'var(--accent)' }}> faltan {total - done}.</em>
        </h1>

        <Rule style={{ marginTop: 'var(--sp-5)' }} />

        {Object.entries(items).map(([group, list]) => (
          <section key={group} style={{ marginTop: 'var(--sp-6)' }}>
            <Eyebrow>{groupNames[group]}</Eyebrow>
            <ul style={{ listStyle: 'none', margin: 'var(--sp-3) 0 0', padding: 0 }}>
              {list.map((it, idx) => (
                <li key={it.name}>
                  <button
                    type="button"
                    onClick={() => toggle(group, idx)}
                    className="ph-shopping-row"
                    data-done={it.done ? 'true' : null}
                  >
                    <span className="ph-check" aria-hidden="true">
                      {it.done ? <CheckGlyph /> : null}
                    </span>
                    <span style={{ flex: 1, textAlign: 'left' }}>
                      <strong style={{ display: 'block', fontSize: 18, fontWeight: 800, lineHeight: 1.1 }}>
                        {it.name}
                      </strong>
                      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>
                        {it.qty} · {it.recipe}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <button type="button" className="ph-fab">+ AÑADIR</button>
      </div>
    </Frame>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
      <path d="M3 10 L 8 15 L 17 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, { IndexDesktop, SearchMobile, ShoppingMobile });
