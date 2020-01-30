import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as customerActions from '../state/customer.actions';
import * as customerReducers from '../state/customer.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  constructor(private fb:FormBuilder,private store: Store<customerReducers.AppState>) { }
  customerForm:FormGroup;
  ngOnInit() {
    this.customerForm=this.fb.group({
      name:['',Validators.required],
      phone:['',Validators.required],
      address:['',Validators.required],
      membership:['',Validators.required],

    });
  }
  createCustomer(){
    const newCustomer:Customer={

      name:this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      membership: this.customerForm.get('membership').value,
      address: this.customerForm.get('address').value,
    }
    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));
    this.customerForm.reset();
  }
   
}
