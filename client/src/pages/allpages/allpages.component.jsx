// jshint esversion:6
import React from 'react';
import './allpages.styles.scss';
import MainPage from '../mainpage/mainpage.component';
import LoginPage from '../loginpage/loginpage.component';
import LobbyPage from '../lobbypage/lobbypage.component';
import GamePage from '../gamepage/gamepage.component';
import { selectCurrentPage } from '../../redux/currentpage/currentpage.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const AllPages = ({currentpage}) => {
    return (
        <div className='loading-background'>
        {
            currentpage === '/' ? 
            (
              <MainPage/>
            ) 
            : 
            (
              null
            )
          }
          {
            currentpage === '/lobby' ? 
            (
              <LobbyPage/>
            ) 
            : 
            (
              null
            )
          }
          {
            currentpage === '/game' ? 
            (
              <GamePage/>
            ) 
            : 
            (
              null
            )
          }
          {
            currentpage === '/login' ? 
            (
              <LoginPage/>
            ) 
            : 
            (
              null
            )
          }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentpage: selectCurrentPage
  });

export default connect(mapStateToProps)(AllPages);