import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../service/search.service';
import { CartService } from '../../service/cart.service';
import { Product } from '../product/product.model';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchTerm = '';
  searchSubscription !: Subscription;
  cartSubscription !: Subscription;
  cartContents: Product[] = [];

  constructor(private search: SearchService, public cart: CartService) { }

  ngOnInit(): void {
    this.searchSubscription = this.search.currentSearch.subscribe(searchText => this.searchTerm = searchText);
    this.cartSubscription = this.cart.currentCartItems.subscribe(cartContents => this.cartContents = cartContents);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  searchProducts() {
    this.search.newSearch(this.searchTerm);
  }

}
