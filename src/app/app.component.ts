import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemePreviewService } from '@core/services/theme-preview.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly themePreviewService = inject(ThemePreviewService);

  title = 'tauro-template';

  constructor() {
    this.themePreviewService.initialize();
  }
}