import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
  product?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/cart';
  
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _cartCount = signal<number>(0);
  
  public readonly cartItems = this._cartItems.asReadonly();
  public readonly cartCount = this._cartCount.asReadonly();
  
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl).pipe(
      tap(items => {
        this._cartItems.set(items);
        this._cartCount.set(items.reduce((sum, item) => sum + item.quantity, 0));
      })
    );
  }
  
  addToCart(productId: number, quantity: number = 1): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, { productId, quantity }).pipe(
      tap(() => this.getCartItems().subscribe())
    );
  }
  
  updateCartItem(itemId: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${itemId}`, { quantity }).pipe(
      tap(() => this.getCartItems().subscribe())
    );
  }
  
  removeFromCart(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`).pipe(
      tap(() => this.getCartItems().subscribe())
    );
  }
  
  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl).pipe(
      tap(() => {
        this._cartItems.set([]);
        this._cartCount.set(0);
      })
    );
  }
}