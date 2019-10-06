// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as OrcIcon } from '../../assets/images/monster-icons/orc.svg';

const Orc = () => {
    return (
        <div className='monster-container'>
            <OrcIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default Orc;