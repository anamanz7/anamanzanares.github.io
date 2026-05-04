// Datos centralizados del portfolio de Ana Manzanares
// Imágenes referenciadas desde el dominio público para tener material real

const BASE = "https://anamanz7.github.io/anamanzanares.github.io";

const PROJECTS = [
  {
    id: "mas-creation",
    title: "MAS Creation",
    subtitle: { es: "Flagship Store", en: "Flagship Store" },
    category: { es: "Espacios Efímeros", en: "Ephemeral Spaces" },
    year: "2018",
    location: { es: "Valencia, España", en: "Valencia, Spain" },
    client: "Masquespacio",
    role: { es: "Diseño conceptual y desarrollo", en: "Concept design & development" },
    cover: `${BASE}/PORTFOLIO/MAS-CREATION/images/1 NOCHE.jpg`,
    moodboard: `${BASE}/PORTFOLIO/MAS-CREATION/images/moodboard.jpg`,
    intro: {
      es: "Flagship store en container marítimo que fusiona formas orgánicas y vidrios coloreados con la identidad de Masquespacio.",
      en: "Flagship store inside a shipping container that fuses organic forms and coloured glass with the Masquespacio identity."
    },
    story: {
      es: [
        "El proyecto nace de un encargo poco habitual: convertir un container marítimo en una tienda insignia capaz de viajar y montarse en cualquier ubicación. La premisa era clara — el espacio debía sentirse permanente, aunque su naturaleza fuera efímera.",
        "Trabajamos sobre el lenguaje visual de Masquespacio: curvas blandas, vidrios tintados, materiales nobles y una iluminación teatral que convierte el container en un objeto luminoso al caer la noche. La fachada exterior funciona como instalación urbana; el interior, como una pequeña galería comercial.",
        "El reto técnico fue resolver toda la instalación dentro de las dimensiones de un 40 pies, garantizando que el montaje y desmontaje pudieran realizarse en menos de 48 horas en cualquier ciudad."
      ],
      en: [
        "The project began with an unusual brief: turn a shipping container into a flagship store capable of travelling and being installed anywhere. The premise was clear — the space had to feel permanent, even if its nature was ephemeral.",
        "We worked from Masquespacio's visual language: soft curves, tinted glass, noble materials and theatrical lighting that turns the container into a glowing object after dark. The façade works as an urban installation; the interior, as a small commercial gallery.",
        "The technical challenge was fitting the entire installation within a 40ft container, ensuring that setup and breakdown could happen in under 48 hours in any city."
      ]
    },
    materials: ["Acero corten", "Vidrio coloreado", "Microcemento", "Latón cepillado", "Madera tintada"],
    gallery: [
      `${BASE}/PORTFOLIO/MAS-CREATION/images/1 NOCHE.jpg`,
      `${BASE}/PORTFOLIO/MAS-CREATION/images/moodboard.jpg`,
    ],
  },
  {
    id: "bom",
    title: "BOM",
    subtitle: { es: "Bombonería Boutique", en: "Boutique Chocolate Shop" },
    category: { es: "Espacios Comerciales", en: "Commercial Spaces" },
    year: "2024",
    location: { es: "Almería, España", en: "Almería, Spain" },
    client: { es: "Proyecto académico — Edificio protegido", en: "Academic project — Listed building" },
    role: { es: "Diseño integral y dirección de arte", en: "Integral design & art direction" },
    cover: `${BASE}/PORTFOLIO/BOM/imagenes/render-escaparate-1-ok.png`,
    intro: {
      es: "Bombonería boutique en edificio protegido que fusiona tradición y contemporaneidad con influencias Art Déco.",
      en: "Boutique chocolate shop inside a listed building that blends tradition and contemporary design with Art Deco influences."
    },
    story: {
      es: [
        "El edificio, catalogado como protegido, condicionaba todas las decisiones de proyecto. Trabajar dentro de esos límites se convirtió en una oportunidad: la arquitectura existente dictó el ritmo del espacio y el diseño se acomodó a ella, no al revés.",
        "Las referencias Art Déco aparecen filtradas — geometrías suaves, latón pulido, mármoles veteados — sin caer en la nostalgia. El bombón, como objeto, ocupa el centro de la composición: vitrinas a media altura, iluminación puntual y mobiliario que enmarca cada pieza como si fuera una joya.",
        "El escaparate funciona como pieza independiente: un diorama urbano que cambia con las colecciones de temporada y dialoga con la fachada original del edificio."
      ],
      en: [
        "The building, listed as a protected heritage site, shaped every project decision. Working within those limits became an opportunity: the existing architecture set the rhythm of the space and the design adapted to it, not the other way around.",
        "Art Deco references appear filtered — soft geometries, polished brass, veined marble — without falling into nostalgia. The chocolate, as an object, takes centre stage: mid-height display cases, accent lighting and furniture that frame each piece like a jewel.",
        "The shopfront works as a standalone piece: an urban diorama that changes with seasonal collections and dialogues with the building's original façade."
      ]
    },
    materials: ["Mármol Calacatta", "Latón pulido", "Madera de nogal", "Terrazo a medida", "Vidrio curvado"],
    gallery: [
      `${BASE}/PORTFOLIO/BOM/imagenes/render-escaparate-1-ok.png`,
    ],
  },
  {
    id: "residencial",
    title: "Casa Mijas",
    subtitle: { es: "Proyecto Residencial", en: "Residential Project" },
    category: { es: "Interiorismo Residencial", en: "Residential Interiors" },
    year: "2024",
    location: { es: "Mijas, Málaga", en: "Mijas, Málaga" },
    client: { es: "Cliente privado internacional", en: "International private client" },
    role: { es: "Proyecto integral llave en mano", en: "Integral turnkey project" },
    cover: `${BASE}/PORTFOLIO/ECI/mijas/dormitorio-ppal.png`,
    intro: {
      es: "Diseño de interiores para vivienda residencial en Mijas, fusionando elegancia contemporánea con comodidad mediterránea.",
      en: "Interior design for a residential home in Mijas, blending contemporary elegance with Mediterranean comfort."
    },
    story: {
      es: [
        "Una vivienda en la Costa del Sol con uso mixto — residencia habitual y casa de invitados — que necesitaba sentirse cálida sin renunciar a un acabado de lujo. La luz natural de Mijas, intensa y horizontal, fue el primer material del proyecto.",
        "La paleta combina tonos arena y cremas con maderas claras y textiles naturales. El mobiliario se eligió mezclando piezas de autor con artesanía local, generando una atmósfera personal que evita el catálogo.",
        "Coordiné el proyecto desde la primera reunión con el cliente hasta la entrega con llave en mano: planimetría, renders, selección de materiales, mobiliario, iluminación y dirección de obra."
      ],
      en: [
        "A home on the Costa del Sol with mixed use — primary residence and guest house — that needed to feel warm without giving up a luxury finish. The natural light of Mijas, intense and horizontal, was the first material in the project.",
        "The palette combines sand tones and creams with light woods and natural textiles. Furniture was chosen mixing designer pieces with local craftsmanship, generating a personal atmosphere that avoids feeling catalogue-like.",
        "I led the project from the first client meeting through to turnkey handover: plans, renders, material selection, furniture, lighting and on-site direction."
      ]
    },
    materials: ["Roble natural", "Travertino", "Lino y lana", "Microcemento beige", "Latón mate"],
    gallery: [
      `${BASE}/PORTFOLIO/ECI/mijas/dormitorio-ppal.png`,
    ],
  },
];

