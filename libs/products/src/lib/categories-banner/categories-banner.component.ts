import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { category } from '../models/category';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'e-commerce-categories-banner',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './categories-banner.component.html',
  styleUrl: './categories-banner.component.css',
})
export class CategoriesBannerComponent implements OnInit {
  categories: category[] = [];
  constructor(private categoriesService: CategoryService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((response: any) => {
      this.categories = response.result;
    });
  }
}
