// jshint esversion:6
import React from 'react';
import './chatbox.styles.scss';
import { connect } from 'react-redux';

class Chatbox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.setState({value: ''});
      event.preventDefault();
    }
  
    render() {
        return (
            <div className='chatbox-container sticky'>
                <div className='chatlog-container'>
                    
                </div>
                <div className='chat-message-container'>
                    <form action="/game" onSubmit={this.handleSubmit}>
                        <label>CHAT:</label>
                        <input className='input-line' type="text" name="firstname" value={this.state.value} onChange={this.handleChange}/>
                        <input className='submit' type="submit" value="SEND"/>
                    </form> 
                </div>
            </div>
        );
    }
  }

const mapStateToProps = (state) => {
    return ({
        // currentPhase: selectCurrentPhase(state)
    });
};

const mapDispatchToProps = (dispatch) => {
    return({
        // goToNextPhase: () => dispatch(goToNextPhase())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);

