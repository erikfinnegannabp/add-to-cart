import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartContentSubscription !: Subscription;
  cartTotalSubscription !: Subscription;
  cartContents: Product[] = [];
  total = "";

  confirmEmptyCart = false;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cartContentSubscription = this.cart.currentCartItems.subscribe(cartContents => this.cartContents = cartContents);
    this.cartTotalSubscription = this.cart.currentCartTotal.subscribe(
      cartTotal => this.total = cartTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }

  ngOnDestroy(): void {
    this.cartContentSubscription.unsubscribe();
    this.cartTotalSubscription.unsubscribe();
  }

  removeFromCart(item: Product) {
    this.cart.removeFromCart(item);
  }

  incrementCart(item: Product) {
    this.cart.incrementCart(item);
  }

  decrementCart(item: Product) {
    this.cart.decrementCart(item);
  }

  updateQuantity(item: Product, event: any) {
    const newQuantity = event.target.value;
    this.cart.setQuantity(item, newQuantity);
  }

  confirmEmptyToggle() {
    this.confirmEmptyCart = !this.confirmEmptyCart;
  }

  emptyCart() {
    this.confirmEmptyToggle();
    this.cart.emptyCart();
  }
}
