// jshint esversion:6
import React from 'react';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{ itemCount }</span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        itemCount: selectCartItemsCount(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        toggleCartHidden: () => dispatch(toggleCartHidden())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);