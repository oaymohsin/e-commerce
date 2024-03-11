import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'e-commerce-cart-icon',
  standalone: true,
  imports: [CommonModule, BadgeModule,RouterModule],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css',
})
export class CartIconComponent implements OnInit {
  cartCount: any = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart?.items?.length ?? 0;
    });
    // this.cartCount = this.cartService.getCart().items?.length;
  }
}
