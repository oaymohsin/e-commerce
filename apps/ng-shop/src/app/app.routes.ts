import { Route } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {
  ProductsListComponent,
  ProductsPageComponent,
} from '@e-commerce/products';
import {
  CartPageComponent,
  CheckOutComponent,
  ThankYouComponent,
} from '@e-commerce/orders';
import { AuthGuardService, LoginComponent } from '@e-commerce/users';

export const appRoutes: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'category/:categoryid', component: ProductsListComponent },
  { path: 'products/:productId', component: ProductsPageComponent },
  { path: 'cart', component: CartPageComponent },
  {
    path: 'checkout',
    canActivate: [AuthGuardService],
    component: CheckOutComponent,
  },
  { path: 'success', component: ThankYouComponent },
  { path: 'login', component: LoginComponent },
];
