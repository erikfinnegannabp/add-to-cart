import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../component/checkout/userData.model';

@Injectable({
  providedIn: 'root'
})
export class BillingInfoService {
  private userData = new BehaviorSubject<UserData>(new UserData("", "", "", "", "", "", "", ""));
  currentUserData = this.userData.asObservable();
  private shippingData = new BehaviorSubject<UserData>(new UserData("", "", "", "", "", "", "", ""));
  currentShippingData = this.userData.asObservable();
  missingBillingInfo = true;
  missingShippingInfo = true;
  private missingShippingOrBillingInfo = new BehaviorSubject<boolean>(true);
  hasMissingInfo = this.missingShippingOrBillingInfo.asObservable();

  constructor() { }

  updateCurrentBillingInfo(updatedUserData: UserData) {
    this.userData.next(updatedUserData);
    this.missingBillingInfo = this.hasEmptyInfoFields(updatedUserData);
    this.missingShippingOrBillingInfo.next(this.missingBillingInfo || this.missingShippingInfo);
  }
  updateCurrentShippingInfo(updatedUserData: UserData) {
    this.shippingData.next(updatedUserData);
    this.missingShippingInfo = this.hasEmptyInfoFields(updatedUserData);
    this.missingShippingOrBillingInfo.next(this.missingBillingInfo || this.missingShippingInfo);
  }

  hasEmptyInfoFields(user: UserData) {
    if (!user.name || !user.streetAddress || !user.city || !user.zipCode || !user.stateTerritoryRegionProvince ||
        !user.country || !user.contactEmail || !user.contactPhone) {
      return true;
    }
    else {
      return false;
    }
  }
}
