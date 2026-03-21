export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'question';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastAction {
  label: string;
  onClick?: () => void | Promise<void>;
  closeOnClick?: boolean;
}

export interface ToastConfig {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  action?: ToastAction;
}

export interface ToastItem extends Required<Pick<ToastConfig, 'title'>> {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  position: ToastPosition;
  dismissible: boolean;
  action?: ToastAction;
}
