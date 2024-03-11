import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject, Subject } from 'rxjs';

export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    console.log(cart);
    if (!cart) {
      const initialCart = {
        items: [],
      };
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem('cart', initialCartJson);
    } else {
    }
  }

  getCart(): Cart {
    // Use ?? to provide a default empty cart
    const cartJsonString: string | any = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem | any, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find(
      (item) => item.productId === cartItem.productId
    );

    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity += cartItem.quantity;
          }
        }
      });
    } else {
      cart.items?.push(cartItem);
    }
    const CartJson = JSON.stringify(cart);
    localStorage.setItem('cart', CartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();

    const newCart = cart.items?.filter((item) => item.productId !== productId);

    cart.items = newCart;
    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);
    this.cart$.next(cart);
  }
}
