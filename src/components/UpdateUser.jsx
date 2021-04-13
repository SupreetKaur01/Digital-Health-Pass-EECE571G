import React, { Component } from "react";
import {Container,Button} from 'react-bootstrap';
import "./App.css";
import "../index.css";

class UpdateUser extends Component{
    render(){
        return(
            <div className="bg">
                <Container style={{marginTop:'50px',maxWidth:'500px'}} className="Form-styling">
                <br/>
                <br/>
                <br/>
                    <center>
                        <h1 className="Form-heading"> Update the user details</h1>
                        <br/>
                        <form onSubmit =
                            {async (event) => {
                                event.preventDefault();
                                const vaccineName = this.vaccineName.value
                                const userID = this.userID.value
                                await this.props.updateUser(vaccineName, userID)}
                            }>
                            <div className="form-group mr-sm-2">
                            <input 
                               id="vaccineName"
                               type="text"
                               ref={(input)=>{this.vaccineName=input}}
                               className="form-control"
                               placeholder="Enter Vaccine's name"
                               required/>
                            </div>
                            <br/>
                            <div>
                                <input 
                                id="userID"
                                type="text"
                                ref={(input)=>{this.userID=input}}
                                className="form-control"
                                placeholder="Enter user's ID"
                                required/>
                            </div>
                            <br/><br/>
                            <Button type="submit" variant="dark" size="lg">Update User</Button>
                        </form>
                    
                    <br/><br/>
                    
                    <h2 className="Form-heading"> List of users registered</h2>
                    <br/>
                        <table className="table">
                            <thead id="userList">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">passNumber</th>
                                <th scope="col">vaccineName</th>
                                <th scope="col"></th>
                              </tr> 
                            </thead>
                            <tbody id="userList">
                                {this.props.users.map((user, key)=>{
                                    return(
                                        <tr key={key}>
                                        <th scope="row">{user.userId.toString()}</th>   
                                        <td>{user.name}</td> 
                                        <td>{user.passNumber}</td>
                                        <td>{user.vaccineName}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    <br/><br/>
                    </center>

                </Container>
                <br/>
                    <br/>
                    <br/>
            </div>
        );
    }
}

export default UpdateUser;