import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { Router } from '@angular/router';
import { AuthService, User, UserService } from '@e-commerce/users';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { Cart } from '../models/cart';
import { OrderItem } from '../models/order-item';
import { InputTextModule } from 'primeng/inputtext';
import { Order } from '../models/orders';
import { StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
@Component({
  selector: 'e-commerce-check-out',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputMaskModule,
    DropdownModule,
    OrderSummaryComponent,
    InputTextModule,
  ],
  providers: [AuthService],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup | any;
  isSubmitted = false;
  countries: any = [];
  orderItems: OrderItem[] | any = [];
  userId: User | any = '65d57f25c4dbee727caa4466';

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService,
    private stripeService: StripeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('checkout page initialized');

    this._initCheckoutForm();

    this._getCartItems();
    this._getCountries();
    this._setUserValuesToCheckoutForm();

    // this.loggedInUserDataSubscription =
    //   this.authService.LoggedInUserData.subscribe((user: any) => {
    //     console.log(`user from observable ${user}`);
    //   });
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private _setUserValuesToCheckoutForm() {
    const user: any = localStorage.getItem('user');
    // console.log(loggeInUser);
    console.log(this.checkoutFormGroup)
    // if (user) {
      // console.log(`user from observable ${user}`);

      this.checkoutFormGroup.get('name').setValue(user.name);
      this.checkoutFormGroup.get('email').setValue(user.email)
      // this.checkoutFormGroup.name.setValue(user.name);
      // this.checkoutFormGroup.email.setValue(user.email);
      // this.checkoutFormGroup.phone.setValue(user.phone);
      // this.checkoutFormGroup.city.setValue(user.city);
      // this.checkoutFormGroup.country.setValue(user.country);
      // this.checkoutFormGroup.zip.setValue(user.zip);
      // this.checkoutFormGroup.apartment.setValue(user.apartment);
      // this.checkoutFormGroup.street.setValue(user.street);
    // }
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item: any) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  private _getCountries() {
    this.countries = this.userService.getCountries();
  }
  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 'Pending',
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.orderService.cacheOrderData(order);

    this.orderService
      .createCheckoutSession(this.orderItems)
      .subscribe((session: any) => {
        console.log(session);

        this.stripeService
          .redirectToCheckout({ sessionId: session.id })
          .subscribe((error) => {
            console.log(error);
          });
      });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  ngOnDestroy(): void {
    // this.loggedInUserDataSubscription.unsubscribe();
  }
}
