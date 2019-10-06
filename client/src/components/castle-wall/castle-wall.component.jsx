import React from 'react';
import './castle-wall.styles.scss';

const Castlewall = () => {
    return (
        <div className='castle-wall-container'>
            <img className='castle-wall' src={require('../../assets/images/fortress/fortress-wall.png')} alt='fortress-wall'/>
        </div>
    );
};

export default Castlewall;