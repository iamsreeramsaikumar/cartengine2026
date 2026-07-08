import { computed, inject, Service, signal } from '@angular/core';
import { PRODUCTS } from '../features/products/mock-products';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Service()
export class ProductService {
    private http = inject(HttpClient);
    products = signal<Product[]>([]);
    wishlistItems = signal<Product[]>([]);
    product = signal<Product | null>(null);
    isLoading = signal(false);

    loadProducts() {
        this.isLoading.set(true);
        this.http.get<Product[]>('http://localhost:3000/products').subscribe(products => {
            this.products.set(products);
            this.isLoading.set(false);
        })
    }

    loadWishlist() {
        this.isLoading.set(true);
        this.http.get<Product[]>('http://localhost:3000/wishlist').subscribe(products => {
            this.wishlistItems.set(products);
            this.isLoading.set(false);
        })
    }

    ensureWishlistLoaded() {
        if (this.wishlistItems().length === 0) {
            this.loadWishlist();
        }
    }

    getProductById(id: string) {
        this.isLoading.set(true);
        this.http.get<Product>(`http://localhost:3000/products/${id}`).subscribe(prod => {
            this.product.set(prod);
            this.isLoading.set(false);
        })
    }

    favouriteCount = computed(() => {
        return this.wishlistItems().length;
    });

    toggleWishlist(id: string) {

        this.http.post('http://localhost:3000/wishlist', { productId: id }).subscribe({
            next: () => {
                this.loadWishlist();
            },
            error: (err) => {
                console.error('Error toggling favourite:', err);
            }
        });
    }

    removeWishlist(id: string) {
        this.http.delete(`http://localhost:3000/wishlist/${id}`).subscribe({
            next: () => {
                this.loadWishlist();
            },
            error: (err) => {
                console.error('Error removing from favourites:', err);
            }
        });
    }

    isFavourite(productId: string) {
        return this.wishlistItems().some(item => item.id === productId);
    }
}
