import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BillingInfoService } from 'src/app/service/billinginfo.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-paymentinfo',
  templateUrl: './paymentinfo.component.html',
  styleUrls: ['./paymentinfo.component.scss']
})
export class PaymentinfoComponent implements OnInit {
  creditCardInfo: FormGroup;
  currentDate = new Date().toLocaleDateString();
  currentYear = new Date().getFullYear();
  nextTenYears: number[] = [];
  cartTotalSubscription !: Subscription;
  cartTotal = "";
  discountCodeSubscription !: Subscription;
  discountCode = "";
  discountAmount = "";
  hasMissingInfoSubscription !: Subscription;
  hasMissingInfo = true;

  constructor(myFormBuilder: FormBuilder, private cart: CartService, private billingInfoService: BillingInfoService) {
    this.creditCardInfo = myFormBuilder.group({
      name: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: this.currentYear,
      cvv: "",
      authorized: false
    });

    for (let year = this.currentYear; year < this.currentYear+10; year++) {
      this.nextTenYears.push(year);
    }
  }

  ngOnInit(): void {
    this.cartTotalSubscription = this.cart.currentCartTotal.subscribe(
      cartTotal => this.cartTotal = cartTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

    this.discountCodeSubscription = this.cart.currentDiscountCode.subscribe(discountCode => {
      this.discountCode = discountCode.code;
      this.discountAmount = discountCode.amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    });

    this.hasMissingInfoSubscription = this.billingInfoService.hasMissingInfo.subscribe(
      hasMissingInfo => this.hasMissingInfo = hasMissingInfo
    );
  }

  onUpdateCreditCardInfo() {
    this.currentDate = new Date().toLocaleDateString();
    console.log(this.creditCardInfo.value)
  }
}