const SERVICES = [
  {
    id: "gestion",
    title: { es: "Gestión integral", en: "Integral project management" },
    desc: {
      es: "Llevo proyectos de principio a fin: brief con cliente, concepto, planimetría, materiales, mobiliario, iluminación y dirige obra hasta la entrega llave en mano.",
      en: "I run projects end-to-end: client brief, concept, plans, materials, furniture, lighting and on-site direction through to turnkey delivery."
    },
  },
  {
    id: "tecnico",
    title: { es: "Documentación técnica", en: "Technical documentation" },
    desc: {
      es: "Plantas, alzados y secciones en AutoCAD. Memorias de calidades, mediciones y documentación de obra con la precisión que un estudio necesita.",
      en: "Plans, elevations and sections in AutoCAD. Specifications, measurements and on-site documentation with the precision a studio needs."
    },
  },
  {
    id: "renders",
    title: { es: "Visualización 3D", en: "3D Visualisation" },
    desc: {
      es: "Modelado en SketchUp y renders fotorrealistas con Vray y Enscape. Imágenes y vídeos para presentaciones de cliente y propuestas de proyecto.",
      en: "SketchUp modelling and photorealistic renders with Vray and Enscape. Images and walkthroughs for client presentations and project proposals."
    },
  },
  {
    id: "clientes",
    title: { es: "Cliente internacional", en: "International clients" },
    desc: {
      es: "Experiencia coordinando con clientes de distintas nacionalidades en la Costa del Sol. Trabajo en español e inglés, con sensibilidad para distintos contextos culturales.",
      en: "Experience coordinating with clients of different nationalities on the Costa del Sol. I work in Spanish and English, with sensitivity to different cultural contexts."
    },
  },
];

