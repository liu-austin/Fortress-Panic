// jshint esversion:6
import React from 'react';
// import './homepage.styles.scss';
import './mainpage.styles.scss';

const MainPage = () => {
    return (
        <div className='main-background'>
            <div className='main-container'>
                <div className='main-title-container'>
                <h1 className='overhead-title-main'>FORTRESS PANIC</h1>
                </div>
                <div className='subtitle-container'>
                    <span className='subtitle'>A CO-OP MULTIPLAYER STRATEGY GAME</span>
                </div>
                <div className="main-content">
                    <button><a href={'/lobby'}>ENTER GAME LOBBY</a></button>
                    <button><a href={'/rules'}>GAME RULES</a></button>
                    <button><a href={'/about'}>ABOUT THIS GAME</a></button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;