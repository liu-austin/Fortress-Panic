// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as OgreMageIcon } from '../../assets/images/monster-icons/ogre-mage.svg';

const OgreMage = () => {
    return (
        <div className='monster-container'>
            <OgreMageIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default OgreMage;