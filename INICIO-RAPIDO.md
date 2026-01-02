# 🚀 Inicio Rápido - Sistema Auto-Commit

## ✅ El Sistema ya está ACTIVO

Tu portfolio tiene commits automáticos cada **10 minutos**. No necesitas hacer nada especial.

## 💡 Flujo de Trabajo Simple

```bash
# 1. Edita tus archivos (HTML, CSS, PDFs, imágenes, etc.)
code index.html
# o cualquier editor que uses

# 2. Guarda los cambios
# ⏰ En máximo 10 minutos, se hará commit y push automáticamente

# 3. ¡Listo! Tu portfolio se actualiza solo en GitHub Pages
```

## 🎯 Comandos Útiles

### Ver si el sistema está funcionando
```bash
./manage-autocommit.sh status
```

### Ver qué ha hecho recientemente
```bash
./manage-autocommit.sh logs
```

### Publicar cambios AHORA (sin esperar 10 min)
```bash
./manage-autocommit.sh now
```

### Pausar el sistema (si no quieres commits automáticos)
```bash
./manage-autocommit.sh stop
```

### Reactivar el sistema
```bash
./manage-autocommit.sh start
```

## 📱 Casos de Uso Comunes

### Actualizar un proyecto
```bash
# 1. Edita index.html
# 2. Añade nuevas fotos a PORTFOLIO/
# 3. ¡Espera 10 min o ejecuta: ./manage-autocommit.sh now
```

### Subir un nuevo PDF
```bash
# 1. Copia el PDF a PORTFOLIO/
cp nuevo-proyecto.pdf PORTFOLIO/
# 2. Opcionalmente optimízalo
cd PORTFOLIO && ./optimize_pdfs.sh
# 3. ¡El sistema lo commitea automáticamente!
```

### Actualizar el CV
```bash
# 1. Reemplaza CURRICULUM ANA.pdf
# 2. ¡Listo! Se actualiza solo en máx. 10 minutos
```

## ⚙️ Configuración Actual

- **Intervalo**: 10 minutos
- **Auto-push**: Sí (a GitHub automáticamente)
- **Estado**: ✅ ACTIVO
- **Se ejecuta**: Al iniciar sesión en macOS
- **Logs**: `.auto-commit.log`

## 🔍 Solución de Problemas

### ¿El sistema no está haciendo commits?
```bash
# Verificar estado
./manage-autocommit.sh status

# Ver logs para detectar errores
./manage-autocommit.sh logs

# Reiniciar el servicio
./manage-autocommit.sh restart
```

### ¿Cómo sé si funcionó?
```bash
# Ver últimos commits
git log --oneline -5

# Ver logs del sistema
./manage-autocommit.sh logs
```

## 📚 Más Información

- **Documentación completa**: [AUTO-COMMIT-README.md](AUTO-COMMIT-README.md)
- **Guía del proyecto**: [CLAUDE.md](CLAUDE.md)

---

**¡Es así de simple!** Solo edita tus archivos y el sistema se encarga del resto. 🎉
