import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { DiscountCode } from './discountcode.model';

@Component({
  selector: 'app-discountcode',
  templateUrl: './discountcode.component.html',
  styleUrls: ['./discountcode.component.scss']
})
export class DiscountcodeComponent implements OnInit {
  discountCode = '';
  invalidCode = false;
  form: FormGroup;
  showHint = false;
  hintMessage = "";

  constructor(private fb: FormBuilder, private cart: CartService) {
    this.form = this.fb.group({
      enteredCode: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  onApplyCode() {
    if (this.form.value.enteredCode == "test") {
      this.cart.addDiscountCode(new DiscountCode(this.form.value.enteredCode, 20))
      this.showHint = true;
      this.hintMessage = "Discount code successfully applied."
      this.form.controls["enteredCode"].disable()
      setTimeout( () => {
        this.showHint = false;
        this.form.controls["enteredCode"].enable();
      }, 1200);
    }
    else {
      this.hintMessage = "Invalid or expired discount code. Please check your code and try again."
      this.showHint = true;
    }
  }
}
