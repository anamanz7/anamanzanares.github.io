# My Life - Portfolio Personal de Ana Manzanares

Este es mi repositorio personal donde almaceno mi contenido de portfolio y CV.

## Estructura

Este repositorio está organizado para mantener toda mi información profesional y personal en un solo lugar.

## Contenido

- Portfolio
- CV/Curriculum
- Proyectos
- Documentación personal
- Others

## 🚀 Auto-Deploy a GitHub Pages

Este repositorio incluye un sistema de deploy automático que publica tus cambios en GitHub Pages sin intervención manual.

### Cómo usar el Auto-Deploy

1. **Iniciar el monitoreo automático:**
   ```bash
   ./auto_deploy.sh
   ```

2. **Qué hace el script:**
   - Monitorea cambios en `index.html`, `style.css`, `script.js` y archivos en `PORTFOLIO/`
   - Detecta modificaciones cada 5 segundos
   - Automáticamente hace commit y push a GitHub cuando detecta cambios
   - Actualiza tu sitio en https://anamanzanares.github.io/my-life/

3. **Workflow recomendado:**
   - Abre una terminal y ejecuta `./auto_deploy.sh`
   - Deja el script corriendo en background
   - Trabaja normalmente en tus archivos HTML/CSS/JS
   - Los cambios se publican automáticamente al guardar
   - Presiona Ctrl+C cuando termines de trabajar

4. **Archivos monitoreados:**
   - `index.html` - Página principal
   - `style.css` - Estilos
   - `script.js` - JavaScript
   - `PORTFOLIO/**/*.pdf` - PDFs del portfolio
   - `PORTFOLIO/**/*.{png,jpg}` - Imágenes

### Alternativa: Deploy manual

Si prefieres control total sobre cuándo publicar:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

## 🔗 Enlaces

- **GitHub Pages:** https://anamanzanares.github.io/my-life/
- **Repositorio:** https://github.com/anamanzanares/my-life