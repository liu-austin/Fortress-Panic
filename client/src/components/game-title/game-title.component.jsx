// jshint esversion:6
import React from 'react';
import './game-title.styles.scss';
import { selectCurrentPage } from '../../redux/currentpage/currentpage.selectors';
import { setCurrentPage } from '../../redux/currentpage/currentpage.action';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { selectNamespace } from '../../redux/namespace/namespace.selectors';
import { setNamespace } from '../../redux/namespace/namespace.action';

const GameTitle = ({setCurrentPage, namespace, currentpage, setNamespace}) => {
    const goToMain = () => {
        if (currentpage === '/game') {
            setNamespace(socket.id);
            socket.emit('leave', namespace);
        }
        setCurrentPage('/');
    };
    return (
        <div onClick={goToMain} className='home-title-container'>
            <div className='title-container'>
                <h1 className='overhead-title'>FORTRESS PANIC</h1>
            </div>
        </div>    
    );
};

const mapStateToProps = (state) => {
    return ({
        namespace: selectNamespace(state),
        currentpage: selectCurrentPage(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),
        setNamespace: (ns) => dispatch(setNamespace(ns))
     });
};

export default connect(mapStateToProps, mapDispatchToProps)(GameTitle);