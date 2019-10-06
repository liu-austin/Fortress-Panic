// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as TrollIcon } from '../../assets/images/monster-icons/troll.svg';

const Troll = () => {
    return (
        <div className='monster-container'>
            <TrollIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default Troll;