import { CommonModule } from '@angular/common';
import { Component, computed, output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly routeLabels: Record<string, string> = {
    dashboard: 'Main',
    home: 'Main',
    components: 'Components',
    input: 'Input',
    select: 'Select',
    alert: 'Alert',
    dialog: 'Dialog',
    toast: 'Toast',
    checkbox: 'Checkbox',
    radio: 'Radio',
    datetimepicker: 'DateTimePicker',
    button: 'Button',
    modal: 'Modal',
    theme: 'Theme',
    layout: 'Layout',
    color: 'Color',
  };

  readonly notificationCount = signal(3);
  readonly currentUrl = signal('');
  readonly breadcrumbItems = computed(() => this.buildBreadcrumbs(this.currentUrl()));

  toggleSidebar = output<void>();

  constructor(private router: Router) {
    this.currentUrl.set(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  private buildBreadcrumbs(url: string): string[] {
    const normalizedUrl = url.split('?')[0].split('#')[0];
    const segments = normalizedUrl.split('/').filter(Boolean);

    if (segments.length === 0) {
      return ['Main'];
    }

    if (segments[0] === 'dashboard') {
      return ['Main'];
    }

    return segments
      .filter((segment) => segment !== 'auth')
      .map((segment) => this.routeLabels[segment] ?? this.humanizeSegment(segment));
  }

  private humanizeSegment(segment: string): string {
    return segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }
}
