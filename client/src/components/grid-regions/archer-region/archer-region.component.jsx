// jshint esversion:6
import React from 'react';
import './archer-region.styles.scss';
import '../grid-regions.styles.scss';
import Goblin from '../../monsters/goblin.component';
import Orc from '../../monsters/orc.component';
import Troll from '../../monsters/troll.component';
import GoblinKing from '../../monsters/goblin-king.component';
import OrcWarlord from '../../monsters/orc-warlord.component';
import Shaman from '../../monsters/shaman.component';
import OgreMage from '../../monsters/ogre-mage.component';

const ArcherRegion = ({monsters}) => {
    return (
        <div className="cn-wrapper archer opened-nav">
            <ul>
            {
                [6,1,2,3,4,5].map((num,i) => {
                    return (
                        <li key={i}>
                            <a className={`archer ${num}`} href={'#'}>
                                <span>Archer</span>
                                {
                                    monsters ? 
                                    (
                                        monsters.filter(monster => monster.location === 'archer ' + num).map(m => {
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
                            </a>
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
};

export default ArcherRegion;