#!/usr/bin/env python3
"""
Script para optimizar imágenes AVIF con Pillow
Reduce el peso manteniendo calidad visual aceptable para web
"""

import os
import sys
from pathlib import Path
from PIL import Image
import pillow_avif  # Necesario para soporte AVIF

# Configuración
QUALITY = 50  # Calidad AVIF (1-100, menor = más compresión)
SPEED = 6     # Velocidad de encoding (0-10, mayor = más rápido pero menos compresión)
MAX_WIDTH = 1920   # Ancho máximo para imágenes grandes
MAX_HEIGHT = 1920  # Alto máximo para imágenes grandes

def get_file_size(path):
    """Obtiene el tamaño del archivo en bytes"""
    return os.path.getsize(path)

def format_size(size_bytes):
    """Formatea el tamaño en KB o MB"""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"

def optimize_avif(input_path, quality=QUALITY, speed=SPEED):
    """
    Optimiza una imagen AVIF
    """
    try:
        original_size = get_file_size(input_path)

        # Abrir imagen
        with Image.open(input_path) as img:
            # Convertir a RGB si tiene canal alfa y no es necesario
            if img.mode == 'RGBA':
                # Verificar si realmente tiene transparencia
                if img.split()[3].getextrema() == (255, 255):
                    img = img.convert('RGB')
            elif img.mode not in ('RGB', 'RGBA'):
                img = img.convert('RGB')

            # Redimensionar si es muy grande
            width, height = img.size
            if width > MAX_WIDTH or height > MAX_HEIGHT:
                ratio = min(MAX_WIDTH / width, MAX_HEIGHT / height)
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)

            # Guardar optimizada (sobreescribir)
            img.save(
                input_path,
                format='AVIF',
                quality=quality,
                speed=speed
            )

        new_size = get_file_size(input_path)
        saved = original_size - new_size
        percent = (saved / original_size * 100) if original_size > 0 else 0

        return {
            'success': True,
            'original': original_size,
            'optimized': new_size,
            'saved': saved,
            'percent': percent
        }

    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def main():
    # Directorio raíz del proyecto
    root_dir = Path(__file__).parent.parent

    # Encontrar todas las imágenes AVIF
    avif_files = list(root_dir.glob('**/*.avif'))

    if not avif_files:
        print("No se encontraron imágenes AVIF")
        return

    print(f"\n{'='*60}")
    print(f"  OPTIMIZACIÓN DE IMÁGENES AVIF")
    print(f"  Calidad: {QUALITY}% | Velocidad: {SPEED}")
    print(f"{'='*60}\n")
    print(f"Encontradas: {len(avif_files)} imágenes AVIF\n")

    total_original = 0
    total_optimized = 0
    success_count = 0
    error_count = 0

    for i, avif_file in enumerate(avif_files, 1):
        relative_path = avif_file.relative_to(root_dir)
        print(f"[{i}/{len(avif_files)}] {relative_path}...", end=" ", flush=True)

        result = optimize_avif(str(avif_file))

        if result['success']:
            total_original += result['original']
            total_optimized += result['optimized']
            success_count += 1

            if result['saved'] > 0:
                print(f"✓ {format_size(result['original'])} → {format_size(result['optimized'])} (-{result['percent']:.1f}%)")
            else:
                print(f"✓ Sin cambios ({format_size(result['optimized'])})")
        else:
            error_count += 1
            print(f"✗ Error: {result['error']}")

    # Resumen
    total_saved = total_original - total_optimized
    total_percent = (total_saved / total_original * 100) if total_original > 0 else 0

    print(f"\n{'='*60}")
    print(f"  RESUMEN")
    print(f"{'='*60}")
    print(f"  Imágenes procesadas: {success_count}")
    print(f"  Errores: {error_count}")
    print(f"  Tamaño original: {format_size(total_original)}")
    print(f"  Tamaño optimizado: {format_size(total_optimized)}")
    print(f"  Ahorro total: {format_size(total_saved)} ({total_percent:.1f}%)")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
