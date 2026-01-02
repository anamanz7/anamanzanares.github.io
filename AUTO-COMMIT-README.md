# 🤖 Sistema de Auto-Commit AUTOMÁTICO

Sistema de automatización **completamente automática** para commits y deployment del portfolio.

⚡ **NUEVO**: Ahora con servicio automático que hace commits cada 10 minutos sin intervención manual.

## 📦 Componentes

### 1. Script Manual: `auto-commit.sh`

Script interactivo para hacer commit y push de manera rápida y sencilla.

#### Uso:

```bash
# Con mensaje personalizado
./auto-commit.sh "Actualizar proyecto X"

# Sin mensaje (generará uno automáticamente)
./auto-commit.sh
```

#### Características:
- ✅ Detecta automáticamente archivos modificados, nuevos y eliminados
- ✅ Genera mensajes de commit inteligentes
- ✅ Salida con colores para mejor legibilidad
- ✅ Pregunta confirmación antes de hacer push
- ✅ Muestra resumen de cambios antes de commitear

#### Ejemplo de uso:

```bash
$ ./auto-commit.sh "Añadir nuevo proyecto"

════════════════════════════════════════
  Auto-Commit Portfolio - My Life
════════════════════════════════════════

📋 Cambios detectados:
M  index.html
A  PORTFOLIO/nuevo-proyecto.pdf

📦 Añadiendo cambios...
💾 Creando commit...
✅ Commit creado exitosamente

¿Hacer push a GitHub? (y/n)
y
🚀 Haciendo push a origin/main...

════════════════════════════════════════
✅ ¡Portfolio actualizado exitosamente!
🌐 GitHub Pages se actualizará en breve
════════════════════════════════════════
```

### 2. 🤖 Servicio Automático: `auto-commit-daemon.sh` + Launchd (PRINCIPAL)

**Este es el sistema principal** - Servicio de macOS que ejecuta commits automáticos cada 10 minutos.

#### Funcionamiento:
1. Launchd ejecuta el daemon cada 10 minutos automáticamente
2. El daemon verifica si hay cambios en el repositorio
3. Si hay cambios, crea un commit con mensaje descriptivo
4. Hace push automático a GitHub
5. Registra toda la actividad en logs

#### Características:
- ✅ **100% automático** - No requiere intervención manual
- ✅ Se ejecuta en background cada 10 minutos
- ✅ Se inicia automáticamente al iniciar sesión en macOS
- ✅ Genera logs detallados de toda la actividad
- ✅ Gestión fácil con script de control

#### Script de Gestión: `manage-autocommit.sh`

```bash
# Ver estado del servicio
./manage-autocommit.sh status

# Iniciar el servicio
./manage-autocommit.sh start

# Detener el servicio
./manage-autocommit.sh stop

# Reiniciar el servicio
./manage-autocommit.sh restart

# Ver logs de actividad
./manage-autocommit.sh logs

# Ejecutar commit inmediatamente (sin esperar 10 min)
./manage-autocommit.sh now
```

### 3. Git Hook: `.git/hooks/pre-push`

Hook que se ejecuta automáticamente **antes** de cada `git push` manual.

#### Funcionamiento:
1. Se activa al ejecutar `git push`
2. Verifica si hay cambios sin commitear
3. Si hay cambios, crea un commit automático
4. Permite que el push continúe normalmente

#### Características:
- ✅ Totalmente automático
- ✅ No requiere intervención manual
- ✅ Previene olvidar cambios sin commitear
- ✅ Genera mensajes de commit descriptivos
- ✅ Incluye lista de archivos modificados

#### Ejemplo:

```bash
$ git push origin main

🔍 Verificando cambios pendientes...
📝 Cambios detectados. Creando commit automático...
✅ Commit automático creado exitosamente

[Continúa con el push normalmente...]
```

## 🎯 ¿Cuándo usar cada uno?

### 🤖 Servicio Automático (RECOMENDADO - Ya activo por defecto):
- **Se ejecuta solo** cada 10 minutos
- Detecta y commitea cambios automáticamente
- No requiere hacer nada, solo edita tus archivos
- Perfecto para flujo de trabajo continuo
- Usa `./manage-autocommit.sh status` para verificar que esté activo

