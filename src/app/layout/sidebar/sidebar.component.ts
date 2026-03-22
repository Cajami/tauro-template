import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';
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

interface AccountMenuItem {
  id: string;
  label: string;
  icon: string;
  hint?: string;
  divider?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    class: 'relative z-30 block h-full shrink-0 overflow-visible',
    '[style.width]': 'getHostWidth()',
  },
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('accountTrigger') private accountTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('accountMenuPanel') private accountMenuPanel?: ElementRef<HTMLDivElement>;

  private readonly desktopSidebarWidth = 256;
  private readonly accountMenuWidth = 248;
  private readonly accountMenuGap = 12;
  private readonly viewportPadding = 12;

  readonly accountMenuOpen = signal(false);
  readonly accountMenuStyle = signal<Record<string, string>>({});
  readonly accountMenuItems: AccountMenuItem[] = [
    {
      id: 'profile',
      label: 'Mi perfil',
      icon: 'M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      hint: 'Prox.',
    },
    {
      id: 'logout',
      label: 'Cerrar sesion',
      icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      divider: true,
    },
  ];

  isOpen = input.required<boolean>();
  isMobile = input.required<boolean>();
  closeSidebar = output<void>();

  constructor(
    public authService: AuthService,
    private router: Router,
    private elementRef: ElementRef<HTMLElement>,
  ) {
    this.syncExpandedMenu(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.syncExpandedMenu(event.urlAfterRedirects);
        this.closeAccountMenu();
      });
  }

  ngAfterViewInit(): void {
    if (this.accountMenuOpen()) {
      this.updateAccountMenuPosition();
    }
  }

  menuItems = signal<MenuItem[]>([
    {
      label: 'Main',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      route: '/dashboard/home',
    },
    {
      label: 'Components',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      expanded: false,
      children: [
        { label: 'Input', icon: '', route: '/components/input' },
        { label: 'Select', icon: '', route: '/components/select' },
        { label: 'Alert', icon: '', route: '/components/alert' },
        { label: 'Dialog', icon: '', route: '/components/dialog' },
        { label: 'Toast', icon: '', route: '/components/toast' },
        { label: 'Checkbox', icon: '', route: '/components/checkbox' },
        { label: 'Radio', icon: '', route: '/components/radio' },
        {
          label: 'DateTimePicker',
          icon: '',
          route: '/components/datetimepicker',
        },
        { label: 'Button', icon: '', route: '/components/button' },
        { label: 'Modal', icon: '', route: '/components/modal' },
      ],
    },
    {
      label: 'Theme',
      icon: 'M11 3a1 1 0 011 1v1.07a7.002 7.002 0 015.93 5.93H19a1 1 0 110 2h-1.07a7.002 7.002 0 01-5.93 5.93V20a1 1 0 11-2 0v-1.07a7.002 7.002 0 01-5.93-5.93H3a1 1 0 110-2h1.07a7.002 7.002 0 015.93-5.93V4a1 1 0 011-1zm0 4a5 5 0 100 10 5 5 0 000-10z',
      expanded: false,
      children: [
        { label: 'Layout', icon: '', route: '/theme/layout' },
        { label: 'Color', icon: '', route: '/theme/color' },
      ],
    },
  ]);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.accountMenuOpen()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.closeAccountMenu();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.accountMenuOpen()) {
      this.deferAccountMenuPosition();
    }
  }

  getHostWidth(): string {
    if (this.isMobile()) {
      return '0px';
    }

    return this.isOpen() ? `${this.desktopSidebarWidth}px` : '0px';
  }

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
      this.menuItems.set([...this.menuItems()]);
    }
  }

  onMenuClick(): void {
    this.closeAccountMenu();

    if (this.isMobile()) {
      this.closeSidebar.emit();
    }
  }

  toggleAccountMenu(): void {
    if (this.accountMenuOpen()) {
      this.closeAccountMenu();
      return;
    }

    this.accountMenuOpen.set(true);
    this.deferAccountMenuPosition();
  }

  onAccountMenuAction(actionId: string): void {
    if (actionId === 'profile') {
      this.closeAccountMenu();
      return;
    }

    if (actionId === 'logout') {
      this.closeAccountMenu();
      this.authService.logout();

      if (this.isMobile()) {
        this.closeSidebar.emit();
      }
    }
  }

  getAccountChevronTransform(): string {
    if (this.isMobile()) {
      return this.accountMenuOpen() ? 'rotate(180deg)' : 'rotate(0deg)';
    }

    return this.accountMenuOpen() ? 'rotate(90deg)' : 'rotate(-90deg)';
  }

  isSectionActive(item: MenuItem): boolean {
    if (!item.children) {
      return false;
    }

    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    return item.children.some((child) => (child.route ? currentUrl.startsWith(child.route) : false));
  }

  private closeAccountMenu(): void {
    this.accountMenuOpen.set(false);
    this.accountMenuStyle.set({});
  }

  private deferAccountMenuPosition(): void {
    requestAnimationFrame(() => {
      this.updateAccountMenuPosition();
    });
  }

  private updateAccountMenuPosition(): void {
    const trigger = this.accountTrigger?.nativeElement;
    const panel = this.accountMenuPanel?.nativeElement;
    if (!trigger || !panel) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const panelHeight = Math.min(panelRect.height || 0, window.innerHeight - this.viewportPadding * 2);
    const panelWidth = this.accountMenuWidth;
    const maxTop = Math.max(this.viewportPadding, window.innerHeight - panelHeight - this.viewportPadding);

    if (this.isMobile()) {
      const left = Math.min(
        Math.max(this.viewportPadding, triggerRect.right - panelWidth),
        window.innerWidth - panelWidth - this.viewportPadding,
      );
      const desiredTop = triggerRect.top - panelHeight - this.accountMenuGap;
      const top = Math.max(this.viewportPadding, desiredTop);

      this.accountMenuStyle.set({
        left: `${left}px`,
        top: `${top}px`,
        width: `${panelWidth}px`,
        maxHeight: `${window.innerHeight - this.viewportPadding * 2}px`,
      });
      return;
    }

    const desiredLeft = triggerRect.right + this.accountMenuGap;
    const left = Math.min(desiredLeft, window.innerWidth - panelWidth - this.viewportPadding);
    const desiredTop = triggerRect.top + triggerRect.height / 2 - panelHeight / 2;
    const top = Math.min(Math.max(this.viewportPadding, desiredTop), maxTop);

    this.accountMenuStyle.set({
      left: `${left}px`,
      top: `${top}px`,
      width: `${panelWidth}px`,
      maxHeight: `${window.innerHeight - this.viewportPadding * 2}px`,
    });
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


