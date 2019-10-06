// jshint esversion:6
import React from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, SelectPriceTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeButton from '../../components/stripe-button/stripe-button.component';

// to test stripe payment component
// const testCreditCart = {
//     cardNumber: '4242 4242 4242 4242',
//     expirationDate: '01/20',
//     cvv: '123'
// };

const CheckOut = ({ cartItems, total }) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>PRODUCT</span>
                </div>
                <div className='header-block'>
                    <span>DESCRIPTION</span>
                </div>
                <div className='header-block'>
                    <span>QUANTITY</span>
                </div>
                <div className='header-block'>
                    <span>PRICE</span>
                </div>
                <div className='header-block'>
                    <span>REMOVE</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => 
                    <CheckoutItem key={cartItem.id} item={cartItem} />)
            }
            <div className='total'>
                <span>TOTAL: ${ total }</span>
            </div>
            <div className='test-warning'>
                *Please use the following test credit card for payments*
                <br />
                4242 4242 4242 4242 - EXP: 01/20 - CVV: 123
            </div>
            <StripeButton price={total} />
            <br />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: SelectPriceTotal
});

export default connect(mapStateToProps)(CheckOut);