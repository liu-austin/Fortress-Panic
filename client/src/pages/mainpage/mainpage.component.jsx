// jshint esversion:6
import React from 'react';
// import './homepage.styles.scss';
import './mainpage.styles.scss';
import { connect } from 'react-redux';
import { setCurrentPage } from '../../redux/currentpage/currentpage.action';

const MainPage = ({setCurrentPage}) => {
    const goToLobby = () => {
        setCurrentPage('/lobby');
    };

    const goToRules = () => {
        setCurrentPage('/rules');
    };
    return (
        <div className='main-background'>
            <div className='main-container'>
                <div className='main-title-container'>
                <h1 className='overhead-title-main'>FORTRESS PANIC</h1>
                </div>
                <div className='subtitle-container'>
                    <span className='subtitle'>AN ONLINE STRATEGY TOWER DEFENSE GAME</span>
                </div>
                <div className="main-content">
                    <button onClick={goToLobby}>ENTER GAME LOBBY</button>
                    <button onClick={goToRules}>GAME RULES</button>
                    <button onClick={() => alert('Welcome To Fortress Panic! A online recreation of the popular board game Castle Panic! with some streamlined additions. All art assets are modified to be under fair use or found through Creative Commons. This game is not monetized in any way. Created by Austin Liu.')}>ABOUT THIS GAME</button>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return ({
        setCurrentPage: (page) => dispatch(setCurrentPage(page))
    });
  };

export default connect(null, mapDispatchToProps)(MainPage);
