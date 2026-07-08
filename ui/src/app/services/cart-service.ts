import { computed, inject, Service, signal } from '@angular/core';
import { CartItem } from '../models/product.model';
import { PRODUCTS } from '../features/products/mock-products';
import { ProductService } from './productService';
import { HttpClient } from '@angular/common/http';

@Service()
export class CartService {

    private http = inject(HttpClient);
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

    getCart() {
        return this.http.get('http://localhost:3000/cart');
    }


    loadCart() {
        this.getCart().subscribe((res: any) => {
            this.cartItems.set(res);
        });
    }

    addToCart(productId: string) {
        this.http.post('http://localhost:3000/cart', { productId: productId }).subscribe({
            next: () => {
                this.loadCart();
            }
        });
    }

    increaseQuantity(productId: string, quantity: number) {
        this.http.patch('http://localhost:3000/cart', { productId: productId, quantity: quantity }).subscribe({
            next: () => {
                this.loadCart();
            }
        })
    }

    decreaseQuantity(productId: string, quantity: number) {
        this.http.patch('http://localhost:3000/cart', { productId: productId, quantity: quantity }).subscribe({
            next: () => {
                this.loadCart();
            }
        })
    }

    removeFromCart(productId: string) {
        this.http.delete(`http://localhost:3000/cart/${productId}`).subscribe({
            next: () => {
                this.loadCart();
            }
        })
    }
}
