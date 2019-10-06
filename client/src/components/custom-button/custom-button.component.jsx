// jshint esversion:6
import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ( { children, isGoogleSignIn, isInverted,...otherProps } ) => {
    return (
        <button className={`${isGoogleSignIn ? 'google-sign-in loginBtn' : ''} custom-button ${isInverted ? 'inverted' : ''}`}
        {...otherProps}>
            {
                children
            }
        </button>
    );
};

export default CustomButton;