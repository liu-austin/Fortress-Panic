// jshint esversion:6
import React from 'react';
import './player-cards-panel.styles.scss';
import { connect } from 'react-redux';
import CardOverview from '../cardoverview/cardoverview.component';
import { selectPlayers } from '../../redux/players/player.selector';

const PlayerCardsPanel = ({players}) => {
    return (
        <div className='player-cards-panel-container sticky'>
            <div className='score-container'><p className='display-name'>NAME</p><p className='display-points'>POINTS:100 </p></div>
            <div className='hand-container'><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/></div>
            <div className='score-container'><p className='display-name'>NAME</p><p className='display-points'>POINTS:100 </p></div>
            <div className='hand-container'><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/></div>
            <div className='score-container'><p className='display-name'>NAME</p><p className='display-points'>POINTS:100 </p></div>
            <div className='hand-container'><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/></div>
            <div className='score-container'><p className='display-name'>NAME</p><p className='display-points'>POINTS:100 </p></div>
            <div className='hand-container'><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/></div>
            <div className='score-container'><p className='display-name'>NAME</p><p className='display-points'>POINTS:100 </p></div>
            <div className='hand-container'><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/></div>
            <div className='score-container'><p className='display-name'>NAME</p><p className='display-points'>POINTS:100 </p></div>
            <div className='hand-container'><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/><CardOverview/></div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        players: selectPlayers(state)
    });
};

export default connect(mapStateToProps)(PlayerCardsPanel);
