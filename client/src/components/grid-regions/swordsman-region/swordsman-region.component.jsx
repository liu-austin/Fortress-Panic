// jshint esversion:6
import React from 'react';
import './swordsman-region.styles.scss';
import '../grid-regions.styles.scss';
import CastleTower from '../../castle-tower/castle-tower.component';
import CastleWall from '../../castle-wall/castle-wall.component';
import Goblin from '../../monsters/goblin.component';
import Orc from '../../monsters/orc.component';
import Troll from '../../monsters/troll.component';
import GoblinKing from '../../monsters/goblin-king.component';
import OrcWarlord from '../../monsters/orc-warlord.component';
import Shaman from '../../monsters/shaman.component';
import OgreMage from '../../monsters/ogre-mage.component';
import { handleClick } from '../grid-regions.utils';
import { connect } from 'react-redux';
import { selectDefensesInfo } from '../../../redux/defenses/defenses.selectors';

const SwordsmanRegion = ({defenses, monsters}) => {
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
                                    monsters ? 
                                    (
                                        monsters.filter(monster => monster.location === 'swordsman ' + num).map(m => {
                                            if (m.name === 'Goblin') {
                                                return <Goblin id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            } else if (m.name === 'Orc') {
                                                return <Orc id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            } else if (m.name === 'Troll') {
                                                return <Troll id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            } else if (m.name === 'Goblin King') {
                                                return <GoblinKing id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            } else if (m.name === 'Orc Warlord') {
                                                return <OrcWarlord id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            } else if (m.name === 'Shaman') {
                                                return <Shaman id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            } else if (m.name === 'Ogre Mage') {
                                                return <OgreMage id={m._id} hitpoints={m.hitpoints} location={m.location}/>
                                            }
                                        })
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