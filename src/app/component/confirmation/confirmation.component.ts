import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../product/product.model';
import { UserData } from '../checkout/userData.model';
import { BillingInfoService } from 'src/app/service/billinginfo.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  dynamicCartContents: Product[] = [];
  cartContents: Product[] = [];
  displayedColumns: string[] = ["description", "price", "discount", "quantity", "total"];
  preDiscountTotal: number = 0;
  postDiscountTotal: number = 0;
  totalDiscountAmount: number = 0;
  totalQuantity: number = 0;
  cartContentSubscription !: Subscription;
  currentDate = (new Date).toLocaleDateString();
  userData !: UserData;
  billingInfoSubscription !: Subscription;

  constructor(private cart: CartService, private billingInfoService: BillingInfoService) { }

  ngOnInit(): void {
    this.billingInfoSubscription = this.billingInfoService.currentUserData
        .subscribe((userData: UserData) => this.userData = userData);

    const testMode = true;
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
      this.cart.addToCart(new Product(
        "ccccd",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "ddddd",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "cccce",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "dddde",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "ccccf",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "ddddf",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "ccccg",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
      this.cart.addToCart(new Product(
        "ddddg",
        "Probably got pictures on it",
        "electronics",
        "no one is gonna see this",
        "4.15",
        0
      ))
    }

    this.cartContentSubscription = this.cart.currentCartItems.subscribe(
      cartContents => this.dynamicCartContents = cartContents
    );
    this.cartContents = this.dynamicCartContents;
    this.postDiscountTotal = this.cart.getCartTotal();
    this.cart.emptyCart();
  }

  ngOnDestroy() {
    this.billingInfoSubscription.unsubscribe();
  }

  printConfirmation() {
    window.print();
  }

}
