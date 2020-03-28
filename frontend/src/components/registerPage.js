import React, {Component} from 'react';
import {connect} from 'react-redux';

class registerPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            namaLembaga: '',
            password: '',
            confirmPass: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    }


    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }

    handleSubmitRegister(e){
        e.preventDefault();

        this.setState({submitted: true});
        const {email, namaLembaga, password, confirmPass} = this.state;
        if (email && password){
            this.props.register({email, namaLembaga, password, confirmPass});
        }
    }

    render(){
        
    }

}