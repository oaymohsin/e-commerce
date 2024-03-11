import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/orders';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiURLOrders = environment.apiUrl + 'orders';

  constructor(private http:HttpClient) { }


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURLOrders}/getOrderList`);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/getOrderById/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURLOrders}/createOrder`, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/updateOrderById/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/deleteOrderById/${orderId}`);
  }
}

