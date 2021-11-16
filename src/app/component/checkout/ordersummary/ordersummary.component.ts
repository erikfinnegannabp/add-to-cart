import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss']
})
export class OrdersummaryComponent implements OnInit {
  cartContentSubscription !: Subscription;
  cartContents: Product[] = [];
  displayedColumns: string[] = ["description", "price", "discount", "quantity", "total"];
  preDiscountTotal: number = 0;
  postDiscountTotal: number = 0;
  totalDiscountAmount: number = 0;
  totalQuantity: number = 0;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cartContentSubscription = this.cart.currentCartItems.subscribe(
      cartContents => this.cartContents = cartContents
    );

    for (var item of this.cartContents) {
      this.preDiscountTotal += eval(item.price) * item.quantity;
      this.postDiscountTotal += eval(item.finalPrice) * item.quantity;
      this.totalDiscountAmount += eval(item.discountAmt) * item.quantity;
      this.totalQuantity += item.quantity;
    }
  }

  ngOnDestroy(): void {
    this.cartContentSubscription.unsubscribe();
  }
}
