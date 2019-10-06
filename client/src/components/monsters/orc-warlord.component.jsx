// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as OrcWarlordIcon } from '../../assets/images/monster-icons/orc-warlord.svg';

const OrcWarlord = () => {
    return (
        <div className='monster-container'>
            <OrcWarlordIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default OrcWarlord;