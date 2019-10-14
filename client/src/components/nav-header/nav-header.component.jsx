// jshint esversion:8
import React from 'react';
import './nav-header.styles.scss';
import GameTitle from '../game-title/game-title.component';
import TopNavButton from '../top-nav-button/top-nav-button.component';
import { connect } from 'react-redux';
// import { selectCurrentUser } from '../../redux/user/user.selectors';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectPlayers } from '../../redux/players/player.selector';
import { addPlayer, updatePlayerName, retrievePlayers, removePlayer, logOutPlayer, updatePlayerCards, setPlayerTurnActive, setPlayerTurnInactive } from '../../redux/players/player.action';
import { auth } from '../../firebase/firebase.utils';
import { setSelectedPlayer } from '../../redux/selectedplayer/selectedplayer.action';
import { setCurrentUser } from '../../redux/user/user.action';
import { forceNextPhase } from '../../redux/gamephase/gamephase.action';
import { pressStartButton } from '../../redux/startbutton/startbutton.action';
import { setCurrentPlayer } from '../../redux/currentplayer/currentplayer.action';
import { getDefenses } from '../../redux/defenses/defenses.action';
import { getMonsters, setMonsterRegion } from '../../redux/monsters/monsters.action';
import { allowDiscard, allowTrade, toggleTradeHud, unselectCard, selectCardInfo, setTradeTarget, toggleTargetable, toggleMissing, toggleNiceShot } from '../../redux/selectedcard/selectedcard.action';
import { displayNewMessage } from '../../redux/console/console.action';

