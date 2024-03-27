import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../models/category';
import { Observable } from 'rxjs';
import {environment} from '@env/environment'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiURLCategories=environment.apiUrl+'categories'

  constructor(private http: HttpClient) {}

  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(
      `${this.apiURLCategories}/getAllCategoryList`
    );
  }
  getCategoryById(categoryId:string):Observable<category>{
    return this.http.get<category>(`${this.apiURLCategories}/getCategoryById/${categoryId}`)
  }

  createCategory(category: category): Observable<category> {
    return this.http.post<category>(
      `${this.apiURLCategories}/createCategory`,
      category
    );
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLCategories}/deleteCategoryById/${categoryId}`
    );
  }

  updateCategory(category:category):Observable<category>{
    return this.http.put<category>(`${this.apiURLCategories}/updateCategoryById/${category.id}`,category)
  }

}
