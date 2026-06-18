import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/productService';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourite-items',
  imports: [RouterLink],
  templateUrl: './favourite-items.html',
  styleUrl: './favourite-items.scss',
})
export class FavouriteItems {
  private productService = inject(ProductService);

  favouriteProducts = this.productService.favouriteProducts;

  removeFromFavourites(id: string) {
    this.productService.removeFromFavourites(id);
  }
}
