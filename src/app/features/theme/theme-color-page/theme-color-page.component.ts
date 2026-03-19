import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ThemePreviewService,
  ThemePreviewState,
  PreviewMode,
  PaletteStop,
} from '@core/services/theme-preview.service';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';

interface ThemePalette {
  id: string;
  name: string;
  description: string;
  baseHex: string;
  scale: Record<number, string>;
}

@Component({
  selector: 'app-theme-color-page',
  imports: [CommonModule, FormsModule, HeaderPageComponent],
  templateUrl: './theme-color-page.component.html',
  styleUrl: './theme-color-page.component.scss',
})
export class ThemeColorPageComponent implements OnInit {
  private readonly themePreviewService = inject(ThemePreviewService);

  readonly paletteStops: readonly PaletteStop[] = this.themePreviewService.paletteStops;

  readonly presetPalettes: ThemePalette[] = [
    {
      id: 'blue',
      name: 'Azul Base',
      description: 'La paleta actual del template. Equilibrada para dashboards y formularios.',
      baseHex: '#3b82f6',
      scale: this.buildPalette('#3b82f6'),
    },
    {
      id: 'emerald',
      name: 'Emerald',
      description: 'Mas fresca para productos internos, finanzas o reportes operativos.',
      baseHex: '#10b981',
      scale: this.buildPalette('#10b981'),
    },
    {
      id: 'amber',
      name: 'Amber',
      description: 'Mas energica para productos comerciales o paneles con enfasis visual.',
      baseHex: '#f59e0b',
      scale: this.buildPalette('#f59e0b'),
    },
    {
      id: 'rose',
      name: 'Rose',
      description: 'Mas distintiva para demos, admin panels con marca fuerte o branding moderno.',
      baseHex: '#f43f5e',
      scale: this.buildPalette('#f43f5e'),
    },
  ];

  readonly selectedPresetId = signal(this.presetPalettes[0].id);
  readonly customBaseHex = signal('#14b8a6');
  readonly previewMode = signal<PreviewMode>('preset');

  readonly selectedPreset = computed(() => {
    return (
      this.presetPalettes.find(
        (palette) => palette.id === this.selectedPresetId(),
      ) ?? this.presetPalettes[0]
    );
  });

  readonly customPalette = computed(() => this.buildPalette(this.customBaseHex()));

  readonly activePreviewTitle = computed(() => {
    return this.previewMode() === 'preset'
      ? `Vista previa activa: ${this.selectedPreset().name}`
      : `Vista previa activa: Personalizado ${this.customBaseHex()}`;
  });

  readonly selectedPresetSnippet = computed(() => {
    const palette = this.selectedPreset();
    return this.buildThemeSnippet(palette.scale);
  });

  readonly customSnippet = computed(() =>
    this.buildThemeSnippet(this.customPalette()),
  );

  readonly replaceGuide = `1. Abre src/styles/theme.scss\n2. Reemplaza solo los tokens --color-primary-*\n3. Guarda y ejecuta npm start o npm run build\n4. Revisa componentes como Button, Input y Select para validar el resultado visual`;

  ngOnInit(): void {
    this.themePreviewService.initialize();

    const previewState = this.themePreviewService.getPreviewState();
    if (!previewState) {
      this.applyPresetPreview(this.selectedPresetId());
      return;
    }

    this.selectedPresetId.set(previewState.presetId);
    this.customBaseHex.set(previewState.customBaseHex);
    this.previewMode.set(previewState.mode);
  }

  selectPreset(paletteId: string): void {
    this.selectedPresetId.set(paletteId);
    this.previewMode.set('preset');
    this.applyPresetPreview(paletteId);
  }

  updateCustomHex(value: string): void {
    const normalized = this.normalizeHex(value);
    if (!normalized) {
      return;
    }

    this.customBaseHex.set(normalized);
    this.previewMode.set('custom');
    this.themePreviewService.applyPreview({
      mode: 'custom',
      presetId: this.selectedPresetId(),
      customBaseHex: normalized,
      scale: this.buildPalette(normalized),
    });
  }

  restoreTheme(): void {
    this.previewMode.set('preset');
    this.applyPresetPreview(this.selectedPresetId());
  }

  clearThemePreview(): void {
    this.previewMode.set('preset');
    this.selectedPresetId.set(this.presetPalettes[0].id);
    this.customBaseHex.set('#14b8a6');
    this.themePreviewService.clearPreview();
  }

  private applyPresetPreview(paletteId: string): void {
    const palette =
      this.presetPalettes.find((item) => item.id === paletteId) ??
      this.presetPalettes[0];

    this.themePreviewService.applyPreview({
      mode: 'preset',
      presetId: palette.id,
      customBaseHex: this.customBaseHex(),
      scale: palette.scale,
    });
  }

  private buildPalette(baseHex: string): Record<number, string> {
    const normalized = this.normalizeHex(baseHex) ?? '#3b82f6';

    return {
      50: this.mixColors(normalized, '#ffffff', 0.92),
      100: this.mixColors(normalized, '#ffffff', 0.84),
      200: this.mixColors(normalized, '#ffffff', 0.68),
      300: this.mixColors(normalized, '#ffffff', 0.5),
      400: this.mixColors(normalized, '#ffffff', 0.24),
      500: normalized,
      600: this.mixColors(normalized, '#000000', 0.14),
      700: this.mixColors(normalized, '#000000', 0.28),
      800: this.mixColors(normalized, '#000000', 0.42),
      900: this.mixColors(normalized, '#000000', 0.56),
      950: this.mixColors(normalized, '#000000', 0.68),
    };
  }

  private buildThemeSnippet(scale: Record<number, string>): string {
    return `@theme {\n  --color-primary-50: ${scale[50]};\n  --color-primary-100: ${scale[100]};\n  --color-primary-200: ${scale[200]};\n  --color-primary-300: ${scale[300]};\n  --color-primary-400: ${scale[400]};\n  --color-primary-500: ${scale[500]};\n  --color-primary-600: ${scale[600]};\n  --color-primary-700: ${scale[700]};\n  --color-primary-800: ${scale[800]};\n  --color-primary-900: ${scale[900]};\n  --color-primary-950: ${scale[950]};\n}`;
  }

  private normalizeHex(value: string): string | null {
    const sanitized = value.trim().replace(/^#/, '');
    if (!/^[0-9a-fA-F]{6}$/.test(sanitized)) {
      return null;
    }

    return `#${sanitized.toLowerCase()}`;
  }

  private mixColors(colorA: string, colorB: string, amount: number): string {
    const start = this.hexToRgb(colorA);
    const end = this.hexToRgb(colorB);

    const red = Math.round(start.r + (end.r - start.r) * amount);
    const green = Math.round(start.g + (end.g - start.g) * amount);
    const blue = Math.round(start.b + (end.b - start.b) * amount);

    return this.rgbToHex(red, green, blue);
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const normalized = hex.replace('#', '');
    return {
      r: Number.parseInt(normalized.slice(0, 2), 16),
      g: Number.parseInt(normalized.slice(2, 4), 16),
      b: Number.parseInt(normalized.slice(4, 6), 16),
    };
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b]
      .map((channel) => channel.toString(16).padStart(2, '0'))
      .join('')}`;
  }
}