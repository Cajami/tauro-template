import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ToastService } from '@shared/components/toast/toast.service';
import { ApiInfoComponent } from '../api-info/api-info.component';

interface ToastApiItem {
  property: string;
  values: string;
  defaultValue: string;
  description: string;
}

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
  protected readonly toastConfigProps: ToastApiItem[] = [
    {
      property: 'title',
      values: 'string',
      defaultValue: 'Requerido',
      description: 'Titulo principal del toast.',
    },
    {
      property: 'description',
      values: 'string',
      defaultValue: 'Sin descripcion',
      description: 'Texto secundario opcional debajo del titulo.',
    },
    {
      property: 'variant',
      values: "`'success'`, `'error'`, `'warning'`, `'info'`, `'question'`",
      defaultValue: "'info'",
      description: 'Tono semantico del toast y de su iconografia.',
    },
    {
      property: 'duration',
      values: 'number (ms)',
      defaultValue: '5000',
      description: 'Tiempo de vida antes del autocierre. Se pausa al hover.',
    },
    {
      property: 'position',
      values: "`'top-right'`, `'top-left'`, `'top-center'`, `'bottom-right'`, `'bottom-left'`, `'bottom-center'`",
      defaultValue: "'top-right'",
      description: 'Define la esquina o zona desde donde aparece el toast.',
    },
    {
      property: 'dismissible',
      values: '`true` o `false`',
      defaultValue: 'true',
      description: 'Muestra el boton de cierre manual.',
    },
    {
      property: 'action',
      values: 'ToastAction',
      defaultValue: 'Sin accion',
      description: 'Accion unica opcional como `Deshacer` o `Ver`.',
    },
  ];

  protected readonly toastActionProps: ToastApiItem[] = [
    {
      property: 'label',
      values: 'string',
      defaultValue: 'Requerido si existe action',
      description: 'Texto del boton mostrado dentro del toast.',
    },
    {
      property: 'onClick',
      values: 'funcion `() => void`',
      defaultValue: 'Sin handler',
      description: 'Logica que se ejecuta al pulsar la accion.',
    },
    {
      property: 'closeOnClick',
      values: '`true` o `false`',
      defaultValue: 'true',
      description: 'Define si el toast debe cerrarse automaticamente al pulsar la accion.',
    },
  ];

  protected readonly serviceMethods: ToastApiItem[] = [
    {
      property: 'show(config)',
      values: 'ToastConfig',
      defaultValue: 'Disponible siempre',
      description: 'Metodo base para cualquier toast personalizado.',
    },
    {
      property: 'success / error / warning / info / question',
      values: 'Config sin `variant`',
      defaultValue: 'Disponible siempre',
      description: 'Helpers rapidos que fijan la variante por ti.',
    },
    {
      property: 'remove(id)',
      values: 'string',
      defaultValue: 'Sin efecto si no existe',
      description: 'Quita un toast puntual del host global.',
    },
    {
      property: 'clear()',
      values: 'Metodo',
      defaultValue: 'Disponible siempre',
      description: 'Limpia todos los toasts visibles.',
    },
  ];
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
