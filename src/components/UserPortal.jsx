import React from 'react';
import {Card,Button,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import sign from '../images/signUp.png'; 
import './App.css';

class UserPortal extends React.Component{
	render(){
		return (
      <Container>
          <br/><br/><br/>
          <center>
            <Card border="dark" class-name="signUp" style={{ width: '25rem' }}>
              <Card.Img variant="top" src={sign} alt="Health passport" height="250px" style={{paddingLeft : '40px', paddingTop : '15px'}}/>
              <Card.Body>
                <Card.Title>User Sign up</Card.Title>
                <Card.Text>
                Please click here to register yourself 
                </Card.Text>
                <Link to={"/registerUser"} ><Button variant="outline-primary" size="lg">Sign Up</Button></Link>
              </Card.Body>
              </Card>
            </center>
            <br/>
                    <br/>
                    <br/>  
          </Container>
         );
	}
}

export default UserPortal;