import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap, map } from "rxjs";

export interface ProductsResponse {
    content: Product[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "http://localhost:8080/api/products";
    
    private readonly _products = signal<Product[]>([]);
    private readonly _totalElements = signal<number>(0);

    public readonly products = this._products.asReadonly();
    public readonly totalElements = this._totalElements.asReadonly();

    public get(page: number = 0, size: number = 10, category?: string, name?: string): Observable<ProductsResponse> {
        let params: any = { page, size };
        if (category) params.category = category;
        if (name) params.name = name;
        
        return this.http.get<ProductsResponse>(this.path, { params }).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json").pipe(
                    map(products => ({
                        content: products,
                        totalElements: products.length,
                        totalPages: 1,
                        size: products.length,
                        number: 0
                    }))
                );
            }),
            tap((response) => {
                this._products.set(response.content);
                this._totalElements.set(response.totalElements);
            }),
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<Product>(this.path, product).pipe(
            map(() => true),
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<Product>(`${this.path}/${product.id}`, product).pipe(
            map(() => true),
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<void>(`${this.path}/${productId}`).pipe(
            map(() => true),
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}