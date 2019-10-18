import React from 'react';
import './game-title.styles.scss';

const GameTitle = () => {
    return (
        <div className='home-title-container'>
            <div className='title-container'>
                <a className='go-to-main' href={'/'}>
                    <h1 className='overhead-title'>FORTRESS PANIC</h1>
                </a>
            </div>
        </div>    
    );
};

export default GameTitle;