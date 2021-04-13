import React, { Component } from "react";
import {Container,Button,Accordion,Card} from 'react-bootstrap';
import "./App.css";
import "../index.css";

class Permission extends Component{

    render(){
        return(
            <div className="bg">
                <Container style={{marginTop:'50px',maxWidth:'800px', minHeight:'500px'}} className="Form-styling">
                <br/><br/><br/>
                    <center>
                    <h1 className="Form-heading"> Generate Passes for public places </h1>
                    <br/>             
                    <br/><br/>
                        <Accordion>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                <p style={{color:"black", fontWeight:"bolder"}}>Click for Workplace Pass</p>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <form onSubmit =
                                    {async (event) => {
                                        event.preventDefault();
                                        const userID = this.userID.value
                                        await this.props.obtainPassForWorkplace(userID)}
                                    }>
                                    <div className="form-group mr-sm-2">
                                    <input 
                                       id="userID"
                                       type="text"
                                       ref={(input)=>{this.userID=input}}
                                       className="form-control"
                                       placeholder="Enter user ID"
                                       required/>
                                    </div>                   
                                    <br/><br/>
                                    <Button type="submit" variant="success" size="lg">Grant Permission</Button>
                                </form>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="1">
                              <p style={{color:"black", fontWeight:"bolder"}}>Click for Mall Pass</p>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                <form onSubmit =
                                    {async (event) => {
                                        event.preventDefault();
                                        const userID1 = this.userID1.value
                                        await this.props.obtainPassForMall(userID1)}
                                    }>
                                    <div className="form-group mr-sm-2">
                                    <input 
                                       id="userID1"
                                       type="text"
                                       ref={(input)=>{this.userID1=input}}
                                       className="form-control"
                                       placeholder="Enter user ID"
                                       required/>
                                    </div>
                                    <br/><br/>
                                    <Button type="submit" variant="success" size="lg">Grant Permission</Button>
                                </form>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="2">
                                <p style={{color:"black", fontWeight:"bolder"}}>Click for Airport Pass</p>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body>  
                                <form onSubmit =
                                    {async (event) => {
                                        event.preventDefault();
                                        const userID2 = this.userID2.value
                                        await this.props.obtainPassForAirport(userID2)}
                                    }>
                                    <div className="form-group mr-sm-2">
                                    <input 
                                       id="userID2"
                                       type="text"
                                       ref={(input)=>{this.userID2=input}}
                                       className="form-control"
                                       placeholder="Enter your user ID"
                                       required/>
                                    </div>
                                    <br/><br/>
                                    <Button type="submit" variant="success" size="lg">Grant Permission</Button>
                                </form> 
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <br/><br/>
                    </center> 
                    <br/>
                    <br/>
                    <br/>
                </Container>
            </div>
        );  
    }
}

export default Permission;