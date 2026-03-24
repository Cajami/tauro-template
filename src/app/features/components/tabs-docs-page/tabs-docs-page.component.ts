import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiInfoComponent } from '../api-info/api-info.component';
import { ComponentShowcaseComponent } from '@shared/components/component-showcase/component-showcase.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import { TabContentDirective } from '@shared/components/tabs/tab-content.directive';
import { TabItem, TabsComponent } from '@shared/components/tabs/tabs.component';
import { Bell, CircleGauge, Settings2, ShieldCheck, SlidersHorizontal, UserRound } from 'lucide-angular';

@Component({
  selector: 'app-tabs-docs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderPageComponent,
    ComponentShowcaseComponent,
    TabsComponent,
    TabContentDirective,
    ApiInfoComponent,
  ],
  templateUrl: './tabs-docs-page.component.html',
})
export class TabsDocsPageComponent {
  readonly profileTabs: TabItem[] = [
    { id: 'general', label: 'General', icon: UserRound },
    { id: 'security', label: 'Seguridad', icon: ShieldCheck },
    { id: 'notifications', label: 'Notificaciones', icon: Bell, badge: 3 },
  ];

  readonly settingsTabs: TabItem[] = [
    { id: 'filters', label: 'Filtros', icon: SlidersHorizontal },
    { id: 'preferences', label: 'Preferencias', icon: Settings2 },
    { id: 'analytics', label: 'Analitica', icon: CircleGauge, disabled: true },
  ];

  readonly compactTabs: TabItem[] = [
    { id: 'overview', label: 'Resumen' },
    { id: 'history', label: 'Historial' },
    { id: 'members', label: 'Equipo', badge: 12 },
  ];

  activeProfileTab = 'general';
  activeSettingsTab = 'filters';
  activeCompactTab = 'overview';

  htmlEjemplo1 = `<app-tabs
  [tabs]="profileTabs"
  [(activeTab)]="activeProfileTab"
  ariaLabel="Secciones del perfil"
>
  <ng-template tabContent="general">
    <!-- Contenido -->
  </ng-template>

  <ng-template tabContent="security">
    <!-- Contenido -->
  </ng-template>

  <ng-template tabContent="notifications">
    <!-- Contenido -->
  </ng-template>
</app-tabs>

<div class="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
  Tab activa: <strong>{{ activeProfileTab }}</strong>
</div>`;

  tsEjemplo1 = `readonly profileTabs: TabItem[] = [
  { id: 'general', label: 'General', icon: UserRound },
  { id: 'security', label: 'Seguridad', icon: ShieldCheck },
  { id: 'notifications', label: 'Notificaciones', icon: Bell, badge: 3 },
];

activeProfileTab = 'general';`;

  htmlEjemplo2 = `<app-tabs
  [tabs]="settingsTabs"
  [(activeTab)]="activeSettingsTab"
  variant="pills"
  ariaLabel="Configuracion"
>
  <ng-template tabContent="filters">
    <!-- Contenido -->
  </ng-template>

  <ng-template tabContent="preferences">
    <!-- Contenido -->
  </ng-template>

  <ng-template tabContent="analytics">
    <!-- Contenido -->
  </ng-template>
</app-tabs>`;

  tsEjemplo2 = `readonly settingsTabs: TabItem[] = [
  { id: 'filters', label: 'Filtros', icon: SlidersHorizontal },
  { id: 'preferences', label: 'Preferencias', icon: Settings2 },
  { id: 'analytics', label: 'Analitica', icon: CircleGauge, disabled: true },
];

activeSettingsTab = 'filters';`;

  htmlEjemplo3 = `<app-tabs
  [tabs]="compactTabs"
  [(activeTab)]="activeCompactTab"
  variant="segmented"
  [stretch]="true"
  ariaLabel="Resumen del equipo"
>
  <ng-template tabContent="overview">
    <!-- Contenido -->
  </ng-template>

  <ng-template tabContent="history">
    <!-- Contenido -->
  </ng-template>

  <ng-template tabContent="members">
    <!-- Contenido -->
  </ng-template>
</app-tabs>`;

  tsEjemplo3 = `readonly compactTabs: TabItem[] = [
  { id: 'overview', label: 'Resumen' },
  { id: 'history', label: 'Historial' },
  { id: 'members', label: 'Equipo', badge: 12 },
];

activeCompactTab = 'overview';`;
}
