import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { InputComponent } from '@shared/components/form/input/input.component';
import { PasswordInputComponent } from '@shared/components/form/password-input/password-input.component';
import { LucideAngularModule, User, Lock, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent,
    AlertComponent,
    InputComponent,
    PasswordInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly UserIcon = User;
  readonly LockIcon = Lock;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;

  errorMessage = signal('');
  isLoading = signal(false);

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder,
  ) {
    this.form = this.fb.group({
      username: ['admin', Validators.required],
      password: ['javiersoft', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Por favor, completa todos los campos');
      return;
    }

    const { username, password } = this.form.getRawValue();

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simular delay de red
    setTimeout(() => {
      const success = this.authService.login(username, password);

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage.set('Credenciales inválidas');
      }

      this.isLoading.set(false);
    }, 800);
  }
}
