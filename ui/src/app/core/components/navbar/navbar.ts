import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { Router, RouterLink } from "@angular/router";
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);
  totalFavourites = this.productService.favouriteCount;
  cartCount = this.cartService.cartCount;

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}
