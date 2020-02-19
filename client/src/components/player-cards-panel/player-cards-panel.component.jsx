// jshint esversion:8
import React from 'react';
import './player-cards-panel.styles.scss';
import { connect } from 'react-redux';
import CardOverview from '../cardoverview/cardoverview.component';
import { selectPlayers } from '../../redux/players/player.selector';
import { retrievePlayers, updatePlayerName } from '../../redux/players/player.action';
import { socket } from '../../assets/socketIO/socketIO.utils';

const PlayerCardsPanel = ({players, retrievePlayers}) => {
    socket.removeAllListeners('disconnectUpdate');
    socket.removeAllListeners('changeName');
    socket.on('disconnectUpdate', function(updatedPlayers) {
        retrievePlayers(updatedPlayers);
    });

    socket.on('changeName', function(obj) {
        updatePlayerName(obj[0], obj[1]);
    });
    return (
        <div className='player-cards-panel-container'>
        {
            Object.keys(players).length ? (
                Object.keys(players).map((player, i) => {
                    return (
                        <div key={i}>
                        {
                                <div className='player-display'>
                                    <div className='player-hud'>
                                        <div className='score-container'>
                                            <span className='display-name'>{players[player] ? players[player].displayName : null}</span>
                                            <br/>
                                            <span className='display-points'>POINTS: {players[player] ? players[player].points : null}</span>
                                        </div>
                                    </div>
                                    <div className='hand-container'>
                                    {
                                        players[player].playerCards ? 
                                            (players[player].playerCards.map((card, j) => {
                                            return (
                                                <CardOverview key={j} cardInfo={card}/>
                                            );
                                            })) 
                                        : 
                                        (null)
                                    }
                                    </div>
                                </div>
                        }
                        </div>
                    );
                })
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
        players: selectPlayers(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        retrievePlayers: (newPlayers) => dispatch(retrievePlayers(newPlayers)),
        updatePlayerName: (id, name) => dispatch(updatePlayerName(id, name))
     });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCardsPanel);