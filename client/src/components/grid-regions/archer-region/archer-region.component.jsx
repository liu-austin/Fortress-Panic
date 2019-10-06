// jshint esversion:6
import React from 'react';
import './archer-region.styles.scss';
import '../grid-regions.styles.scss';
import OgreMage from '../../monsters/ogre-mage.component';
import { handleClick } from '../grid-regions.utils';

const ArcherRegion = () => {
    return (
        <div className="cn-wrapper archer opened-nav">
            <ul>
            {
            [6,1,2,3,4,5].map((num,i) => <li key={i}><a className={`archer ${num}`} onClick={handleClick} href={'#'}><span>Archer</span><OgreMage /></a></li>)
            }
            </ul>
        </div>
    );
};

export default ArcherRegion;

