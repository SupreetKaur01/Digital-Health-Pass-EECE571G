import React from 'react';
import {Card,Button,InputGroup,FormControl, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import healthAuth from '../images/health-auth.jpg';
import './App.css';

class HealthAuthPortal extends React.Component{
	render(){
		return (
       <Container>
            <br/><br/><br/>
            <center>
                <Card border="success"  class-name="signUp" style={{ width: '25rem' }}>
                  <Card.Img variant="top" src={healthAuth} alt="Health passport" height="250px" style={{paddingLeft : '3px', paddingTop : '15px'}}/>
                  <Card.Body>
                    <Card.Title>Health Care Provider Authorized Login</Card.Title>
                    <Card.Text>
                        Please click here to login
                    </Card.Text>
                      <InputGroup size="lg" className="mb-3">
                        <FormControl placeholder="User's Credential" aria-describedby="basic-addon1" />
                        <InputGroup.Append>
                        <Link to={"/updateUser"} > <Button variant="success" size="lg">Log-In</Button></Link>
                        </InputGroup.Append>
                      </InputGroup>
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

export default HealthAuthPortal;