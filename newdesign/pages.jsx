/* global React */
const { useState, useEffect, useRef } = React;
const { LangContext, t, navigate } = window.AnaCore;

/* =================================================================
   HOME
   ================================================================= */
function HomeCarousel() {
  const { lang } = React.useContext(LangContext);
  const items = window.PROJECTS;
  // duplicate for visual continuity
  const slides = [...items, ...items];
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const slideWidth = () => {
    const slide = trackRef.current?.querySelector(".carousel-slide");
    if (!slide) return 400;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 24;
    return slide.getBoundingClientRect().width + gap;
  };

  const go = (delta) => {
    setIdx((prev) => {
      const next = prev + delta;
      if (next < 0) return items.length - 1;
      if (next >= items.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${-idx * slideWidth()}px)`;
  }, [idx]);

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => go(1), 5500);
    return () => clearInterval(id);
  }, []);

  // drag
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    let startX = 0, dragging = false;
    const down = (e) => { dragging = true; startX = e.touches ? e.touches[0].clientX : e.clientX; };
    const up = (e) => {
      if (!dragging) return;
      dragging = false;
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    };
    vp.addEventListener("mousedown", down);
    vp.addEventListener("mouseup", up);
    vp.addEventListener("touchstart", down, { passive: true });
    vp.addEventListener("touchend", up);
    return () => {
      vp.removeEventListener("mousedown", down);
      vp.removeEventListener("mouseup", up);
      vp.removeEventListener("touchstart", down);
      vp.removeEventListener("touchend", up);
    };
  }, []);

  const progress = ((idx + 1) / items.length) * 100;

  return (
    <section className="carousel">
      <div className="carousel-header">
        <h2 className="carousel-title">
          {lang === "es"
            ? <>Proyectos <em>seleccionados</em>.</>
            : <>Selected <em>projects</em>.</>}
        </h2>
        <div className="carousel-controls">
          <span className="carousel-counter">{String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <button className="carousel-btn" onClick={() => go(-1)} data-cursor="link" aria-label="Previous">←</button>
          <button className="carousel-btn" onClick={() => go(1)} data-cursor="link" aria-label="Next">→</button>
        </div>
      </div>
      <div className="carousel-viewport" ref={viewportRef}>
        <div className="carousel-track" ref={trackRef}>
          {slides.map((p, i) => (
            <a key={i} href={`#/project/${p.id}`} className="carousel-slide" data-cursor="view">
              <div className="media"><img src={p.cover} alt={p.title} loading="lazy" draggable="false" /></div>
              <div className="slide-meta">
                <span>N° 0{(i % items.length) + 1}</span>
                <span>{p.year}</span>
              </div>
              <h3>{p.title} <em>—</em></h3>
              <div className="slide-cat">{t(p.category, lang)}</div>
            </a>
          ))}
        </div>
      </div>
      <div className="carousel-progress"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
    </section>
  );
}

function HeroCarousel() {
  const { lang } = React.useContext(LangContext);
  const items = window.PROJECTS;
  const [idx, setIdx] = useState(0);
  const go = (d) => setIdx((p) => (p + d + items.length) % items.length);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const cur = items[idx];
  return (
    <section className="hero-carousel">
      {items.map((p, i) => (
        <div key={p.id} className={`hc-slide ${i === idx ? "is-active" : ""}`}>
          <img src={p.cover} alt={p.title} />
        </div>
      ))}
      <div className="hc-content">
        <div className="inner">
          <div className="hc-eyebrow">N° 0{idx + 1} — {t(cur.category, lang)} — {cur.year}</div>
          <h1 className="hc-title" key={cur.id}>{cur.title} <em>{t(cur.subtitle, lang).toLowerCase()}</em>.</h1>
          <div className="hc-meta">
            <a href={`#/project/${cur.id}`} className="btn-light" data-cursor="view">{lang === "es" ? "Ver proyecto" : "View project"} →</a>
            <span>{t(cur.location, lang)}</span>
          </div>
        </div>
      </div>
      <div className="hc-controls">
        <button onClick={() => go(-1)} data-cursor="link" aria-label="Previous">←</button>
        <button onClick={() => go(1)} data-cursor="link" aria-label="Next">→</button>
      </div>
      <div className="hc-dots">
        {items.map((_, i) => (
          <button key={i} className={`hc-dot ${i === idx ? "is-active" : ""}`} onClick={() => setIdx(i)} data-cursor="link" aria-label={`Slide ${i+1}`} />
        ))}
      </div>
    </section>
  );
}

