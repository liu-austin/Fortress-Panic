// jshint esversion:6
import React from 'react';
import './rotation-panel.styles.scss';
import { connect } from 'react-redux';
import { rotateClockwise, rotateCounterClockwise } from '../../redux/rotation/rotation.action';

const RotationPanel = ({ rotateClockwise, rotateCounterClockwise }) => {
    return (
        <div className='rotation-panel'>
            <h1>ROTATE BOARD</h1>
            <div className='arrow-left-container'><a className="arrow arrow-left" title="Clockwise" onClick={rotateClockwise} href={'#ss'}></a></div>
            <div className='arrow-right-container'><a className="arrow arrow-right" title="Counterclockwise" onClick={rotateCounterClockwise} href={'#sd'}></a></div>
      </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return({
        rotateClockwise: () => dispatch(rotateClockwise()),
        rotateCounterClockwise: () => dispatch(rotateCounterClockwise())
    });
};

export default connect(null, mapDispatchToProps)(RotationPanel);