import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-product-dashboard',
  imports: [ProductCard],
  templateUrl: './product-dashboard.html',
  styleUrl: './product-dashboard.scss',
})
export class ProductDashboard {

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  isLoading = this.productService.isLoading;
  products = this.productService.products;
  selectedCategory = signal<string | null>(null); //filterchips
  searchTerm = signal('');

  ngOnInit() {
    this.productService.loadProducts();
  }

  onInput(evt: any) {
    const value = evt?.target.value;
    this.searchTerm.set(value);
  }

  categories = computed(() =>
    [...new Set(this.products().map(p => p.category))]
  );

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const input = this.searchTerm().toLowerCase().trim();

    return this.products().filter(p => {
      const categoryMatch = !category || p.category === category;
      const inputMatch = !input || p.name.includes(input);

      return categoryMatch && inputMatch
    })
  });

  toggleCategory(category: string) {
    this.selectedCategory.update(current =>
      current === category ? null : category
    );
  }

  toggleFavourite(id: string) {
    this.productService.toggleFavourite(id);
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId);
  }


}
