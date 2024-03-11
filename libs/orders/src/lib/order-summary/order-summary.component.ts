import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { ProductService } from '@e-commerce/products';
@Component({
  selector: 'e-commerce-order-summary',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent implements OnInit {
  totalPrice: number | any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  _getOrderSummary() {
    this.cartService.cart$.subscribe((cart: any) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item: any) => {
          this.productService
            .getProduct(item.productId)
            .subscribe((product: any) => {
              this.totalPrice += product.result.price * item.quantity;
            });
        });
      }
    });
  }

  navigateToCheckout() {}
}
