import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';

export type PaletteStop =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

export type PreviewMode = 'preset' | 'custom';

export interface ThemePreviewState {
  mode: PreviewMode;
  presetId: string;
  customBaseHex: string;
  scale: Record<number, string>;
}

@Injectable({
  providedIn: 'root',
})
export class ThemePreviewService {
  private readonly storageKey = 'tauro-template.theme-preview';
  private readonly document = inject(DOCUMENT);
  private readonly storageService = inject(StorageService);
  private readonly rootElement = this.document.documentElement;
  private readonly originalPrimaryScale = new Map<PaletteStop, string>();
  private initialized = false;
  private previewState: ThemePreviewState | null = null;

  readonly paletteStops: readonly PaletteStop[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ];

  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.captureOriginalScale();
    this.previewState = this.readStoredState();

    if (this.previewState) {
      this.applyScale(this.previewState.scale);
    }

    this.initialized = true;
  }

  getPreviewState(): ThemePreviewState | null {
    return this.previewState;
  }

  applyPreview(state: ThemePreviewState): void {
    this.initialize();
    this.previewState = state;
    this.applyScale(state.scale);
    this.storageService.setItem(this.storageKey, JSON.stringify(state));
  }

  clearPreview(): void {
    this.initialize();
    this.previewState = null;
    this.restoreOriginalScale();
    this.storageService.removeItem(this.storageKey);
  }

  private captureOriginalScale(): void {
    const computedStyle = getComputedStyle(this.rootElement);

    for (const stop of this.paletteStops) {
      this.originalPrimaryScale.set(
        stop,
        computedStyle.getPropertyValue(`--color-primary-${stop}`).trim(),
      );
    }
  }

  private applyScale(scale: Record<number, string>): void {
    for (const stop of this.paletteStops) {
      this.rootElement.style.setProperty(`--color-primary-${stop}`, scale[stop]);
    }
  }

  private restoreOriginalScale(): void {
    for (const stop of this.paletteStops) {
      const originalValue = this.originalPrimaryScale.get(stop);

      if (originalValue) {
        this.rootElement.style.setProperty(`--color-primary-${stop}`, originalValue);
      } else {
        this.rootElement.style.removeProperty(`--color-primary-${stop}`);
      }
    }
  }

  private readStoredState(): ThemePreviewState | null {
    const rawValue = this.storageService.getItem(this.storageKey);
    if (!rawValue) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawValue) as Partial<ThemePreviewState>;
      if (
        typeof parsed.mode !== 'string' ||
        typeof parsed.presetId !== 'string' ||
        typeof parsed.customBaseHex !== 'string' ||
        !parsed.scale ||
        typeof parsed.scale !== 'object'
      ) {
        return null;
      }

      const scale: Record<number, string> = {};
      for (const stop of this.paletteStops) {
        const value = parsed.scale[stop];
        if (typeof value !== 'string') {
          return null;
        }
        scale[stop] = value;
      }

      return {
        mode: parsed.mode as PreviewMode,
        presetId: parsed.presetId,
        customBaseHex: parsed.customBaseHex,
        scale,
      };
    } catch {
      return null;
    }
  }
}