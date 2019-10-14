// jshint esversion:6
import React from 'react';
import './tradehud.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { toggleTradeHud } from '../../redux/selectedcard/selectedcard.action';

const TradeHud = ({cardInfo, tradeTarget, toggleTradeHud}) => {
    const acceptTrade = () => {
        if (cardInfo && tradeTarget) {
            toggleTradeHud();
            socket.emit('tradeResult', [cardInfo.position, 'TRADE ACCEPTED.']);
            socket.emit('tradeAccepted', [cardInfo, tradeTarget]);
        }
    };

    const declineTrade = () => {
        if (cardInfo && tradeTarget) {
            toggleTradeHud();
            socket.emit('tradeResult', [cardInfo.position, 'TRADE DECLINED.']);
        }
    };
    return (
        <div className='tradeHudContainer'>
            <div className='cardHud'>
                <div className='textHud'>
                    <span>TRADE</span>
                    <span>FOR</span>
                </div>
                <div className="card">
                    <p className='name' >{tradeTarget ? tradeTarget.name : null}</p>
                    <div className='image-container'>
                        <img className='image' src={tradeTarget ? tradeTarget.src : null} alt={tradeTarget ? tradeTarget.name : null}/>
                    </div>
                    <div className="card-footer">
                        <span className='text' >{tradeTarget ? tradeTarget.description : null}</span>
                    </div>
                </div>
                <div className="card">

                    <p className='name' >{cardInfo ? cardInfo.name : null}</p>
                    <div className='image-container'>
                        <img className='image' src={cardInfo ? cardInfo.src : null} alt={cardInfo ? cardInfo.name : null}/>
                    </div>
                    <div className="card-footer">
                        <span className='text' >{cardInfo ? cardInfo.description : null}</span>
                    </div>
                </div>
                <div className='buttonHud'>
                    <button onClick={acceptTrade}>ACCEPT</button>
                    <button onClick={declineTrade}>DECLINE</button>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        toggleTradeHud: () => dispatch(toggleTradeHud()),
     });
}

export default connect(null, mapDispatchToProps)(TradeHud);