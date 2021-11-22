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
  cardImgSrc = "cardTypeNotRecognized";

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
    this.cardImgSrc = this.getCreditCardBrandImage(this.creditCardInfo.value.cardNumber);
  }

  getCreditCardBrandImage(num: string) {
    if (num.length == 15 && (num.slice(0,2) == "34" || num.slice(0,2) == "37") ) { // American Express
      return "https://www.pngall.com/wp-content/uploads/9/American-Express-Logo-PNG-Image.png"
    }
    else if ( (num.length == 13 || num.length == 16) && num.slice(0,1) == "4") { // Visa
      return "https://usa.visa.com/dam/VCOM/regional/lac/ENG/Default/Partner%20With%20Us/Payment%20Technology/visapos/full-color-800x450.jpg"
    }
    else if (num.length == 16 && eval(num.slice(0,2)) >= 51 && eval(num.slice(0,2)) <= 55) { // Mastercard
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
    }
    else if (num.length == 16 && num.slice(0,4) == "6011") { // Discover
      return "https://www.bankdealguy.com/wp-content/uploads/2018/09/Discover.jpg"
    }
    else if (num.length == 15 && num.slice(0,1) == "5") { // also Discover
      return "https://www.bankdealguy.com/wp-content/uploads/2018/09/Discover.jpg"
    }
    else {
      return "cardTypeNotRecognized"
    }
  }
}
