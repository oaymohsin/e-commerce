import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, ProductService } from '@e-commerce/products';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'e-commerce-create-products',
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css',
})
export class CreateProductsComponent implements OnInit {
  editmode = false;
  form: FormGroup | any;
  isSubmitted = false;
  categories = [];
  galleryImages: [] | any = [];
  imageDisplay: string | ArrayBuffer | any;
  currentProductId: string | any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
    console.log(this.productForm);
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response.result;
      // console.log(this.categories);
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  private _addProduct(productData: FormData) {
    this.productService.createProduct(productData).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category not added',
        });
      }
    );
  }

  _updateProduct(productFormData: FormData) {
    this.productService
      .updateProduct(productFormData, this.currentProductId)
      .subscribe(
        (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          setTimeout(() => {
            this.location.back();
          }, 2000);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category not Updated',
          });
        }
      );
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log(params.id);
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productService.getProduct(params.id).subscribe((product: any) => {
          // console.log(product);
          this.productForm.name.setValue(product.result.name);
          this.productForm.category.setValue(product.result.category.id);
          this.productForm.brand.setValue(product.result.brand);
          this.productForm.price.setValue(product.result.price);
          this.productForm.countInStock.setValue(product.result.countInStock);
          this.productForm.isFeatured.setValue(product.result.isFeatured);
          this.productForm.description.setValue(product.result.description);
          this.productForm.richDescription.setValue(
            product.result.richDescription
          );
          this.imageDisplay = product.result.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }
  onCancel() {
    this.location.back();
  }

  onImageUpload(event: any) {
    // console.log(event)
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  onGalleryImagesUpload(galleryevent: any) {
    this.galleryImages.push(...galleryevent.target.files);
    console.log(this.galleryImages);
  }

  uploadGalleryImages() {
    let galleryFormData = new FormData();
    this.galleryImages.forEach((file: any) => {
      galleryFormData.append('images', file);
    });

    this.productService
      .uploadGalleryImages(galleryFormData, this.currentProductId)
      .subscribe((response) => {
        console.log(response);
      });
  }

  get productForm() {
    return this.form.controls;
  }
}
