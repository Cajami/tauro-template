import { Type } from '@angular/core';
import { ModalRef } from './modal-ref';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalActionVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'link';
export type ModalActionColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'neutral';

export interface ModalActionContext<
  TComponent = unknown,
  TData = unknown,
  TResult = unknown,
> {
  modalRef: ModalRef<TComponent, TResult>;
  componentInstance: TComponent | null;
  data: TData | undefined;
}

export interface ModalAction<TComponent = unknown, TData = unknown, TResult = unknown> {
  id?: string;
  label: string;
  variant?: ModalActionVariant;
  color?: ModalActionColor;
  closeOnClick?: boolean;
  result?:
    | TResult
    | ((context: ModalActionContext<TComponent, TData, TResult>) => TResult);
  disabled?:
    | boolean
    | ((context: ModalActionContext<TComponent, TData, TResult>) => boolean);
  onClick?:
    | ((
        context: ModalActionContext<TComponent, TData, TResult>,
      ) => void | Promise<void>);
}

export interface ModalConfig<TComponent = unknown, TData = unknown, TResult = unknown> {
  title?: string;
  subtitle?: string;
  size?: ModalSize;
  draggable?: boolean;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  data?: TData;
  inputs?: Record<string, unknown>;
  actions?: ModalAction<TComponent, TData, TResult>[];
}

export interface ResolvedModalConfig<
  TComponent = unknown,
  TData = unknown,
  TResult = unknown,
> {
  title: string;
  subtitle?: string;
  size: ModalSize;
  draggable: boolean;
  showCloseButton: boolean;
  closeOnBackdrop: boolean;
  closeOnEscape: boolean;
  data?: TData;
  inputs: Record<string, unknown>;
  actions: ModalAction<TComponent, TData, TResult>[];
}

export interface ActiveModalState<
  TComponent = unknown,
  TData = unknown,
  TResult = unknown,
> {
  id: number;
  component: Type<TComponent>;
  config: ResolvedModalConfig<TComponent, TData, TResult>;
  ref: ModalRef<TComponent, TResult>;
}
