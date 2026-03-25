import { Component, inject, signal } from '@angular/core';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { MainLoadingService } from '@core/services/main-loading.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { LoadingBlockComponent } from '@shared/components/loading-block/loading-block.component';

interface LoadingApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

@Component({
  selector: 'app-loading-docs-page',
  standalone: true,
  imports: [
    HeaderPageComponent,
    ComponentShowcaseComponent,
    ButtonComponent,
    LoadingBlockComponent,
    ApiInfoComponent,
  ],
  templateUrl: './loading-docs-page.component.html',
  styleUrl: './loading-docs-page.component.scss',
})
export class LoadingDocsPageComponent {
  private readonly mainLoadingService = inject(MainLoadingService);

  protected readonly sectionLoading = signal(false);

  protected readonly loadingProps: LoadingApiItem[] = [
    {
      property: 'loading',
      values: '`true` o `false`',
      defaultValue: 'false',
      description: 'Controla si el overlay debe mostrarse y bloquear la interaccion del contenido envuelto.',
    },
    {
      property: 'message',
      values: 'string',
      defaultValue: "'Un momento por favor...'",
      description: 'Texto mostrado dentro del estado de carga. Puedes sobrescribirlo por caso de uso.',
    },
    {
      property: 'secondaryMessage',
      values: 'string o null',
      defaultValue: 'null',
      description: 'Texto secundario opcional para procesos largos o aclaraciones adicionales.',
    },
    {
      property: 'mode',
      values: "`'section'` o `'page'`",
      defaultValue: "'section'",
      description: 'Define si el loading se comporta como overlay local de un bloque o como carga visual de toda el area principal.',
    },
    {
      property: 'ng-content',
      values: 'Contenido proyectado',
      defaultValue: 'Requerido para ver el overlay sobre un bloque real',
      description: 'La pieza envuelve cualquier contenido: cards, tablas, formularios o paginas completas dentro de `main`.',
    },
  ];

  protected readonly modeValues: LoadingApiItem[] = [
    {
      property: 'section',
      values: 'Overlay local',
      defaultValue: 'Si',
      description: 'Ideal para tablas, formularios o cards sin bloquear toda la vista.',
    },
    {
      property: 'page',
      values: 'Overlay amplio dentro del main',
      defaultValue: 'No',
      description: 'Cubre toda el area envuelta, util cuando la pantalla central completa depende de una carga o guardado.',
    },
  ];

  protected readonly htmlEjemplo1 = `<app-button (clicked)="simulateSectionLoading()">
  Recargar seccion
</app-button>

<app-loading-block [loading]="sectionLoading()">
  <div class="rounded-2xl border border-gray-200 bg-white p-5">
    <!-- Contenido de la seccion -->
  </div>
</app-loading-block>`;

  protected readonly tsEjemplo1 = `readonly sectionLoading = signal(false);

simulateSectionLoading(): void {
  this.sectionLoading.set(true);

  window.setTimeout(() => {
    this.sectionLoading.set(false);
  }, 1800);
}`;

  protected readonly htmlEjemplo2 = `<app-button variant="secondary" (clicked)="simulatePageLoading()">
  Guardar pantalla completa
</app-button>

<!-- El DashboardLayout envuelve el router-outlet con app-loading-block mode="page" -->

<section class="space-y-4">
  <!-- El overlay real cubrira todo el main -->
</section>`;

  protected readonly tsEjemplo2 = `private readonly mainLoadingService = inject(MainLoadingService);

simulatePageLoading(): void {
  this.mainLoadingService.show('Guardando cambios del tablero...');

  window.setTimeout(() => {
    this.mainLoadingService.hide();
  }, 2200);
}`;

  protected simulateSectionLoading(): void {
    if (this.sectionLoading()) {
      return;
    }

    this.sectionLoading.set(true);

    window.setTimeout(() => {
      this.sectionLoading.set(false);
    }, 1800);
  }

  protected simulatePageLoading(): void {
    if (this.mainLoadingService.loading()) {
      return;
    }

    this.mainLoadingService.show('Guardando cambios del tablero...');

    window.setTimeout(() => {
      this.mainLoadingService.hide();
    }, 2200);
  }
}
