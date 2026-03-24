import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CellContext, createColumnHelper, flexRenderComponent } from '@tanstack/angular-table';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { GridComponent, GridColumnDef } from '@shared/components/grid/grid.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { GridCheckboxCellComponent } from './grid-checkbox-cell.component';

interface EmployeeRow {
  id: number;
  responsible: string;
  role: string;
  team: string;
  region: string;
  status: 'Activo' | 'En revision' | 'Bloqueado';
}

interface FinanceRow {
  id: number;
  customer: string;
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  balance: number;
}

interface TaskRow {
  id: number;
  task: string;
  owner: string;
  sprint: string;
  priority: 'Alta' | 'Media' | 'Baja';
  done: boolean;
  alerts: number;
}

const employeeHelper = createColumnHelper<EmployeeRow>();
const financeHelper = createColumnHelper<FinanceRow>();
const taskHelper = createColumnHelper<TaskRow>();

@Component({
  selector: 'app-grid-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    GridComponent,
    ApiInfoComponent,
  ],
  templateUrl: './grid-docs-page.component.html',
})
export class GridDocsPageComponent {
  readonly employeeRows: EmployeeRow[] = [
    { id: 1, responsible: 'Lucia Herrera', role: 'Product Owner', team: 'Core', region: 'Lima', status: 'Activo' },
    { id: 2, responsible: 'Marco Rojas', role: 'Frontend Lead', team: 'UX', region: 'Bogota', status: 'En revision' },
    { id: 3, responsible: 'Sofia Medina', role: 'QA Analyst', team: 'Quality', region: 'Quito', status: 'Activo' },
    { id: 4, responsible: 'Diego Campos', role: 'Backend Dev', team: 'Payments', region: 'CDMX', status: 'Bloqueado' },
    { id: 5, responsible: 'Valeria Salas', role: 'UX Designer', team: 'Design', region: 'Lima', status: 'Activo' },
    { id: 6, responsible: 'Jorge Muñoz', role: 'Data Analyst', team: 'BI', region: 'Santiago', status: 'En revision' },
    { id: 7, responsible: 'Camila Rivas', role: 'Support Lead', team: 'Ops', region: 'Lima', status: 'Activo' },
    { id: 8, responsible: 'Piero Arce', role: 'Security Engineer', team: 'Security', region: 'Bogota', status: 'Activo' },
    { id: 9, responsible: 'Ana Torres', role: 'Scrum Master', team: 'Delivery', region: 'Quito', status: 'Activo' },
    { id: 10, responsible: 'Nicolas Vega', role: 'Mobile Dev', team: 'Apps', region: 'CDMX', status: 'Bloqueado' },
    { id: 11, responsible: 'Rosa Paredes', role: 'Automation QA', team: 'Quality', region: 'Lima', status: 'En revision' },
    { id: 12, responsible: 'Elena Ruiz', role: 'Project Manager', team: 'Core', region: 'Santiago', status: 'Activo' },
  ];

  readonly financeRows: FinanceRow[] = [
    { id: 1, customer: 'Grupo Delta', subtotal: 12800, tax: 2304, total: 15104, paid: 12000, balance: 3104 },
    { id: 2, customer: 'Inversiones Sol', subtotal: 8400, tax: 1512, total: 9912, paid: 9912, balance: 0 },
    { id: 3, customer: 'Tecno Norte', subtotal: 15250, tax: 2745, total: 17995, paid: 8000, balance: 9995 },
    { id: 4, customer: 'Logistica Azul', subtotal: 6400, tax: 1152, total: 7552, paid: 4500, balance: 3052 },
  ];

  readonly taskRows: TaskRow[] = [
    { id: 1, task: 'Cerrar alcance del sprint', owner: 'Lucia', sprint: 'Sprint 17', priority: 'Alta', done: true, alerts: 0 },
    { id: 2, task: 'Validar feed de auditoria', owner: 'Marco', sprint: 'Sprint 17', priority: 'Media', done: false, alerts: 2 },
    { id: 3, task: 'Ajustar layout del modulo compras', owner: 'Camila', sprint: 'Sprint 18', priority: 'Alta', done: false, alerts: 5 },
    { id: 4, task: 'Revisar reglas de conciliacion', owner: 'Sofia', sprint: 'Sprint 18', priority: 'Baja', done: true, alerts: 1 },
    { id: 5, task: 'Corregir integracion con proveedor', owner: 'Diego', sprint: 'Sprint 18', priority: 'Alta', done: false, alerts: 3 },
  ];

