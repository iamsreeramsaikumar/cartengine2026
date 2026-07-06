import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/login/login';
import { SignupPage } from './features/auth/signup/signup';
import { ProductDashboard } from './features/products/product-dashboard/product-dashboard';
import { ProductDetails } from './features/products/product-details/product-details';
import { CartItems } from './features/cart/cart-items/cart-items';
import { FavouriteItems } from './features/favourites/favourite-items/favourite-items';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'signup', component: SignupPage },
    { path: 'dashboard', component: ProductDashboard, canActivate: [authGuard] },
    { path: 'products/:id', component: ProductDetails, canActivate: [authGuard] },
    { path: 'cart', component: CartItems, canActivate: [authGuard] },
    { path: 'favourites', component: FavouriteItems, canActivate: [authGuard] },
];