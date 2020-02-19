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
import Overlord from '../../monsters/overlord.component';
import Dragon from '../../monsters/dragon.component';
import Giant from '../../monsters/giant.component';
import SavageOrc from '../../monsters/savage-orc.component';
import ArmoredOrc from '../../monsters/armored-orc.component';
import Wyvern from '../../monsters/wyvern.component';
import { connect } from 'react-redux';
import { selectDefensesInfo } from '../../../redux/defenses/defenses.selectors';
import { toggleRebuild } from '../../../redux/selectedcard/selectedcard.action';
import { selectRebuild } from '../../../redux/selectedcard/selectedcard.selectors';
import { socket } from '../../../assets/socketIO/socketIO.utils';
import GoblinTrickster from '../../monsters/goblin-trickster.component';

const SwordsmanRegion = ({defenses, monsters, rebuild, toggleRebuild}) => {
    const emitterSetup = (number) => {
        function emitter() {
            if (rebuild) {
                socket.emit('rebuild', 'castle ' + number);
                toggleRebuild();
            }
        }
        return emitter;
    };
    return (
        <div className="cn-wrapper swordsman opened-nav">
            <ul>
            {
                [6,1,2,3,4,5].map((num,i) => {
                    return (
                        <li key={i}>
                            <a className={`swordsman ${num}`} onClick={emitterSetup(num)} href={'#'}>
                                <span>Swordsman</span>
                                {
                                    monsters ? 
                                    (
                                        monsters.filter(monster => monster.location === 'swordsman ' + num).map((m, i) => {
                                            if (m.name === 'Goblin') {
                                                return <Goblin id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Orc') {
                                                return <Orc id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Troll') {
                                                return <Troll id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Goblin King') {
                                                return <GoblinKing id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Orc Warlord') {
                                                return <OrcWarlord id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Shaman') {
                                                return <Shaman id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Ogre Mage') {
                                                return <OgreMage id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Overlord') {
                                                return <Overlord id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Dragon') {
                                                return <Dragon id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Giant') {
                                                return <Giant id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Savage Orc') {
                                                return <SavageOrc id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Goblin Trickster') {
                                                return <GoblinTrickster id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Armored Orc') {
                                                return <ArmoredOrc id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
                                            } else if (m.name === 'Wyvern') {
                                                return <Wyvern id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/>
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
                                        }).map((wall, i) => <CastleWall key={i}/>)
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
                                        }).map((wall, i) => <CastleTower key={i}/>)
                                    ) 
                                    : 
                                    (
                                        null
                                    )
                                }
                                {
                                    monsters ? 
                                    (
                                        monsters.filter(monster => monster.location === 'castle ' + num).map((m, i) => {
                                            if (m.name === 'Goblin') {
                                                return <div className='in-castle'><Goblin id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Orc') {
                                                return <div className='in-castle'><Orc id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Troll') {
                                                return <div className='in-castle'><Troll id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Goblin King') {
                                                return <div className='in-castle'><GoblinKing id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Orc Warlord') {
                                                return <div className='in-castle'><OrcWarlord id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Shaman') {
                                                return <div className='in-castle'><Shaman id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Ogre Mage') {
                                                return <div className='in-castle'><OgreMage id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Overlord') {
                                                return <div className='in-castle'><Overlord id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Dragon') {
                                                return <div className='in-castle'><Dragon id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Giant') {
                                                return <div className='in-castle'><Giant id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Savage Orc') {
                                                return <div className='in-castle'><SavageOrc id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Goblin Trickster') {
                                                return <div className='in-castle'><GoblinTrickster id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Armored Orc') {
                                                return <div className='in-castle'><ArmoredOrc id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
                                            } else if (m.name === 'Wyvern') {
                                                return <div className='in-castle'><Wyvern id={m._id} key={i} hitpoints={m.hitpoints} location={m.location} points={m.points}/></div>
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

const mapStateToProps = (state) => {
    return ({
        defenses: selectDefensesInfo(state),
        rebuild: selectRebuild(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        toggleRebuild: () => dispatch(toggleRebuild())
    });
  };
export default connect(mapStateToProps, mapDispatchToProps)(SwordsmanRegion);