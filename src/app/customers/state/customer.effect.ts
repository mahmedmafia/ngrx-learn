import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as customerActions from '../state/customer.actions';
import { Observable, of } from 'rxjs';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Injectable()
export class CustomerEffect {

    constructor(private actions$: Actions, private customerService: CustomerService) { }

    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomers>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMERS
        ), mergeMap((actions: customerActions.LoadCustomers) =>

            this.customerService.getCustomers()
                .pipe(
                    map((fetchedCustomers: Customer[]) =>
                        new customerActions.LoadCustomersSuccess(fetchedCustomers)
                    ),
                    catchError(err => of(new customerActions.LoadCustomersFail(err)))
                )

        )
    );
    @Effect()
    loadCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.LoadCustomer>(
            customerActions.CustomerActionTypes.LOAD_CUSTOMER
        ), mergeMap((action: customerActions.LoadCustomer) =>

            this.customerService.getCustomerById(action.payload)
                .pipe(
                    map((fetchedCustomer: Customer) =>
                        new customerActions.LoadCustomerSuccess(fetchedCustomer)
                    ),
                    catchError(err => of(new customerActions.LoadCustomerFail(err)))
                )

        )
    );

    @Effect()
    createCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.CreateCustomer>(
            customerActions.CustomerActionTypes.CREATE_CUSTOMER
        ), mergeMap((action: customerActions.CreateCustomer) =>

            this.customerService.createCustomer(action.payload)
                .pipe(
                    map((newCustomer: Customer) =>
                        new customerActions.CreateCustomerSuccess(newCustomer)
                    ),
                    catchError(err => of(new customerActions.CreateCustomerFail(err)))
                )

        )
    );
    @Effect()
    updateCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.UpdateCustomer>(
            customerActions.CustomerActionTypes.UPDATE_CUSTOMER
        ), mergeMap((action: customerActions.UpdateCustomer) =>

            this.customerService.updateCustomer(action.payload)
                .pipe(
                    map((updateCustomer: Customer) =>
                        new customerActions.UpdateCustomerSuccess({
                            id: updateCustomer.id,
                            changes: updateCustomer
                        })
                        
                    ),
                    catchError(err => of(new customerActions.UpdateCustomerFail(err)))
                )

        )
    );

    @Effect()
    deleteCustomer$: Observable<Action> = this.actions$.pipe(
        ofType<customerActions.DeleteCustomer>(
            customerActions.CustomerActionTypes.DELETE_CUSTOMER
        ), mergeMap((action: customerActions.DeleteCustomer) =>

            this.customerService.deleteCustomer(action.payload)
                .pipe(
                    map(() =>
                        new customerActions.DeleteCustomerSuccess(action.payload)
                    ),
                    catchError(err => of(new customerActions.DeleteCustomerFail(err)))
                )

        )
    );
}
