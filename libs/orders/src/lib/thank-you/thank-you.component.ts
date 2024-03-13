import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'e-commerce-thank-you',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css',
})
export class ThankYouComponent implements OnInit{

  constructor(private orderService:OrdersService,private cartService:CartService,
    private router:Router
    
    ){}

ngOnInit(): void {

  const order=JSON.parse(this.orderService.getCachedOrderData())
  
  // console.log(order)
  this.orderService.createOrder(order).subscribe(
    () => {
      //redirect to thank you page // payment
      this.cartService.emptyCart();
      this.orderService.removeCachedData()
      // this.router.navigate(['/success']);
    },
    () => {
      //display some message to user
    }
  );
}

  
}
