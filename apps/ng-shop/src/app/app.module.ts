import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BannerComponent, GalleryComponent, SliderComponent, UiComponent } from '@e-commerce/ui';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesBannerComponent, FeaturedProductsComponent, ProductsItemComponent, ProductsPageComponent, ProductsSearchComponent } from '@e-commerce/products';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { CartIconComponent, CheckOutComponent } from '@e-commerce/orders';
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    
    SliderComponent,
    UiComponent,
    FooterComponent,
    ProductsSearchComponent,
    NavComponent,
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    BannerComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductsItemComponent,
    ProductsPageComponent,
    GalleryComponent,
    CartIconComponent,
    CheckOutComponent
  ],
  providers: [ProductsPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
