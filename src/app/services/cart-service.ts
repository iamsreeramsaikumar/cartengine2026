import { computed, inject, Service, signal } from '@angular/core';
import { CartItem } from '../models/product.model';
import { PRODUCTS } from '../features/products/mock-products';
import { ProductService } from './productService';

@Service()
export class CartService {

    cartItems = signal<CartItem[]>([]);
    private productService = inject(ProductService);

    cartCount = computed(() =>
        this.cartItems()
            .reduce((total, item) => total + item.quantity, 0)
    );

    cartTotal = computed(() =>
        this.cartItems()
            .reduce(
                (total, item) =>
                    total + item.product.price * item.quantity,
                0
            )
    );

    addToCart(productId: string) {

        const product = this.productService.products().find(item => item.id === productId);
        if (!product) return;

        this.cartItems.update(items => {

            const existingItem = items.find(items => items.product.id === productId);

            if (existingItem) {
                return items.map(item =>
                    item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                )
            }

            return [...items, { product, quantity: 1 }]
        }
        );
    }

    increaseQuantity(productId: string) {
        this.cartItems.update(items =>
            items.map(item =>
                item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    decreaseQuantity(productId: string) {
        this.cartItems.update(items => {
            const updatedItems = items.map(item =>
                item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );

            return updatedItems.filter(item =>
                item.quantity > 0
            )
        })
    }

    removeFromCart(productId: string) {
        this.cartItems.update(items =>
            items.filter(item => item.product.id !== productId)
        );
    }
}
