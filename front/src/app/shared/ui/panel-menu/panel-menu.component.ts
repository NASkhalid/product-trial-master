import {
    Component,
    inject,
  } from "@angular/core";
import { MenuItem } from "primeng/api";
  import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from "../../services/auth.service";
  
  @Component({
    selector: "app-panel-menu",
    standalone: true,
    imports: [PanelMenuModule],
    template: `
        <p-panelMenu [model]="items" styleClass="w-full" />
    `
  })
  export class PanelMenuComponent {
    private readonly authService = inject(AuthService);
    public readonly isAuthenticated = this.authService.isAuthenticated;

    public get items(): MenuItem[] {
      const baseItems = [
        {
            label: 'Accueil',
            icon: 'pi pi-home',
            routerLink: ['/home']
        },
      ];
      
      const authenticatedItems = [
        {
            label: 'Produits',
            icon: 'pi pi-barcode',
            routerLink: ['/products/list']
        },
        {
            label: 'Mon Panier',
            icon: 'pi pi-shopping-cart',
            routerLink: ['/cart']
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            routerLink: ['/contact']
        }
      ];
      
      const unauthenticatedItems = [
        {
            label: 'Connexion',
            icon: 'pi pi-sign-in',
            routerLink: ['/login']
        }
      ];
      
      return [
        ...baseItems,
        ...(this.isAuthenticated() ? authenticatedItems : unauthenticatedItems)
      ];
    }
  }
  