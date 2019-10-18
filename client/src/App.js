// jshint esversion:8
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import GamePage from './pages/gamepage/gamepage.component';
import ShopPage from './pages/shop/shop.component';
import NavHeader from './components/nav-header/nav-header.component';
import LoginPage from './pages/loginpage/loginpage.component';
import CheckOut from './pages/checkout/checkout.component';
import MainPage from './pages/mainpage/mainpage.component';
import LobbyPage from './pages/lobbypage/lobbypage.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectPlayers } from './redux/players/player.selector';
import { socket } from './assets/socketIO/socketIO.utils';
import { createStructuredSelector } from 'reselect';
import { updatePlayerName } from './redux/players/player.action';
import { setSelectedPlayer } from './redux/selectedplayer/selectedplayer.action';
import { selectSelectedPlayer } from './redux/selectedplayer/selectedplayer.selectors';
import { selectStartButtonPressed } from './redux/startbutton/startbutton.selectors';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  unsubscribeFromAuth = null;

  componentDidMount() {

      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
         if (userAuth && this.props.currentUser !== 'reset') {
           // userAuth represents a signed-in user so set that to current user
           const userRef = await createUserProfileDocument(userAuth);
   
           userRef.onSnapshot(snapShot => {
            this.props.setCurrentUser({
              id: snapShot.id, ...snapShot.data()
            });
           });
           if (this.props.selectedplayer) {
            await new Promise((resolve, reject) => setTimeout(resolve, 1000));
            if (this.props.currentUser) {
              if (this.props.selectedplayer.selectedplayer !== null) {
                this.props.updatePlayerName(this.props.selectedplayer.selectedplayer,this.props.currentUser.displayName);
                socket.emit('nameChange', [this.props.selectedplayer.selectedplayer, this.props.currentUser.displayName]);
              }
            }
           }
         } 
       });

       if (!this.props.startButtonPressed) {
        socket.emit('isStarted?');
       }

       if (this.props.players[socket.id]) {
         if (!this.props.players[socket.id].logged) {
          this.props.setCurrentUser(null);
         }
       }

      
  }

  componentWillUnmount() {
    this.props.setCurrentUser(null);
    auth.signOut();
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <NavHeader />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/game' component={GamePage} />
          <Route path='/lobby' component={LobbyPage} />
          <Route exact path='/login' render={() => this.props.players[socket.id] ? 
            (this.props.players[socket.id].logged ? 
              (<Redirect to='/' />) 
              : 
              (<LoginPage />)) 
              : 
              (<LoginPage />)
            } />
          <Route exact path='/checkout' component={CheckOut} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  players: selectPlayers,
  selectedplayer: selectSelectedPlayer,
  startButtonPressed: selectStartButtonPressed
});

const mapDispatchToProps = dispatch => {
  return ({
    updatePlayerName: (id, displayName) => dispatch(updatePlayerName(id, displayName)),
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setSelectedPlayer: playerid => dispatch(setSelectedPlayer(playerid))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
