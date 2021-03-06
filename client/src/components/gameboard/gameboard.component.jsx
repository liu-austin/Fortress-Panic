// jshint esversion:6
import React from 'react';
import './gameboard.styles.scss';
import CircularOrb from '../circular-orb/circular-orb.component';
import Castle from '../castle/castle.component';
import { connect } from 'react-redux';
import { selectStartButtonPressed } from '../../redux/startbutton/startbutton.selectors';
import ForestRegion from '../grid-regions/forest-region/forest-region.component';
import ArcherRegion from '../grid-regions/archer-region/archer-region.component';
import KnightRegion from '../grid-regions/knight-region/knight-region.component';
import SwordsmanRegion from '../grid-regions/swordsman-region/swordsman-region.component';
import { selectRotationAngle } from '../../redux/rotation/rotation.selectors';
import { selectActiveMonsters } from '../../redux/monsters/monsters.selectors';

const GameBoard = ({startButtonPressed, rotationAngle, monsters}) => {
    return (
        <div className='gameboard csstransforms' style={{transform: `rotate(${rotationAngle}deg)`}}>
            <Castle />
            {
                startButtonPressed ? (
                    <div className='region-container'>
                        <ForestRegion monsters={monsters ? monsters.filter(m => m.location.includes('forest')) : null}/>
                        <ArcherRegion monsters={monsters ? monsters.filter(m => m.location.includes('archer')) : null}/>
                        <KnightRegion monsters={monsters ? monsters.filter(m => m.location.includes('knight')) : null}/>
                        <SwordsmanRegion monsters={monsters ? monsters.filter(m => m.location.includes('swordsman') || m.location.includes('castle')): null}/>
                    </div>
                    ) 
                    : 
                    (
                        null
                    )
                    // <CircularOrb />
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        rotationAngle: selectRotationAngle(state),
        startButtonPressed: selectStartButtonPressed(state),
        monsters: selectActiveMonsters(state)
    });
};

export default connect(mapStateToProps)(GameBoard);
