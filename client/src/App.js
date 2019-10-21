// jshint esversion:8
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import GamePage from './pages/gamepage/gamepage.component';
import NavHeader from './components/nav-header/nav-header.component';
import LoginPage from './pages/loginpage/loginpage.component';
import LoadingPage from './pages/loadingpage/loadingpage.component';
import MainPage from './pages/mainpage/mainpage.component';
import LobbyPage from './pages/lobbypage/lobbypage.component';
import RulesPage from './pages/rulespage/rulespage.component';
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
import { withRouter } from 'react-router-dom';
import { selectCurrentPage, selectPreviousPage } from './redux/currentpage/currentpage.selectors';
import { setCurrentPage } from './redux/currentpage/currentpage.action';
import { setProgress } from './redux/loadingbar/loadingbar.action';

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
                if (socket.id === this.props.selectedplayer.selectedplayer) {
                  this.props.setCurrentPage(this.props.previouspage);
                }
              }
            }
           }
           if (this.props.players[socket.id]) {
            if (!this.props.players[socket.id].logged) {
              this.props.setCurrentUser(null);
              auth.signOut();
             } 
           }
         } 
       });
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
        {
          this.props.currentpage === '/' ? 
          (
            <MainPage/>
          ) 
          : 
          (
            null
          )
        }
        {
          this.props.currentpage === '/lobby' ? 
          (
            <LobbyPage/>
          ) 
          : 
          (
            null
          )
        }
        {
          this.props.currentpage === '/game' ? 
          (
            <GamePage/>
          )
          : 
          (
            null
          )
        }
        {
          this.props.currentpage === '/loading' ? 
          (
            <LoadingPage/>
          )
          : 
          (
            null
          )
        }
        {
          this.props.currentpage === '/login' ? 
          (
            <LoginPage/>
          ) 
          : 
          (
            null
          )
        }
        {
          this.props.currentpage === '/rules' ? 
          (
            <RulesPage/>
          ) 
          : 
          (
            null
          )
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  players: selectPlayers,
  selectedplayer: selectSelectedPlayer,
  currentpage: selectCurrentPage,
  previouspage: selectPreviousPage
});

const mapDispatchToProps = dispatch => {
  return ({
    updatePlayerName: (id, displayName) => dispatch(updatePlayerName(id, displayName)),
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setSelectedPlayer: playerid => dispatch(setSelectedPlayer(playerid)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    setProgress: (progress) => dispatch(setProgress(progress))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
