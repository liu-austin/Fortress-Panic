// jshint esversion:8
import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { socket } from '../../assets/socketIO/socketIO.utils';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: displayName,
                email: email,
                password: password,
                confirmPassword: password
            })
            socket.emit('playerLogin', socket.id);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    handleChange(event) {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account.</h2>
                <span>Sign up with a name and email address.</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput label="Display Name" name='displayName' handleChange={this.handleChange} type='text' value={displayName} required/>
                    <FormInput label="Email" name='email' handleChange={this.handleChange} type='email' value={email} required/>
                    <FormInput label="Password" name='password' handleChange={this.handleChange} type='password' value={password} required/>
                    <FormInput label="Confirm Password" name='confirmPassword' handleChange={this.handleChange} type='password' value={confirmPassword} required/>
                    <div className='buttons'>
                        <CustomButton type='submit' isInverted> Sign Up </CustomButton>
                    </div>   
                </form>
            </div>
        );
    }
}

export default SignUp;
