import React, { Component } from 'react';
import Web3 from 'web3';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import HealthPass from '../abis/HealthPass';
import Addressbar from './Addressbar';
import NavigationBar from './NavigationBar';
import UserPortal from './UserPortal';
import HealthAuthPortal from './HealthAuthPortal';
import PublicPlacePortal from './PublicPlacePortal';
import UpdateUser from './UpdateUser';
import HomePage from './HomePage';
import RegisterUser from './RegisterUser';
import ObtainPass from './ObtainPass';
import ShowPermissions from './ShowPermissions'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      account: '', // the account here is the account in metamask, so this is why we should reload the page after add an account
      totalNumber: 0,
      users: [],
      loading: true
    };

  //Call to registerUser() function. Here the first time user will register himself to the blockchain
    this.registerUser = async (userName, passNumber) => {
      this.setState({loading : true});
      const gasAmount = await this.state.deployedHealthPass.methods.registerUser(userName, passNumber).estimateGas({from: this.state.account})
      this.state.deployedHealthPass.methods.registerUser(userName, passNumber).send({from:this.state.account, gas: gasAmount})
      .once('receipt', async(receipt) =>{
        const totalNumber = await this.state.deployedHealthPass.methods.totalNumber().call();
        this.setState({totalNumber});
        this.setState({users: []});
        for (var i = 0;i <= totalNumber;i++) {
          const user = await this.state.deployedHealthPass.methods.users(i).call();
          this.setState({
            users:[...this.state.users, user]
          });
        }
        let eventsName = Object.keys(receipt.events);
        await this.contractMessage(eventsName[0]);
        this.setState({loading : false});
      })
    }

  //Call to updateUser() function from Deployer (HEALTH AUTHORITY)
  this.updateUser = async (vaccineName, userID) => {
    this.setState({loading : true});
    const gasAmount = await this.state.deployedHealthPass.methods.updateUser(vaccineName, userID).estimateGas({from: this.state.account})
    this.state.deployedHealthPass.methods.updateUser(vaccineName, userID).send({from : this.state.account, gas: gasAmount})
    .once('receipt', async(receipt) =>{
      const totalNumber = await this.state.deployedHealthPass.methods.totalNumber().call();
      this.setState({totalNumber});
      this.setState({users: []});
      for (var i = 0;i<= totalNumber;i++) {
        const user = await this.state.deployedHealthPass.methods.users(i).call();
        this.setState({
          users:[...this.state.users, user]
        });
      }
      let eventsName = Object.keys(receipt.events);
      await this.contractMessage(eventsName[0]);
      this.setState({loading : false});
    })
  }

  //Call to obtainPassForWorkplace() function. 
  this.obtainPassForWorkplace = async (userID) => {
    this.setState({loading : true});
    const gasAmount = await this.state.deployedHealthPass.methods.obtainPassForWorkplace(userID).estimateGas({from: this.state.account})
    this.state.deployedHealthPass.methods.obtainPassForWorkplace(userID).send({from:this.state.account, gas: gasAmount})
    .once('receipt', async(receipt) =>{
      const totalNumber = await this.state.deployedHealthPass.methods.totalNumber().call();
      this.setState({totalNumber});
      this.setState({users: []});
      for (var i = 0;i<= totalNumber;i++) {
        const user = await this.state.deployedHealthPass.methods.users(i).call();
        this.setState({
          users:[...this.state.users, user]
        });
      }
      let eventsName = Object.keys(receipt.events);
      await this.contractMessage(eventsName[0]);
      this.setState({loading : false});
      })
    }

  //Call to obtainPassForAirport() function. 
  this.obtainPassForAirport = async (userID) => {
    this.setState({loading : true});
    const gasAmount = await this.state.deployedHealthPass.methods.obtainPassForAirport(userID).estimateGas({from: this.state.account})
    this.state.deployedHealthPass.methods.obtainPassForAirport(userID).send({from:this.state.account, gas: gasAmount})
    .once('receipt', async(receipt) =>{
      const totalNumber = await this.state.deployedHealthPass.methods.totalNumber().call();
      this.setState({totalNumber});
      this.setState({users: []});
      for (var i = 0;i<= totalNumber;i++) {
        const user = await this.state.deployedHealthPass.methods.users(i).call();
        this.setState({
          users:[...this.state.users, user]
        });
      }
      let eventsName = Object.keys(receipt.events);
      await this.contractMessage(eventsName[0]);
      this.setState({loading : false});
      })
    }

  //Call to obtainPassForMall() function. 
  this.obtainPassForMall = async (userID) => {
    this.setState({loading : true});
    const gasAmount = await this.state.deployedHealthPass.methods.obtainPassForMall(userID).estimateGas({from: this.state.account})
    this.state.deployedHealthPass.methods.obtainPassForMall(userID).send({from:this.state.account, gas: gasAmount})
    .once('receipt', async(receipt) =>{
      const totalNumber = await this.state.deployedHealthPass.methods.totalNumber().call();
      this.setState({totalNumber});
      this.setState({users: []});
      for (var i = 0;i<= totalNumber;i++) {
        const user = await this.state.deployedHealthPass.methods.users(i).call();
        this.setState({
          users:[...this.state.users, user]
        });
      }      
      let eventsName = Object.keys(receipt.events);
      await this.contractMessage(eventsName[0]);
      this.setState({loading : false});
      })
    }
  }

  async componentDidMount(){
    await this.getWeb3Provider();
    await this.connectToBlockchain();
  }
  
  async getWeb3Provider(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async connectToBlockchain(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()  // Network id from metamask
    const networkData = HealthPass.networks[networkId];
    console.log(networkData);

    if(networkData) {
      const deployedHealthPass = new web3.eth.Contract(HealthPass.abi, networkData.address); // access the contract, address is the contract address, abi work as a bridge
      this.setState({deployedHealthPass: deployedHealthPass}); // add the contract to state
      const totalNumber = await deployedHealthPass.methods.totalNumber().call();
      console.log(totalNumber);
      this.setState({totalNumber})
      for (var i = 0;i <= totalNumber;i++) {
        const user = await deployedHealthPass.methods.users(i).call();
        this.setState({
          users:[...this.state.users, user]
        });
      }
      this.setState({loading: false})
      console.log(this.state.users)
    } else {
      window.alert('HealthPass contract is not found in your blockchain.')
    }
  
  }
  

  //Give window alert based on event type

  async contractMessage(eventName){
    await this.state.deployedHealthPass.getPastEvents(eventName,{
      fromBlock : 'latest'
    }, function(error, events){
      if(eventName === 'Registered'){
        window.alert('User is registered successfully!!');
      }

      if(eventName === 'Updated'){
        window.alert('User vaccination status is updated successfully');
      }

      if(eventName === 'healthPassToWorkplace'){
        window.alert('HealthPass is allocated to the user. You are allowed to enter to workplace.');
      }

      if(eventName === 'healthPassToMall'){
        window.alert('HealthPass is allocated to the user. You are allowed to enter to Public Mall.');
      }
    });
  }

  render() {
    return (
      <Router>
        <NavigationBar/>
        <div style={{margin: '20 px'}}>
          { this.state.loading
            ?
              <div><p className = "text-center"> LOADING ...</p> </div>
            :
            <Switch>
              <Route path = "/homePage">
                <HomePage/>
              </Route>  
              <Route path = "/userPortal">
                <div>
                <br/><br/>
                  <center><h1 class="font-Head">Hello, Welcome to Digital Health Pass</h1></center>
                </div>
                <UserPortal/>
              </Route>
              <Route path = "/healthAuthPortal">
                <div>
                <br/><br/>
                  <center><h1 class="font-Head">Hello, Welcome to Digital Health Pass</h1></center>
                </div>
                <HealthAuthPortal/>
              </Route>
              <Route path = "/publicPlacePortal">
                <div>
                <br/><br/>
                  <center><h1 class="font-Head">Hello, Welcome to Digital Health Pass</h1></center>
                </div>
                <PublicPlacePortal/>
              </Route>
              <Route path = "/registerUser">
                <br/><br/>
                <Addressbar account={this.state.account}/>
                <RegisterUser registerUser= {this.registerUser}/>
              </Route> 
              <Route path = "/updateUser">
                <br/><br/>
                <Addressbar account={this.state.account}/>
                <UpdateUser updateUser = {this.updateUser}
                            users = {this.state.users}/>
              </Route>
              <Route path = "/ObtainPass">
                  <br/><br/>
                  <Addressbar account={this.state.account}/>
                  <ObtainPass 
                  obtainPassForWorkplace = {this.obtainPassForWorkplace}
                  obtainPassForMall = {this.obtainPassForMall}
                  obtainPassForAirport = {this.obtainPassForAirport}
                  account = {this.state.account}
                  />
              </Route>
              <Route path = "/showpermissions">
                  <br/><br/>
                  <Addressbar account={this.state.account}/>
                  <ShowPermissions 
                  account = {this.state.account}
                  users = {this.state.users}
                  />
              </Route>
            </Switch>
          }
        </div>
      </Router>
    );
  }
}

export default App;
