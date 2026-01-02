# 📘 Cómo Optimizar PDFs Manualmente con Preview

Ya que los métodos automáticos requieren software adicional que se está instalando, aquí tienes la forma **MANUAL** más fácil de optimizar tus PDFs en macOS:

## 🎯 Método 1: Export PDF (El más fácil)

### Para cada PDF:

1. **Abre el PDF** con Preview (doble clic)

2. **File → Export as PDF...** (o `⌘⇧E`)

3. En la ventana que se abre:
   - **Quartz Filter**: Selecciona **"Reduce File Size"**
   - **Where**: Selecciona la carpeta `optimized`
   - **Save as**: Agrega "_optimized" al nombre

4. Click **Save**

### Resultado esperado:
- **BOM PROJECT.pdf** (11.4 MB) → ~2-4 MB
- **MAS CREATION RED.pdf** (16 MB) → ~3-5 MB
- **PORTFOLIO INTERACTIVO.pdf** (3.8 MB) → ~1-2 MB
- **CURRICULUM ANA.pdf** (432 KB) → ~200-300 KB

---

## 🎯 Método 2: ColorSync Utility (Más control)

1. Abre **ColorSync Utility** (búscalo en Spotlight)

2. Click en la pestaña **"Filters"**

3. Arrastra tu PDF a la ventana

4. Selecciona el filtro **"Reduce File Size"**

5. Click **Apply**

6. Guarda el resultado en la carpeta `optimized`

---

## 🎯 Método 3: Automator (Semi-automático)

Si tienes varios PDFs, puedes crear un Quick Action:

1. Abre **Automator**

2. Nuevo documento → **Quick Action**

3. Busca "Apply Quartz Filter to PDF Documents"

4. Arrastra la acción al workflow

5. Selecciona filtro: **"Reduce File Size"**

6. **File → Save** → Dale un nombre como "Optimize PDF"

7. Ahora puedes hacer clic derecho en cualquier PDF → Quick Actions → Optimize PDF

---

## ⚙️ Método 4: Esperar instalación automática

Mientras lees esto, se está instalando **Ghostscript** en segundo plano.

Una vez termine (5-10 minutos), podrás ejecutar:

```bash
cd /Users/anamanzanares/my-life/PORTFOLIO
./optimize_with_gs.sh
```

Y se optimizarán TODOS automáticamente con mejor calidad.

---

## 📊 Comparativa de Métodos

| Método | Velocidad | Reducción | Calidad |
|--------|-----------|-----------|---------|
| Preview "Reduce File Size" | ⚡⚡⚡ | 60-70% | ⭐⭐⭐ |
| ColorSync | ⚡⚡ | 60-70% | ⭐⭐⭐ |
| Automator | ⚡⚡⚡ | 60-70% | ⭐⭐⭐ |
| Ghostscript (auto) | ⚡ | 70-85% | ⭐⭐⭐⭐ |

---

## 💡 Recomendación

**Para AHORA**: Usa el Método 1 (Preview) - toma 30 segundos por PDF

**Para DESPUÉS**: Una vez instalado Ghostscript, usa el script automático para tener control fino de la calidad y reducción

---

¿Necesitas ayuda? Los PDFs originales están en:
`/Users/anamanzanares/my-life/PORTFOLIO/`

Los optimizados deberían ir a:
`/Users/anamanzanares/my-life/PORTFOLIO/optimized/`
