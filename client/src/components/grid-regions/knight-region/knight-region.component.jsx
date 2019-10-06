// jshint esversion:6
import React from 'react';
import './knight-region.styles.scss';
import '../grid-regions.styles.scss';
import OgreMage from '../../monsters/ogre-mage.component';
import { handleClick } from '../grid-regions.utils';

const KnightRegion = () => {
    return (
        <div className="cn-wrapper knight opened-nav">
            <ul>
            {
                [6,1,2,3,4,5].map((num,i) => <li key={i}><a className={`knight ${num}`} onClick={handleClick} href={'#'}><span>Knight</span><OgreMage /></a></li>)
                }
            </ul>
        </div>
    );
};

export default KnightRegion;