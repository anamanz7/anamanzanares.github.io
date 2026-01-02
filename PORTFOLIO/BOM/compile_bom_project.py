#!/usr/bin/env python3
"""
Script para compilar el proyecto BOM en un único PDF profesional
Estructura: Portada (logo) -> Renders -> Planos técnicos -> Bocetos
"""

import os
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
import sys

def convert_image_to_pdf(image_path, output_pdf):
    """Convierte una imagen a PDF manteniendo proporciones en A4"""
    img = Image.open(image_path)

    # Convertir RGBA a RGB si es necesario
    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Tamaño A4 en puntos (1 punto = 1/72 pulgadas)
    page_width, page_height = A4
    img_width, img_height = img.size

    # Calcular el ratio para ajustar la imagen al A4 manteniendo proporciones
    width_ratio = page_width / img_width
    height_ratio = page_height / img_height
    ratio = min(width_ratio, height_ratio) * 0.95  # 95% para dejar margen

    new_width = img_width * ratio
    new_height = img_height * ratio

    # Centrar la imagen
    x_offset = (page_width - new_width) / 2
    y_offset = (page_height - new_height) / 2

    # Crear el PDF
    c = canvas.Canvas(output_pdf, pagesize=A4)
    c.drawImage(image_path, x_offset, y_offset, width=new_width, height=new_height)
    c.save()

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    imagenes_dir = os.path.join(base_dir, "imagenes")
    planos_dir = os.path.join(base_dir, "planos")
    temp_dir = os.path.join(base_dir, "temp")

    # Crear directorio temporal
    os.makedirs(temp_dir, exist_ok=True)

    print("🎨 Compilando proyecto BOM...")
    print("=" * 50)

    # Crear merger
    merger = PdfMerger()

    # 1. PORTADA - Logo
    print("\n📄 Añadiendo portada (logo)...")
    logo_path = os.path.join(planos_dir, "logo.pdf")
    if os.path.exists(logo_path):
        merger.append(logo_path)
        print(f"   ✓ {os.path.basename(logo_path)}")

    # 2. RENDERS - En orden de calidad visual
    print("\n🖼️  Añadiendo renders...")
    renders = [
        "render-escaparate-1-ok.png",
        "render-escaparate-2.png",
        "render-1.png",
        "render-2.png"
    ]

    for i, render in enumerate(renders, 1):
        render_path = os.path.join(imagenes_dir, render)
        if os.path.exists(render_path):
            temp_pdf = os.path.join(temp_dir, f"render_{i}.pdf")
            convert_image_to_pdf(render_path, temp_pdf)
            merger.append(temp_pdf)
            print(f"   ✓ {render}")

    # 3. PLANOS TÉCNICOS
    print("\n📐 Añadiendo planos técnicos...")
    planos = [
        "plano-planta.pdf",
        "plano-técnico-mostrador.pdf",
        "secciones.pdf",
        "seccion-2.pdf"
    ]

    for plano in planos:
        plano_path = os.path.join(planos_dir, plano)
        if os.path.exists(plano_path):
            merger.append(plano_path)
            print(f"   ✓ {plano}")

    # 4. BOCETOS - Al final
    print("\n✏️  Añadiendo bocetos...")
    bocetos_path = os.path.join(planos_dir, "bocetos.pdf")
    if os.path.exists(bocetos_path):
        merger.append(bocetos_path)
        print(f"   ✓ bocetos.pdf")

    # Guardar PDF final
    output_path = os.path.join(base_dir, "BOM_PROJECT.pdf")
    print("\n💾 Guardando PDF compilado...")
    merger.write(output_path)
    merger.close()

    # Limpiar archivos temporales
    print("🧹 Limpiando archivos temporales...")
    import shutil
    shutil.rmtree(temp_dir)

    # Mostrar información del archivo final
    file_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
    reader = PdfReader(output_path)
    num_pages = len(reader.pages)

    print("\n" + "=" * 50)
    print("✅ ¡PDF compilado exitosamente!")
    print(f"📁 Archivo: {output_path}")
    print(f"📄 Páginas: {num_pages}")
    print(f"💾 Tamaño: {file_size:.2f} MB")
    print("=" * 50)

if __name__ == "__main__":
    main()
