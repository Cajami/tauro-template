import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ToastService } from '@shared/components/toast/toast.service';
import { ApiInfoComponent } from '../api-info/api-info.component';

@Component({
  selector: 'app-toast-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    ButtonComponent,
    ApiInfoComponent,
  ],
  templateUrl: './toast-docs-page.component.html',
})
export class ToastDocsPageComponent {
  protected readonly htmlEjemplo1 = `this.toastService.success({
  title: 'Cambios guardados',
  description: 'La configuracion del modulo se actualizo correctamente.',
});

this.toastService.error({
  title: 'Operacion fallida',
  description: 'No fue posible guardar los cambios.',
});`;

  protected readonly tsEjemplo1 = `Por defecto el toast aparece en top-right y se cierra solo despues de 5 segundos.`;

  protected readonly htmlEjemplo2 = `this.toastService.show({
  title: 'Sincronizacion pendiente',
  description: 'Puedes retomarla mas tarde desde el panel.',
  variant: 'info',
  position: 'bottom-left',
  duration: 8000,
});`;

  protected readonly tsEjemplo2 = `La posicion es configurable por toast: top-right, top-left, top-center, bottom-right, bottom-left y bottom-center.`;

  protected readonly htmlEjemplo3 = `this.toastService.show({
  title: 'Archivo movido a la papelera',
  description: 'Tienes unos segundos para deshacer la accion.',
  variant: 'warning',
  action: {
    label: 'Deshacer',
    onClick: () => this.restoreFile(),
  },
});`;

  protected readonly tsEjemplo3 = `Toast admite una sola accion opcional como 'Deshacer' o 'Ver',
pero no debe usarse para confirmaciones dobles. Para eso usa DialogService.`;

  constructor(private readonly toastService: ToastService) {}

  protected showVariants(): void {
    this.toastService.success({
      title: 'Cambios guardados',
      description: 'La configuracion del modulo se actualizo correctamente.',
    });

    this.toastService.error({
      title: 'Operacion fallida',
      description: 'No fue posible guardar los cambios.',
    });

    this.toastService.warning({
      title: 'Revision pendiente',
      description: 'Aun falta validar algunos datos del formulario.',
    });

    this.toastService.info({
      title: 'Sincronizacion iniciada',
      description: 'El proceso se esta ejecutando en segundo plano.',
    });
  }

  protected showBottomLeft(): void {
    this.toastService.show({
      title: 'Sincronizacion pendiente',
      description: 'Puedes retomarla mas tarde desde el panel.',
      variant: 'info',
      position: 'bottom-left',
      duration: 8000,
    });
  }

  protected showUndoToast(): void {
    this.toastService.show({
      title: 'Archivo movido a la papelera',
      description: 'Tienes unos segundos para deshacer la accion.',
      variant: 'warning',
      action: {
        label: 'Deshacer',
        onClick: () => {
          this.toastService.success({
            title: 'Archivo restaurado',
            description: 'La accion se revirtio correctamente.',
            position: 'top-right',
          });
        },
      },
    });
  }
}
