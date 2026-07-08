import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/productService';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  private productService = inject(ProductService);
  product = input.required<Product>();
  favouriteClicked = output<string>();
  addToCartClicked = output<string>();
  router = inject(Router);

  navigateToProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  isFavourite(productId: string) {
    return this.productService.isFavourite(productId);
  }
}
