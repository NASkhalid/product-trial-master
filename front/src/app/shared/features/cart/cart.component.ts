import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputNumberModule,
    FormsModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Mon Panier</h1>
      
      <div *ngIf="cartItems().length === 0" class="text-center py-8">
        <p class="text-xl text-gray-500">Votre panier est vide</p>
        <p-button label="Continuer les achats" routerLink="/products" class="mt-4" />
      </div>
      
      <div *ngIf="cartItems().length > 0">
        <div class="grid">
          <div class="col-12 lg:col-8">
            <p-card *ngFor="let item of cartItems()" class="mb-3">
              <div class="flex align-items-center justify-content-between">
                <div class="flex align-items-center">
                  <img [src]="'assets/' + item.product?.image" 
                       [alt]="item.product?.name" 
                       class="w-4rem h-4rem object-cover mr-3" />
                  <div>
                    <h3 class="m-0 mb-1">{{ item.product?.name }}</h3>
                    <p class="text-500 m-0">{{ item.product?.category }}</p>
                    <p class="text-primary font-bold m-0">{{ item.product?.price }}€</p>
                  </div>
                </div>
                
                <div class="flex align-items-center gap-3">
                  <p-inputNumber 
                    [(ngModel)]="item.quantity" 
                    [min]="1" 
                    [max]="item.product?.quantity"
                    (onInput)="updateQuantity(item.id!, item.quantity)"
                    [showButtons]="true" 
                    buttonLayout="horizontal" 
                    inputId="horizontal" 
                    spinnerMode="horizontal" 
                    [step]="1">
                  </p-inputNumber>
                  
                  <p-button 
                    icon="pi pi-trash" 
                    severity="danger" 
                    (onClick)="removeItem(item.id!)"
                    [text]="true" />
                </div>
              </div>
            </p-card>
          </div>
          
          <div class="col-12 lg:col-4">
            <p-card header="Résumé de la commande">
              <div class="flex justify-content-between mb-3">
                <span>Sous-total:</span>
                <span class="font-bold">{{ getSubtotal() }}€</span>
              </div>
              <div class="flex justify-content-between mb-3">
                <span>Livraison:</span>
                <span>Gratuite</span>
              </div>
              <hr>
              <div class="flex justify-content-between mb-4">
                <span class="font-bold">Total:</span>
                <span class="font-bold text-primary">{{ getSubtotal() }}€</span>
              </div>
              
              <p-button label="Passer commande" class="w-full mb-2" />
              <p-button label="Vider le panier" severity="secondary" 
                       (onClick)="clearCart()" class="w-full" />
            </p-card>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }
  `]
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);
  
  public readonly cartItems = this.cartService.cartItems;
  
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe();
  }
  
  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateCartItem(itemId, quantity).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Quantité mise à jour'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la mise à jour'
        });
      }
    });
  }
  
  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Produit retiré du panier'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la suppression'
        });
      }
    });
  }
  
  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Panier vidé'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du vidage du panier'
        });
      }
    });
  }
  
  getSubtotal(): number {
    return this.cartItems().reduce((total, item) => 
      total + (item.product?.price || 0) * item.quantity, 0
    );
  }
}