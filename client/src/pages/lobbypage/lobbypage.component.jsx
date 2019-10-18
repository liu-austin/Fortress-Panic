// jshint esversion:6
import React from 'react';
import './lobbypage.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import { setNamespace } from '../../redux/namespace/namespace.action';

class LobbyPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            namespace: ''
        };
    
        this.selectRoom = ev => {
            ev.preventDefault();
            this.props.setNamespace(ev);
            socket.emit('setNamespace', ev);
            this.setState({namespace: ''});
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
                                <button>{`GAME ROOM ${num}`}</button>
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

const mapDispatchToProps = (dispatch) => {
    return ({
        setNamespace: () => dispatch(setNamespace())
     });
};

export default connect(null, mapDispatchToProps)(LobbyPage);