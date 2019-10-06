// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as GoblinIcon } from '../../assets/images/monster-icons/goblin.svg';

const Goblin = () => {
    return (
        <div className='monster-container'>
            <GoblinIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default Goblin;