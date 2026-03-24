import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, model, signal } from '@angular/core';
import {
  Cell,
  Column,
  ColumnDef,
  ColumnPinningState,
  FlexRenderDirective,
  Header,
  SortingState,
  createAngularTable,
  functionalUpdate,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';
import { ArrowDown, ArrowUp, ArrowUpDown, LucideAngularModule } from 'lucide-angular';

export interface GridColumnMeta {
  pinned?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  headerClassName?: string;
  cellClassName?: string;
  footerClassName?: string;
}

export type GridColumnDef<TData extends object = any> = ColumnDef<TData, any> & {
  meta?: GridColumnMeta;
};

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, LucideAngularModule],
  templateUrl: './grid.component.html',
  host: {
    class: 'block w-full min-w-0',
  },
})
export class GridComponent<TData extends object = any> {
  readonly data = input<TData[]>([]);
  readonly columns = input<GridColumnDef<TData>[]>([]);
  readonly ariaLabel = input('Grid de datos');
  readonly stickyHeader = input(true);
  readonly showPagination = input(true);
  readonly loading = input(false);
  readonly emptyTitle = input('Sin registros');
  readonly emptyDescription = input('No hay informacion para mostrar en esta tabla.');
  readonly pageSizeOptions = input<number[]>([10, 20, 50]);
  readonly minTableWidth = input<number>(960);
  readonly stripedRows = input(false);
  readonly dense = input(false);
  readonly resizableColumns = input(false);

  readonly pageIndex = model(0);
  readonly pageSize = model(10);

  protected readonly sortIcon = ArrowUpDown;
  protected readonly sortAscIcon = ArrowUp;
  protected readonly sortDescIcon = ArrowDown;

  private readonly sorting = signal<SortingState>([]);
  private readonly columnPinning = signal<ColumnPinningState>({ left: [], right: [] });

