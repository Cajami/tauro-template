import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { InputComponent } from '@shared/components/form/input/input.component';
import { PasswordInputComponent } from '@shared/components/form/password-input/password-input.component';
import { TextareaComponent } from '@shared/components/form/textarea/textarea.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import {
  LucideAngularModule,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  KeySquare,
} from 'lucide-angular';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent,
    TextareaComponent,
    HeaderPageComponent,
    CheckboxComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  readonly LockIcon = Lock;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;
  readonly KeyRoundIcon = KeyRound;
  readonly KeySquareIcon = KeySquare;

  activeTab = signal('profile');

  tabs = signal([
    { id: 'profile', label: 'Perfil' },
    { id: 'security', label: 'Seguridad' },
    { id: 'notifications', label: 'Notificaciones' },
  ]);

  notificationSettings = signal([
    {
      id: 'email',
      title: 'Notificaciones por Email',
      description: 'Recibe actualizaciones importantes por correo electrónico',
      enabled: true,
    },
    {
      id: 'push',
      title: 'Notificaciones Push',
      description: 'Recibe notificaciones en tiempo real en tu navegador',
      enabled: true,
    },
    {
      id: 'sms',
      title: 'Notificaciones SMS',
      description: 'Recibe alertas críticas por mensaje de texto',
      enabled: false,
    },
    {
      id: 'weekly',
      title: 'Resumen Semanal',
      description: 'Recibe un resumen semanal de actividades',
      enabled: true,
    },
  ]);

  perfilForm: FormGroup;
  securityForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.perfilForm = this.fb.group({
      name: ['Admin User', Validators.required],
      email: ['admin@example.com', Validators.required],
      phone: ['+51 999 999 999', Validators.required],
      position: ['Administrador', Validators.required],
      bio: [
        'Desarrollador full-stack con experiencia en Angular y Tailwind CSS.',
        Validators.required,
      ],
    });

    this.securityForm = this.fb.group({
      passwordCurrent: ['', Validators.required],
      passwordNew: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  saveProfile(): void {
    // Aquí implementarías la llamada al backend
    alert('Perfil actualizado correctamente');
  }

  toggleNotification(id: string): void {
    const settings = this.notificationSettings();
    const index = settings.findIndex((n) => n.id === id);
    if (index !== -1) {
      settings[index].enabled = !settings[index].enabled;
      this.notificationSettings.set([...settings]);
    }
  }
}
