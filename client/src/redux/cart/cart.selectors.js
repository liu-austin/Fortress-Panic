// jshint esversion:6
import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// output selectors
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((currentCount, cartItem) =>
        currentCount + cartItem.quantity, 0)
);

export const SelectPriceTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((currentTotal, currentItem) =>
        currentTotal + currentItem.quantity * currentItem.price, 0)
);