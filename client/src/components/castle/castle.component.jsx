// jshint esversion:6
import React from 'react';
import './castle.styles.scss';
import { connect } from 'react-redux';
import { pressStartButton } from '../../redux/startbutton/startbutton.action';
import { selectStartButtonPressed } from '../../redux/startbutton/startbutton.selectors';

const Castle = ({ pressStartButton, startButtonPressed }) => {
    return (
        <div className='hex-container'>
        {
            startButtonPressed ? (
                <div className='hexagon-xl hexagon-default hexagon-hover'></div>
            ) : (                    
            <div className='floating hexagon-xl hexagon-start' onClick={pressStartButton}>
                <div className='text-container'>
                    <h1 className='glow'>START</h1>
                </div>
            </div>
            )          
        }
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        startButtonPressed: selectStartButtonPressed(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        pressStartButton: () => dispatch(pressStartButton())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Castle);