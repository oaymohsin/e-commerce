import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductsItemComponent } from '../products-item/products-item.component';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'e-commerce-products-list',
  standalone: true,
  imports: [CommonModule, CheckboxModule,FormsModule,ProductsItemComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  categories: category[] = [];
  isCategoryPage=false;
  products=[]
  constructor(private categoryService:CategoryService ,private productService:ProductService,private route:ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe((params:any)=>{
      params.categoryid ? this._getProducts([params.categoryid]): this._getProducts()
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);

    })

    this._getCategories();

  }

  private _getProducts(categoriesFilter?:string[] |any){

    this.productService.getProducts(categoriesFilter).subscribe((Response:any)=>{
      this.products=Response.result
    })
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response.result;
    });
  }

  categoryFilter(){
    const selectedCategories:any= this.categories.filter((category)=>category.checked).map((category)=>category.id)
    console.log(selectedCategories)

    this._getProducts(selectedCategories)
    // console.log(this.categories)
  }
}
