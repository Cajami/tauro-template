import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  computed,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
  keywords?: string[];
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  label = input<string>('');
  placeholder = input<string>('Seleccionar...');
  searchPlaceholder = input<string>('Buscar...');
  emptyText = input<string>('No se encontraron resultados');
  noOptionsText = input<string>('No hay opciones disponibles');
  size = input<'sm' | 'md' | 'lg'>('md');
  options = input<SelectOption[]>([]);
  searchable = input<boolean>(false);
  hasError = input<boolean>(false);
  required = input<boolean>(false);
  compareWith = input<(a: unknown, b: unknown) => boolean>(Object.is);

  valueChange = output<unknown>();
  blurChange = output<void>();

  value = model<unknown>(null);
  disabled = model<boolean>(false);

  isOpen = signal(false);
  searchTerm = signal('');
  highlightedIndex = signal(-1);

  private ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  private host = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (_value: unknown) => {};
  onTouched = () => {
    this.blurChange.emit();
  };

  selectedOption = computed(() =>
    this.options().find((option) => this.isSelected(option)),
  );

  canClearSelection = computed(
    () => !this.disabled() && !this.isRequired && this.selectedOption() !== undefined,
  );

  filteredOptions = computed(() => {
    const options = this.options();
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return options;
    }

    return options.filter((option) => {
      const searchableText = [
        option.label,
        option.description ?? '',
        ...(option.keywords ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(term);
    });
  });

  enabledOptions = computed(() =>
    this.filteredOptions().filter((option) => !option.disabled),
  );

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggleDropdown(): void {
    if (this.disabled()) return;

    if (this.isOpen()) {
      this.closeDropdown();
      return;
    }

    this.openDropdown();
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;

    this.value.set(option.value);
    this.onChange(option.value);
    this.valueChange.emit(option.value);
    this.closeDropdown();
  }

  clearSelection(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();

    this.value.set(null);
    this.onChange(null);
    this.valueChange.emit(null);
    this.closeDropdown();
  }

  handleSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.setInitialHighlight();
    this.scrollHighlightedOptionIntoView();
  }

  isSelected(option: SelectOption): boolean {
    return this.compareWith()(option.value, this.value());
  }

  isHighlighted(option: SelectOption): boolean {
    const highlighted = this.enabledOptions()[this.highlightedIndex()];
    return !!highlighted && this.compareWith()(highlighted.value, option.value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.highlightedIndex.set(-1);
    this.setParentShowcaseLayer(false);
    this.markAsTouched();
  }

  openDropdown(): void {
    this.isOpen.set(true);
    this.setParentShowcaseLayer(true);
    this.setInitialHighlight();
    this.focusSearchIfNeeded();
    this.scrollHighlightedOptionIntoView();
  }

  handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!this.isOpen()) {
        this.openDropdown();
        return;
      }

      this.moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (!this.isOpen()) {
        this.openDropdown();
      } else {
        this.selectHighlightedOption();
      }
    }
  }

  handleSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.selectHighlightedOption();
    }
  }

  moveHighlight(step: 1 | -1): void {
    const options = this.enabledOptions();
    if (!options.length) {
      this.highlightedIndex.set(-1);
      return;
    }

    const current = this.highlightedIndex();
    const next =
      current === -1
        ? step === 1
          ? 0
          : options.length - 1
        : (current + step + options.length) % options.length;

    this.highlightedIndex.set(next);
    this.scrollHighlightedOptionIntoView();
  }

  selectHighlightedOption(): void {
    const options = this.enabledOptions();
    const highlighted = options[this.highlightedIndex()];

    if (highlighted) {
      this.selectOption(highlighted);
    }
  }

  get isInvalid(): boolean {
    const control = this.ngControl?.control;

    if (!control || !control.validator) return false;

    return !!(control.invalid && (control.touched || control.dirty));
  }

  get isRequired(): boolean {
    if (this.required()) return true;

    const control = this.ngControl?.control;

    if (!control || !control.validator) return false;

    const validationResult = control.validator({} as any);
    return !!validationResult?.['required'];
  }

  getButtonClasses(): string {
    const baseClasses =
      'w-full rounded-lg border bg-white text-left transition-colors outline-none disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed';
    const stateClasses =
      this.isInvalid || this.hasError()
        ? 'border-red-500'
        : 'border-gray-300 focus:border-primary-500';

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-3 text-base',
      lg: 'h-13 px-4 text-lg',
    };

    const rightPadding = this.canClearSelection() ? 'pr-10' : 'pr-3';

    return `${baseClasses} ${stateClasses} ${sizeClasses[this.size()]} ${rightPadding}`;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.isOpen()) return;

    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.isOpen()) {
      this.closeDropdown();
    }
  }

  ngOnDestroy(): void {
    this.setParentShowcaseLayer(false);
  }

  private markAsTouched(): void {
    this.ngControl?.control?.markAsTouched();
    this.onTouched();
  }

  private focusSearchIfNeeded(): void {
    if (!this.searchable()) return;

    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    });
  }

  private scrollHighlightedOptionIntoView(): void {
    setTimeout(() => {
      const highlighted = this.host.nativeElement.querySelector(
        '[data-highlighted="true"]',
      ) as HTMLElement | null;

      highlighted?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    });
  }

  private setInitialHighlight(): void {
    const options = this.enabledOptions();

    if (!options.length) {
      this.highlightedIndex.set(-1);
      return;
    }

    const selectedIndex = options.findIndex((option) => this.isSelected(option));
    this.highlightedIndex.set(selectedIndex >= 0 ? selectedIndex : 0);
  }

  private setParentShowcaseLayer(isActive: boolean): void {
    const showcaseRoot = this.host.nativeElement.closest(
      '[data-showcase-root]',
    ) as HTMLElement | null;

    if (!showcaseRoot) return;

    if (isActive) {
      this.renderer.setStyle(showcaseRoot, 'z-index', '70');
      this.renderer.setStyle(showcaseRoot, 'position', 'relative');
      return;
    }

    this.renderer.removeStyle(showcaseRoot, 'z-index');
    this.renderer.removeStyle(showcaseRoot, 'position');
  }
}
