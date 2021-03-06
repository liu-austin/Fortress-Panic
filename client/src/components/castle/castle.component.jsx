// jshint esversion:6
import React from 'react';
import './castle.styles.scss';
import { connect } from 'react-redux';
import { pressStartButton } from '../../redux/startbutton/startbutton.action';
import { selectStartButtonPressed } from '../../redux/startbutton/startbutton.selectors';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { displayNewMessage } from '../../redux/console/console.action';
import { selectNamespace } from '../../redux/namespace/namespace.selectors';

const Castle = ({ pressStartButton, startButtonPressed, displayNewMessage, namespace }) => {
    socket.removeAllListeners('firstStartButtonPress');
    socket.removeAllListeners('otherPlayerStartedGame');
    socket.on('hasGameStarted', function(started) {
        if (started) {
            pressStartButton();
        }
    });

    const firstStartButtonPress = () => {
        socket.emit('firstStartButtonPress', namespace);
        pressStartButton();
        displayNewMessage('THE GAME HAS STARTED.');
    };

    socket.on('otherPlayerStartedGame', function() {
        pressStartButton();
        displayNewMessage('THE GAME HAS STARTED.');
    });
    return (
        <div className='hex-container'>
        {
            startButtonPressed ? (
                null// <div className='hexagon-xl hexagon-default hexagon-hover'></div>
            ) : (                    
            <div className='floating hexagon-xl hexagon-start' onClick={firstStartButtonPress}>
                <div className='text-container'>
                    <h1 className='glow'>START</h1>
                </div>
            </div>
            )          
        }
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        startButtonPressed: selectStartButtonPressed(state),
        namespace: selectNamespace(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        pressStartButton: () => dispatch(pressStartButton()),
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Castle);