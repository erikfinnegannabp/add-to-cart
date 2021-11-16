export class Product {
  public title: string;
  public description: string;
  public category: string;
  public image: string;
  public price: string;
  public onSale: boolean;
  public discount: number;
  public discountAmt: string;
  public finalPrice: string;
  public quantity: number;

  constructor(title: string, description: string, category: string, image: string, price: string, discount: number) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.image = image;
    this.price = eval(price).toFixed(2);
    this.onSale = discount > 0;
    this.discount = discount;
    this.discountAmt = (eval(price) * (discount/100)).toFixed(2);
    this.finalPrice = (eval(price) * (1 - (discount/100))).toFixed(2);
    this.quantity = 0;
  }
}
