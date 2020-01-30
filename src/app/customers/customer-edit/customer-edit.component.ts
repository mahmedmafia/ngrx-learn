import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as customerActions from '../state/customer.actions';
import * as customerReducers from '../state/customer.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private store: Store<customerReducers.AppState>) { }
  customerForm: FormGroup;
  ngOnInit() {
    const customer$ = this.store.select(customerReducers.getCurrentCustomer);

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required],
      id: null,
    });
    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        });
      }
    });
  }
  updateCustomer() {
    const updatedCustomer: Customer = {

      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      membership: this.customerForm.get('membership').value,
      address: this.customerForm.get('address').value,
      id: this.customerForm.get('id').value,
    };
    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
    this.customerForm.reset();
  }
}
