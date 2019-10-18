// jshint esversion:6
import React from 'react';
import './game-title.styles.scss';
import { setCurrentPage } from '../../redux/currentpage/currentpage.action';
import { connect } from 'react-redux';

const GameTitle = ({setCurrentPage}) => {
    const goToMain = () => {
        setCurrentPage('/');
    };
    return (
        <div onClick={goToMain} className='home-title-container'>
            <div className='title-container'>
                <h1 className='overhead-title'>FORTRESS PANIC</h1>
            </div>
        </div>    
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        setCurrentPage: (page) => dispatch(setCurrentPage(page))
     });
};

export default connect(null, mapDispatchToProps)(GameTitle);