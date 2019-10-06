// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as GoblinKingIcon } from '../../assets/images/monster-icons/goblin-king.svg';

const GoblinKing = () => {
    return (
        <div className='monster-container'>
            <GoblinKingIcon className='monster'/>
            <div className='hit-points'>
            <p>1</p>
            </div>
        </div>
    );
};

export default GoblinKing;