import { Observable, ReplaySubject } from 'rxjs';

export class ModalRef<TComponent = unknown, TResult = unknown> {
  private readonly afterClosedSubject = new ReplaySubject<TResult | undefined>(1);
  private closeHandler?: (result: TResult | undefined) => void;
  private isClosed = false;

  componentInstance: TComponent | null = null;

  readonly afterClosed$: Observable<TResult | undefined> =
    this.afterClosedSubject.asObservable();

  close(result?: TResult): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
    this.closeHandler?.(result);
  }

  _setCloseHandler(handler: (result: TResult | undefined) => void): void {
    this.closeHandler = handler;
  }

  _setComponentInstance(instance: TComponent | null): void {
    this.componentInstance = instance;
  }
}
