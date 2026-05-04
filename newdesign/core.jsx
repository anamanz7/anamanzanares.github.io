/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

/* =================================================================
   ROUTER (hash-based)
   ================================================================= */
function useRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}
function navigate(to) {
  window.location.hash = to;
}

/* =================================================================
   I18N CONTEXT
   ================================================================= */
const LangContext = React.createContext({ lang: "es", setLang: () => {} });
const t = (val, lang) => {
  if (val == null) return "";
  if (typeof val === "string") return val;
  return val[lang] ?? val.es ?? "";
};

/* =================================================================
   CUSTOM CURSOR
   ================================================================= */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(null); // null | "link" | "view"

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    const enter = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) setHover(el.getAttribute("data-cursor"));
    };
    const leave = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.("[data-cursor]")) setHover(null);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  const labels = { view: "View", open: "Open", read: "Read", drag: "Drag" };
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hover ? (labels[hover] ? "is-text" : "is-hover") : ""}`}>
        {hover && labels[hover] ? <span className="cursor-label">{labels[hover]}</span> : null}
      </div>
    </>
  );
}

/* =================================================================
   NAV
   ================================================================= */
function Nav() {
  const route = useRoute();
  const { lang, setLang } = React.useContext(LangContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => {
    if (path === "#/" && (route === "#/" || route === "")) return true;
    if (path !== "#/" && route.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#/" className="nav-logo" data-cursor="link">
        Ana <span>Manzanares</span>
      </a>
      <div className="nav-links">
        <a href="#/work" className={`nav-link ${isActive("#/work") || route.startsWith("#/project") ? "is-active" : ""}`} data-cursor="link">{t(window.COPY.nav.work, lang)}</a>
        <a href="#/about" className={`nav-link ${isActive("#/about") ? "is-active" : ""}`} data-cursor="link">{t(window.COPY.nav.about, lang)}</a>
        <a href="#/services" className={`nav-link ${isActive("#/services") ? "is-active" : ""}`} data-cursor="link">{t(window.COPY.nav.services, lang)}</a>
        <a href="#/cv" className={`nav-link ${isActive("#/cv") ? "is-active" : ""}`} data-cursor="link">{t(window.COPY.nav.cv, lang)}</a>
        <a href="#/contact" className={`nav-link always ${isActive("#/contact") ? "is-active" : ""}`} data-cursor="link">{t(window.COPY.nav.contact, lang)}</a>
        <span className="nav-lang" data-cursor="link">
          <button className={lang === "es" ? "is-active" : ""} onClick={() => setLang("es")}>ES</button>
          <span className="sep">/</span>
          <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>EN</button>
        </span>
      </div>
    </nav>
  );
}

/* =================================================================
   FOOTER
   ================================================================= */
function Footer() {
  const { lang } = React.useContext(LangContext);
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <span className="eyebrow">{lang === "es" ? "¿Trabajamos juntos?" : "Let's work together"}</span>
          <h3>{lang === "es" ? <>Cuéntame tu <em style={{fontStyle:"italic", color:"var(--accent)"}}>proyecto</em>.</> : <>Tell me about your <em style={{fontStyle:"italic", color:"var(--accent)"}}>project</em>.</>}</h3>
          <a href={`mailto:${window.COPY.contact.email}`} className="btn" data-cursor="link">
            {window.COPY.contact.email} <span className="btn-arrow">→</span>
          </a>
        </div>
        <div>
          <span className="eyebrow">{lang === "es" ? "Navegación" : "Sitemap"}</span>
          <ul>
            <li><a href="#/" data-cursor="link" className="link-underline">Home</a></li>
            <li><a href="#/work" data-cursor="link" className="link-underline">{t(window.COPY.nav.work, lang)}</a></li>
            <li><a href="#/about" data-cursor="link" className="link-underline">{t(window.COPY.nav.about, lang)}</a></li>
            <li><a href="#/services" data-cursor="link" className="link-underline">{t(window.COPY.nav.services, lang)}</a></li>
            <li><a href="#/cv" data-cursor="link" className="link-underline">{t(window.COPY.nav.cv, lang)}</a></li>
          </ul>
        </div>
        <div>
          <span className="eyebrow">{lang === "es" ? "Sígueme" : "Follow"}</span>
          <ul>
            <li><a href="https://instagram.com/anamanz_" target="_blank" rel="noopener" data-cursor="link" className="link-underline">Instagram ↗</a></li>
            <li><a href={`mailto:${window.COPY.contact.email}`} data-cursor="link" className="link-underline">Email ↗</a></li>
            <li><span style={{color:"var(--ink-soft)"}}>{t(window.COPY.contact.location, lang)}</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Ana Manzanares</span>
        <span>{lang === "es" ? "Diseñado con cuidado · Marbella" : "Crafted with care · Marbella"}</span>
      </div>
    </footer>
  );
}

/* =================================================================
   LIGHTBOX
   ================================================================= */
function Lightbox({ images, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <div className="lightbox" onClick={onClose}>
      <img src={images[index]} alt="" onClick={(e) => e.stopPropagation()} />
      <button className="lightbox-close" onClick={onClose} data-cursor="link">Cerrar ✕</button>
      {images.length > 1 && (
        <>
          <button className="lightbox-arrow prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }} data-cursor="link">← Prev</button>
          <button className="lightbox-arrow next" onClick={(e) => { e.stopPropagation(); onNav(1); }} data-cursor="link">Next →</button>
          <div className="lightbox-counter">{index + 1} / {images.length}</div>
        </>
      )}
    </div>
  );
}

window.AnaCore = { useRoute, navigate, LangContext, t, Cursor, Nav, Footer, Lightbox };
