import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserData } from '../userData.model';
import { BillingInfoService } from 'src/app/service/billinginfo.service';

@Component({
  selector: 'app-billinginfo',
  templateUrl: './billinginfo.component.html',
  styleUrls: ['./billinginfo.component.scss']
})

export class BillinginfoComponent implements OnInit {
  fakeProfile = new UserData("Erik Finnegan", "123 Test Road", "Saginaw", "MI", "48638", "USA",
    "555-123-4567", "test@test.com");
  userData = new UserData("", "", "", "", "", "", "", "");
  savedUserData = new UserData("", "", "", "", "", "", "", "");
  useSavedProfile = false;
  myFormGroup: FormGroup;

  constructor(myFormBuilder: FormBuilder, private billingInfoService: BillingInfoService) {
    this.myFormGroup = myFormBuilder.group(new UserData("", "", "", "", "", "", "", ""))
  }

  ngOnInit(): void {
  }

  updateBillingInfo() {
    this.billingInfoService.updateCurrentBillingInfo(this.myFormGroup.value);
  }

  onToggleUseProfile() {
    const myFormBuilder = new FormBuilder;
    if (this.useSavedProfile) {
      this.savedUserData = this.myFormGroup.value;
      this.myFormGroup = myFormBuilder.group(this.fakeProfile);
    }
    else {
      this.myFormGroup = myFormBuilder.group(this.savedUserData);
    }

    this.updateBillingInfo();
  }
}
