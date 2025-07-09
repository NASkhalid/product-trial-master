import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule
  ],
  template: `
    <div class="flex justify-content-center align-items-center min-h-screen">
      <p-card header="Inscription" class="w-full max-w-md">
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="username">Nom d'utilisateur</label>
            <input pInputText id="username" formControlName="username" class="w-full" />
          </div>
          
          <div class="field">
            <label for="firstname">Prénom</label>
            <input pInputText id="firstname" formControlName="firstname" class="w-full" />
          </div>
          
          <div class="field">
            <label for="email">Email</label>
            <input pInputText id="email" formControlName="email" class="w-full" />
          </div>
          
          <div class="field">
            <label for="password">Mot de passe</label>
            <p-password id="password" formControlName="password" class="w-full" />
          </div>
          
          <div class="flex justify-content-between align-items-center">
            <p-button type="submit" label="S'inscrire" 
                     [disabled]="!registerForm.valid || loading" 
                     [loading]="loading" />
            <p-button type="button" label="Se connecter" severity="secondary" 
                     (onClick)="goToLogin()" />
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    .field {
      margin-bottom: 1rem;
    }
    
    .field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
  `]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  
  registerForm: FormGroup;
  loading = false;
  
  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Inscription réussie'
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de l\'inscription'
          });
          this.loading = false;
        }
      });
    }
  }
  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}