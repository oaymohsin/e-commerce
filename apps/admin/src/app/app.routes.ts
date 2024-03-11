import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { AuthGuardService, LoginComponent } from '@e-commerce/users';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate:[AuthGuardService],
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories-list',
        component: CategoriesListComponent,
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent,
      },
      {
        path: 'createCategory/:id',
        component: CreateCategoryComponent,
      },
      {
        path: 'products-list',
        component: ProductsListComponent,
      },
      {
        path: 'create-product',
        component: CreateProductsComponent,
      },
      {
        path: 'createProduct/:id',
        component: CreateProductsComponent,
      },
      {
        path: 'users-list',
        component: UserListComponent,
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
      {
        path: 'createUser/:id',
        component: CreateUserComponent,
      },
      {
        path: 'orders-list',
        component: OrdersListComponent,
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent,
      },
      
    ],
  },{
    path:'login',
    component:LoginComponent
  }
];
