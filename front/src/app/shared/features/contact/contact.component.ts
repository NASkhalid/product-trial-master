import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CardModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <p-card header="Contact" class="max-w-2xl mx-auto">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="email">Email *</label>
            <input pInputText id="email" formControlName="email" class="w-full" 
                   placeholder="votre@email.com" />
            <small class="p-error" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
              Email requis et valide
            </small>
          </div>
          
          <div class="field">
            <label for="message">Message *</label>
            <textarea pInputTextarea id="message" formControlName="message" 
                     class="w-full" rows="6" 
                     placeholder="Votre message (maximum 300 caractères)"></textarea>
            <div class="flex justify-content-between">
              <small class="p-error" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                Message requis (maximum 300 caractères)
              </small>
              <small class="text-500">
                {{ contactForm.get('message')?.value?.length || 0 }}/300
              </small>
            </div>
          </div>
          
          <div class="flex justify-content-end">
            <p-button type="submit" label="Envoyer" 
                     [disabled]="!contactForm.valid || loading" 
                     [loading]="loading" />
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    .field {
      margin-bottom: 1.5rem;
    }
    
    .field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .container {
      max-width: 1200px;
    }
  `]
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  
  contactForm: FormGroup;
  loading = false;
  
  constructor() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }
  
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Demande de contact envoyée avec succès'
        });
        
        this.contactForm.reset();
        this.loading = false;
      }, 1000);
    }
  }
}