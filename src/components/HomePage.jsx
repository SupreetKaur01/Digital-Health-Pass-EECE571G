import React from 'react';
import {Jumbotron,Container,Image} from 'react-bootstrap';
import Home from '../images/Home.jpg'; 


class HomePage extends React.Component{
	render(){
		return (
			
            <Jumbotron fluid>
                <Container>
                
                <center>
                    <Image src={Home} alt="Health passport" width="500" height="400" roundedCircle />
                </center>
                <br/>
                <br/>

                  <h1>Digital Health Pass</h1>
                  <br/>
                  <p>
                    This is a DApp in which a person (Client) needs to first register himself using his name and Passport number.Health 
                    Authorities owning the DApp can update the vaccination status of the registered users. Vaccinated users 
                    can use this DApp to get HealthPass for the public places.
                  </p>
                </Container>
            </Jumbotron>


         );
	}
}

export default HomePage;