import React from 'react';
import {Card,Button,InputGroup,FormControl, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import login from '../images/logIn.png';
import './App.css';

class PublicPlacePortal extends React.Component{
	render(){
		return (
      
       <Container>
            <br/><br/><br/>
            <center>
                <Card border="success"  class-name="signUp" style={{ width: '25rem' }}>
                  <Card.Img variant="top" src={login} alt="Health passport" height="250px" style={{paddingLeft : '20px', paddingRight:'20px', paddingTop : '10px'}}/>
                  <Card.Body>
                    <Card.Title>User Log-In</Card.Title>
                    <Card.Text>
                        Please enter your creddentials and log-in.
                    </Card.Text>
                      <InputGroup size="lg" className="mb-3">
                        <FormControl placeholder="User's Credential" aria-describedby="basic-addon1" />
                        <InputGroup.Append>
                        <Link to={"/obtainPass"} ><Button variant="success" size="lg">Log-In</Button></Link>
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

export default PublicPlacePortal;