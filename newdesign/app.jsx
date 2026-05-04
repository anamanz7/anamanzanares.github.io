/* global React */
const { useState, useEffect } = React;
const { useRoute, LangContext, Cursor, Nav, Footer } = window.AnaCore;
const { HomePage, WorkPage, ProjectPage, AboutPage, ServicesPage, CVPage, ContactPage } = window.AnaPages;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "warm",
  "displayFont": "Cormorant Garamond",
  "accent": "#8a6a4a",
  "showMarquee": true,
  "homeStyle": "carousel",
  "workStyle": "list",
  "aboutStyle": "editorial"
}/*EDITMODE-END*/;

function App() {
  const route = useRoute();
  const [lang, setLang] = useState("es");
  const tweaks = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [t, setTweak] = tweaks;

  useEffect(() => {
    document.body.setAttribute("data-theme", t.theme || "warm");
    document.documentElement.style.setProperty("--display-font", `"${t.displayFont}", "Cormorant Garamond", Georgia, serif`);
    if (t.accent) document.documentElement.style.setProperty("--accent", t.accent);
    window.__homeStyle = t.homeStyle || "carousel";
    window.__workStyle = t.workStyle || "list";
    window.__aboutStyle = t.aboutStyle || "editorial";
  }, [t.theme, t.displayFont, t.accent, t.homeStyle, t.workStyle, t.aboutStyle]);

  // Render page from hash
  let page;
  if (route === "#/" || route === "" || route === "#") page = <HomePage />;
  else if (route === "#/work") page = <WorkPage />;
  else if (route.startsWith("#/project/")) page = <ProjectPage id={route.replace("#/project/", "")} />;
  else if (route === "#/about") page = <AboutPage />;
  else if (route === "#/services") page = <ServicesPage />;
  else if (route === "#/cv") page = <CVPage />;
  else if (route === "#/contact") page = <ContactPage />;
  else page = <HomePage />;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Nav />
      <main key={route}>{page}</main>
      <Footer />
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Dirección estética">
            <window.TweakRadio
              label="Tema"
              value={t.theme}
              options={[
                { value: "warm", label: "Warm" },
                { value: "dark", label: "Dark" },
                { value: "editorial", label: "Editorial" },
              ]}
              onChange={(v) => setTweak("theme", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Tipografía">
            <window.TweakSelect
              label="Display font"
              value={t.displayFont}
              options={[
                { value: "Cormorant Garamond", label: "Cormorant (serif clásico)" },
                { value: "Fraunces", label: "Fraunces (serif moderno)" },
                { value: "Playfair Display", label: "Playfair (serif editorial)" },
                { value: "Libre Caslon Text", label: "Libre Caslon" },
                { value: "DM Serif Display", label: "DM Serif" },
              ]}
              onChange={(v) => setTweak("displayFont", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Color de acento">
            <window.TweakColor
              label="Accent"
              value={t.accent}
              onChange={(v) => setTweak("accent", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Estilo de Home">
            <window.TweakRadio
              label="Hero"
              value={t.homeStyle}
              options={[
                { value: "carousel", label: "Carrusel full-bleed" },
                { value: "split", label: "Editorial split" },
                { value: "text", label: "Tipografía grande" },
              ]}
              onChange={(v) => setTweak("homeStyle", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Estilo de Proyectos">
            <window.TweakRadio
              label="Vista"
              value={t.workStyle}
              options={[
                { value: "list", label: "Lista + grid" },
                { value: "mosaic", label: "Mosaico visual" },
              ]}
              onChange={(v) => setTweak("workStyle", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Estilo de Sobre mí">
            <window.TweakRadio
              label="Layout"
              value={t.aboutStyle}
              options={[
                { value: "editorial", label: "Editorial + retrato" },
                { value: "timeline", label: "Línea de tiempo" },
              ]}
              onChange={(v) => setTweak("aboutStyle", v)}
            />
          </window.TweakSection>
          <window.TweakSection title="Detalles">
            <window.TweakToggle label="Marquee en home" value={t.showMarquee} onChange={(v) => setTweak("showMarquee", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