  readonly financeTotals = this.financeRows.reduce(
    (acc, row) => ({
      subtotal: acc.subtotal + row.subtotal,
      tax: acc.tax + row.tax,
      total: acc.total + row.total,
      paid: acc.paid + row.paid,
      balance: acc.balance + row.balance,
    }),
    { subtotal: 0, tax: 0, total: 0, paid: 0, balance: 0 },
  );

  readonly employeeColumns: GridColumnDef<EmployeeRow>[] = [
    employeeHelper.accessor('responsible', {
      id: 'responsible',
      header: 'Responsable',
      size: 220,
      enableResizing: true,
      enableSorting: true,
    }),
    employeeHelper.accessor('role', {
      header: 'Rol',
      size: 200,
      enableResizing: true,
      enableSorting: true,
    }),
    employeeHelper.accessor('team', {
      header: 'Equipo',
      size: 150,
      enableSorting: true,
    }),
    employeeHelper.accessor('region', {
      header: 'Region',
      size: 140,
      enableSorting: true,
    }),
    employeeHelper.accessor('status', {
      header: 'Estado',
      size: 150,
      enableSorting: true,
      cell: (info: CellContext<EmployeeRow, EmployeeRow['status']>) => info.getValue(),
    }),
  ];

  readonly financeColumns: GridColumnDef<FinanceRow>[] = [
    financeHelper.accessor('customer', {
      id: 'customer',
      header: 'Cliente',
      footer: () => 'Totales',
      size: 220,
      enableSorting: true,
      meta: { pinned: 'left' },
    }),
    financeHelper.group({
      id: 'billing',
      header: 'Facturacion',
      columns: [
        financeHelper.accessor('subtotal', {
          header: 'Subtotal',
          cell: (info) => this.formatCurrency(info.getValue()),
          footer: () => this.formatCurrency(this.financeTotals.subtotal),
          enableSorting: true,
          meta: { align: 'right' },
          size: 140,
        }),
        financeHelper.accessor('tax', {
          header: 'IGV',
          cell: (info) => this.formatCurrency(info.getValue()),
          footer: () => this.formatCurrency(this.financeTotals.tax),
          enableSorting: true,
          meta: { align: 'right' },
          size: 120,
        }),
        financeHelper.accessor('total', {
          header: 'Total',
          cell: (info) => this.formatCurrency(info.getValue()),
          footer: () => this.formatCurrency(this.financeTotals.total),
          enableSorting: true,
          meta: { align: 'right' },
          size: 140,
        }),
      ],
    }),
    financeHelper.group({
      id: 'payments',
      header: 'Cobranza',
      columns: [
        financeHelper.accessor('paid', {
          header: 'Pagado',
          cell: (info) => this.formatCurrency(info.getValue()),
          footer: () => this.formatCurrency(this.financeTotals.paid),
          enableSorting: true,
          meta: { align: 'right' },
          size: 140,
        }),
        financeHelper.accessor('balance', {
          header: 'Saldo',
          cell: (info) => this.formatCurrency(info.getValue()),
          footer: () => this.formatCurrency(this.financeTotals.balance),
          enableSorting: true,
          meta: { align: 'right', pinned: 'right' },
          size: 140,
        }),
      ],
    }),
  ];

  readonly taskColumns: GridColumnDef<TaskRow>[] = [
    taskHelper.accessor('task', {
      id: 'task',
      header: 'Tarea',
      size: 260,
      minSize: 220,
      enableResizing: true,
      enableSorting: true,
      meta: { pinned: 'left' },
    }),
    taskHelper.accessor('owner', {
      header: 'Responsable',
      size: 150,
      enableResizing: true,
      enableSorting: true,
    }),
    taskHelper.accessor('sprint', {
      header: 'Sprint',
      size: 130,
      enableResizing: true,
      enableSorting: true,
    }),
    taskHelper.accessor('priority', {
      header: 'Prioridad',
      size: 140,
      enableResizing: true,
      enableSorting: true,
    }),
    taskHelper.accessor('done', {
      header: 'Completa',
      cell: (info) =>
        flexRenderComponent(GridCheckboxCellComponent, {
          inputs: {
            context: info,
          },
        }),
      size: 120,
      enableResizing: true,
      meta: { align: 'center' },
    }),
    taskHelper.accessor('alerts', {
      header: 'Alertas',
      cell: (info) => `${info.getValue()} pendientes`,
      size: 150,
      enableResizing: true,
      enableSorting: true,
      meta: { align: 'right', pinned: 'right' },
    }),
  ];

  htmlEjemplo1 = `<app-grid
  [data]="employeeRows"
  [columns]="employeeColumns"
  ariaLabel="Listado del equipo"
  [pageSize]="5"
  [pageSizeOptions]="[5, 10, 20]"
  [stickyHeader]="true"
  [showPagination]="true"
  [resizableColumns]="true"
></app-grid>`;

