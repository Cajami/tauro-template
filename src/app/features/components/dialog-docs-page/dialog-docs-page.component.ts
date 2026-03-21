import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { ApiInfoComponent } from '../api-info/api-info.component';

@Component({
  selector: 'app-dialog-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    ButtonComponent,
    ApiInfoComponent,
  ],
  templateUrl: './dialog-docs-page.component.html',
})
export class DialogDocsPageComponent {
  protected readonly lastAlertResult = signal('Sin acciones todavia');
  protected readonly lastConfirmResult = signal('Sin acciones todavia');
  protected readonly lastDangerResult = signal('Sin acciones todavia');

  protected readonly htmlEjemplo1 = `const ref = this.dialogService.alert({
  title: 'Operacion completada',
  message: 'La venta se registro correctamente.',
  description: 'El sistema ya actualizo el tablero y los indicadores.',
  variant: 'success',
  confirmText: 'Aceptar',
});

ref.afterClosed$.subscribe(() => {
  this.lastAlertResult.set('aceptado');
});`;

  protected readonly tsEjemplo1 = `Usa dialogService.alert(...) cuando quieras un mensaje modal simple,
no una decision con varias opciones.`;

  protected readonly htmlEjemplo2 = `const ref = this.dialogService.confirm({
  title: 'Eliminar registro',
  message: 'Esta accion no se puede deshacer.',
  description: 'Se eliminaran los datos asociados al documento seleccionado.',
  variant: 'warning',
  confirmText: 'Eliminar',
  cancelText: 'Cancelar',
  confirmVariant: 'error',
});

ref.afterClosed$.subscribe((confirmed) => {
  this.lastConfirmResult.set(confirmed ? 'confirmado' : 'cancelado');
});`;

  protected readonly tsEjemplo2 = `dialogService.confirm(...) devuelve true o false segun la accion elegida.`;

  protected readonly htmlEjemplo3 = `const ref = this.dialogService.confirm({
  title: 'Publicar modulo',
  message: '¿Deseas publicar este modulo ahora?',
  description: 'Quedara disponible para el resto del equipo en cuanto confirmes.',
  variant: 'question',
  confirmText: 'Publicar',
  cancelText: 'Revisar luego',
  confirmVariant: 'primary',
});`;

  protected readonly tsEjemplo3 = `Usa la variante question para decisiones neutras y warning/error cuando exista riesgo.`;

  constructor(private readonly dialogService: DialogService) {}

  protected openAlertDialog(): void {
    const ref = this.dialogService.alert({
      title: 'Operacion completada',
      message: 'La venta se registro correctamente.',
      description: 'El sistema ya actualizo el tablero y los indicadores.',
      variant: 'success',
      confirmText: 'Aceptar',
    });

    ref.afterClosed$.subscribe(() => {
      this.lastAlertResult.set('aceptado');
    });
  }

  protected openDeleteConfirm(): void {
    const ref = this.dialogService.confirm({
      title: 'Eliminar registro',
      message: 'Esta accion no se puede deshacer.',
      description: 'Se eliminaran los datos asociados al documento seleccionado.',
      variant: 'warning',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      confirmVariant: 'error',
    });

    ref.afterClosed$.subscribe((confirmed) => {
      this.lastConfirmResult.set(confirmed ? 'confirmado' : 'cancelado');
    });
  }

  protected openQuestionConfirm(): void {
    const ref = this.dialogService.confirm({
      title: 'Publicar modulo',
      message: '¿Deseas publicar este modulo ahora?',
      description: 'Quedara disponible para el resto del equipo en cuanto confirmes.',
      variant: 'question',
      confirmText: 'Publicar',
      cancelText: 'Revisar luego',
      confirmVariant: 'primary',
    });

    ref.afterClosed$.subscribe((confirmed) => {
      this.lastDangerResult.set(confirmed ? 'publicado' : 'pospuesto');
    });
  }
}
