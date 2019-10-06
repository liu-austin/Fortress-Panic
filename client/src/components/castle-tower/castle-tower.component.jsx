import React from 'react';
import './castle-tower.styles.scss';

const CastleTower = () => {
    return (
        <div className='castle-tower-container'>
            <img className='castle-tower' src={require('../../assets/images/fortress/fortress-tower.png')} alt='fortress-tower'/>
        </div>
    );
};

export default CastleTower;