import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { SearchService } from '../../service/search.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList: Product[] = [];
  searchTerm = '';
  searchCategory = '';
  searchSubscription !: Subscription;

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
  constructor(private api : ApiService, private search: SearchService, private cart: CartService) { }

  ngOnInit(): void {
    this.searchSubscription = this.search.currentSearch.subscribe(searchText => {
      this.searchTerm = searchText;
    });

    this.api.getProduct().subscribe(res=>{
      for (var product of res) {
        if (product.category == 'jewelery') { // this is not the correct spelling
          product.category = 'jewelry'; // this is.
        }
        else if (product.category == "men's clothing" || product.category == "women's clothing") {
          product.category = 'fashion'
        }
        var saleRandom = Math.ceil(Math.random() * 100);
        if (saleRandom >= 20) {
          saleRandom = 0;
        }
        this.productList.push(new Product(
          product.title,
          product.description,
          product.category,
          product.image,
          product.price,
          saleRandom * 5
        ));

        if (this.productList.length < 4) {
          this.addToCart(this.productList[this.productList.length - 1])
        }
      }
    });
  }

  addToCart(item: Product){
    this.cart.addToCart(item);
  }

  filter(category:string){
    this.searchCategory = category;
  }

}
