import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { product } from '../models/products';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CartService } from '@e-commerce/orders';
import { CartItem } from 'libs/orders/src/lib/models/cart';

@Component({
  selector: 'e-commerce-products-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './products-item.component.html',
  styleUrl: './products-item.component.css',
})
export class ProductsItemComponent {
  @Input() product: product | any;

  constructor(private cartService: CartService) {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: 1,
    };

    this.cartService.setCartItem(cartItem);
  }
}
