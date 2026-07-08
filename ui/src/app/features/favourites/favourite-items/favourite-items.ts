import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-favourite-items',
  imports: [RouterLink],
  templateUrl: './favourite-items.html',
  styleUrl: './favourite-items.scss',
})
export class FavouriteItems {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  wishlistItems = this.productService.wishlistItems;

  ngOnInit() {
    this.productService.ensureWishlistLoaded();
    this.cartService.ensureCartItemsLoaded();
  }

  removeFromFavourites(id: string) {
    this.productService.removeWishlist(id);
  }
}
