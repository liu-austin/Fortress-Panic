// jshint esversion:6
import React from 'react';
import './chatbox.styles.scss';
import { connect } from 'react-redux';
import { socket } from '../../assets/socketIO/socketIO.utils';
import {selectPlayers } from '../../redux/players/player.selector';

class Chatbox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            msg: '',
            msgs: []
        };
        socket.removeAllListeners('receiveMessage');
        socket.on('receiveMessage', function(data) {
            addMessage(data);
        });

        const addMessage = data => {
        this.setState({msgs: [...this.state.msgs, data]});
        };
    
        this.sendMessage = ev => {
            ev.preventDefault();
            socket.emit('sendMessage', {
                author: this.props.players[socket.id].displayName,
                msg: this.state.msg
            });
            this.setState({msg: ''});
        };
    }
  
    render() {
        return (
            <div className='chatbox-container sticky'>
                <div className='chatlog-container'>
                {
                    this.state.msgs.map(msg => {
                        return (
                            <p>{msg.author}: {msg.msg}</p>
                        );
                    })
                }
                </div>
                <div className='chat-message-container'>
                    <form onSubmit={this.handleSubmit}>
                        <label className='chat-label'>CHAT:</label>
                        <input className='input-line' type="text" autoComplete='off' value={this.state.msg} onChange={ev => this.setState({msg: ev.target.value})}/>
                        <button onClick={this.sendMessage} className='chatButton'>Send</button>
                    </form> 
                </div>
            </div>
        );
    }
}   
  

const mapStateToProps = (state) => {
    return ({
        players: selectPlayers(state)
    });
};

export default connect(mapStateToProps)(Chatbox);