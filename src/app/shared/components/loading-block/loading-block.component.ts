import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-loading-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-block.component.html',
})
export class LoadingBlockComponent {
  loading = input<boolean>(false);
  message = input<string>('Un momento por favor...');
  secondaryMessage = input<string | null>(null);
  mode = input<'section' | 'page'>('section');

  protected readonly wrapperClasses = computed(() =>
    this.mode() === 'page'
      ? 'relative block min-h-full overflow-hidden'
      : 'relative block',
  );

  protected readonly overlayClasses = computed(() =>
    this.mode() === 'page'
      ? 'absolute inset-0 z-20 bg-white/72 backdrop-blur-[3px]'
      : 'absolute inset-0 z-20 flex items-center justify-center bg-white/68 backdrop-blur-[2px]',
  );

  protected readonly cardClasses = computed(() =>
    this.mode() === 'page'
      ? 'w-full max-w-sm px-6 py-7 text-center'
      : 'w-full max-w-xs px-5 py-5 text-center',
  );

  protected readonly pageOverlayInnerClasses = computed(() =>
    this.mode() === 'page'
      ? 'sticky left-0 top-1/2 flex w-full -translate-y-1/2 justify-center px-4'
      : '',
  );
}
