// jshint esversion:6
import React from 'react';
import './top-nav-button.styles.scss';
// import { selectCurrentUser } from '../../redux/user/user.selectors';
import {  auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectPlayers } from '../../redux/players/player.selector';
import { logOutPlayer } from '../../redux/players/player.action';
import { setCurrentUser } from '../../redux/user/user.action';
import { setCurrentPlayer } from '../../redux/currentplayer/currentplayer.action';
import { selectStartButtonPressed } from '../../redux/startbutton/startbutton.selectors';
import { displayNewMessage } from '../../redux/console/console.action';

const TopNavButton = ({players, logOutPlayer, setCurrentUser, setCurrentPlayer, started, displayNewMessage}) => {
    const handleLogOut = () => {
        auth.signOut();
        logOutPlayer(socket.id);
        setCurrentUser('reset');
        socket.emit('logOutPlayer', socket.id);
        setCurrentPlayer('Player ' + socket.id.slice(0,4));
        socket.emit('setCurrentPlayer', socket.id);
    };

    const noSignIns = () => {
        displayNewMessage('NO SIGN-INS WHILE GAME IN PROGRESS.')
    };

    return (
        <div className='status-button-container'>
    {
        started ? 
        (
            players[socket.id] ? 
            (players[socket.id].logged ? 
                (<button className='status-button' onClick={handleLogOut}>LOG OUT</button>) 
                : 
                (<button className='status-button'><a className='shrinkText' onClick={noSignIns} href={'#'}>IN PROGRESS</a></button>)) 
                : 
                (<button className='status-button'><a className='shrinkText' onClick={noSignIns} href={'#'}>IN PROGRESS</a></button>)
        ) 
        : 
        (
            players[socket.id] ? 
            (players[socket.id].logged ? 
                (<button className='status-button' onClick={handleLogOut}>LOG OUT</button>) 
                : 
                (<button className='status-button'><a href={'/login'}>SIGN IN</a></button>)) 
                : 
                (<button className='status-button'><a href={'/login'}>SIGN IN</a></button>)
        )

    }
    </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        players: selectPlayers(state),
        started: selectStartButtonPressed(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOutPlayer: (id) => dispatch(logOutPlayer(id)),
        setCurrentUser: (player) => dispatch(setCurrentUser(player)),
        setCurrentPlayer: (name) => dispatch(setCurrentPlayer(name)),
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg))
    });
  };

export default connect(mapStateToProps, mapDispatchToProps)(TopNavButton);