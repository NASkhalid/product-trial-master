import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService, ProductsResponse } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { CartService } from "app/shared/services/cart.service";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule, 
    CardModule, 
    ButtonModule, 
    DialogModule, 
    ProductFormComponent,
    PaginatorModule,
    DropdownModule,
    InputTextModule,
    FormsModule
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);

  public readonly products = this.productsService.products;
  public readonly totalElements = this.productsService.totalElements;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  
  // Pagination and filters
  public currentPage = 0;
  public pageSize = 6;
  public selectedCategory: string | null = null;
  public searchName = '';
  
  public readonly categories = [
    { label: 'Toutes les catégories', value: null },
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Electronics', value: 'Electronics' }
  ];

  ngOnInit() {
    this.loadProducts();
  }
  
  loadProducts(): void {
    this.productsService.get(
      this.currentPage, 
      this.pageSize, 
      this.selectedCategory || undefined,
      this.searchName || undefined
    ).subscribe();
  }
  
  onPageChange(event: any): void {
    this.currentPage = event.page;
    this.loadProducts();
  }
  
  onCategoryChange(): void {
    this.currentPage = 0;
    this.loadProducts();
  }
  
  onSearchChange(): void {
    this.currentPage = 0;
    this.loadProducts();
  }
  
  addToCart(product: Product): void {
    this.cartService.addToCart(product.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${product.name} ajouté au panier`
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de l\'ajout au panier'
        });
      }
    });
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      this.loadProducts();
    });
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe(() => {
        this.loadProducts();
      });
    } else {
      this.productsService.update(product).subscribe(() => {
        this.loadProducts();
      });
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
