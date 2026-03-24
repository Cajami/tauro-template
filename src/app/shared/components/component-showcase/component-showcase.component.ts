import { Component, ElementRef, HostListener, ViewChild, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-component-showcase',
  imports: [],
  templateUrl: './component-showcase.component.html',
  styleUrl: './component-showcase.component.scss',
})
export class ComponentShowcaseComponent {
  @ViewChild('showcaseLayout') private showcaseLayout?: ElementRef<HTMLDivElement>;

  title = input<string>('Ejemplo');
  description = input<string>('');
  htmlCode = input.required<string>();
  tsCode = input<string>(''); // Ahora es opcional

  activeTab = signal<'html' | 'ts'>('html');
  previewRatio = signal(50);
  isResizing = signal(false);
  isDesktop = signal(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  gridTemplateColumns = computed(() =>
    this.isDesktop()
      ? `minmax(0, ${this.previewRatio()}fr) 16px minmax(0, ${100 - this.previewRatio()}fr)`
      : null,
  );

  @HostListener('window:resize')
  onResize(): void {
    this.isDesktop.set(window.innerWidth >= 1024);
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.isResizing() || !this.showcaseLayout) {
      return;
    }

    const rect = this.showcaseLayout.nativeElement.getBoundingClientRect();
    const nextRatio = ((event.clientX - rect.left) / rect.width) * 100;
    const clampedRatio = Math.min(70, Math.max(30, nextRatio));
    this.previewRatio.set(clampedRatio);
  }

  @HostListener('window:pointerup')
  onPointerUp(): void {
    this.isResizing.set(false);
  }

  startResize(event: PointerEvent): void {
    if (!this.isDesktop()) {
      return;
    }

    event.preventDefault();
    this.isResizing.set(true);
  }
}
