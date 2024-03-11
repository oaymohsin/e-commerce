import { Route } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {
  ProductsListComponent,
  ProductsPageComponent,
} from '@e-commerce/products';
import { CartPageComponent, CheckOutComponent } from '@e-commerce/orders';

export const appRoutes: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'product-list', component: ProductsListComponent },
  { path: 'category/:categoryid', component: ProductsListComponent },
  { path: 'products/:productId', component: ProductsPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckOutComponent },
];
