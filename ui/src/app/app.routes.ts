import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/login/login';
import { SignupPage } from './features/auth/signup/signup';
import { ProductDashboard } from './features/products/product-dashboard/product-dashboard';
import { ProductDetails } from './features/products/product-details/product-details';
import { CartItems } from './features/cart/cart-items/cart-items';
import { FavouriteItems } from './features/favourites/favourite-items/favourite-items';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'signup', component: SignupPage },
    { path: 'dashboard', component: ProductDashboard },
    { path: 'products/:id', component: ProductDetails },
    { path: 'cart', component: CartItems },
    { path: 'favourites', component: FavouriteItems },
];