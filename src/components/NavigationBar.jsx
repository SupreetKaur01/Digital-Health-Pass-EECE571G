import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './App.css';

class NavigationBar extends React.Component{
	render(){
		return (
			<div>
				<Navbar class="navApp" bg="dark" variant="dark">
				<Link to={"/homePage"} className="navbar-brand">HealthPass</Link>
				<Nav className="mr-auto">
			      <Link to={"/userPortal"} className="nav-link" style={{paddingLeft : '50px', paddingRight:'50px'}}>User Registration Portal</Link>
				  <Link to={"/healthAuthPortal"} className="nav-link">Health Authority Portal</Link>
				  <Link to={"/publicPlacePortal"} className="nav-link" style={{paddingLeft : '50px', paddingRight:'50px'}}>Public Place Portal</Link>
				  <Link to={"/showpermissions"} className="nav-link">Showing Permissions</Link>
				</Nav>
				</Navbar>
				<Navbar class="navApp" bg="dark" variant="dark" fixed="bottom">
    				<p class="footer-style">&copy; {new Date().getFullYear()} Copyright: Digital Health Pass-EECE571G</p>
				</Navbar>
			</div>
         );
	}
}

export default NavigationBar;