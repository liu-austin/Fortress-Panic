// jshint esversion:6
import React from 'react';
import './top-nav-button.styles.scss';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {  auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const TopNavButton = ({currentUser}) => {
    return (
        <div className='status-button-container'>
    {
        currentUser ? (
            <button className='status-button' onClick={() => auth.signOut()}>LOG OUT</button>
        ) : (
            <button className='status-button'><a href={'/login'}>SIGN IN</a></button>
        )
    }
    </div>
    );
};

const mapStateToProps = (state) => {
    return ({
        currentUser: selectCurrentUser(state)
    });
};

export default connect(mapStateToProps)(TopNavButton);