import React, { Component } from 'react';

class Addressbar extends Component {
  render() {
    return (
    <nav>
        <ul className="navbar-nav px-3" style={{paddingRight:'0px', paddingLeft:'0px'}}>
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block address-bar">
            <small className="text-black"><span id="account">{"Your Address: " + this.props.account}</span></small>
            </li>
        </ul>
    </nav>
    );
  }
}

export default Addressbar;
