import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '@e-commerce/products';
import { cartItemsDetailed } from '../models/cart';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'e-commerce-cart-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputNumberModule, FormsModule,OrderSummaryComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cartItemsDetailed: cartItemsDetailed[] | any = [];
  cartCount = 0;
  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    console.log('cart page component initialized');
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.subscribe((respCart: any) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart.items.length ?? 0;
      respCart.items.forEach((cartItem: any) => {
        this.productService
          .getProduct(cartItem.productId)
          .subscribe((resproduct: any) => {
            // console.log(resproduct);
            this.cartItemsDetailed.push({
              product: resproduct.result,
              quantity: cartItem.quantity,
            });
            console.log(this.cartItemsDetailed);
          });
      });
    });
  }
  backToShop() {
    this.router.navigate(['/product-list']);
  }

  deleteCartItem(cartItem: any) {
    this.cartService.deleteCartItem(cartItem.product._id);
  }

  updateCartItemQuantity(event: any, cartItem: cartItemsDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product._id,
        quantity: event.value,
      },
      true
    );
  }
}
