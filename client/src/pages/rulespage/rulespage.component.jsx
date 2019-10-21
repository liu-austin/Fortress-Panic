// jshint esversion:6
import React from 'react';
import './rulespage.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { setCurrentPage } from '../../redux/currentpage/currentpage.action';

const RulesPage = () => {
    return (
            <div className='rules-page-container'>
                <div className='rules-page-content-container'>
                    <div className='rules-page-title-container'>
                        <span className='rules-page-title'>GAME RULES</span>
                    </div>
                    <div className="rules-page-hud">
                        <span>Fortress Panic is a turn-based multiplayer tower defense game based on the popular board game Castle Panic. Play solo or in a group of up to 6 to 
                        defend your castle from invading monsters. Players must anticipate future monster positions and carefully use or trade resource cards to defeat them and
                        keep your towers alive.</span>
                        <br></br><br></br>
                        <span>The game rules for Fortress Panic use the same system as the original board game and can be found here: 
                        <a className='game-rules-link' href={'https://www.firesidegames.com/downloads/CP_Rulesweb.pdf'} target="_blank"> CASTLE PANIC RULES</a>
                        <br></br><br></br>
                        </span>
                    </div>
                    <div className='rules-page-title-container'>
                        <span className='rules-page-title'>DIFFERENCES</span>
                    </div>
                    <div className='rules-page-hud'>
                        <span>Fortress Panic uses the same game system as the base game however it has several player/ monster card changes, which include:<br></br> 
                        <ul>
                            <li>A final boss monster spawns when all other monsters have been slain, which is either a Dragon or Overlord monster.</li>
                            <li>The Orc Warlord's effect is changed to cause each player to discard 1 card when it enters to differentiate from Ogre Mage's effect.</li>
                            <li>The Shaman's effect now buffs every active monster's hitpoints by 1.</li>
                            <li>Castle Guard player cards, which act like hit cards that target inside the castle, replace the fortification cards.</li>
                            <li>The Giant Boulder card can no longer destroy across more than one region and has been renamed Destroy Region.</li>
                            <li>Hero cards can now target monsters inside the castle for their respective color. There is now a Any Color Hero card.</li>
                            <li>A new connection system designed for online play. Players can connect at any time to a game room even if the game has started and receive 
                            the current board and player states. Whenever the player who has the current turn disconnects, the game will begin a new Draw Phase with the 
                            player whose turn was next. The player will draw a number of cards equal to those lost when the previous current player disconnected. Also, a 
                            player can reconnect to the same game room at any time.</li>
                        </ul>
                        </span>
                    </div>
                </div>
            </div>
        );
}  

const mapDispatchToProps = (dispatch) => {
    return ({
        setCurrentPage: (page) => dispatch(setCurrentPage(page))
     });
};

export default connect(null, mapDispatchToProps)(RulesPage);