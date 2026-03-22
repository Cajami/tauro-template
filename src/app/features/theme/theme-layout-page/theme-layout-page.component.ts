import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';

@Component({
  selector: 'app-theme-layout-page',
  standalone: true,
  imports: [CommonModule, HeaderPageComponent],
  templateUrl: './theme-layout-page.component.html',
})
export class ThemeLayoutPageComponent {
  readonly shellMap = [
    {
      area: 'Header',
      description: 'Barra superior del template. Hoy contiene branding y el boton hamburguesa para controlar el sidebar.',
    },
    {
      area: 'Sidebar',
      description: 'Navegacion lateral responsive. En desktop ocupa su propia columna y en mobile funciona como overlay.',
    },
    {
      area: 'Main',
      description: 'Zona principal del contenido. Aqui se renderizan las rutas privadas y se controla el scroll interno.',
    },
    {
      area: 'Footer',
      description: 'Bloque inferior de la columna derecha. Puede retirarse sin romper la estructura general del shell.',
    },
  ];

  readonly footerRemovalSteps = [
    'Abre src/app/layout/dashboard-layout/dashboard-layout.component.html.',
    'Ubica el componente <app-footer></app-footer> dentro de la columna derecha del grid.',
    'Eliminalo o dejalo condicionado segun la necesidad de tu proyecto.',
    'No hace falta rehacer la grilla: main ocupara el alto disponible automaticamente.',
  ];

  readonly layoutSnippet = `<div class="grid h-screen grid-rows-[4rem_minmax(0,1fr)] overflow-hidden bg-gray-50">
  <app-header (toggleSidebar)="toggleSidebar()"></app-header>

  <div class="relative min-h-0">
    <div class="grid h-full min-h-0 grid-cols-[auto_minmax(0,1fr)]">
      <app-sidebar
        [isOpen]="isSidebarOpen()"
        [isMobile]="isMobile()"
        (closeSidebar)="closeSidebarOnMobile()"
      ></app-sidebar>

      <div class="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
        <main #mainContent class="min-h-0 overflow-y-auto p-4 md:p-5 lg:p-6">
          <router-outlet></router-outlet>
        </main>

        <app-footer></app-footer>
      </div>
    </div>
  </div>
</div>`;

  readonly footerlessSnippet = `<div class="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
  <main #mainContent class="min-h-0 overflow-y-auto p-4 md:p-5 lg:p-6">
    <router-outlet></router-outlet>
  </main>

  <app-footer></app-footer>
</div>

<!-- Si no quieres footer -->

<div class="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
  <main #mainContent class="min-h-0 overflow-y-auto p-4 md:p-5 lg:p-6">
    <router-outlet></router-outlet>
  </main>
</div>`;
}
