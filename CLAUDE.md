# My Life - Portfolio Personal de Ana Manzanares

Este es un repositorio personal que almacena contenido de portfolio profesional, CV y proyectos creativos.

## 🎯 Propósito del Proyecto

Repositorio profesional para mantener y gestionar:
- Portfolio de proyectos creativos y profesionales
- CV/Curriculum actualizado
- GitHub Pages site con diseño elegante y minimalista
- Documentación personal y profesional
- Scripts de optimización para recursos (PDFs, imágenes)

## 📁 Estructura del Proyecto

```
my-life/
├── index.html                # GitHub Pages - Página principal del portfolio
├── style.css                 # Estilos del sitio web
├── README.md                 # Descripción del repositorio
├── auto-commit.sh            # Script manual de commit/push
├── auto-commit-daemon.sh     # Daemon para commits automáticos
├── manage-autocommit.sh      # Script de gestión del servicio
├── .auto-commit.log          # Log de actividad automática
├── PORTFOLIO/                # Directorio con proyectos y documentos
│   ├── BOM PROJECT.pdf
│   ├── CURRICULUM ANA.pdf
│   ├── MAS CREATION RED.pdf
│   ├── optimize_*.sh         # Scripts de optimización de PDFs
│   ├── optimize_images.sh    # Script de optimización de imágenes
│   └── optimized/            # Directorio para archivos optimizados
├── .claude/                  # Configuración de Claude Code
└── .git/hooks/pre-push       # Hook automático para commits antes de push
```

## 🛠️ Tecnologías y Herramientas

- **Frontend**: HTML5, CSS3
- **Fuentes**: Google Fonts (Montserrat)
- **Hosting**: GitHub Pages
- **Optimización**: Shell scripts, Python, Ghostscript, ImageMagick
- **Control de versiones**: Git

## 🎨 Estilo y Diseño

- **Diseño**: Minimalista, elegante, profesional
- **Paleta**: Tonos neutros con acentos sutiles
- **Tipografía**: Montserrat (sans-serif moderna)
- **Responsive**: Adaptable a todos los dispositivos
- **Idioma**: Español

## 📝 Convenciones de Código

### HTML
- Usar HTML5 semántico
- Estructura clara con secciones bien definidas
- Accesibilidad: usar atributos alt, roles ARIA cuando sea necesario
- Indentación: 4 espacios

### CSS
- Usar clases descriptivas en español o inglés
- Mobile-first approach
- Variables CSS para colores y espaciado cuando sea posible
- Comentarios para secciones importantes
- Indentación: 4 espacios

