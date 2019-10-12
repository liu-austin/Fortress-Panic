// jshint esversion:6
import React from 'react';
import './cardoverview.styles.scss';
import { connect } from 'react-redux';
import { selectCard, selectCardInfo } from '../../redux/selectedcard/selectedcard.action';

const CardOverview = ({ cardInfo, cardselected, selectCardInfo }) => {
    const clickCard = () => {
        selectCardInfo(cardInfo);
        cardselected();
    };

    return (
        <div className="card-overview" key={cardInfo ? cardInfo.key : null} onClick={cardInfo ? clickCard : null}>
            <span className='name'>{cardInfo ? cardInfo.name : null}</span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        cardselected: () => dispatch(selectCard()),
        selectCardInfo: (cardinfo) => dispatch(selectCardInfo(cardinfo))
     });
}

export default connect(null, mapDispatchToProps)(CardOverview);