import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainLoadingService {
  private readonly defaultMessage = 'Un momento por favor...';

  readonly loading = signal(false);
  readonly message = signal(this.defaultMessage);
  readonly secondaryMessage = signal<string | null>(null);

  show(message = this.defaultMessage, secondaryMessage?: string | null): void {
    this.message.set(message);
    this.secondaryMessage.set(secondaryMessage ?? null);
    this.loading.set(true);
  }

  hide(): void {
    this.loading.set(false);
    this.message.set(this.defaultMessage);
    this.secondaryMessage.set(null);
  }
}
