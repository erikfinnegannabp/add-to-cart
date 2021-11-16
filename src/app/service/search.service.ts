import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private messageSource = new BehaviorSubject('');
  currentSearch = this.messageSource.asObservable();

  constructor() { }

  newSearch(searchTerms: string) {
    this.messageSource.next(searchTerms);
  }
}