const NavHeader = ({players, updatePlayerName, retrievePlayers, addPlayer, removePlayer, logOutPlayer, setSelectedPlayer, setCurrentUser, forceNextPhase, 
  updatePlayerCards, pressStartButton, setCurrentPlayer, setPlayerTurnActive, setPlayerTurnInactive, getDefenses, getMonsters, allowDiscard, allowTrade,
  toggleTradeHud, unselectCard, selectCardInfo, setTradeTarget, displayNewMessage, setMonsterRegion, toggleMissing, toggleTargetable, toggleNiceShot}) => {

  const host = 'http://localhost:9000/';

    socket.removeAllListeners('startClientDrawPhase');
    socket.removeAllListeners('startDisconnectDrawPhase');
    socket.removeAllListeners('startClientDiscardPhase');
    socket.removeAllListeners('startClientTradePhase');
    socket.removeAllListeners('startClientPlayPhase');
    socket.removeAllListeners('updateDisplayName');
    socket.removeAllListeners('isStartedResponse');
    socket.removeAllListeners('currentPlayers');
    socket.removeAllListeners('getIDs');
    socket.removeAllListeners('newPlayer');
    socket.removeAllListeners('nextPhase');
    socket.removeAllListeners('setCurrentPlayer');
    socket.removeAllListeners('logOutPlayer');
    socket.removeAllListeners('updateLoginName');
    socket.removeAllListeners('updatePlayerCards');
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('getDefenses');
    socket.removeAllListeners('getMonsters');
    socket.removeAllListeners('allowDiscard');
    socket.removeAllListeners('allowTrade');
    socket.removeAllListeners('initiateTrade');
    socket.removeAllListeners('displayTradeResult');
    socket.removeAllListeners('playHitCard');
    socket.removeAllListeners('playSlayerCard');

    socket.on('updateDisplayName', function(displayNameInfo) {
        if (displayNameInfo[0] !== null) {
          updatePlayerName(displayNameInfo[0], displayNameInfo[1]);
        }
      });

      socket.on('isStartedResponse', function(started) {
        if (started) {
          pressStartButton();
        }
      });

      socket.on('currentPlayers', function(players) {
        retrievePlayers(players);
      });

      socket.on('getDefenses', function() {
        fetch(host + 'findDefenses')
        .then(response => response.json())
        .then(alldefenses => alldefenses.filter(defense => defense.active))
        .then(data => getDefenses(data));
      });

      socket.on('getMonsters', function() {
        fetch(host + 'findMonsters')
        .then(response => response.json())
        .then(data => getMonsters(data));
      });

      socket.on('newPlayer', function(playerInfo) {
        addPlayer(playerInfo);
        socket.emit('cardUpdate', socket.id);
      });

      socket.on('nextPhase', function() {
        forceNextPhase();
      });

      socket.on('allowDiscard', function() {
        allowDiscard();
      });

      socket.on('allowTrade', function() {
        allowTrade();
      });

      socket.on('setCurrentPlayer', function(playerID) {
        setCurrentPlayer(players[playerID].displayName);
        setPlayerTurnActive(playerID);
      });

      socket.on('setPlayerInactive', function(id) {
        setPlayerTurnInactive(id);
      });

      socket.on('logOutPlayer', function(id) {
        logOutPlayer(id);
      });

      socket.on('updateLoginName', function(id) {
        setSelectedPlayer(id);
      });

      socket.on('getIDs', function() {
        socket.emit('returnID', socket.id);
      });

      socket.on('updatePlayerCards', function(id) {
        fetch(host + 'findPlayerCards')
          .then(response => response.json())
          .then(allcards => allcards.filter(card => card.position === id))
          .then(data => updatePlayerCards(id, data));
      });

      socket.on('initiateTrade', function(obj) {
        if (obj[1].position === socket.id) {
          unselectCard();
          selectCardInfo(obj[0]);
          setTradeTarget(obj[1]);
          setTimeout(function() {
            toggleTradeHud();
          }, 750);
        }
      });

      socket.on('displayTradeResult', function(obj) {
        if (socket.id === obj[0]) {
          displayNewMessage(obj[1]);
        }
      });

      socket.on('playHitCard', function(obj) {
        if (socket.id === obj[0]) {
          setMonsterRegion(obj[1]);
          toggleTargetable();
          displayNewMessage('SELECT A VALID MONSTER.');
        }
      });

      socket.on('playSlayerCard', function(obj) {
        if (socket.id === obj[0]) {
          setMonsterRegion(obj[1]);
          toggleTargetable();
          toggleNiceShot();
          displayNewMessage('SELECT A VALID MONSTER.');
        }
      });

      socket.on('startClientDrawPhase', function(playerID) {
        socket.emit('startDrawPhase', playerID);
      });

      socket.on('startDisconnectDrawPhase', function(playerID) {
        if (socket.id === playerID) {
          socket.emit('startDrawPhase', playerID);
        }
      });

      socket.on('startClientDiscardPhase', function(playerID) {
        socket.emit('startDiscardPhase', playerID);
      });

      socket.on('startClientTradePhase', function(playerID) {
        socket.emit('startTradePhase', playerID);
      });

      socket.on('startClientPlayPhase', function(playerID) {
        socket.emit('startPlayPhase', playerID);
      });

      socket.on('disconnect', function(id) {
        removePlayer(id);
        if (socket.id === id) {
          auth.signOut();
          setCurrentUser(null);
        }
        socket.emit('cardUpdate', socket.id);
      });

    return (
        <div className="topnav sticky">
            <GameTitle/>
            <a className='menu-item' href="#gamerules">GAME RULES</a>
            <a className='menu-item' href="#lobby">LOBBY</a>
            <a className='menu-item' href="#about">ABOUT</a>
            <div className='sign-in-container'>
            {
                players[socket.id] ? (
                    <p>Hello {(players[socket.id] ? players[socket.id].displayName : 'USER')}</p>
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
        forceNextPhase: () => dispatch(forceNextPhase()),
        updatePlayerCards: (id, cards) => dispatch(updatePlayerCards(id, cards)),
        pressStartButton: () => dispatch(pressStartButton()),
        setCurrentPlayer: (playerName) => dispatch(setCurrentPlayer(playerName)),
        setPlayerTurnActive: (id) => dispatch(setPlayerTurnActive(id)),
        setPlayerTurnInactive: (id) => dispatch(setPlayerTurnInactive(id)),
        getDefenses: (defenses) => dispatch(getDefenses(defenses)),
        getMonsters: (monsters) => dispatch(getMonsters(monsters)),
        allowDiscard: () => dispatch(allowDiscard()),
        allowTrade: () => dispatch(allowTrade()),
        toggleTradeHud: () => dispatch(toggleTradeHud()),
        unselectCard: () => dispatch(unselectCard()),
        selectCardInfo: (cardInfo) => dispatch(selectCardInfo(cardInfo)),
        setTradeTarget: (cardInfo) => dispatch(setTradeTarget(cardInfo)),
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg)),
        setMonsterRegion: (regionInfo) => dispatch(setMonsterRegion(regionInfo)),
        toggleNiceShot: () => dispatch(toggleNiceShot()),
        toggleMissing: () => dispatch(toggleMissing()),
        toggleTargetable: () => dispatch(toggleTargetable())
    });
  };

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);