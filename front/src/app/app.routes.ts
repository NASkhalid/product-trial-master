import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { LoginComponent } from "./shared/features/login/login.component";
import { RegisterComponent } from "./shared/features/register/register.component";
import { ContactComponent } from "./shared/features/contact/contact.component";
import { CartComponent } from "./shared/features/cart/cart.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
