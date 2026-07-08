import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../../services/cart-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgClass],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  params = toSignal(this.route.params);

  // product = computed(() => {
  // const productId = this.params()?.['id'];
  // return this.productService.products().find(p => p.id === productId);
  // });

  product = this.productService.product;

  ngOnInit() {
    const productId = this.params()?.['id'];
    this.productService.getProductById(productId);
    this.productService.ensureWishlistLoaded();
    this.cartService.ensureCartItemsLoaded();
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId);
  }

  toggleFavourite(id: string) {
    this.productService.toggleWishlist(id);
  }

  isFavourite(productId: string) {
    return this.productService.isFavourite(productId);
  }
}
