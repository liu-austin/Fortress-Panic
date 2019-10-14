// jshint esversion:6
import React from 'react';
import './cardoverview.styles.scss';
import { connect } from 'react-redux';
import { selectCard, unselectCard, selectCardInfo, setTradeTarget, toggleTradeFor } from '../../redux/selectedcard/selectedcard.action';
import { selectTradeFor, selectSelectedCardInfo } from '../../redux/selectedcard/selectedcard.selectors';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { displayNewMessage } from '../../redux/console/console.action';

const CardOverview = ({ cardInfo, cardselected, cardunselected, selectCardInfo, setTradeTarget, toggleTradeFor, tradefor, selectedcard, displayNewMessage }) => {
    const clickCard = () => {
        if (!tradefor) {
            selectCardInfo(cardInfo);
            cardselected();
        } else {
            cardunselected();
            setTradeTarget(cardInfo);
            toggleTradeFor();
            displayNewMessage('AWAITING TRADE RESPONSE.');
            socket.emit('tradeTargetSet', [selectedcard, cardInfo]);
        }
    };

    return (
        <div className="card-overview" key={cardInfo ? cardInfo.key : null} onClick={cardInfo ? clickCard : null}>
            <span className='name'>{cardInfo ? cardInfo.name : null}</span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        tradefor: selectTradeFor(state),
        selectedcard: selectSelectedCardInfo(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        cardselected: () => dispatch(selectCard()),
        cardunselected: () => dispatch(unselectCard()),
        selectCardInfo: (cardinfo) => dispatch(selectCardInfo(cardinfo)),
        setTradeTarget: (cardinfo) => dispatch(setTradeTarget(cardinfo)),
        toggleTradeFor: () => dispatch(toggleTradeFor()),
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg))
     });
}

export default connect(mapStateToProps, mapDispatchToProps)(CardOverview);