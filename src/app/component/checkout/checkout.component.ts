import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartContentSubscription !: Subscription;
  cartContents: Product[] = [];

  constructor(private cart: CartService) { }

  testMode: string = this.doTestMode(); // This variable is never used, it just calls doTestMode

  doTestMode() {
    const testMode = false;
    if (testMode) {
      this.cart.addToCart(new Product(
        "Some shirt",
        "A real neat shirt",
        "fashion",
        "no one is gonna see this",
        "10.00",
        0
      ))
      this.cart.addToCart(new Product(
        "Some long pants",
        "This is a really long description for some pants that really is quite long. I cannot understate how long it is for it really is a truly long description.",
        "fashion",
        "no one is gonna see this",
        "2000.00",
        0
      ))
      this.cart.addToCart(new Product(
        "An SD card",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "aaaa",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "bbbb",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "cccc",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "dddd",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
    }
    return "whatever";
  }

  ngOnInit(): void {
    this.cartContentSubscription = this.cart.currentCartItems.subscribe(cartContents => this.cartContents = cartContents);
  }

  ngOnDestroy(): void {
    this.cartContentSubscription.unsubscribe();
  }
}
