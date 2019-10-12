// jshint esversion:6
import React from 'react';
import './swordsman-region.styles.scss';
import '../grid-regions.styles.scss';
import CastleTower from '../../castle-tower/castle-tower.component';
import CastleWall from '../../castle-wall/castle-wall.component';
import OgreMage from '../../monsters/ogre-mage.component';
import { handleClick } from '../grid-regions.utils';
import { connect } from 'react-redux';
import { selectDefensesInfo } from '../../../redux/defenses/defenses.selectors';

const SwordsmanRegion = ({defenses}) => {
    return (
        <div className="cn-wrapper swordsman opened-nav">
            <ul>
            {
                [6,1,2,3,4,5].map((num,i) => {
                    return (
                        <li key={i}>
                            <a className={`swordsman ${num}`} onClick={handleClick} href={'#'}>
                                <span>Swordsman</span>
                                {
                                    defenses ? 
                                    (
                                        defenses.filter(defense => {
                                            return (defense.name === 'Wall' && defense.location === 'castle ' + num);
                                        }).map(wall => <CastleWall/>)
                                    ) 
                                    : 
                                    (
                                        null
                                    )

                                }
                                {
                                    defenses ? 
                                    (
                                        defenses.filter(defense => {
                                            return (defense.name === 'Tower' && defense.location === 'castle ' + num);
                                        }).map(wall => <CastleTower/>)
                                    ) 
                                    : 
                                    (
                                        null
                                    )
                                }
                            </a>
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        defenses: selectDefensesInfo(state)
    });
};

export default connect(mapStateToProps)(SwordsmanRegion);