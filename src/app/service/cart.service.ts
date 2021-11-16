import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../component/product/product.model';
import { DiscountCode } from '../component/checkout/discountcode/discountcode.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsArray: Product[] = [];
  private cartItems = new BehaviorSubject<Product[]>([]);
  currentCartItems = this.cartItems.asObservable();
  cartQuantity = this.getCartQuantity();
  private cartTotalBehaviorSubject = new BehaviorSubject<number>(0);
  currentCartTotal = this.cartTotalBehaviorSubject.asObservable();

  discountCode = new DiscountCode("none", 0);
  private discountCodeBehaviorSubject = new BehaviorSubject<DiscountCode>(this.discountCode);
  currentDiscountCode = this.discountCodeBehaviorSubject.asObservable();

  cartTotal = this.getCartTotal();

  constructor() {}

  addToCart(item: Product) {
    var newUniqueItem = true;
    for (var cartItem of this.cartItemsArray) {
      if (item.title === cartItem.title) {
        newUniqueItem = false;
        cartItem.quantity++;
      }
    }
    if (newUniqueItem) {
      item.quantity = 1;
      this.cartItemsArray.push(item)
    }
    this.cartItems.next(this.cartItemsArray);
    this.updateValues();
  }

  removeFromCart(item: Product) {
    this.cartItemsArray = this.cartItemsArray.filter((x: { title: string; }) => {
      return x.title != item.title;
    });
    this.cartItems.next(this.cartItemsArray);
    this.updateValues();
  }

  emptyCart() {
    this.cartItemsArray = [];
    this.cartItems.next(this.cartItemsArray);
    this.updateValues();
  }

  incrementCart(item: Product) {
    for (var cartItem of this.cartItemsArray) {
      if (item.title === cartItem.title) {
        cartItem.quantity++;
      }
    }
    this.updateValues();
  }

  decrementCart(item: Product) {
    for (var cartItem of this.cartItemsArray) {
      if (item.title === cartItem.title && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    }
    this.updateValues();
  }

  setQuantity(item: Product, newQuantity: number) {
    for (var cartItem of this.cartItemsArray) {
      if (item.title === cartItem.title) {
        cartItem.quantity = newQuantity;

      }
    }
    this.updateValues();
  }

  updateValues() {
    this.cartQuantity = this.getCartQuantity();
    this.cartTotal = this.getCartTotal();
  }

  getCartQuantity() {
    var quantity = 0;
    for (var cartItem of this.cartItemsArray) {
      quantity += cartItem.quantity;
    }
    return quantity;
  }

  getCartTotal() {
    var total = 0;
    for (var cartItem of this.cartItemsArray) {
      total += (cartItem.quantity * eval(cartItem.finalPrice));
    }
    total -= this.discountCode.amount;
    total = Math.max(total, 0);
    this.cartTotalBehaviorSubject.next(total);
    return total;
  }

  addDiscountCode(code: DiscountCode) {
    this.discountCode = code;
    this.discountCodeBehaviorSubject.next(code);
    this.updateValues();
  }
}
