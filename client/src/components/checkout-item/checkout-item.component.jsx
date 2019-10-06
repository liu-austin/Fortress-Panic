// jshint esversion:6
import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import { addItem, clearItem, decreaseQuantity } from '../../redux/cart/cart.action';

const CheckoutItem = ({item, addItem, clearItem, decreaseQuantity}) => {
    const {name, quantity, price, imageUrl} = item;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'><div className='arrow' 
                onClick={() => decreaseQuantity(item)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(item)}>&#10095;</div></span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItem(item)}>&#10005;</div>
        </div>
        );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        addItem: (item) => dispatch(addItem(item)),
        clearItem: (item) => dispatch(clearItem(item)),
        decreaseQuantity: (item) => dispatch(decreaseQuantity(item))
    });
}

export default connect(null, mapDispatchToProps)(CheckoutItem);