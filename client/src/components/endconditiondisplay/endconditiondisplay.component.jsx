// jshint esversion:6
import React from 'react';
import './endconditiondisplay.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { closeEndGameHud } from '../../redux/endcondition/endcondition.action';
import { selectWin, selectLose, selectHighScorePlayerId } from '../../redux/endcondition/endcondition.selectors';
import { selectPlayers } from '../../redux/players/player.selector';
import { setCurrentPage } from '../../redux/currentpage/currentpage.action';
import { selectNamespace } from '../../redux/namespace/namespace.selectors';
import { setNamespace } from '../../redux/namespace/namespace.action';

const EndConditionDisplay = ({win, players, setCurrentPage, id, namespace, setNamespace}) => {
    const exitGame = () => {
        socket.emit('startResetGame');
        setNamespace(socket.id);
        setTimeout(function() {
            setCurrentPage('/');
            socket.emit('leave', namespace);
        }, 500);
    };
    return (
        <div className='endConditionContainer'>
            <div className='endConditionContentHud'>
                <div className='titleHud'>
                {
                    win ? 
                    (
                        <span>CONGRATULATIONS. YOU WON!</span>
                    ) 
                    : 
                    (
                        <span>GAME OVER. TRY AGAIN.</span>
                    )
                }
                </div>
                <div className='highScoreHud'>
                    <span>
                    {
                        players[id] ? 
                        (
                            'HIGH SCORE: ' + players[id].points + ' - ' + players[id].displayName
                        )
                        :
                        (
                            null
                        )
                    }
                    </span>
                </div>
                <div className='exitButtonHud'>
                    <button onClick={exitGame}><a href={'#main'} >GO TO MAIN MENU</a></button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        players: selectPlayers(state),
        win: selectWin(state),
        lose: selectLose(state),
        id: selectHighScorePlayerId(state),
        namespace: selectNamespace(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        closeEndGameHud: () => dispatch(closeEndGameHud()),
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),
        setNamespace: (ns) => dispatch(setNamespace(ns))
     });
};

export default connect(mapStateToProps, mapDispatchToProps)(EndConditionDisplay);