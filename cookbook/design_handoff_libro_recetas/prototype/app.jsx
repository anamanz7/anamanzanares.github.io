// App principal — DesignCanvas + TweaksPanel + todas las pantallas.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "a",
  "density": "comfy",
  "showGrain": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = t.theme || 'a';
  const density = t.density || 'comfy';

  // Hint para los SVG: grain on/off — la opacidad se controla con CSS var
  React.useEffect(() => {
    document.documentElement.style.setProperty('--grain-opacity', t.showGrain ? '1' : '0');
    document.documentElement.setAttribute('data-density', density);
  }, [t.showGrain, density]);

  const sharedProps = { theme, density };

  return (
    <React.Fragment>
      <DesignCanvas>

        <DCSection
          id="portada"
          title="01 · Portada del libro"
          subtitle="Entrada al cuaderno — desktop, móvil, y la lista de colecciones."
        >
          <DCArtboard id="home-d" label="Home — desktop" width={1440} height={900}>
            <HomeDesktop {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="home-m" label="Home — móvil" width={390} height={844}>
            <HomeMobile {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="cats-m" label="Categorías — móvil" width={390} height={844}>
            <CategoriesMobile {...sharedProps} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="encontrar"
          title="02 · Encontrar una receta"
          subtitle="Índice editorial, búsqueda por ingrediente, lista de la compra."
        >
          <DCArtboard id="index-d" label="Índice — desktop" width={1440} height={1100}>
            <IndexDesktop {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="search-m" label="Buscar — móvil" width={390} height={844}>
            <SearchMobile {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="shopping-m" label="Lista de compra — móvil" width={390} height={844}>
            <ShoppingMobile {...sharedProps} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="detalle"
          title="03 · Detalle de receta — tres variaciones"
          subtitle="Tres maneras de leer la misma receta. Misma tipografía, misma jerarquía, distinta proporción."
        >
          <DCArtboard id="det-v1" label="A · Editorial clásico" width={1440} height={1500}>
            <DetailV1 {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="det-v2" label="B · Doble columna" width={1440} height={1200}>
            <DetailV2 {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="det-v3" label="C · Revista" width={1440} height={1500}>
            <DetailV3 {...sharedProps} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="cocinar"
          title="04 · Cocinar — modo paso a paso"
          subtitle="Pensado para tener el teléfono al lado mientras cocinas, o el ordenador en la mesa."
        >
          <DCArtboard id="cook-m" label="Cocinar — móvil" width={390} height={844}>
            <CookMobile {...sharedProps} />
          </DCArtboard>
          <DCArtboard id="cook-d" label="Cocinar — desktop" width={1440} height={900}>
            <CookDesktop {...sharedProps} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="crear"
          title="05 · Crear una receta nueva"
          subtitle="Formulario editorial con vista previa en vivo. Auto-guardado."
        >
          <DCArtboard id="create-d" label="Nueva receta — desktop" width={1440} height={1500}>
            <CreateDesktop {...sharedProps} />
          </DCArtboard>
        </DCSection>

      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Paleta" />
        <TweakRadio
          label="Tema"
          value={theme}
          options={[
            { value: 'a', label: 'Crema' },
            { value: 'm', label: 'Coral' },
            { value: 'c', label: 'Tinta' },
          ]}
          onChange={v => setTweak('theme', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Densidad"
          value={density}
          options={[
            { value: 'compact', label: 'Compacto' },
            { value: 'comfy',   label: 'Cómodo' },
            { value: 'roomy',   label: 'Amplio' },
          ]}
          onChange={v => setTweak('density', v)}
        />

        <TweakSection label="Estética" />
        <TweakToggle
          label="Granulado en fotos"
          value={t.showGrain}
          onChange={v => setTweak('showGrain', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
