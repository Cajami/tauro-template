import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderPageComponent } from '@shared/components/header-page/header-page.component';
import {
  LucideAngularModule,
  Plus,
  ArrowLeft,
  ArrowRight,
} from 'lucide-angular';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar: string;
}

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    HeaderPageComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  readonly PlusIcon = Plus;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly ArrowRightIcon = ArrowRight;

  users = signal<User[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'Admin',
      status: 'active',
      avatar: '',
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      role: 'Usuario',
      status: 'active',
      avatar: '',
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      role: 'Usuario',
      status: 'inactive',
      avatar: '',
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana@example.com',
      role: 'Admin',
      status: 'active',
      avatar: '',
    },
    {
      id: 5,
      name: 'Pedro Sánchez',
      email: 'pedro@example.com',
      role: 'Invitado',
      status: 'active',
      avatar: '',
    },
  ]);

  filteredUsers = signal<User[]>(this.users());
  searchTerm = signal('');

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm.set(term);

    if (!term) {
      this.filteredUsers.set(this.users());
      return;
    }

    const filtered = this.users().filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    );
    this.filteredUsers.set(filtered);
  }
}
