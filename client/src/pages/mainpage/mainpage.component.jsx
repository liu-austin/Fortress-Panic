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
                    <button onClick={goToLobby}>ENTER GAME LOBBY</button>
                    <button>GAME RULES</button>
                    <button>ABOUT THIS GAME</button>
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

// <button><a href={'/lobby'}>ENTER GAME LOBBY</a></button>
// <button><a href={'/rules'}>GAME RULES</a></button>
// <button><a href={'/about'}>ABOUT THIS GAME</a></button>