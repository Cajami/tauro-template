import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { CardhomeComponent } from './components/cardhome/cardhome.component';
import { ActivityItemComponent } from './components/activity-item/activity-item.component';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderPageComponent,
    CardhomeComponent,
    ActivityItemComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  stats = signal<StatCard[]>([
    {
      title: 'Total Usuarios',
      value: '2,543',
      change: '+12.5%',
      isPositive: true,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      title: 'Ingresos',
      value: '$45,231',
      change: '+8.2%',
      isPositive: true,
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Tasa de Conversión',
      value: '24.5%',
      change: '-2.1%',
      isPositive: false,
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Pedidos Activos',
      value: '156',
      change: '+5.4%',
      isPositive: true,
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    },
  ]);

  recentActivities = signal([
    {
      title: 'Nuevo usuario registrado',
      description: 'Juan Pérez se ha registrado en la plataforma',
      time: 'Hace 5 minutos',
    },
    {
      title: 'Pedido completado',
      description: 'Pedido #1234 ha sido completado exitosamente',
      time: 'Hace 15 minutos',
    },
    {
      title: 'Actualización del sistema',
      description: 'El sistema se actualizó a la versión 2.1.0',
      time: 'Hace 1 hora',
    },
  ]);
}
