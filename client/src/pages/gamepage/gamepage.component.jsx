// jshint esversion:6
import React from 'react';
import './gamepage.styles.scss';
import GameBoard from '../../components/gameboard/gameboard.component';
import RotationPanel from '../../components/rotation-panel/rotation-panel.component';
import GameConsolePanel from '../../components/game-console-panel/game-console-panel.component';
import ChatBox from '../../components/chatbox/chatbox.component';
import PlayerCardsPanel from '../../components/player-cards-panel/player-cards-panel.component';
import Card from '../../components/card/card.component';
import MonsterDisplay from '../../components/monster-display/monster-display.component';

const GamePage = () => {
    return (
        <div className='game-container'>
            <div className='gameboard-container shrink'>
                <GameBoard />
                <RotationPanel/>
            </div>
            <div className='game-console-container'>
                <GameConsolePanel/>
            </div>
            <div className='card-panel-container'>
                <PlayerCardsPanel/>
            </div>
            <div className='selected-card-container'>
                <Card/>
            </div>
            <div className='monster-info-container'>
                <MonsterDisplay/>
            </div>
            <div className='chatbox-panel-container'>
                <ChatBox/>
            </div>
        </div>
    );
};

export default GamePage;