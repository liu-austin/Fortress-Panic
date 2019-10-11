// jshint esversion:6
import React from 'react';
import './cardoverview.styles.scss';
import { connect } from 'react-redux';

const CardOverview = ({ cardInfo }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    return (
        <div className="card-overview" key="1">
            <span className='name'>{cardInfo ? cardInfo.name : null}</span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        // addItem: cardInfo => dispatch(addItem(cardInfo))
     });
}

export default connect(null, mapDispatchToProps)(CardOverview);