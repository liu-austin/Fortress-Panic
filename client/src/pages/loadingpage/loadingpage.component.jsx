// jshint esversion:6
import React from 'react';
import './loadingpage.styles.scss';
import { connect } from 'react-redux';
import { selectProgress } from '../../redux/loadingbar/loadingbar.selectors';


const LoadingPage = ({progress}) => {
    return (
    <div className='loading-page-container'>
        <div className='loading-text'>
            <span>LOADING GAME</span>
            <br></br>
            <span>{progress}%</span>
        </div>
        <div className="progress-bar">
            <div className="filler" style={{ width: `${progress}%` }} />
        </div>
    </div>
    );
};  

  const mapStateToProps = (state) => {
    return ({
        progress: selectProgress(state)
    });
};

export default connect(mapStateToProps)(LoadingPage);