### Usa `auto-commit.sh` cuando:
- Quieras hacer commit/push inmediato (sin esperar 10 min)
- Necesites un mensaje de commit personalizado
- Prefieras tener control manual sobre cuándo se publica

### El hook `pre-push` funciona automáticamente:
- Como respaldo si haces `git push` manual
- Para capturar cambios que olvidaste commitear
- Red de seguridad adicional

## 🔧 Instalación

El sistema ya está **completamente instalado y activo**. Los componentes son:

```
my-life/
├── auto-commit.sh                    # Script manual (ejecutable)
├── auto-commit-daemon.sh             # Daemon automático (ejecutable)
├── manage-autocommit.sh              # Script de gestión (ejecutable)
├── .auto-commit.log                  # Log de actividad
├── .git/hooks/pre-push               # Hook automático (ejecutable)
└── ~/Library/LaunchAgents/           # Servicio de macOS
    └── com.anamanzanares.portfolio.autocommit.plist
```

### ✅ Estado Actual

El servicio automático ya está **ACTIVO** y funcionando en background. Verifica con:

```bash
./manage-autocommit.sh status
```

## ⚙️ Configuración

### Configurar Git User (Opcional)

Para evitar mensajes de advertencia sobre identidad:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Desactivar el Hook (Si es necesario)

Si temporalmente no quieres que el hook se ejecute:

```bash
# Renombrar el hook
mv .git/hooks/pre-push .git/hooks/pre-push.disabled

# Para reactivarlo
mv .git/hooks/pre-push.disabled .git/hooks/pre-push
```

### Personalizar Mensajes de Commit

Puedes editar los archivos para personalizar los mensajes:

- `auto-commit.sh`: Línea ~35 (variable COMMIT_MSG)
- `.git/hooks/pre-push`: Línea ~22 (variable COMMIT_MSG)

## 🚀 Workflow Recomendado

### ✨ Flujo AUTOMÁTICO (Recomendado):

```bash
# 1. Edita tus archivos normalmente (HTML, CSS, PDFs, etc.)
# 2. ¡Eso es todo! El sistema hace commit y push automáticamente cada 10 minutos
# 3. GitHub Pages se actualiza solo

# Opcional: Ver logs de actividad
./manage-autocommit.sh logs
```

### ⚡ Flujo Manual (Para commits inmediatos):

```bash
# 1. Hacer cambios en archivos
# 2. Ejecutar commit/push inmediato
./auto-commit.sh "Descripción de tus cambios"
# o sin esperar:
./manage-autocommit.sh now
# 3. ¡Listo! Se publica inmediatamente
```

## 📝 Ejemplos de Mensajes de Commit

El sistema genera mensajes descriptivos automáticamente:

```
Auto-commit: Actualización automática del portfolio

Cambios detectados:
M  index.html
A  PORTFOLIO/nuevo-proyecto.pdf
D  PORTFOLIO/proyecto-viejo.pdf

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## ⚠️ Notas Importantes

1. **El hook NO se sincroniza con git**: Los hooks están en `.git/hooks/` que no se sube al repositorio. Si clonas el repo en otro lugar, necesitas copiar el hook manualmente.

2. **Backup del hook**: El archivo se encuentra en `.git/hooks/pre-push`. Considera hacer backup si es importante.

3. **Archivos sensibles**: El sistema NO commitea automáticamente archivos en `.gitignore`.

4. **Conflictos**: Si hay conflictos al hacer push, resuélvelos manualmente antes de continuar.

## 🐛 Troubleshooting

### El script no se ejecuta
```bash
# Verificar permisos
ls -l auto-commit.sh
# Debería mostrar: -rwxr-xr-x

# Dar permisos si es necesario
chmod +x auto-commit.sh
```

### El hook no funciona
```bash
# Verificar que existe
ls -l .git/hooks/pre-push

# Verificar permisos
chmod +x .git/hooks/pre-push
```

### Colores no se ven
Los colores requieren un terminal compatible con ANSI. Si no se ven, el script funciona igual, solo sin colores.

## 📚 Referencias

- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Documentación completa del proyecto: [CLAUDE.md](CLAUDE.md)

---

**Creado con** 🤖 [Claude Code](https://claude.com/claude-code)
