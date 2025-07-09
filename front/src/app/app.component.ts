import {
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { AuthService } from "./shared/services/auth.service";
import { CartService } from "./shared/services/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, ButtonModule, PanelMenuComponent],
})
export class AppComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  
  title = "ALTEN SHOP";
  
  public readonly isAuthenticated = this.authService.isAuthenticated;
  public readonly cartCount = this.cartService.cartCount;
  
  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.cartService.getCartItems().subscribe();
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