### Scripts (Bash/Python)
- Siempre incluir shebang (#!/bin/bash, #!/usr/bin/env python3)
- Comentarios descriptivos
- Manejo de errores robusto
- Mensajes informativos para el usuario
- Permisos de ejecución (+x) para scripts bash

## 🔄 Flujos de Trabajo Comunes

### 🤖 Auto-Commit AUTOMÁTICO (NUEVO)
El repositorio tiene un sistema **completamente automático** de commits cada 10 minutos:

**🎯 Sistema Principal: Servicio Automático Launchd**
- ✅ **Activo 24/7** - Hace commits automáticamente cada 10 minutos
- ✅ **Cero intervención** - Solo edita archivos y el resto es automático
- ✅ **Auto-push** - Publica a GitHub Pages automáticamente
- ✅ **Logs detallados** - Registra toda la actividad

**Gestión del Servicio** - `./manage-autocommit.sh`
```bash
./manage-autocommit.sh status   # Ver estado del servicio
./manage-autocommit.sh logs     # Ver actividad reciente
./manage-autocommit.sh now      # Ejecutar commit inmediato
./manage-autocommit.sh stop     # Pausar servicio
./manage-autocommit.sh start    # Reactivar servicio
```

**Script Manual (Opcional)** - `./auto-commit.sh`
```bash
# Para commits inmediatos sin esperar los 10 minutos
./auto-commit.sh "Tu mensaje aquí"
```

**Git Hook Pre-Push** - `.git/hooks/pre-push`
- Red de seguridad adicional si haces `git push` manual
- Detecta cambios olvidados y los commitea automáticamente

**Características del Sistema:**
- ✅ 100% automático - commits cada 10 minutos
- ✅ Se inicia automáticamente al iniciar sesión en macOS
- ✅ Detecta archivos modificados, nuevos y eliminados
- ✅ Genera mensajes de commit descriptivos
- ✅ Push automático a GitHub
- ✅ Logs detallados de toda la actividad
- ✅ Gestión fácil con comandos simples

### Optimización de PDFs
Los scripts en PORTFOLIO/ permiten optimizar PDFs de diferentes maneras:
- `optimize_pdfs.sh` - Optimización básica
- `optimize_with_gs.sh` - Usando Ghostscript
- `optimize_with_preview.sh` - Usando Preview de macOS
- `optimize_native.sh` - Métodos nativos de macOS
- `optimize_simple.sh` - Método simple y rápido
- `optimize_pdfs.py` - Script Python para optimización

### Optimización de Imágenes
- `optimize_images.sh` - Optimiza imágenes para web

### Actualizar Portfolio
1. Agregar nuevos PDFs a PORTFOLIO/
2. Optimizar si es necesario con los scripts disponibles
3. Actualizar index.html con referencias a nuevos proyectos
4. **¡Listo!** El sistema hace commit y push automáticamente en max. 10 minutos
5. (Opcional) Usa `./manage-autocommit.sh now` para publicar inmediatamente
6. GitHub Pages se actualiza automáticamente

### Git Workflow
- Branch principal: `main`
- **AUTOMÁTICO**: Commits cada 10 minutos sin intervención manual
- Push automático a GitHub actualiza GitHub Pages
- Logs disponibles en `.auto-commit.log`
- Control del servicio con `./manage-autocommit.sh`

## 🎯 Comandos Útiles

### Desarrollo Local
```bash
# Servidor local para probar el sitio
python3 -m http.server 8000
# o
open index.html
```

### Optimización
```bash
# Optimizar todos los PDFs
cd PORTFOLIO && ./optimize_pdfs.sh

# Optimizar imágenes
cd PORTFOLIO && ./optimize_images.sh
```

### Auto-Commit (Sistema Automático)
```bash
# Ver estado del servicio automático
./manage-autocommit.sh status

# Ver logs de actividad
./manage-autocommit.sh logs

# Ejecutar commit/push inmediato (sin esperar 10 min)
./manage-autocommit.sh now

# Pausar/reactivar el servicio
./manage-autocommit.sh stop
./manage-autocommit.sh start

# Método manual tradicional (opcional)
./auto-commit.sh "Descripción del cambio"
```

### Git (Comandos tradicionales - Ya no necesarios)
```bash
# El sistema automático hace esto por ti cada 10 minutos:
git add .
git commit -m "mensaje"
git push origin main

# Pero si quieres hacerlo manualmente, sigue funcionando
```

## 🚫 Archivos a Ignorar

- `.DS_Store` - Archivos de macOS
- `*.log` - Logs
- `node_modules/` - Si se agregan dependencias Node
- `.env*` - Variables de entorno (nunca commitear)
- Archivos temporales de optimización

## 🎓 Contexto del Negocio

Este es un portfolio profesional personal que debe:
- Proyectar imagen profesional y creativa
- Ser fácil de navegar
- Cargar rápidamente (optimización importante)
- Mostrar trabajos de calidad
- Ser fácil de mantener y actualizar

## 💡 Notas para Claude Code

- **Idioma preferido**: Español para documentación y commits
- **Estilo de código**: Limpio, comentado, profesional
- **Optimización**: Priorizar rendimiento web (PDFs e imágenes optimizados)
- **Git**: Commits descriptivos, evitar commits con archivos grandes sin optimizar
- **Seguridad**: Nunca commitear información personal sensible
- **Calidad**: Mantener diseño coherente y profesional en todo el sitio

## 🔗 Enlaces Importantes

- GitHub Pages: https://anamanzanares.github.io/my-life/
- Repositorio: https://github.com/anamanzanares/my-life

## 📋 TODOs Potenciales

- Considerar añadir meta tags para SEO
- Añadir favicon personalizado
- Considerar analytics (Google Analytics o similar)
- Backup automático de archivos importantes
- ✅ ~~Script de deployment automatizado~~ (Implementado: auto-commit.sh)
- Compresión automática de assets al hacer commit
