import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import {
  Bell,
  CalendarDays,
  ChartColumn,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Cog,
  CreditCard,
  FileText,
  FolderKanban,
  Grid2x2,
  LucideIconData,
  LucideAngularModule,
  Mail,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Users,
} from 'lucide-angular';

interface ThemeIconItem {
  name: string;
  icon: LucideIconData;
  usage: string;
}

@Component({
  selector: 'app-theme-icons-page',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HeaderPageComponent],
  templateUrl: './theme-icons-page.component.html',
})
export class ThemeIconsPageComponent {
  readonly iconGroups: ThemeIconItem[] = [
    { name: 'Users', icon: Users, usage: 'Usuarios, equipos, responsables.' },
    { name: 'Bell', icon: Bell, usage: 'Notificaciones y alertas.' },
    { name: 'Search', icon: Search, usage: 'Busquedas y filtros rapidos.' },
    { name: 'CalendarDays', icon: CalendarDays, usage: 'Fechas, agenda, cronogramas.' },
    { name: 'CheckCircle2', icon: CheckCircle2, usage: 'Exitos, validaciones y tareas completas.' },
    { name: 'CircleAlert', icon: CircleAlert, usage: 'Advertencias o estados que requieren atencion.' },
    { name: 'ChartColumn', icon: ChartColumn, usage: 'Reportes, metricas y dashboards.' },
    { name: 'ClipboardList', icon: ClipboardList, usage: 'Listados, seguimiento y auditorias.' },
    { name: 'FileText', icon: FileText, usage: 'Documentos, reportes y constancias.' },
    { name: 'FolderKanban', icon: FolderKanban, usage: 'Proyectos, backlog o modulos.' },
    { name: 'CreditCard', icon: CreditCard, usage: 'Pagos, facturacion y cobranzas.' },
    { name: 'ShoppingCart', icon: ShoppingCart, usage: 'Compras, pedidos y ventas.' },
    { name: 'ShieldCheck', icon: ShieldCheck, usage: 'Seguridad, permisos y compliance.' },
    { name: 'Mail', icon: Mail, usage: 'Mensajes, correos y bandejas.' },
    { name: 'Cog', icon: Cog, usage: 'Ajustes generales del sistema.' },
    { name: 'Settings2', icon: Settings2, usage: 'Configuraciones avanzadas o parametria.' },
    { name: 'Grid2x2', icon: Grid2x2, usage: 'Apps, modulos o accesos rapidos.' },
  ];

  readonly htmlUsageSnippet = `<lucide-icon [img]="UsersIcon" [size]="18"></lucide-icon>`;

  readonly tsUsageSnippet = `import { LucideAngularModule, Users } from 'lucide-angular';

readonly UsersIcon = Users;`;
}
