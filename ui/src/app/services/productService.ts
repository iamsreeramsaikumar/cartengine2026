import { computed, inject, Service, signal } from '@angular/core';
import { PRODUCTS } from '../features/products/mock-products';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Service()
export class ProductService {
    private http = inject(HttpClient);
    products = signal<Product[]>([]);
    product = signal<Product | null>(null);
    isLoading = signal(false);

    loadProducts() {
        this.isLoading.set(true);
        this.http.get<Product[]>('http://localhost:3000/products').subscribe(products => {
            this.products.set(products);
            this.isLoading.set(false);
        })
    }

    getProductById(id: string) {
        this.isLoading.set(true);
        this.http.get<Product>(`http://localhost:3000/products/${id}`).subscribe(prod => {
            this.product.set(prod);
            this.isLoading.set(false);
        })
    }

    favouriteCount = computed(() => {
        return this.products().reduce((total, product) => total + (product.isFavourite ? 1 : 0), 0);
    });

    toggleFavourite(id: string) {
        this.products.update((products) =>
            products.map(product =>
                product.id === id ? { ...product, isFavourite: !product.isFavourite } : product
            )
        );
    }

    favouriteProducts = computed(() =>
        this.products().filter((product) => product.isFavourite)
    );

    removeFromFavourites(id: string) {
        this.products.update((products) =>
            products.map((prod) => prod.id === id ? { ...prod, isFavourite: false } : prod)
        )
    }
}
