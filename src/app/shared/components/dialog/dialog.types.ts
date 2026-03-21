import { AlertVariant } from '@shared/components/alert/alert.component';
import { ModalSize } from '@shared/components/modal/modal.types';

export interface DialogAlertConfig {
  title: string;
  message: string;
  description?: string;
  variant?: Exclude<AlertVariant, 'question'>;
  confirmText?: string;
  size?: ModalSize;
}

export interface DialogConfirmConfig {
  title: string;
  message: string;
  description?: string;
  variant?: Extract<AlertVariant, 'warning' | 'error' | 'question' | 'info'>;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'success' | 'error';
  size?: ModalSize;
}

export interface DialogMessageData {
  variant: AlertVariant;
  message: string;
  description?: string;
}
