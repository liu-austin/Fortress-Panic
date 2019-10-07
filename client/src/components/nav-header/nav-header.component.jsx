// jshint esversion:6
import React from 'react';
import './nav-header.styles.scss';
import GameTitle from '../game-title/game-title.component';
import TopNavButton from '../top-nav-button/top-nav-button.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectPlayers } from '../../redux/players/player.selector';

const NavHeader = ({currentUser}) => {
    if (currentUser) {
        socket.emit('playerLogin', [socket.id, currentUser.displayName.toUpperCase().slice(0, 10)]);
    } 
    //     socket.emit('playerLogin', [socket.id, 'Player ' + Object.keys(players).indexOf(socket.id)]);
    return (
        <div className="topnav sticky">
            <GameTitle/>
            <a className='menu-item' href="#gamerules">GAME RULES</a>
            <a className='menu-item' href="#lobby">LOBBY</a>
            <a className='menu-item' href="#about">ABOUT</a>
            <div className='sign-in-container'>
            {
                currentUser ? (
                    <p>HELLO {(currentUser.displayName ? currentUser.displayName.toUpperCase() : 'USER')}</p>
                    ) : (
                    <p>ANONYMOUS USER</p>
                    )
            }
            </div>
            <TopNavButton/>
      </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        currentUser: selectCurrentUser(state)
        // players: selectPlayers(state)
    });
};

export default connect(mapStateToProps)(NavHeader);