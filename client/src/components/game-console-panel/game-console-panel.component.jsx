// jshint esversion:6
import React from 'react';
import './game-console-panel.styles.scss';
import { connect } from 'react-redux';
import { selectCurrentPhase } from '../../redux/gamephase/gamephase.selectors';
import { goToNextPhase, setNextPhase } from '../../redux/gamephase/gamephase.action';
import { selectConsoleMessage } from '../../redux/console/console.selectors';
import { GamePhases, IsSkippable } from '../../redux/gamephase/gamephase.utils';
import { displayNewMessage } from '../../redux/console/console.action';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { setCurrentPlayer } from '../../redux/currentplayer/currentplayer.action';
import { selectCurrentPlayerName } from '../../redux/currentplayer/currentplayer.selectors';
import { selectPlayers } from '../../redux/players/player.selector';

const GameConsolePanel = ({ players, currentPhase, goToNextPhase, setNextPhase, consoleMessage, displayNewMessage, currentPlayer, setCurrentPlayer }) => {
    socket.removeAllListeners('getCurrentPhase');
    socket.removeAllListeners('setCurrentPhase');
    socket.removeAllListeners('getCurrentPlayer');
    socket.removeAllListeners('updateCurrentPlayer');

    socket.on('getCurrentPhase', function(id) {
        socket.emit('returnCurrentPhase', [id, currentPhase]);
    });

    socket.on('getCurrentPlayer', function(id) {
        socket.emit('returnCurrentPlayer', [id, currentPlayer]);
    });

    socket.on('setCurrentPhase', function(obj) {
        if (socket.id === obj[0]) {
            setNextPhase(obj[1]);
        }
    });

    socket.on('updateCurrentPlayer', function(obj) {
        if (socket.id === obj[0]) {
            setCurrentPlayer(obj[1]);
        }
    });

    const handleClick = () => {
        if (players[socket.id].displayName !== currentPlayer) {
            displayNewMessage("IT'S NOT YOUR TURN.");
        } else {
            goToNextPhase();
            if (!IsSkippable[GamePhases.indexOf(currentPhase)]) {
                displayNewMessage('CANNOT SKIP THIS PHASE.');
            } else {
                socket.emit('goToNextPhase');
            }
        }
    };

    return (
        <div className='game-console-panel-container sticky'>
            <div className='game-turn-phase-container'>
                <table className='game-turn-phase-table'>
                    <tbody>
                        <tr>
                            <th>PLAYER TURN</th>
                            <th>GAME PHASE</th>
                            <th>END / SKIP PHASE</th>
                            <th>MONSTERS LEFT</th>
                        </tr>
                        <tr>
                            <td>{currentPlayer}</td>
                            <td>{currentPhase}</td>
                            <td><button className='end-phase-button' onClick={handleClick}>NEXT PHASE</button></td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='console-message-container'>
                <p className='console-message'>CONSOLE: {consoleMessage}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        currentPhase: selectCurrentPhase(state),
        consoleMessage: selectConsoleMessage(state),
        currentPlayer: selectCurrentPlayerName(state),
        players: selectPlayers(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg)),
        goToNextPhase: () => dispatch(goToNextPhase()),
        setNextPhase: (phase) => dispatch(setNextPhase(phase)),
        setCurrentPlayer: (name) => dispatch(setCurrentPlayer(name))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(GameConsolePanel);