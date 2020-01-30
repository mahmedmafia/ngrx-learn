import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as customerActions from '../state/customer.actions';
import * as customerReducers from '../state/customer.reducer';

import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  error$: Observable<String>;
  constructor(private store: Store<customerReducers.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(select(customerReducers.getCustomers));
    this.error$ = this.store.pipe(select(customerReducers.getCustomersError));

  }
  deleteCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
  }
  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }

}
