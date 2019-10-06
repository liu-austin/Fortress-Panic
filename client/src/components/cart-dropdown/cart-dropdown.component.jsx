// jshint esversion:6
import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { withRouter } from 'react-router-dom';

const CartDropdown = ({cartItems, history, dispatch}) => {
        return (
            <div className='cart-dropdown'>
                <div className='cart-items'>
                    {
                        cartItems.length ? (
                        cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)) 
                        : <span className='empty-items'>YOUR CART IS EMPTY</span>
                    }
                </div>
                <CustomButton onClick={() => {history.push('/checkout'); dispatch(toggleCartHidden());}}>GO TO CHECKOUT</CustomButton>
            </div>
        );
}

const mapStateToProps = (state) => {
    return ({cartItems: selectCartItems(state)});
};

// Do not need to create a mapDispatchToProps
export default withRouter(connect(mapStateToProps)(CartDropdown));