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
  selector: 'app-login',
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
      <p-card header="Connexion" class="w-full max-w-md">
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="email">Email</label>
            <input pInputText id="email" formControlName="email" class="w-full" />
          </div>
          
          <div class="field">
            <label for="password">Mot de passe</label>
            <p-password id="password" formControlName="password" class="w-full" 
                       [feedback]="false" [toggleMask]="true" />
          </div>
          
          <div class="flex justify-content-between align-items-center">
            <p-button type="submit" label="Se connecter" 
                     [disabled]="!loginForm.valid || loading" 
                     [loading]="loading" />
            <p-button type="button" label="S'inscrire" severity="secondary" 
                     (onClick)="goToRegister()" />
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
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  
  loginForm: FormGroup;
  loading = false;
  
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Connexion réussie'
          });
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Identifiants invalides'
          });
          this.loading = false;
        }
      });
    }
  }
  
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}