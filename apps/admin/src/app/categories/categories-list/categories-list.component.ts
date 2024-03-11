import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService, category } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'e-commerce-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  categories: category[] = [];

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this._getCategoriesList();
  }

  deleteCategory(category: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.categoryService.deleteCategory(category).subscribe(
          (response) => {
            this._getCategoriesList();

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category not deleted',
            });
          }
        );
      },
    });
  }

  updateCategory(categoryId:string){
    this.router.navigateByUrl(`/createCategory/${categoryId}`)
  }


  private _getCategoriesList() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.result;
    });
  }
}
