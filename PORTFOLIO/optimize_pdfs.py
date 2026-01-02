#!/usr/bin/env python3
"""
Script simple para optimizar PDFs usando Quartz de macOS
"""

import os
import sys
from pathlib import Path

# Importar módulos de macOS
try:
    from Quartz import PDFDocument
    from Foundation import NSURL
except ImportError:
    print("❌ Error: Este script requiere macOS con Quartz")
    sys.exit(1)

def optimize_pdf(input_path, output_path):
    """Optimiza un PDF usando Quartz"""
    print(f"📄 Procesando: {Path(input_path).name}")

    # Tamaño original
    original_size = os.path.getsize(input_path) / (1024 * 1024)
    print(f"   Tamaño original: {original_size:.1f} MB")

    # Abrir PDF
    input_url = NSURL.fileURLWithPath_(str(input_path))
    pdf = PDFDocument.alloc().initWithURL_(input_url)

    if not pdf:
        print(f"   ❌ No se pudo abrir el PDF")
        return False

    # Guardar optimizado
    output_url = NSURL.fileURLWithPath_(str(output_path))

    # Opciones para reducir tamaño (usar compresión)
    options = {}

    success = pdf.writeToURL_withOptions_(output_url, options)

    if success and os.path.exists(output_path):
        new_size = os.path.getsize(output_path) / (1024 * 1024)
        reduction = ((original_size - new_size) / original_size) * 100
        print(f"   ✅ Tamaño optimizado: {new_size:.1f} MB")
        print(f"   💾 Reducción: {reduction:.1f}%")
        return True
    else:
        print(f"   ❌ Error al guardar")
        return False

def main():
    portfolio_dir = Path("/Users/anamanzanares/my-life/PORTFOLIO")
    output_dir = portfolio_dir / "optimized"
    output_dir.mkdir(exist_ok=True)

    print("=" * 60)
    print("🎨 OPTIMIZADOR DE PDFs - PORTFOLIO")
    print("=" * 60)
    print()

    # Buscar PDFs
    pdf_files = [f for f in portfolio_dir.glob("*.pdf") if "optimized" not in f.name.lower()]

    print(f"📁 Encontrados {len(pdf_files)} archivos PDF\n")

    for pdf_file in pdf_files:
        output_file = output_dir / f"{pdf_file.stem}_optimized.pdf"

        try:
            optimize_pdf(pdf_file, output_file)
            print()
        except Exception as e:
            print(f"   ❌ Error: {e}\n")

    print("=" * 60)
    print("✨ Proceso completado")
    print(f"📂 Archivos en: {output_dir}")
    print("=" * 60)

if __name__ == "__main__":
    main()
