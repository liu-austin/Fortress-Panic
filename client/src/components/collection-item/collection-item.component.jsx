// jshint esversion:6
import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action.js';

const CollectionItem = ({ item, addItem }) => {
    const { id, name, price, imageUrl } = item;
    return (
        <div className="collection-item" key={id}>
            <div className='image' style={{backgroundImage: `url(${imageUrl})`}} />
                <div className="collection-footer">
                    <span className='name' >{name}</span>
                    <span className="price">{price}</span>
                </div>
                <CustomButton onClick={() => addItem(item)} isInverted> ADD TO CART </CustomButton>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        addItem: item => dispatch(addItem(item))
     });
}

export default connect(null, mapDispatchToProps)(CollectionItem);