import React, { Component } from "react";
import {Container,Button} from 'react-bootstrap';
import "./App.css";
import "../index.css";

class RegisterUser extends Component{
    render(){
        return(
            <div className="bg">
                <Container style={{marginTop:'50px',maxWidth:'500px'}} className="Form-styling">
                    <br/>
                    <br/>
                    <br/>
                    <center>
                        <h1 className="Form-heading"> Submit the user details</h1>
                        <br/>
                        <form onSubmit =
                            {async (event) => {
                                event.preventDefault();
                                const userName = this.userName.value
                                const passNumber = this.passNumber.value
                                await this.props.registerUser(userName, passNumber)}
                            }>
                            <div className="form-group mr-sm-2">
                            <input 
                                id="userName"
                                type="text"
                                ref={(input)=>{this.userName=input}}
                                className="form-control"
                                placeholder="Enter Name"
                                required/>
                            </div>
                            <br/>
                            <div>
                            <input 
                                id="passNumber"
                                type="text"
                                ref={(input)=>{this.passNumber=input}}
                                className="form-control"
                                placeholder="Passport number"
                                required/>
                            </div>
                            <br/>
                            <br/>
                            <Button type="submit" variant="dark" size="lg">Register User</Button>
                        </form>
                    </center> 
                    <br/><br/>
                </Container>
                <br/>
                    <br/>
                    <br/>
            </div>
        );
    }
}

export default RegisterUser;