const CV = {
  experience: [
    {
      role: { es: "Diseñadora de Interiores", en: "Interior Designer" },
      company: "Decor Studio — El Corte Inglés Puerto Banús",
      period: { es: "2022 — Actualidad", en: "2022 — Present" },
      bullets: {
        es: [
          "Gestión integral de proyectos residenciales de lujo desde el concepto inicial hasta la entrega llave en mano",
          "Liderazgo de equipo y coordinación de las diferentes etapas del proceso de diseño",
          "Coordinación con clientes internacionales y equipos multidisciplinares",
          "Media de 30 proyectos anuales con ventas superiores a 1.000.000€",
        ],
        en: [
          "Integral management of luxury residential projects from initial concept to turnkey delivery",
          "Team leadership and coordination across all stages of the design process",
          "Coordination with international clients and multidisciplinary teams",
          "Average of 30 annual projects with sales exceeding €1,000,000",
        ],
      },
    },
    {
      role: { es: "Vendedora", en: "Sales Associate" },
      company: "El Corte Inglés Puerto Banús",
      period: { es: "Verano 2021", en: "Summer 2021" },
      bullets: { es: [], en: [] },
    },
  ],
  education: [
    {
      title: { es: "Estudios Superiores — Diseño de Interiores", en: "Higher Studies — Interior Design" },
      school: { es: "Escuela de Artes de Almería", en: "School of Arts of Almería" },
      period: "2018 — 2022",
    },
    {
      title: { es: "B2 Inglés Cambridge", en: "Cambridge English B2" },
      school: "III School — Marbella",
      period: { es: "Actualidad", en: "Present" },
    },
    {
      title: { es: "B1 Inglés Cambridge", en: "Cambridge English B1" },
      school: "III School — Marbella",
      period: "2017 — 2018",
    },
    {
      title: { es: "Bachillerato — Ciencias y Tecnología", en: "High School — Science & Technology" },
      school: "IES Río Verde — Marbella",
      period: "2015 — 2017",
    },
  ],
  software: [
    { name: "AutoCAD", level: 5 },
    { name: "SketchUp", level: 5 },
    { name: "Vray", level: 4 },
    { name: "Enscape", level: 4 },
    { name: "Photoshop", level: 4 },
    { name: "InDesign", level: 3 },
    { name: "Illustrator", level: 3 },
    { name: "Procreate", level: 3 },
    { name: "Dialux", level: 3 },
    { name: "Microsoft Office", level: 4 },
  ],
  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "Intermedio/Alto (B2 en curso)", en: "Upper-intermediate (B2 in progress)" } },
  ],
};

