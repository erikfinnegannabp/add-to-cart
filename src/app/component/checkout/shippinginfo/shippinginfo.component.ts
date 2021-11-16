import { Component, OnInit } from '@angular/core';
import { BillingInfoService } from 'src/app/service/billinginfo.service';
import { UserData } from '../userData.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shippinginfo',
  templateUrl: './shippinginfo.component.html',
  styleUrls: ['./shippinginfo.component.scss']
})

export class ShippinginfoComponent implements OnInit {
  billingInfoSubscription !: Subscription;
  billingUserData = new UserData("", "", "", "", "", "", "", "");
  savedUserData = new UserData("", "", "", "", "", "", "", "");
  myFormGroup: FormGroup;
  useBillingInfo = false;

  constructor(myFormBuilder: FormBuilder, private billingInfoService: BillingInfoService) {
    this.myFormGroup = myFormBuilder.group(new UserData("", "", "", "", "", "", "", ""))
  }

  ngOnInit(): void {
    this.billingInfoSubscription = this.billingInfoService.currentUserData
        .subscribe(userData => this.billingUserData = userData);
  }

  ngOnDestroy() {
    this.billingInfoSubscription.unsubscribe();
  }

  onChangeShippingData() {
    this.billingInfoService.updateCurrentShippingInfo(this.myFormGroup.value);
  }

  onToggleUseBilling() {
    const myFormBuilder = new FormBuilder;
    if (this.useBillingInfo) {
      this.savedUserData = this.myFormGroup.value;
      this.myFormGroup = myFormBuilder.group(this.billingUserData);
      this.billingInfoService.updateCurrentShippingInfo(this.myFormGroup.value);
    }
    else {
      this.myFormGroup = myFormBuilder.group(this.savedUserData);
      this.billingInfoService.updateCurrentShippingInfo(this.myFormGroup.value);
    }
  }
}

