import { computed, inject, Service, signal } from '@angular/core';
import { PRODUCTS } from '../features/products/mock-products';

@Service()
export class ProductService {
    products = signal(PRODUCTS);

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
