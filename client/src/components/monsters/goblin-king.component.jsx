// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import { ReactComponent as GoblinKingIcon } from '../../assets/images/monster-icons/goblin-king.svg';
import { selectTargetable, selectNiceShot } from '../../redux/selectedcard/selectedcard.selectors';
import { selectMonsterRegion } from '../../redux/monsters/monsters.selectors';
import { setMonsterRegion } from '../../redux/monsters/monsters.action';
import { toggleNiceShot, toggleTargetable } from '../../redux/selectedcard/selectedcard.action';
import { displayNewMessage } from '../../redux/console/console.action';
import { socket } from '../../assets/socketIO/socketIO.utils';

const GoblinKing = ({id, hitpoints, location, monsterregion, targetable, niceshot, displayNewMessage, setMonsterRegion, toggleNiceShot, toggleTargetable}) => {
    const handleClick = () => {
        if (targetable && niceshot && monsterregion.includes(location)) {
            socket.emit('killMonster', id);
            toggleTargetable();
            toggleNiceShot();
            setMonsterRegion([]);
        } else if (targetable && monsterregion.includes(location)) {
            socket.emit('hitMonster', id);
            toggleTargetable();
            setMonsterRegion([]);
        } else if (targetable) {
            displayNewMessage('NOT A VALID TARGET. CHOOSE ANOTHER MONSTER.');
        }
    };
    return (
        <div className='monster-container'>
            <GoblinKingIcon className='monster' key={id ? id : null} onClick={handleClick}/>
            <div className='hit-points'>
                <p>{hitpoints ? hitpoints : null}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        monsterregion: selectMonsterRegion(state),
        targetable: selectTargetable(state),
        niceshot: selectNiceShot(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg)),
        setMonsterRegion: (regionInfo) => dispatch(setMonsterRegion(regionInfo)),
        toggleNiceShot: () => dispatch(toggleNiceShot()),
        toggleTargetable: () => dispatch(toggleTargetable())
    });
  };

export default connect(mapStateToProps, mapDispatchToProps)(GoblinKing);