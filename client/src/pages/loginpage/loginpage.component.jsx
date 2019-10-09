// jshint esversion:6
import React from 'react';
import './loginpage.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { setCurrentUser } from '../../redux/user/user.action';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }
    mount = async function() {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        this.props.setCurrentUser(null);
    }

    componentDidMount() {
        this.mount();
    }

    render() {
        return (
            <div className='background'>
                <div className="login">
                    <SignIn/>
                    <SignUp/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    });
  };

export default connect(null, mapDispatchToProps)(LoginPage);