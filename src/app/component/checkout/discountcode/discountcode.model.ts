export class DiscountCode {
  public code: string;
  public amount: number;

  constructor(code: string, amount: number)
  {
    this.code = code;
    this.amount = amount;
  }
}
