import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  effect,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainLoadingService } from '@core/services/main-loading.service';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements AfterViewInit {
  @ViewChild('mainContent') private mainContent?: ElementRef<HTMLElement>;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly mainLoadingService = inject(MainLoadingService);

  isSidebarOpen = signal(true);
  isMobile = signal(false);
  protected readonly mainOverlayStyle = signal<Record<string, string>>({});

  constructor() {
    this.checkScreenSize();

    effect(() => {
      if (!this.mainLoadingService.loading()) {
        return;
      }

      queueMicrotask(() => {
        this.updateMainOverlayStyle();
      });
    });
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.scrollMainToTop();
      });
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
    this.updateMainOverlayStyle();
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    this.isMobile.set(width < 1024);

    if (this.isMobile()) {
      this.isSidebarOpen.set(false);
    } else {
      this.isSidebarOpen.set(true);
    }
  }

  private scrollMainToTop(): void {
    this.mainContent?.nativeElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }

  private updateMainOverlayStyle(): void {
    const mainElement = this.mainContent?.nativeElement;

    if (!mainElement) {
      return;
    }

    const rect = mainElement.getBoundingClientRect();

    this.mainOverlayStyle.set({
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
    queueMicrotask(() => {
      this.updateMainOverlayStyle();
    });
  }

  closeSidebarOnMobile(): void {
    if (this.isMobile()) {
      this.isSidebarOpen.set(false);
    }
  }
}
