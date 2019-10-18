// jshint esversion:6
import React from 'react';
import './endconditiondisplay.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { closeEndGameHud } from '../../redux/endcondition/endcondition.action';
import { selectWin, selectLose, selectHighScorePlayerId } from '../../redux/endcondition/endcondition.selectors';
import { selectPlayers } from '../../redux/players/player.selector';
import { withRouter } from 'react-router-dom';

const EndConditionDisplay = ({win, players, history, id}) => {
    const exitGame = () => {
        socket.emit('startResetGame');
        setTimeout(function() {
            history.push('/');
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
                    <span>{'HIGH SCORE: ' + players[id].points + ' - ' + players[id].displayName}</span>
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
        id: selectHighScorePlayerId(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        closeEndGameHud: () => dispatch(closeEndGameHud())
     });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EndConditionDisplay));