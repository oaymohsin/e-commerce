import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiURLProducts = environment.apiUrl + 'products';

  constructor(private http: HttpClient) {}

  getProducts(categoriesFilter?:string[]): Observable<product[]> {
    let params= new HttpParams
    if(categoriesFilter){
      params=params.append('categories',categoriesFilter.join(','))
    }

    return this.http.get<product[]>(`${this.apiURLProducts}/getProductsList`,{params:params});
  }
  // getCategoryById(categoryId:string):Observable<category>{
  //   return this.http.get<category>(`${this.apiURLCategories}/getCategoryById/${categoryId}`)
  // }
  getProduct(productId: string): Observable<product> {
    console.log(productId);
    return this.http.get<product>(
      `${this.apiURLProducts}/getProductById/${productId}`
    );
  }
  updateProduct(productData: FormData, productid: string): Observable<product> {
    return this.http.put<product>(
      `${this.apiURLProducts}/updateProductById/${productid}`,
      productData
    );
  }

  createProduct(productData: FormData): Observable<product> {
    return this.http.post<product>(
      `${this.apiURLProducts}/createProduct`,
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLProducts}/deleteProductById/${productId}`
    );
  }

  getFeaturedProduct(count: number): Observable<any> {
    return this.http.get(`${this.apiURLProducts}/getFeaturedProducts/${count}`);
  }

  uploadGalleryImages(images:any,productId:string){
    return this.http.put(`${this.apiURLProducts}/uploadGalleryImages/${productId}`,
    images
    )
  }
}
