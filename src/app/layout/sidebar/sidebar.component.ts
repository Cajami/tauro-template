import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { filter } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = input.required<boolean>();
  isMobile = input.required<boolean>();
  closeSidebar = output<void>();

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {
    this.syncExpandedMenu(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.syncExpandedMenu(event.urlAfterRedirects);
      });
  }

  menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard/home',
    },
    {
      label: 'Componentes',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      expanded: false,
      children: [
        { label: 'Input', icon: '', route: '/components/input' },
        { label: 'Select', icon: '', route: '/components/select' },
        {
          label: 'DateTimePicker',
          icon: '',
          route: '/components/datetimepicker',
        },
        { label: 'Button', icon: '', route: '/components/button' },
      ],
    },
    {
      label: 'Theme',
      icon: 'M11 3a1 1 0 011 1v1.07a7.002 7.002 0 015.93 5.93H19a1 1 0 110 2h-1.07a7.002 7.002 0 01-5.93 5.93V20a1 1 0 11-2 0v-1.07a7.002 7.002 0 01-5.93-5.93H3a1 1 0 110-2h1.07a7.002 7.002 0 015.93-5.93V4a1 1 0 011-1zm0 4a5 5 0 100 10 5 5 0 000-10z',
      expanded: false,
      children: [{ label: 'Color', icon: '', route: '/theme/color' }],
    },
  ]);

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
      this.menuItems.set([...this.menuItems()]);
    }
  }

  onMenuClick(): void {
    if (this.isMobile()) {
      this.closeSidebar.emit();
    }
  }

  private syncExpandedMenu(currentUrl: string): void {
    const normalizedUrl = currentUrl.split('?')[0].split('#')[0];
    const updated = this.menuItems().map((item) => {
      if (!item.children) {
        return item;
      }

      const isRouteInsideSection = item.children.some((child) =>
        child.route ? normalizedUrl.startsWith(child.route) : false,
      );

      return {
        ...item,
        expanded: isRouteInsideSection ? true : item.expanded ?? false,
      };
    });

    this.menuItems.set(updated);
  }
}