  tsEjemplo1 = `interface EmployeeRow {
  id: number;
  responsible: string;
  role: string;
  team: string;
  region: string;
  status: 'Activo' | 'En revision' | 'Bloqueado';
}

const employeeHelper = createColumnHelper<EmployeeRow>();

readonly employeeColumns: GridColumnDef<EmployeeRow>[] = [
  employeeHelper.accessor('responsible', {
    id: 'responsible',
    header: 'Responsable',
    size: 220,
    enableResizing: true,
    enableSorting: true,
  }),
  employeeHelper.accessor('role', {
    header: 'Rol',
    size: 200,
    enableResizing: true,
    enableSorting: true,
  }),
  employeeHelper.accessor('team', {
    header: 'Equipo',
    enableSorting: true,
  }),
  employeeHelper.accessor('region', {
    header: 'Region',
    enableSorting: true,
  }),
  employeeHelper.accessor('status', {
    header: 'Estado',
    enableSorting: true,
  }),
];`;

  htmlEjemplo2 = `<app-grid
  [data]="financeRows"
  [columns]="financeColumns"
  ariaLabel="Resumen financiero"
  [showPagination]="false"
  [stickyHeader]="true"
></app-grid>`;

  tsEjemplo2 = `const financeHelper = createColumnHelper<FinanceRow>();

readonly financeColumns: GridColumnDef<FinanceRow>[] = [
  financeHelper.accessor('customer', {
    id: 'customer',
    header: 'Cliente',
    footer: () => 'Totales',
    enableSorting: true,
    meta: { pinned: 'left' },
  }),
  financeHelper.group({
    id: 'billing',
    header: 'Facturacion',
    columns: [
      financeHelper.accessor('subtotal', {
        header: 'Subtotal',
        footer: () => this.formatCurrency(this.financeTotals.subtotal),
        enableSorting: true,
        meta: { align: 'right' },
      }),
      financeHelper.accessor('tax', {
        header: 'IGV',
        footer: () => this.formatCurrency(this.financeTotals.tax),
        enableSorting: true,
        meta: { align: 'right' },
      }),
      financeHelper.accessor('total', {
        header: 'Total',
        footer: () => this.formatCurrency(this.financeTotals.total),
        enableSorting: true,
        meta: { align: 'right' },
      }),
    ],
  }),
  financeHelper.group({
    id: 'payments',
    header: 'Cobranza',
    columns: [
      financeHelper.accessor('paid', {
        header: 'Pagado',
        footer: () => this.formatCurrency(this.financeTotals.paid),
        enableSorting: true,
        meta: { align: 'right' },
      }),
      financeHelper.accessor('balance', {
        header: 'Saldo',
        footer: () => this.formatCurrency(this.financeTotals.balance),
        enableSorting: true,
        meta: { align: 'right', pinned: 'right' },
      }),
    ],
  }),
];`;

  htmlEjemplo3 = `<app-grid
  [data]="taskRows"
  [columns]="taskColumns"
  ariaLabel="Backlog del sprint"
  [pageSize]="5"
  [pageSizeOptions]="[5, 10]"
  [stickyHeader]="true"
  [showPagination]="true"
  [resizableColumns]="true"
></app-grid>`;

  tsEjemplo3 = `import { createColumnHelper } from '@tanstack/angular-table';
import { GridCheckboxCellComponent } from './grid-checkbox-cell.component';

const taskHelper = createColumnHelper<TaskRow>();

readonly taskColumns: GridColumnDef<TaskRow>[] = [
  taskHelper.accessor('task', {
    id: 'task',
    header: 'Tarea',
    size: 260,
    minSize: 220,
    enableResizing: true,
    enableSorting: true,
    meta: { pinned: 'left' },
  }),
  taskHelper.accessor('owner', {
    header: 'Responsable',
    enableResizing: true,
    enableSorting: true,
  }),
  taskHelper.accessor('sprint', {
    header: 'Sprint',
    enableResizing: true,
    enableSorting: true,
  }),
  taskHelper.accessor('priority', {
    header: 'Prioridad',
    enableResizing: true,
    enableSorting: true,
  }),
  taskHelper.accessor('done', {
    header: 'Completa',
    cell: (info) =>
      flexRenderComponent(GridCheckboxCellComponent, {
        inputs: {
          context: info,
        },
      }),
    meta: { align: 'center' },
    enableResizing: true,
  }),
  taskHelper.accessor('alerts', {
    header: 'Alertas',
    cell: (info) => \`\${info.getValue()} pendientes\`,
    meta: { align: 'right', pinned: 'right' },
    enableResizing: true,
    enableSorting: true,
  }),
];`;

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  }
}
