import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  toggleSidebar = output<void>();

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
