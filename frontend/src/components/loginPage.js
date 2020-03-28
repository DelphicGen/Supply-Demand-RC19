import React, {Component} from 'react';
import {connect} from 'react-redux';

class loginPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForgetPass = this.handleForgetPass.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }

    handleForgetPass(e){

    }

    handleSubmitLogin(e){
        e.preventDefault();

        this.setState({submitted: true});
        const {email, password} = this.state;
        if (email && password){
            this.props.login(email, password);
        }
    }

    render(){
        const {email, password, submitted} = this.state;

        return(
            <div>
                <h1>Login Logo</h1>
                <form>
                    <div>
                        <label>Username</label>
                        <input type="text" id = "email" value = {this.state.email} onChange = {this.handleChange}></input>
                    </div>

                    <div>
                    <label>Username</label>
                        <input type="password" id = "password" value = {this.state.password} onChange = {this.handleChange}></input>
                    </div>

                    <button type="button" className = "btn-primary" onClick = {this.handleSubmitLogin}>LOGIN</button>
                </form>
            </div>
        )
    }
}