import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../models/products';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from '@e-commerce/ui';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { CartService } from '@e-commerce/orders';

@Component({
  selector: 'e-commerce-products-page',
  standalone: true,
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    GalleryComponent,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  product: product | any;
  quantity = 1;
  productimages = [];
  //   "http://localhost:3500/public/uploads/âPngtreeârice-cooker_5625708.png-1709795274890.png",

  //   "http://localhost:3500/public/uploads/âPngtreeâfashion-transparent-shoes-canvas-shoes_9062863.png-1709795274908.png",

  //   "http://localhost:3500/public/uploads/âPngtreeâclothing-sweater-clothes-clothing-men's_5753099.png-1709795274916.png",

  //   "http://localhost:3500/public/uploads/âPngtreeâcamera-digital-slr-electronics_8231557.png-1709795274918.png"]

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.productId) {
        this._getProduct(params.productId);
      }
    });
  }

  private _getProduct(id: string) {
    this.productService.getProduct(id).subscribe((response: any) => {
      this.product = response.result;
      this.productimages = this.product.images;

      console.log(this.productimages);
    });
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product._id,
      quantity: this.quantity,
    };

    this.cartService.setCartItem(cartItem);
  }
}