  readonly table = createAngularTable<TData>(() => ({
    data: this.data(),
    columns: this.columns(),
    state: {
      sorting: this.sorting(),
      columnPinning: this.columnPinning(),
      pagination: {
        pageIndex: this.showPagination() ? this.pageIndex() : 0,
        pageSize: this.showPagination() ? this.pageSize() : Math.max(this.data().length, 1),
      },
    },
    onSortingChange: (updater) => {
      this.sorting.set(functionalUpdate(updater, this.sorting()));
    },
    onColumnPinningChange: (updater) => {
      this.columnPinning.set(functionalUpdate(updater, this.columnPinning()));
    },
    onPaginationChange: (updater) => {
      const next = functionalUpdate(updater, {
        pageIndex: this.pageIndex(),
        pageSize: this.pageSize(),
      });
      this.pageIndex.set(next.pageIndex);
      this.pageSize.set(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
    enableColumnResizing: this.resizableColumns(),
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 180,
      minSize: 120,
      maxSize: 480,
      enableResizing: this.resizableColumns(),
    },
  }));

  protected readonly rows = computed(() => this.table().getRowModel().rows);
  protected readonly totalRows = computed(() => this.data().length);
  protected readonly visibleColumnCount = computed(() => this.table().getVisibleLeafColumns().length);
  protected readonly hasFooter = computed(() =>
    this.table()
      .getFooterGroups()
      .some((group) =>
        group.headers.some(
          (header) => !header.isPlaceholder && header.column.columnDef.footer !== undefined,
        ),
      ),
  );
  protected readonly pageCount = computed(() => this.table().getPageCount());
  protected readonly rangeStart = computed(() =>
    this.totalRows() ? this.pageIndex() * this.pageSize() + 1 : 0,
  );
  protected readonly rangeEnd = computed(() =>
    Math.min((this.pageIndex() + 1) * this.pageSize(), this.totalRows()),
  );
  protected readonly tableMinWidth = computed(() =>
    `${Math.max(this.minTableWidth(), this.table().getTotalSize())}px`,
  );

  constructor() {
    effect(() => {
      const desiredPageSize = this.pageSizeOptions()[0] ?? 10;
      if (!this.pageSizeOptions().includes(this.pageSize())) {
        this.pageSize.set(desiredPageSize);
      }
    });

    effect(() => {
      const pageCount = this.table().getPageCount();
      if (!pageCount) {
        this.pageIndex.set(0);
        return;
      }

      const maxPageIndex = Math.max(0, pageCount - 1);
      if (this.pageIndex() > maxPageIndex) {
        this.pageIndex.set(maxPageIndex);
      }
    });

    effect(() => {
      const nextPinning = this.extractPinnedColumns(this.columns());
      this.columnPinning.set(nextPinning);
    });
  }

  protected getHeaderCellClasses(header: Header<TData, unknown>): string {
    return [
      'group relative border-b border-r border-primary-100 bg-primary-50/80 px-4 py-3 text-left align-middle text-xs font-semibold uppercase tracking-[0.18em] text-primary-800 last:border-r-0 hover:z-40 focus-within:z-40',
      this.stickyHeader() ? 'sticky top-0 z-20' : '',
      this.getAlignmentClass((header.column.columnDef.meta as GridColumnMeta | undefined)?.align),
      (header.column.columnDef.meta as GridColumnMeta | undefined)?.headerClassName ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected getBodyCellClasses(cell: Cell<TData, unknown>, rowIndex: number): string {
    return [
      'border-b border-r border-primary-100/60 px-4 py-3 align-top text-sm text-slate-700 last:border-r-0',
      this.dense() ? 'py-2.5' : '',
      this.stripedRows() && rowIndex % 2 === 1 ? 'bg-primary-50/30' : 'bg-white',
      this.getAlignmentClass((cell.column.columnDef.meta as GridColumnMeta | undefined)?.align),
      (cell.column.columnDef.meta as GridColumnMeta | undefined)?.cellClassName ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected getFooterCellClasses(header: Header<TData, unknown>): string {
    return [
      'border-r border-t border-primary-100 bg-primary-50/70 px-4 py-3 text-sm font-semibold text-primary-900 last:border-r-0',
      this.getAlignmentClass((header.column.columnDef.meta as GridColumnMeta | undefined)?.align),
      (header.column.columnDef.meta as GridColumnMeta | undefined)?.footerClassName ?? '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected getPinnedStyles(
    target: Header<TData, unknown> | Column<TData, unknown>,
    section: 'header' | 'body' | 'footer',
  ): Record<string, string> {
    const isHeaderTarget = this.isHeaderTarget(target);
    const column = isHeaderTarget ? target.column : target;
    const pinnedColumn = isHeaderTarget ? this.getPinnedColumnForHeader(target) : column;
    const size = isHeaderTarget ? target.getSize() : column.getSize();
    const width = `${size}px`;
    const pinned = pinnedColumn?.getIsPinned() ?? false;
    const background =
      section === 'body'
        ? 'var(--color-card, #ffffff)'
        : section === 'header'
          ? 'color-mix(in srgb, var(--color-primary-50) 80%, white 20%)'
          : 'color-mix(in srgb, var(--color-primary-50) 70%, white 30%)';

    if (!pinned || !pinnedColumn) {
      return {
        width,
        minWidth: width,
      };
    }

    const shadow =
      pinned === 'left' && this.isLastPinnedColumn(pinnedColumn, 'left')
        ? '2px 0 0 0 color-mix(in srgb, var(--color-primary-100) 55%, transparent)'
      : pinned === 'right' && this.isFirstPinnedColumn(pinnedColumn, 'right')
          ? '-2px 0 0 0 color-mix(in srgb, var(--color-primary-100) 55%, transparent)'
          : 'none';

    return {
      position: 'sticky',
      [pinned]: `${this.getPinnedOffset(pinnedColumn, pinned)}px`,
      width,
      minWidth: width,
      background,
      zIndex: section === 'header' ? '30' : section === 'footer' ? '25' : '15',
      boxShadow: shadow,
    };
  }

  protected getSortIconFor(column: Column<TData, unknown>) {
    const sorting = column.getIsSorted();
    if (sorting === 'asc') {
      return this.sortAscIcon;
    }

    if (sorting === 'desc') {
      return this.sortDescIcon;
    }

    return this.sortIcon;
  }

  protected getSortIconClasses(column: Column<TData, unknown>): string {
    return column.getIsSorted()
      ? 'text-primary-600'
      : 'text-slate-400 transition-colors group-hover:text-primary-500';
  }

  protected getCanSort(header: Header<TData, unknown>): boolean {
    return !!header.column.getCanSort() && !header.isPlaceholder;
  }

  protected toggleSorting(event: Event, header: Header<TData, unknown>): void {
    if (!this.getCanSort(header)) {
      return;
    }

    header.column.getToggleSortingHandler()?.(event);
  }

  protected handleResizeStart(
    event: MouseEvent | TouchEvent,
    header: Header<TData, unknown>,
  ): void {
    if (!this.resizableColumns() || !header.column.getCanResize()) {
      return;
    }

    event.stopPropagation();
    header.getResizeHandler()(event);
  }

  protected updatePageSizeFromEvent(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const rawValue = target?.value;
    if (!rawValue) {
      return;
    }

    const next = Number(rawValue);
    if (!Number.isFinite(next) || next <= 0) {
      return;
    }

    this.pageSize.set(next);
    this.pageIndex.set(0);
  }

  protected getRowId(rowIndex: number, row: { id: string }): string {
    return `${row.id}-${rowIndex}`;
  }

  protected goToPreviousPage(): void {
    if (this.table().getCanPreviousPage()) {
      this.table().previousPage();
    }
  }

  protected goToNextPage(): void {
    if (this.table().getCanNextPage()) {
      this.table().nextPage();
    }
  }

  private getAlignmentClass(alignment: GridColumnMeta['align'] | undefined): string {
    if (alignment === 'center') {
      return 'text-center';
    }

    if (alignment === 'right') {
      return 'text-right';
    }

    return 'text-left';
  }

  private extractPinnedColumns(columns: GridColumnDef<TData>[]): ColumnPinningState {
    const left: string[] = [];
    const right: string[] = [];

    const visit = (items: GridColumnDef<TData>[]) => {
      for (const item of items) {
        if ('columns' in item && Array.isArray(item.columns)) {
          visit(item.columns as GridColumnDef<TData>[]);
          continue;
        }

        const columnId = this.getColumnId(item);
        if (!columnId) {
          continue;
        }

        if (item.meta?.pinned === 'left') {
          left.push(columnId);
        } else if (item.meta?.pinned === 'right') {
          right.push(columnId);
        }
      }
    };

    visit(columns);
    return { left, right };
  }

  private getColumnId(column: GridColumnDef<TData>): string | null {
    if ('id' in column && typeof column.id === 'string') {
      return column.id;
    }

    if ('accessorKey' in column && typeof column.accessorKey === 'string') {
      return column.accessorKey;
    }

    return null;
  }

  private getPinnedColumnForHeader(header: Header<TData, unknown>): Column<TData, unknown> | null {
    const leafHeaders = header.getLeafHeaders().filter((leafHeader) => !leafHeader.isPlaceholder);
    if (!leafHeaders.length) {
      return null;
    }

    const firstPinnedLeaf = leafHeaders.find((leafHeader) => !!leafHeader.column.getIsPinned());
    if (!firstPinnedLeaf) {
      return null;
    }

    const pinnedSide = firstPinnedLeaf.column.getIsPinned();
    const allSamePinnedSide = leafHeaders.every(
      (leafHeader) => leafHeader.column.getIsPinned() === pinnedSide,
    );

    return allSamePinnedSide ? firstPinnedLeaf.column : null;
  }

  private getPinnedOffset(column: Column<TData, unknown>, side: 'left' | 'right'): number {
    const columns =
      side === 'left' ? this.table().getLeftLeafColumns() : this.table().getRightLeafColumns();

    let offset = 0;

    if (side === 'left') {
      for (const current of columns) {
        if (current.id === column.id) {
          break;
        }

        offset += current.getSize();
      }

      return offset;
    }

    for (let index = columns.length - 1; index >= 0; index -= 1) {
      const current = columns[index];
      if (current.id === column.id) {
        break;
      }

      offset += current.getSize();
    }

    return offset;
  }

  private isLastPinnedColumn(column: Column<TData, unknown>, side: 'left' | 'right'): boolean {
    const columns =
      side === 'left' ? this.table().getLeftLeafColumns() : this.table().getRightLeafColumns();
    return columns[columns.length - 1]?.id === column.id;
  }

  private isFirstPinnedColumn(column: Column<TData, unknown>, side: 'left' | 'right'): boolean {
    const columns =
      side === 'left' ? this.table().getLeftLeafColumns() : this.table().getRightLeafColumns();
    return columns[0]?.id === column.id;
  }

  private isHeaderTarget(
    target: Header<TData, unknown> | Column<TData, unknown>,
  ): target is Header<TData, unknown> {
    return 'subHeaders' in target;
  }
}
