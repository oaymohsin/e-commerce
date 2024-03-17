import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'e-commerce-products-search',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoCompleteModule, ReactiveFormsModule],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.css',
})
export class ProductsSearchComponent implements OnInit {
  searchForm: FormGroup | any;
  filteredProducts: any = [];
  productList = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getProducts();
  }

  private _initForm() {
    this.searchForm = this.formBuilder.group({
      searchProduct: [''],
    });
  }
  private _getProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      this.productList = response.result;
      console.log(this.productList);
    });
  }

  filterProduct(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.productList as any[]).length; i++) {
      let country = (this.productList as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredProducts = filtered;
  }

  onProductSelect(event: any) {
    console.log(event.value._id);
    const selectedProduct = event.value._id;
    this.router.navigateByUrl(
      `/products/${selectedProduct}`
    );
  }
}
