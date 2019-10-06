// jshint esversion:6
import React from 'react';
import './cardoverview.styles.scss';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action.js';

const CardOverview = ({ cardInfo, addItem }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    return (
        <div className="card-overview" key="1">
        <p className='name'>GREEN KNIGHT</p>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        // addItem: cardInfo => dispatch(addItem(cardInfo))
     });
}

export default connect(null, mapDispatchToProps)(CardOverview);