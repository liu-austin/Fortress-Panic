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
                    <span className='subtitle'>AN ONLINE CO-OP TOWER DEFENSE GAME</span>
                </div>
                <div className="main-content">
                    <button onClick={goToLobby}>ENTER GAME LOBBY</button>
                    <button onClick={goToRules}>GAME RULES</button>
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
