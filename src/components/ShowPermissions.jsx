import React, { Component } from "react";
import {Container,Button} from 'react-bootstrap';
import "./App.css";
import "../index.css";

class ShowPermissions extends Component{
    render(){
        return(
            <div className="bg">
                <Container style={{marginTop:'50px',maxWidth:'500px'}} className="Form-styling">
                <br/>
                <br/>
                <br/>
                    <center>
                        <h1 className="Form-heading"> Show the permissions</h1>
                        <br/>                    
                    <br/><br/>
                    
                    <h2 className="Form-heading"> List of permissions</h2>
                    <br/>
                    <table className="table">
                            <thead id="userList">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">passNumber</th>
                                <th scope="col">vaccineName</th>
                                <th scope="col">workplacePermission</th>
                                <th scope="col">mallPermission</th>
                                <th scope="col">airportPermission</th>
                                <th scope="col"></th>
                              </tr> 
                            </thead>
                            <tbody id="userList">
                                {this.props.users.map((user, key)=>{
                                    return(
                                        <tr key={key}>
                                        <th scope="row">{user.userId}</th>   
                                        <td>{user.name}</td> 
                                        <td>{user.passNumber}</td>
                                        <td>{user.vaccineName}</td>
                                        <td>{user.workplacePermitted.toString()}</td>
                                        <td>{user.mallPermitted.toString()}</td>
                                        <td>{user.airportPermitted.toString()}</td>
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

export default ShowPermissions;