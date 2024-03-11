import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemComponent } from '../products-item/products-item.component';
import { product } from '../models/products';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'e-commerce-featured-products',
  standalone: true,
  imports: [CommonModule, ProductsItemComponent,HttpClientModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts= [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
    console.log(this.featuredProducts)
  }

  private _getFeaturedProducts() {
    this.productService.getFeaturedProduct(4).subscribe((response: any) => {
      console.log(response)
      this.featuredProducts = response.result;
      console.log(this.featuredProducts)
    });
  }
}
