import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProductComponent } from './component/product/product.component';
import { OrdersummaryComponent } from './component/checkout/ordersummary/ordersummary.component';
import { DiscountcodeComponent } from './component/checkout/discountcode/discountcode.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './component/product/filter.pipe'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BillinginfoComponent } from './component/checkout/billinginfo/billinginfo.component';
import { ShippinginfoComponent } from './component/checkout/shippinginfo/shippinginfo.component';
import { PaymentinfoComponent } from './component/checkout/paymentinfo/paymentinfo.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    OrdersummaryComponent,
    DiscountcodeComponent,
    BillinginfoComponent,
    ShippinginfoComponent,
    PaymentinfoComponent,
    ConfirmationComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
