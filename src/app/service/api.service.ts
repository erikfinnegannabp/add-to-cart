import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getProduct(){
    console.log("Getting product list...");
    return this.http.get<any>("https://fakestoreapi.com/products").pipe(map((res:any)=>{
      console.log("Product list acquired!")
      return res;
    }))
  }
}
