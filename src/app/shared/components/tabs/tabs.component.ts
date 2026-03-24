import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ElementRef,
  contentChildren,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { TabContentDirective } from './tab-content.directive';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIconData;
  badge?: string | number;
  disabled?: boolean;
}

export type TabsVariant = 'underline' | 'pills' | 'segmented';

let nextTabsId = 0;

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tabs.component.html',
  host: {
    class: 'block w-full min-w-0',
  },
})
export class TabsComponent implements AfterContentInit {
  readonly tabs = input<TabItem[]>([]);
  readonly variant = input<TabsVariant>('underline');
  readonly ariaLabel = input('Secciones');
  readonly stretch = input(false);
  readonly activeTab = model<string | null>(null);

  readonly tabTemplates = contentChildren(TabContentDirective);
  readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  private readonly tabsId = ++nextTabsId;

  ngAfterContentInit(): void {
    this.ensureActiveTab();
  }

  protected selectTab(tabId: string): void {
    const tab = this.tabs().find((item) => item.id === tabId);
    if (!tab || tab.disabled) {
      return;
    }

    this.activeTab.set(tabId);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const enabledTabs = this.tabs()
      .map((tab, tabIndex) => ({ tab, tabIndex }))
      .filter((item) => !item.tab.disabled);

    if (!enabledTabs.length) {
      return;
    }

    const currentEnabledIndex = enabledTabs.findIndex((item) => item.tabIndex === index);
    if (currentEnabledIndex === -1) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = enabledTabs[(currentEnabledIndex + 1) % enabledTabs.length];
      this.focusAndSelectTab(next.tabIndex);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next =
        enabledTabs[(currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length];
      this.focusAndSelectTab(next.tabIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusAndSelectTab(enabledTabs[0].tabIndex);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusAndSelectTab(enabledTabs[enabledTabs.length - 1].tabIndex);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const currentTab = this.tabs()[index];
      if (currentTab) {
        this.selectTab(currentTab.id);
      }
    }
  }

  protected isActive(tabId: string): boolean {
    return this.activeTab() === tabId;
  }

  protected getActiveTemplate() {
    return this.tabTemplates().find((item) => item.tabContent() === this.activeTab())?.template ?? null;
  }

  protected getTabListClasses(): string {
    const shared = this.stretch()
      ? 'grid auto-cols-fr grid-flow-col'
      : 'flex flex-nowrap items-center overflow-x-auto overflow-y-hidden';

    if (this.variant() === 'underline') {
      return `${shared} gap-2 border-b border-gray-200`;
    }

    if (this.variant() === 'pills') {
      return `${shared} gap-2`;
    }

    return `${shared} gap-1 rounded-2xl border border-gray-200 bg-gray-100 p-1`;
  }

  protected getTabButtonClasses(tab: TabItem): string {
    const isActive = this.isActive(tab.id);
    const disabled = !!tab.disabled;

    const base = [
      'inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
      this.stretch() ? 'w-full' : '',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ]
      .filter(Boolean)
      .join(' ');

    if (this.variant() === 'underline') {
      return [
        base,
        'rounded-b-none border-b-2 -mb-px',
        isActive
          ? 'border-primary-500 text-primary-700'
          : 'border-transparent text-gray-500 hover:text-primary-700',
      ].join(' ');
    }

    if (this.variant() === 'pills') {
      return [
        base,
        isActive
          ? 'border border-primary-200 bg-primary-50 text-primary-700'
          : 'border border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      ].join(' ');
    }

    return [
      base,
      isActive
        ? 'border border-primary-200 bg-white text-primary-700 shadow-sm'
        : 'border border-transparent text-gray-600 hover:text-gray-900',
    ].join(' ');
  }

  protected getTriggerId(tabId: string): string {
    return `tabs-${this.tabsId}-trigger-${tabId}`;
  }

  protected getPanelId(tabId: string): string {
    return `tabs-${this.tabsId}-panel-${tabId}`;
  }

  private focusAndSelectTab(index: number): void {
    const tab = this.tabs()[index];
    if (!tab || tab.disabled) {
      return;
    }

    this.selectTab(tab.id);
    queueMicrotask(() => {
      this.tabButtons()[index]?.nativeElement.focus();
    });
  }

  private ensureActiveTab(): void {
    const items = this.tabs();
    if (!items.length) {
      return;
    }

    const current = this.activeTab();
    const hasValidCurrent = current && items.some((item) => item.id === current && !item.disabled);
    if (hasValidCurrent) {
      return;
    }

    const firstEnabled = items.find((item) => !item.disabled);
    this.activeTab.set(firstEnabled?.id ?? null);
  }
}
