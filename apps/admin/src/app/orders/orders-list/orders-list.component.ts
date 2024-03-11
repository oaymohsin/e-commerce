import { Component, OnInit } from '@angular/core';
import { ORDER_STATUS } from '../order.constants';
import { OrdersService } from '@e-commerce/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'e-commerce-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
})
export class OrdersListComponent implements OnInit {
  orders = [];
  orderStatus: any = ORDER_STATUS;

  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.orderService.getOrders().subscribe((response: any) => {
      this.orders = response.result;
    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!',
            });
          }
        );
      },
    });
  }
}
