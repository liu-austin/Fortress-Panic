// jshint esversion:6
import React from 'react';
import './monster.styles.scss';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
import ArmoredOrcIcon from '../../assets/images/monster-icons/armored-orc.svg';
// import { ReactComponent as TrollIcon } from '../../assets/images/monster-icons/troll.svg';
import { selectTargetable, selectNiceShot } from '../../redux/selectedcard/selectedcard.selectors';
import { selectMonsterRegion } from '../../redux/monsters/monsters.selectors';
import { setMonsterRegion } from '../../redux/monsters/monsters.action';
import { toggleNiceShot, toggleTargetable, unselectCard, toggleDriveItBack } from '../../redux/selectedcard/selectedcard.action';
import { selectDriveItBack } from '../../redux/selectedcard/selectedcard.selectors';
import { displayNewMessage } from '../../redux/console/console.action';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectCurrentPhase } from '../../redux/gamephase/gamephase.selectors';
import { selectCurrentPlayerId } from '../../redux/currentplayer/currentplayer.selectors';

const ArmoredOrc = ({points, id, hitpoints, location, monsterregion, targetable, niceshot, displayNewMessage, setMonsterRegion, toggleNiceShot, toggleTargetable, unselectCard, driveitback,
    toggleDriveItBack, currentphase, currentplayerid}) => {
        const handleClick = () => {
            if (currentphase === 'PLAY CARDS') {
                if (driveitback) {
                    socket.emit('driveItBack', [id, location]);
                    toggleTargetable();
                    toggleDriveItBack();
                    setMonsterRegion([]);
                    unselectCard();
                } else if (targetable && niceshot && monsterregion.includes(location)) {
                    socket.emit('addPoints', [currentplayerid, points * 10]);
                    socket.emit('killMonster', id);
                    toggleTargetable();
                    toggleNiceShot();
                    setMonsterRegion([]);
                    unselectCard();
                } else if (targetable && monsterregion.includes(location)) {
                    let randomNum = Math.floor(Math.random() * 2);
                    if (randomNum) {
                        if (hitpoints === 1) {
                            socket.emit('addPoints', [currentplayerid, points * 10]);
                        }
                        socket.emit('hitMonster', id);
                        toggleTargetable();
                        setMonsterRegion([]);
                    } else {
                        socket.emit('hitArmor', id);
                        toggleTargetable();
                    }
                    unselectCard();
                } else if (targetable) {
                    displayNewMessage('NOT A VALID TARGET. CHOOSE ANOTHER MONSTER.');
                } else {
                    displayNewMessage('CAN ONLY PLAY CARDS DURING YOUR PLAY PHASE.');
                }
            }
        };
    return (
        <div className='monster-container'>
        <SVG src={ArmoredOrcIcon} className='monster' key={id ? id : null} onClick={handleClick}/>
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
        niceshot: selectNiceShot(state),
        driveitback: selectDriveItBack(state),
        currentphase: selectCurrentPhase(state),
        currentplayerid: selectCurrentPlayerId(state)
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        displayNewMessage: (msg) => dispatch(displayNewMessage(msg)),
        setMonsterRegion: (regionInfo) => dispatch(setMonsterRegion(regionInfo)),
        toggleNiceShot: () => dispatch(toggleNiceShot()),
        toggleTargetable: () => dispatch(toggleTargetable()),
        unselectCard: () => dispatch(unselectCard()),
        toggleDriveItBack: () => dispatch(toggleDriveItBack())
    });
  };

export default connect(mapStateToProps, mapDispatchToProps)(ArmoredOrc);