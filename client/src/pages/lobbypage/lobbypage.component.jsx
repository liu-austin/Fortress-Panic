// jshint esversion:6
import React from 'react';
import './lobbypage.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { setNamespace } from '../../redux/namespace/namespace.action';
import { selectNamespace } from '../../redux/namespace/namespace.selectors';
import { setCurrentPage } from '../../redux/currentpage/currentpage.action';

class LobbyPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            namespace: ''
        };
    
        this.selectRoom = ev => {
            ev.preventDefault();
            socket.emit('leave', this.props.room);
            this.props.setNamespace(this.state.namespace);
            socket.emit('setNamespace', [socket.id, this.state.namespace]);
            socket.emit('startLoading');
            this.setState({namespace: ''});
            this.props.setCurrentPage('/loading');
            setTimeout(function() {
                socket.emit('initiateCheckStarted');
            }, 1000);
        };

        const {setCurrentPage, setNamespace, room} = this.props;
        this.goToGameRoom = (number) => {
            function goToGame() {
                socket.emit('leave', room);
                setNamespace('room ' + number);
                socket.emit('setNamespace', [socket.id, 'room ' + number]);
                socket.emit('startLoading');
                setCurrentPage('/loading');
                setTimeout(function() {
                    socket.emit('initiateCheckStarted');
                }, 1000);
            }
            return goToGame;
        };
    }

    render() {
        return (
            <div className='game-lobby-container'>
                <div className='game-lobby-content-container'>
                    <div className='game-lobby-title-container'>
                        <span className='game-room-title'>CHOOSE A GAME ROOM:</span>
                    </div>
                    <div className="game-room-hud">
                    {
                        [1,2,3,4,5,6].map(num => {
                            return (
                                <button onClick={this.goToGameRoom(num)}>{`GAME ROOM ${num}`}</button>
                            );
                        })
                    }
                    </div>
                    <div className='custom-room-container'>
                        <form onSubmit={this.handleSubmit}>
                            <label className='game-room-label'>ADD GAME ROOM:</label>
                            <input className='custom-room-input' type="text" autoComplete='off' value={this.state.namespace} onChange={ev => this.setState({namespace: ev.target.value})}/>
                            <button onClick={this.selectRoom} className='room-button'>JOIN</button>
                        </form> 
                    </div>
                </div>
            </div>
        );
    }
}   

const mapStateToProps = (state) => {
    return ({
        room: selectNamespace(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        setNamespace: (ns) => dispatch(setNamespace(ns)),
        setCurrentPage: (page) => dispatch(setCurrentPage(page))
     });
};

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);