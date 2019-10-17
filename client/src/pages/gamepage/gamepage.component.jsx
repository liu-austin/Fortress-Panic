// jshint esversion:6
import React from 'react';
import './gamepage.styles.scss';
import GameBoard from '../../components/gameboard/gameboard.component';
import RotationPanel from '../../components/rotation-panel/rotation-panel.component';
import GameConsolePanel from '../../components/game-console-panel/game-console-panel.component';
import ChatBox from '../../components/chatbox/chatbox.component';
import PlayerCardsPanel from '../../components/player-cards-panel/player-cards-panel.component';
import Card from '../../components/card/card.component';
import MonsterDisplay from '../../components/monster-display/monster-display.component';
import { connect } from 'react-redux';
import { selectCardSelected, selectSelectedCardInfo, selectTradeTargetInfo } from '../../redux/selectedcard/selectedcard.selectors';
import { selectMonsterHud, selectMonsterInfo } from '../../redux/monsterinfo/monsterinfo.selectors';
import { selectTradeHud } from '../../redux/selectedcard/selectedcard.selectors';
import TradeHud from '../../components/tradehud/tradehud.component';
import EndConditionDisplay from '../../components/endconditiondisplay/endconditiondisplay.component';
import { selectEndGameHud } from '../../redux/endcondition/endcondition.selectors';

const GamePage = ({cardselected, selectedcardinfo, displaymonsters, selectmonsterinfo, tradehud, tradetargetinfo, endgame}) => {
    return (
        <div className='game-container'>
            <div className='gameboard-container shrink'>
                <GameBoard />
                <RotationPanel/>
            </div>
            <div className='game-console-container'>
                <GameConsolePanel/>
            </div>
            <div className='card-panel-container'>
                <PlayerCardsPanel/>
            </div>
            <div className='selected-card-container'>
            {
                cardselected ? 
                (
                    <Card cardInfo={selectedcardinfo}/>
                ) 
                : 
                (
                    null
                )
            }
            </div>
            <div className='monster-info-container'>
            {
                displaymonsters ?
                (
                    <MonsterDisplay monsterInfo={selectmonsterinfo}/>
                ) 
                : 
                (
                    null
                )
            }
            </div>
            <div className='chatbox-panel-container'>
                <ChatBox/>
            </div>
            <div className='tradehud-panel-container'>
            {
                tradehud ? 
                (
                    <TradeHud cardInfo={selectedcardinfo} tradeTarget={tradetargetinfo}/>
                ) 
                : 
                (
                    null
                )
            }
            </div>
            <div className='endCondition-panel-container'>
            {
                endgame ?
                (
                    <EndConditionDisplay/>
                ) 
                : 
                (
                    null
                )
            }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        cardselected: selectCardSelected(state),
        selectedcardinfo: selectSelectedCardInfo(state),
        displaymonsters: selectMonsterHud(state),
        selectmonsterinfo: selectMonsterInfo(state),
        tradehud: selectTradeHud(state),
        tradetargetinfo: selectTradeTargetInfo(state),
        endgame: selectEndGameHud(state)
    });
};


export default connect(mapStateToProps)(GamePage);