import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, category } from '@e-commerce/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'e-commerce-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnInit {
  form: FormGroup | any;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string | any;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: [''],
    });
    this._checkEditMode();
    console.log(this.editMode);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _updateCategory(category: category) {
    this.categoryService.updateCategory(category).subscribe(
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

  private _addCategory(category: category) {
    this.categoryService.createCategory(category).subscribe(
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

  onCancel() {
    this.location.back();
  }
  //we can access and use this method in create-category template also
  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.currentCategoryId = params.id;
        this.editMode = true;
        this.categoryService
          .getCategoryById(params.id)
          .subscribe((category: any) => {
            this.categoryForm.name.setValue(category.result.name);
            this.categoryForm.icon.setValue(category.result.icon);
            this.categoryForm.color.setValue(category.result.color);
          });
      }
    });
  }
}
