// jshint esversion:6
import React from 'react';
import './forest-region.styles.scss';
import '../grid-regions.styles.scss';
import OgreMage from '../../monsters/ogre-mage.component';
import { handleClick } from '../grid-regions.utils';

const ForestRegion = () => {
    return (
        <div className="cn-wrapper forest opened-nav">
            <ul>
            {
                [6,1,2,3,4,5].map((num,i) => <li key={i}><a className={`forest ${num}`} onClick={handleClick} href={'#'}><span>FOREST</span><OgreMage /></a></li>)
            }
            </ul>
        </div>
    );
};

export default ForestRegion;