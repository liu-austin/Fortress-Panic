// jshint esversion:6
import React from 'react';
import './nav-header.styles.scss';
import GameTitle from '../game-title/game-title.component';
import TopNavButton from '../top-nav-button/top-nav-button.component';
import { connect } from 'react-redux';
// import { selectCurrentUser } from '../../redux/user/user.selectors';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectPlayers } from '../../redux/players/player.selector';
import { addPlayer, updatePlayerName, retrievePlayers, removePlayer, logOutPlayer } from '../../redux/players/player.action';
import { auth } from '../../firebase/firebase.utils';
import { setSelectedPlayer } from '../../redux/selectedplayer/selectedplayer.action';
import { setCurrentUser } from '../../redux/user/user.action';

const NavHeader = ({players, updatePlayerName, retrievePlayers, addPlayer, removePlayer, logOutPlayer, setSelectedPlayer, setCurrentUser, addMessage}) => {
    socket.on('updateDisplayName', function(displayNameInfo) {
        updatePlayerName(displayNameInfo[0], displayNameInfo[1]);
      });

      socket.on('currentPlayers', function(players) {
        retrievePlayers(players);
      });

      socket.on('newPlayer', function(playerInfo) {
        addPlayer(playerInfo);
      });

      socket.on('logOutPlayer', function(id) {
          logOutPlayer(id);
      });

      socket.on('disconnect', function(id) {
        removePlayer(id);
        if (socket.id === id) {
          auth.signOut();
          setCurrentUser(null);
        }
      });

      socket.on('updateLoginName', function(id) {
        console.log(id);
        setSelectedPlayer(id);
      });

    //   socket.on('successfulLogin', function(id) {
    //       console.log('hi');
    //       if (socket.id === id) {
    //          auth.onAuthStateChanged(async userAuth => {
    //             if (userAuth) {
    //               // userAuth represents a signed-in user so set that to current user
    //               const userRef = await createUserProfileDocument(userAuth);
          
    //               userRef.onSnapshot(snapShot => {
    //                 updatePlayerName(socket.id, snapShot.displayName.slice(0,10));
    //                 socket.broadcast.emit('updateDisplayName', [socket.id, snapShot.displayName.slice(0,10)]);
    //               });
    //             } 
    //           });
    //       }
    //   });
    //     socket.emit('playerLogin', [socket.id, 'Player ' + Object.keys(players).indexOf(socket.id)]);
    return (
        <div className="topnav sticky">
            <GameTitle/>
            <a className='menu-item' href="#gamerules">GAME RULES</a>
            <a className='menu-item' href="#lobby">LOBBY</a>
            <a className='menu-item' href="#about">ABOUT</a>
            <div className='sign-in-container'>
            {
                players[socket.id] ? (
                    <p>HELLO {(players[socket.id] ? players[socket.id].displayName.toUpperCase() : 'USER')}</p>
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
        players: selectPlayers(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        addPlayer: (player) => dispatch(addPlayer(player)),
        updatePlayerName: (id, displayName) => dispatch(updatePlayerName(id, displayName)),
        retrievePlayers: (players) => dispatch(retrievePlayers(players)),
        removePlayer: (player) => dispatch(removePlayer(player)),
        logOutPlayer: (id) => dispatch(logOutPlayer(id)),
        setSelectedPlayer: (id) => dispatch(setSelectedPlayer(id)),
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    });
  };

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);