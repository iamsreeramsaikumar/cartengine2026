import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { CartService } from '../../../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-items',
  imports: [RouterLink],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.scss',
})
export class CartItems {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  cartTotal = this.cartService.cartTotal;

  increaseQuantity(productId: string) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: string) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
