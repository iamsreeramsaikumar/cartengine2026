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

  ngOnInit() {
    this.cartService.loadCart();
  }


  increaseQuantity(productId: string, quantity: number) {
    this.cartService.increaseQuantity(productId, quantity + 1);
  }

  decreaseQuantity(productId: string, quantity: number) {
    this.cartService.decreaseQuantity(productId, quantity - 1);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
