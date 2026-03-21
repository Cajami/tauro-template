import { Injectable } from '@angular/core';
import { ModalRef } from '@shared/components/modal/modal-ref';
import { ModalService } from '@shared/components/modal/modal.service';
import { DialogMessageContentComponent } from './dialog-message-content.component';
import {
  DialogAlertConfig,
  DialogConfirmConfig,
  DialogMessageData,
} from './dialog.types';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly modalService: ModalService) {}

  alert(config: DialogAlertConfig): ModalRef<DialogMessageContentComponent, boolean> {
    return this.modalService.open(DialogMessageContentComponent, {
      title: config.title,
      size: config.size ?? 'sm',
      placement: 'top-center',
      draggable: false,
      data: this.buildMessageData(config.variant ?? 'info', config.message, config.description),
      actions: [
        {
          label: config.confirmText ?? 'Aceptar',
          variant: 'primary',
          closeOnClick: true,
          result: true,
        },
      ],
    });
  }

  confirm(config: DialogConfirmConfig): ModalRef<DialogMessageContentComponent, boolean> {
    return this.modalService.open(DialogMessageContentComponent, {
      title: config.title,
      size: config.size ?? 'sm',
      placement: 'top-center',
      draggable: false,
      data: this.buildMessageData(
        config.variant ?? 'question',
        config.message,
        config.description,
      ),
      actions: [
        {
          label: config.cancelText ?? 'Cancelar',
          variant: 'secondary',
          closeOnClick: true,
          result: false,
        },
        {
          label: config.confirmText ?? 'Aceptar',
          variant: config.confirmVariant ?? 'primary',
          closeOnClick: true,
          result: true,
        },
      ],
    });
  }

  private buildMessageData(
    variant: DialogMessageData['variant'],
    message: string,
    description?: string,
  ): DialogMessageData {
    return {
      variant,
      message,
      description,
    };
  }
}