const COPY = {
  nav: {
    work: { es: "Proyectos", en: "Work" },
    about: { es: "Sobre mí", en: "About" },
    services: { es: "Capacidades", en: "Capabilities" },
    cv: { es: "CV", en: "CV" },
    contact: { es: "Contacto", en: "Contact" },
  },
  hero: {
    eyebrow: { es: "Estudio independiente · Costa del Sol", en: "Independent practice · Costa del Sol" },
    headline: {
      es: ["Diseño de interiores", "para espacios", "que cuentan una historia."],
      en: ["Interior design", "for spaces", "that tell a story."],
    },
    cta: { es: "Ver proyectos", en: "See projects" },
    scroll: { es: "Desplaza", en: "Scroll" },
  },
  about: {
    title: { es: "Sobre mí", en: "About" },
    body: {
      es: [
        "Trabajo en diseño de interiores desde 2022, especializándome en proyectos residenciales de alto nivel en la Costa del Sol. Gestiono proyectos completos desde el concepto inicial hasta la entrega final, coordinando equipos y trabajando directamente con clientes de diferentes culturas.",
        "Me gradué en Estudios Superiores de Diseño de Interiores en la Escuela de Artes de Almería. Actualmente formo parte del equipo de Decor Studio en El Corte Inglés Puerto Banús, donde coordino una media de 30 proyectos al año con un volumen de ventas superior al millón de euros.",
        "Me interesa el diseño que respeta los materiales, la luz natural y los rituales de quien habita el espacio. Trabajo con clientes nacionales e internacionales y siempre con una mirada clara: la arquitectura debe servir a la vida, no a la inversa."
      ],
      en: [
        "I have been working in interior design since 2022, specialising in high-end residential projects on the Costa del Sol. I manage complete projects from initial concept to final delivery, coordinating teams and working directly with clients from different cultures.",
        "I graduated in Higher Studies in Interior Design at the School of Arts of Almería. I am currently part of the Decor Studio team at El Corte Inglés Puerto Banús, where I coordinate an average of 30 projects per year with annual sales exceeding one million euros.",
        "I am interested in design that respects materials, natural light and the rituals of those who inhabit the space. I work with national and international clients with one clear belief: architecture should serve life, not the other way around."
      ],
    },
    stats: [
      { n: "30+", l: { es: "Proyectos al año", en: "Projects per year" } },
      { n: "1M€+", l: { es: "Ventas anuales", en: "Annual sales" } },
      { n: "2022", l: { es: "En la práctica", en: "In practice" } },
      { n: "ES · EN", l: { es: "Idiomas de trabajo", en: "Working languages" } },
    ],
  },
  services: {
    title: { es: "Capacidades", en: "Capabilities" },
    intro: {
      es: "Lo que aporto a un estudio: gestión integral de proyectos, dominio técnico y mirada de diseño. Trabajo con clientes nacionales e internacionales y coordino equipos en todas las fases del proyecto.",
      en: "What I bring to a studio: integral project management, technical command and a designer's eye. I work with national and international clients and coordinate teams across every project phase.",
    },
    cta: { es: "Hablemos", en: "Get in touch" },
  },
  contact: {
    title: { es: "¿Hablamos?", en: "Let's talk" },
    body: {
      es: "Busco incorporarme a un estudio de interiorismo donde aportar mi experiencia gestionando proyectos integrales y clientes internacionales. Si tu estudio está creciendo o tiene un proyecto en marcha — escríbeme.",
      en: "I'm looking to join an interior design studio where I can contribute my experience managing integral projects and international clients. If your studio is growing or has a project underway — get in touch.",
    },
    email: "anamanzanaresg@gmail.com",
    instagram: "@anamanz_",
    location: { es: "Marbella, España", en: "Marbella, Spain" },
  },
  cv: {
    title: { es: "Curriculum Vitae", en: "Curriculum Vitae" },
    profile: { es: "Perfil profesional", en: "Professional profile" },
    profileBody: {
      es: "Diseñadora de interiores con experiencia en proyectos integrales llave en mano para clientes internacionales en la Costa del Sol. Coordino una media de 30 proyectos al año, lidero equipo y trabajo en distintas etapas — desde apartamentos vacacionales hasta villas de lujo. Me adapto al cambio, escucho perspectivas distintas y aprendo de forma continua.",
      en: "Interior designer experienced in turnkey integral projects for international clients on the Costa del Sol. I coordinate an average of 30 projects per year, lead a team and work across different stages — from holiday apartments to luxury villas. I adapt to change, listen to different perspectives and keep learning continuously.",
    },
    experience: { es: "Experiencia", en: "Experience" },
    education: { es: "Formación", en: "Education" },
    software: { es: "Herramientas y software", en: "Tools & software" },
    languages: { es: "Idiomas", en: "Languages" },
    download: { es: "Descargar CV (PDF)", en: "Download CV (PDF)" },
  },
};

window.PROJECTS = PROJECTS;
window.SERVICES = SERVICES;
window.CV_DATA = CV;
window.COPY = COPY;
