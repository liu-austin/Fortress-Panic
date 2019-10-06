// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as HealerIcon } from '../../assets/images/monster-icons/healer.svg';

const Healer = () => {
    return (
        <div className='monster-container'>
            <HealerIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default Healer;