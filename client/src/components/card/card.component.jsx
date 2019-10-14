// jshint esversion:6
import React from 'react';
import './card.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectCurrentPlayerName } from '../../redux/currentplayer/currentplayer.selectors';
import { selectPlayers } from '../../redux/players/player.selector';
import { selectCurrentPhase } from '../../redux/gamephase/gamephase.selectors';
import { unselectCard } from '../../redux/selectedcard/selectedcard.action';
import { displayNewMessage } from '../../redux/console/console.action';
import { disallowDiscard, disallowTrade, toggleTradeFor, toggleTargetable } from '../../redux/selectedcard/selectedcard.action';
import { selectDiscard, selectTrade, selectTargetable } from '../../redux/selectedcard/selectedcard.selectors';
import {setMonsterRegion} from '../../redux/monsters/monsters.action.js';

const Card = ({ cardInfo, currentPlayer, players, currentPhase, unselectCard, displayNewMessage, discard, disallowDiscard, toggleTradeFor, disallowTrade, trade, setMonsterRegion,
                toggleTargetable, targetable }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    const discardCard = () => {
        if (players[socket.id].displayName === currentPlayer && currentPhase === 'DISCARD AND DRAW' && discard && cardInfo.position === socket.id) {
            disallowDiscard();
            unselectCard();
            socket.emit('discardAndDraw', [socket.id, cardInfo._id]);
        } else {
            displayNewMessage('YOU CAN ONLY DISCARD A CARD YOU OWN ON YOUR TURN ONCE DURING DISCARD PHASE.');
        }
    };

    const tradeCard = () => {
        if (players[socket.id].displayName === currentPlayer && currentPhase === 'TRADE CARD' && trade && cardInfo.position === socket.id) {
            disallowTrade();
            displayNewMessage('CHOOSE A CARD TO TRADE THE SELECTED CARD WITH.');
            toggleTradeFor();
        } else {
            displayNewMessage('YOU CAN ONLY TRADE A CARD YOU OWN ON YOUR TURN ONCE DURING TRADE PHASE.');
        }
    };

    const playCard = () => {
        if (targetable) {
            toggleTargetable();
        }
        setMonsterRegion([]);
        if (players[socket.id].displayName === currentPlayer && currentPhase === 'PLAY CARDS' && cardInfo.position === socket.id) {
            socket.emit('playCard', cardInfo);
        } else {
            displayNewMessage('YOU CAN ONLY PLAY A CARD YOU OWN ON YOUR TURN ONCE DURING PLAY PHASE.');
        }
    };

    return (
        <div>
        {
            cardInfo ? 
            (
            <div>
                <div className="card">
                    <p className='name' >{cardInfo.name}</p>
                    <div className='image-container'>
                        <img className='image' src={cardInfo.src} alt={cardInfo.name}/>
                    </div>
                    <div className="card-footer">
                        <span className='text' >{cardInfo.description}</span>
                    </div>
                </div>
                <div className='card-option-container'>
                    <button className='card-option' onClick={playCard}>PLAY</button>
                    <button className='card-option' onClick={tradeCard}>TRADE</button>
                    <button className='card-option' onClick={discardCard} >DISCARD</button>
                </div>
            </div>
            ) 
            : 
            (
                null
            )
        }
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        currentPlayer: selectCurrentPlayerName(state),
        players: selectPlayers(state),
        currentPhase: selectCurrentPhase(state),
        discard: selectDiscard(state),
        trade: selectTrade(state),
        targetable: selectTargetable(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        unselectCard: () => dispatch(unselectCard()),
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg)),
        disallowDiscard: () => dispatch(disallowDiscard()),
        disallowTrade: () => dispatch(disallowTrade()),
        toggleTradeFor: () => dispatch(toggleTradeFor()),
        setMonsterRegion: (regionInfo) => dispatch(setMonsterRegion(regionInfo)),
        toggleTargetable: () => dispatch(toggleTargetable())
     });
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
