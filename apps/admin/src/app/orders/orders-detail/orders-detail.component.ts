import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService } from '@e-commerce/orders';
import { ORDER_STATUS } from '../order.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'e-commerce-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.css',
})
export class OrdersDetailComponent implements OnInit {
  order: Order | any;
  orderStatuses = Object.keys(ORDER_STATUS);
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private messageService:MessageService
  ) {}
  ngOnInit(): void {
    this._getOrder();
    // this._mapOrderStatus;
  }

  // private _mapOrderStatus() {
  //   Object.keys(ORDER_STATUS).map((key) => {
  //     this.orderStatuses.push(key);
  //   });

  //   // for (const iterator of ORDER_STATUS) {

  //   // }
  // }

  private _getOrder() {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((response: any) => {
          this.order = response.result;
          console.log(response)
          this.selectedStatus = response.result.status;
          console.log(this.order)
        });
      }
    });
  }

  onStatusChange(event: any) {
    this.orderService.updateOrder({status:event.value},this.order.id).subscribe(()=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order is updated!'
      });
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated!'
      });
    }
    )
  }
}
