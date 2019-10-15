// jshint esversion:6
import React from 'react';
import './monster-display.styles.scss';

const MonsterDisplay = ({ monsterInfo }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    return (
        <div>
        {
            monsterInfo.length ?
            (
                <div className='monster-display-container'>
                    <div className="monster-display-title">
                        <p className='name' >MONSTERS SPAWNED</p>
                    </div>
                    {
                        monsterInfo.map(monster => {
                            return (
                                <div className='monster-card'>
                                    <div className="monster-name">
                                        <p>{monster.name}</p>
                                    </div>
                                    <div className='monster-type'>
                                        <p>MONSTER TYPE: {monster.type}</p>
                                    </div>
                                    <div className='monster-effect'>
                                    <p className='monster-text'>MONSTER EFFECT: {monster.description}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            ) 
            : 
            (
                null
            )
        }
        </div>
    );
};

export default MonsterDisplay;
