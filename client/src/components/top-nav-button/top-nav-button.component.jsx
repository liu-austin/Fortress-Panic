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

const TopNavButton = ({players, logOutPlayer, setCurrentUser}) => {
    const handleLogOut = () => {
        auth.signOut();
        logOutPlayer(socket.id);
        setCurrentUser('reset');
        socket.emit('logOutPlayer', socket.id);
    };
    return (
        <div className='status-button-container'>
    {
        players[socket.id] ? 
            (players[socket.id].logged ? 
                (<button className='status-button' onClick={handleLogOut}>LOG OUT</button>) 
                : 
                (<button className='status-button'><a href={'/login'}>SIGN IN</a></button>)) 
                : 
                (<button className='status-button'><a href={'/login'}>SIGN IN</a></button>)
    }
    </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        players: selectPlayers(state)
        // currentUser: selectCurrentUser(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        logOutPlayer: (id) => dispatch(logOutPlayer(id)),
        setCurrentUser: (player) => dispatch(setCurrentUser(player))
    });
  };

export default connect(mapStateToProps, mapDispatchToProps)(TopNavButton);