function HeroSplit() {
  const { lang } = React.useContext(LangContext);
  const cur = window.PROJECTS[0];
  return (
    <section className="hero-split">
      <div className="hero-split-text">
        <span className="eyebrow">{lang === "es" ? "Estudio independiente · Costa del Sol" : "Independent practice · Costa del Sol"}</span>
        <h1>{lang === "es" ? <>Diseño de interiores<br/>para espacios<br/><em>que cuentan una historia</em>.</> : <>Interior design<br/>for spaces<br/><em>that tell a story</em>.</>}</h1>
        <div>
          <a href="#/work" className="btn" data-cursor="link">{lang === "es" ? "Ver proyectos" : "See projects"} <span className="btn-arrow">→</span></a>
          <div className="hero-split-meta"><span>2018 — 2024</span><span>{lang === "es" ? "03 proyectos" : "03 projects"}</span><span>ES · EN</span></div>
        </div>
      </div>
      <div className="hero-split-img"><img src={cur.cover} alt={cur.title} /></div>
    </section>
  );
}

function HomePage() {
  const { lang } = React.useContext(LangContext);
  const C = window.COPY;
  const homeStyle = (typeof window !== "undefined" && window.__homeStyle) || "carousel";
  return (
    <div className="page">
      {homeStyle === "split" ? <HeroSplit /> : homeStyle === "text" ? (
        <section className="hero">
          <div className="hero-eyebrow eyebrow">{t(C.hero.eyebrow, lang)}</div>
          <h1 className="hero-title">
            {C.hero.headline[lang].map((line, i) => (
              <span className="line" key={i}><span className="line-inner">{line}</span></span>
            ))}
          </h1>
          <div className="hero-meta">
            <a href="#/work" className="btn" data-cursor="link">{t(C.hero.cta, lang)} <span className="btn-arrow">→</span></a>
            <span className="hero-scroll">{t(C.hero.scroll, lang)}</span>
          </div>
        </section>
      ) : <HeroCarousel />}

      <section className="featured">
        <div className="featured-header">
          <h2 className="featured-title">
            {lang === "es" ? <>Una selección de <em>proyectos recientes</em> — residenciales, comerciales y efímeros.</> : <>A selection of <em>recent work</em> — residential, commercial and ephemeral.</>}
          </h2>
          <a href="#/work" className="link-underline" data-cursor="link" style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase"}}>
            {lang === "es" ? "Ver todos →" : "View all →"}
          </a>
        </div>
        <div className="featured-grid">
          {window.PROJECTS.map((p, i) => (
            <a key={p.id} href={`#/project/${p.id}`} className="feat-card" data-cursor="view">
              <div className="media"><img src={p.cover} alt={p.title} loading="lazy" /></div>
              <div className="feat-info">
                <span className="feat-num">N° 0{i + 1} / {p.year}</span>
                <h3 className="feat-title">{p.title} <em>{lang === "es" ? "—" : "—"}</em></h3>
                <div className="feat-meta">
                  <span>{t(p.category, lang)}</span>
                  <span>{t(p.location, lang)}</span>
                </div>
                <p className="feat-desc">{t(p.intro, lang)}</p>
                <span className="link-underline" style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase"}}>
                  {lang === "es" ? "Ver proyecto →" : "View project →"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {Array.from({length:2}).map((_, k) => (
            <React.Fragment key={k}>
              {lang === "es"
                ? <>Diseño de interiores <span>·</span> Costa del Sol <span>·</span> Proyectos llave en mano <span>·</span> Clientes internacionales <span>·</span> Renders &amp; Planos <span>·</span> Trabajando para estudios <span>·</span></>
                : <>Interior design <span>·</span> Costa del Sol <span>·</span> Turnkey projects <span>·</span> International clients <span>·</span> Renders &amp; drawings <span>·</span> Working with studios <span>·</span></>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   WORK / PORTFOLIO
   ================================================================= */
function WorkMosaic() {
  const { lang } = React.useContext(LangContext);
  const items = window.PROJECTS;
  const sizes = ["s1", "s2", "s3", "s4"];
  return (
    <section className="work-mosaic">
      {items.map((p, i) => (
        <a key={p.id} href={`#/project/${p.id}`} className={`wm-card ${sizes[i % sizes.length]}`} data-cursor="view">
          <div className="media"><img src={p.cover} alt={p.title} /></div>
          <div className="wm-overlay">
            <span>N° 0{i+1} — {p.year}</span>
            <h3>{p.title}</h3>
            <span>{t(p.category, lang)}</span>
          </div>
        </a>
      ))}
    </section>
  );
}

function WorkPage() {
  const { lang } = React.useContext(LangContext);
  const [hover, setHover] = useState(null);
  const previewRef = useRef(null);
  const workStyle = (typeof window !== "undefined" && window.__workStyle) || "list";

  useEffect(() => {
    const move = (e) => {
      if (!previewRef.current) return;
      previewRef.current.style.left = e.clientX + "px";
      previewRef.current.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="page">
      <section className="portfolio-head">
        <span className="eyebrow">{lang === "es" ? "Portfolio · 2018 — 2024" : "Portfolio · 2018 — 2024"}</span>
        <h1 style={{marginTop: 24}}>
          {lang === "es" ? <>Cada proyecto, <em>una historia</em><br/>distinta.</> : <>Every project, <em>a different</em><br/>story.</>}
        </h1>
        <div className="meta">
          <span className="eyebrow">{lang === "es" ? "03 proyectos seleccionados" : "03 selected projects"}</span>
          <span className="eyebrow">{lang === "es" ? "Residencial · Comercial · Efímero" : "Residential · Commercial · Ephemeral"}</span>
        </div>
      </section>

      {workStyle === "mosaic" ? <WorkMosaic /> : (
        <>
        <section className="portfolio-grid">
          {window.PROJECTS.map((p, i) => (
            <a key={p.id} href={`#/project/${p.id}`} className="pg-row" data-cursor="view"
              onMouseEnter={() => setHover(p.cover)} onMouseLeave={() => setHover(null)}>
              <span className="num">N° 0{i + 1}</span>
              <span className="pg-title">{p.title}</span>
              <span className="pg-cat">{t(p.category, lang)} — {t(p.location, lang)}</span>
              <span className="pg-year">{p.year} ↗</span>
            </a>
          ))}
          <div ref={previewRef} className={`pg-preview media ${hover ? "is-show" : ""}`}>
            {hover && <img src={hover} alt="" />}
          </div>
        </section>
        <section style={{padding:"0 var(--pad) clamp(80px, 12vw, 160px)", maxWidth:"var(--maxw)", margin:"0 auto"}}>
          <span className="eyebrow">{lang === "es" ? "Vista en cuadrícula" : "Grid view"}</span>
          <div className="pg-cards three">
            {window.PROJECTS.map((p) => (
              <a key={p.id} href={`#/project/${p.id}`} className="pg-card" data-cursor="view">
                <div className="media"><img src={p.cover} alt={p.title} loading="lazy" /></div>
                <div className="pg-card-title">{p.title}</div>
                <div className="pg-card-meta">{t(p.category, lang)} · {p.year}</div>
              </a>
            ))}
          </div>
        </section>
        </>
      )}
    </div>
  );
}

/* =================================================================
   PROJECT PAGE
   ================================================================= */
function ProjectPage({ id }) {
  const { lang } = React.useContext(LangContext);
  const project = window.PROJECTS.find(p => p.id === id);
  const [lbIdx, setLbIdx] = useState(null);

  if (!project) {
    return (
      <div className="page" style={{padding:"180px var(--pad)", textAlign:"center"}}>
        <h1 style={{fontFamily:"var(--display-font)", fontSize:64}}>404</h1>
        <p>Proyecto no encontrado</p>
        <a href="#/work" className="btn" data-cursor="link">← Portfolio</a>
      </div>
    );
  }

  const idx = window.PROJECTS.findIndex(p => p.id === id);
  const next = window.PROJECTS[(idx + 1) % window.PROJECTS.length];
  const prev = window.PROJECTS[(idx - 1 + window.PROJECTS.length) % window.PROJECTS.length];

  // Build a richer gallery using cover + story-aligned variants
  const galleryImgs = project.gallery.length >= 3 ? project.gallery : [project.cover, ...project.gallery, project.moodboard].filter(Boolean);

  return (
    <div className="page">
      <section className="proj-hero">
        <div className="eyebrow-row">
          <span className="eyebrow">{t(project.category, lang)}</span>
          <a href="#/work" className="eyebrow link-underline" data-cursor="link">← {lang === "es" ? "Portfolio" : "Portfolio"}</a>
        </div>
        <h1>{project.title} <em>{t(project.subtitle, lang).toLowerCase()}</em></h1>
        <dl className="proj-hero-meta">
          <div><dt>{lang === "es" ? "Año" : "Year"}</dt><dd>{project.year}</dd></div>
          <div><dt>{lang === "es" ? "Ubicación" : "Location"}</dt><dd>{t(project.location, lang)}</dd></div>
          <div><dt>{lang === "es" ? "Cliente" : "Client"}</dt><dd>{t(project.client, lang)}</dd></div>
          <div><dt>{lang === "es" ? "Rol" : "Role"}</dt><dd>{t(project.role, lang)}</dd></div>
        </dl>
        <div className="proj-cover media" data-cursor="view" onClick={() => setLbIdx(0)}>
          <img src={project.cover} alt={project.title} />
        </div>
      </section>

      <section className="proj-section">
        <div>
          <h2>{lang === "es" ? "El proyecto" : "The project"}</h2>
        </div>
        <div className="body">
          {project.story[lang].map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </section>

      <section className="proj-section">
        <div>
          <h2>{lang === "es" ? "Materiales" : "Materials"}</h2>
        </div>
        <div className="body">
          <ul className="proj-materials">
            {project.materials.map((m, i) => <li key={i}>— {m}</li>)}
          </ul>
        </div>
      </section>

      <section className="proj-gallery">
        {galleryImgs.length > 1 && (
          <div className="proj-gallery-row">
            <div className="media" data-cursor="view" onClick={() => setLbIdx(0)}>
              <img src={galleryImgs[0]} alt="" />
            </div>
            <div className="media" data-cursor="view" onClick={() => setLbIdx(1 % galleryImgs.length)}>
              <img src={galleryImgs[1 % galleryImgs.length]} alt="" />
            </div>
          </div>
        )}
        <div className="proj-gallery-full media" data-cursor="view" onClick={() => setLbIdx(0)}>
          <img src={project.cover} alt="" />
        </div>
      </section>

      <section className="proj-nav">
        <a href={`#/project/${prev.id}`} className="proj-nav-card" data-cursor="link">
          <span className="eyebrow">← {lang === "es" ? "Proyecto anterior" : "Previous project"}</span>
          <h3>{prev.title}</h3>
        </a>
        <a href={`#/project/${next.id}`} className="proj-nav-card right" data-cursor="link">
          <span className="eyebrow">{lang === "es" ? "Siguiente proyecto" : "Next project"} →</span>
          <h3>{next.title}</h3>
        </a>
      </section>

      {lbIdx !== null && (
        <window.AnaCore.Lightbox
          images={galleryImgs}
          index={lbIdx}
          onClose={() => setLbIdx(null)}
          onNav={(d) => setLbIdx((lbIdx + d + galleryImgs.length) % galleryImgs.length)}
        />
      )}
    </div>
  );
}

/* =================================================================
   ABOUT
   ================================================================= */
function AboutTimeline() {
  const { lang } = React.useContext(LangContext);
  const rows = [
    { year: "2026", title: { es: <>Diseñadora de interiores en <em>Decor Studio</em></>, en: <>Interior designer at <em>Decor Studio</em></> }, body: { es: "Lidero proyectos integrales llave en mano para clientes internacionales en Puerto Banús. 30 proyectos al año, +1M€ en ventas.", en: "I lead integral turnkey projects for international clients in Puerto Banús. 30 projects per year, €1M+ in sales." } },
    { year: "2024", title: { es: <>Casa Mijas — <em>residencial</em></>, en: <>Casa Mijas — <em>residential</em></> }, body: { es: "Vivienda en la Costa del Sol. Coordinación integral desde el concepto hasta la entrega final.", en: "Home on the Costa del Sol. Integral coordination from concept to final delivery." } },
    { year: "2024", title: { es: <>BOM — <em>bombonería boutique</em></>, en: <>BOM — <em>boutique chocolate shop</em></> }, body: { es: "Proyecto comercial en edificio protegido. Diálogo entre Art Déco y contemporaneidad.", en: "Commercial project in a listed building. Dialogue between Art Deco and contemporary." } },
    { year: "2018\u2014\u201922", title: { es: <>Estudios superiores en <em>Diseño de Interiores</em></>, en: <>Higher Studies in <em>Interior Design</em></> }, body: { es: "Escuela de Artes de Almería. Formación técnica y proyectual completa.", en: "School of Arts of Almería. Complete technical and design training." } },
    { year: "2018", title: { es: <>MAS Creation — <em>flagship store</em></>, en: <>MAS Creation — <em>flagship store</em></> }, body: { es: "Container marítimo convertido en tienda insignia con identidad Masquespacio.", en: "Shipping container turned into a flagship store with Masquespacio identity." } },
  ];
  return (
    <section className="about-timeline">
      <h1>{lang === "es" ? <>Una <em>trayectoria</em><br/>en hitos.</> : <>A <em>journey</em><br/>in milestones.</>}</h1>
      {rows.map((r, i) => (
        <div key={i} className="tl-row">
          <div className="tl-year">{r.year}</div>
          <div className="tl-title">{r.title[lang]}</div>
          <div className="tl-body">{r.body[lang]}</div>
        </div>
      ))}
    </section>
  );
}

function AboutPage() {
  const { lang } = React.useContext(LangContext);
  const C = window.COPY;
  const aboutStyle = (typeof window !== "undefined" && window.__aboutStyle) || "editorial";
  if (aboutStyle === "timeline") {
    return (
      <div className="page">
        <AboutTimeline />
        <section className="stats-row">
          {C.about.stats.map((s, i) => (
            <div key={i}><div className="n">{s.n}</div><span className="l">{t(s.l, lang)}</span></div>
          ))}
        </section>
      </div>
    );
  }
  return (
    <div className="page">
      <section className="about-hero">
        <h1>{lang === "es" ? <>Diseño <em>desde la</em><br/>Costa del Sol.</> : <>Design <em>from the</em><br/>Costa del Sol.</>}</h1>
        <div className="body">{C.about.body[lang].slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}</div>
      </section>
      <section className="about-portrait">
        <div className="media">
          <div style={{ width:"100%", height:"100%", background: "repeating-linear-gradient(135deg, var(--bg-2) 0 24px, var(--paper) 24px 48px)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.18em", color:"var(--ink-soft)", textTransform:"uppercase" }}>[ {lang === "es" ? "Retrato profesional" : "Professional portrait"} ]</div>
        </div>
        <div className="body">
          {C.about.body[lang].slice(2).map((p, i) => <p key={i}>{p}</p>)}
          <a href="#/contact" className="btn" data-cursor="link" style={{marginTop: 32}}>{lang === "es" ? "Hablemos" : "Get in touch"} <span className="btn-arrow">→</span></a>
        </div>
      </section>
      <section className="stats-row">
        {C.about.stats.map((s, i) => (
          <div key={i}><div className="n">{s.n}</div><span className="l">{t(s.l, lang)}</span></div>
        ))}
      </section>
    </div>
  );
}

/* =================================================================
   SERVICES
   ================================================================= */
function ServicesPage() {
  const { lang } = React.useContext(LangContext);
  const C = window.COPY;
  return (
    <div className="page">
      <section className="serv-hero">
        <span className="eyebrow">{lang === "es" ? "Capacidades · Para estudios" : "Capabilities · For studios"}</span>
        <h1 style={{marginTop: 32}}>
          {lang === "es" ? <>Lo que <em>aporto</em><br/>al equipo.</> : <>What <em>I bring</em><br/>to the team.</>}
        </h1>
        <p className="intro">{t(C.services.intro, lang)}</p>
      </section>

      <section className="serv-list">
        {window.SERVICES.map((s, i) => (
          <div key={s.id} className="serv-row">
            <span className="num">0{i + 1} / 0{window.SERVICES.length}</span>
            <h3>{t(s.title, lang)}</h3>
            <p className="desc">{t(s.desc, lang)}</p>
          </div>
        ))}
        <div style={{padding:"clamp(40px, 6vw, 80px) 0", textAlign:"center"}}>
          <a href={`mailto:${C.contact.email}?subject=${lang==="es"?"Consulta":"Inquiry"}`} className="btn" data-cursor="link">
            {t(C.services.cta, lang)} <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

/* =================================================================
   CV
   ================================================================= */
function CVPage() {
  const { lang } = React.useContext(LangContext);
  const C = window.COPY.cv;
  const D = window.CV_DATA;
  return (
    <div className="page">
      <section className="cv-hero">
        <h1>{lang === "es" ? <>Curriculum<br/><em>Vitae</em></> : <>Curriculum<br/><em>Vitae</em></>}</h1>
        <a href="https://anamanz7.github.io/anamanzanares.github.io/PORTFOLIO/CURRICULUM ANA .pdf" target="_blank" rel="noopener" className="btn" data-cursor="link">
          {t(C.download, lang)} <span className="btn-arrow">↓</span>
        </a>
      </section>

      <div className="cv-content">
        <aside className="cv-side">
          <a href="#profile" data-cursor="link">{t(C.profile, lang)}</a>
          <a href="#experience" data-cursor="link">{t(C.experience, lang)}</a>
          <a href="#education" data-cursor="link">{t(C.education, lang)}</a>
          <a href="#software" data-cursor="link">{t(C.software, lang)}</a>
          <a href="#languages" data-cursor="link">{t(C.languages, lang)}</a>
        </aside>

        <div>
          <section id="profile" className="cv-section">
            <h2>{t(C.profile, lang)}</h2>
            <p style={{fontFamily:"var(--display-font)", fontSize:"clamp(18px, 1.6vw, 22px)", lineHeight:1.6, color:"var(--ink)"}}>{t(C.profileBody, lang)}</p>
          </section>

          <section id="experience" className="cv-section">
            <h2>{t(C.experience, lang)}</h2>
            {D.experience.map((e, i) => (
              <div key={i} className="cv-item">
                <div className="left">
                  <div className="role">{t(e.role, lang)}</div>
                  <div className="company">{e.company}</div>
                  <span className="period">{t(e.period, lang)}</span>
                </div>
                <ul>
                  {e.bullets[lang].map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section id="education" className="cv-section">
            <h2>{t(C.education, lang)}</h2>
            {D.education.map((e, i) => (
              <div key={i} className="cv-item">
                <div className="left">
                  <div className="role">{t(e.title, lang)}</div>
                  <div className="company">{t(e.school, lang)}</div>
                </div>
                <span className="period" style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.14em", color:"var(--ink-soft)"}}>{t(e.period, lang)}</span>
              </div>
            ))}
          </section>

          <section id="software" className="cv-section">
            <h2>{t(C.software, lang)}</h2>
            <div className="skill-grid">
              {D.software.map((s) => {
                const item = typeof s === "string" ? { name: s, level: 4, label: { es: "Avanzado", en: "Advanced" } } : s;
                const lvl = item.level || 4;
                const labels = {
                  5: { es: "Experto", en: "Expert" },
                  4: { es: "Avanzado", en: "Advanced" },
                  3: { es: "Intermedio", en: "Intermediate" },
                  2: { es: "Básico", en: "Basic" },
                };
                const label = item.label || labels[lvl] || labels[4];
                return (
                  <div className="skill" key={item.name}>
                    <div className="skill-row">
                      <span className="skill-name">{item.name}</span>
                      <span className="skill-level-label">{t(label, lang)}</span>
                    </div>
                    <div className="skill-bar"><span style={{ width: `${(lvl / 5) * 100}%` }} /></div>
                    <div className="skill-dots">
                      {[1,2,3,4,5].map((n) => (
                        <span key={n} className={`skill-dot ${n <= lvl ? "fill" : ""}`} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="languages" className="cv-section">
            <h2>{t(C.languages, lang)}</h2>
            {D.languages.map((l, i) => (
              <div key={i} className="cv-item">
                <div className="left">
                  <div className="role">{t(l.name, lang)}</div>
                </div>
                <div style={{color:"var(--ink-soft)"}}>{t(l.level, lang)}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

/* =================================================================
   CONTACT
   ================================================================= */
function ContactPage() {
  const { lang } = React.useContext(LangContext);
  const C = window.COPY.contact;
  return (
    <div className="page">
      <section className="contact">
        <h1>{lang === "es" ? <>¿Hablamos<em>?</em></> : <>Let's<br/>talk<em>.</em></>}</h1>
        <div className="body">
          <p>{t(C.body, lang)}</p>
          <ul className="contact-list">
            <li>
              <span className="label">Email</span>
              <a href={`mailto:${C.email}`} className="link-underline" data-cursor="link">{C.email}</a>
            </li>
            <li>
              <span className="label">Instagram</span>
              <a href="https://instagram.com/anamanz_" target="_blank" rel="noopener" className="link-underline" data-cursor="link">{C.instagram}</a>
            </li>
            <li>
              <span className="label">{lang === "es" ? "Ubicación" : "Location"}</span>
              <span>{t(C.location, lang)}</span>
            </li>
            <li>
              <span className="label">{lang === "es" ? "Disponibilidad" : "Availability"}</span>
              <span>{lang === "es" ? "Estudios de interiorismo" : "Interior design studios"}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

window.AnaPages = { HomePage, WorkPage, ProjectPage, AboutPage, ServicesPage, CVPage, ContactPage };
