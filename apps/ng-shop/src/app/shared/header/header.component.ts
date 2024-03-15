import { Component } from '@angular/core';
import { CartService } from '@e-commerce/orders';
import { AuthService } from '@e-commerce/users';
// import { CommonModule } from '@angular/common';
// import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'e-commerce-header',
  standalone: false,
  // imports: [CommonModule,AccordionModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private cartService:CartService,private authService:AuthService){
    this.cartService.initCartLocalStorage()
   
  }
}
