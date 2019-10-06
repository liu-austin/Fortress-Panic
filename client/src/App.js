// jshint esversion:8
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import GamePage from './pages/gamepage/gamepage.component';
import ShopPage from './pages/shop/shop.component';
import NavHeader from './components/nav-header/nav-header.component';
import LoginPage from './pages/loginpage/loginpage.component';
import CheckOut from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { socket } from '../src/assets/socketIO/socketIO.utils';

class App extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = { apiResponse: [] };
  }
  
  async getMonsters() {
    //await the response of the fetch call
    const response = await fetch('http://localhost:9000/findMonsters')
    //proceed once the first promise is resolved.
    const body = await response.json(); // this is probably a sync function, you don't need await here
    //proceed only when the second promise is resolved
    return body;
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // this.getMonsters()
    //   .then(res => this.setState({ apiResponse: res }));
      
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // userAuth represents a signed-in user so set that to current user
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        // userAuth is null so set that to current user aka no current user
        this.props.setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    // if (this.state.apiResponse.length !== 0) {
    //   console.log(this.state.apiResponse);
    // }
    const socketIO = socket;
    socketIO.on('newPlayer', function(newPlayerData) {
      console.log(newPlayerData);
    });
    return (
      <div>
        <NavHeader />
        <Switch>
          <Route exact path='/' component={GamePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/login' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<LoginPage />)} />
          <Route exact path='/checkout' component={CheckOut} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
  return ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
