// jshint esversion:6
import React from 'react';
import './swordsman-region.styles.scss';
import '../grid-regions.styles.scss';
import CastleTower from '../../castle-tower/castle-tower.component';
import CastleWall from '../../castle-wall/castle-wall.component';
import OgreMage from '../../monsters/ogre-mage.component';
import { handleClick } from '../grid-regions.utils';

const SwordsmanRegion = () => {
    return (
        <div className="cn-wrapper swordsman opened-nav">
            <ul>
            {
                [6,1,2,3,4,5].map((num,i) => <li key={i}><a className={`swordsman ${num}`} onClick={handleClick} href={'#'}><span>Swordsman</span><OgreMage /><CastleWall/><CastleTower/></a></li>)
            }
            </ul>
        </div>
    );
};

export default SwordsmanRegion;