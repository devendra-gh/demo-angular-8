import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { ShoppingService } from '../../service/shopping.service';
import { ShoppingActionType, LoadShoppingAction, LoadShoppingSuccessAction, LoadShoppingFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction } from '../actions/shopping.actions';

@Injectable()
export class ShoppingEffects {
    constructor(
        private actions$: Actions,
        private shoppingService: ShoppingService
    ) { }

    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<LoadShoppingAction>(ShoppingActionType.LOAD_SHOPPING),
            mergeMap(
                () => this.shoppingService.getShoppingItems()
                    .pipe(
                        map(data => new LoadShoppingSuccessAction(data)),
                        catchError(error => of(new LoadShoppingFailureAction(error)))
                    ),
            ),
        );

    @Effect() addShoppingItems$ = this.actions$
        .pipe(
            ofType<AddItemAction>(ShoppingActionType.ADD_ITEM),
            mergeMap(
                (data) => this.shoppingService.addShoppingItems(data.payload)
                    .pipe(
                        map(() => new AddItemSuccessAction(data.payload)),
                        catchError(error => of(new AddItemFailureAction(error)))
                    ),
            ),
        );

    @Effect() deleteShoppingItems$ = this.actions$
        .pipe(
            ofType<DeleteItemAction>(ShoppingActionType.DELETE_ITEM),
            mergeMap(
                (data) => this.shoppingService.deleteShoppingItems(data.payload)
                    .pipe(
                        map(() => new DeleteItemSuccessAction(data.payload)),
                        catchError(error => of(new DeleteItemFailureAction(error)))
                    ),
            ),
        );
}