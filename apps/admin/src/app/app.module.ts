import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryService } from '@e-commerce/products';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { FieldsetModule } from 'primeng/fieldset';
import { jwtInterceptor } from '@e-commerce/users';
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CreateCategoryComponent,
    ProductsListComponent,
    CreateProductsComponent,
    CreateUserComponent,
    UserListComponent,
    OrdersDetailComponent,
    OrdersListComponent,
  ],
  imports: [
    BrowserModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    DropdownModule,
    InputSwitchModule,
    EditorModule,
    InputTextModule,
    SidebarModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
  ],
  providers: [CategoryService, MessageService, ConfirmationService,
  {provide:HTTP_INTERCEPTORS, useClass:jwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
