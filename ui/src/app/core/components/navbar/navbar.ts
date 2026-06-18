import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  totalFavourites = this.productService.favouriteCount;
  cartCount = this.cartService.cartCount;

}
