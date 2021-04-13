// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract HealthPass {

     /*
     * Digital Health Pass -
     *
     * This is a DApp in which a person (Client) needs to first register himself  using his name and Passport number
     *
     * Health Authorities owning the DApp can update the vaccination status of the registered users
     *
     *Vaccinated users can use this DApp to get HealthPass for the public places
     *
     *Thus, we can keep a record of all vaccinated users in cryptographically stored, transparent and immutable blockchain based solution.
     */
    

    //State Variables
    address public healthAuthority;
    mapping (uint => User) public users;
    uint public totalNumber = 0;
    
    //Structs
    struct User {
        uint userId;
        address client;
        string name;
        string passNumber;
        string vaccineName;
        bool vaccinated;
        bool workplacePermitted;
        bool mallPermitted;
        bool airportPermitted;
    }

    //Events
    event Registered(
        uint userId,
        address client,
        string name,
        string passNumber
    );

    event Updated(
        uint userId,
        address client,
        string name,
        string passNumber,
        string vaccineName,
        bool vaccinated
    );

    event healthPassToWorkplace(
        address client,
        string name,
        string passNumber
    );
    event healthPassToMall(
        address client,
        string name,
        string passNumber
    );

    event healthPassToAirport(
        address client,
        string name,
        string passNumber
    );


    //Modifiers
    modifier onlyHealthAuthority() {
        require(msg.sender == healthAuthority , "Only Health Authority(Deployer) can call this function");
        _;
    }


    modifier allFieldsEntered(string memory __name, string memory __passNumber) {
        bytes memory a = bytes(__name);
        bytes memory b = bytes(__passNumber);
        require(a.length != 0, "Full name should be specified");
        require(b.length != 0, "Passport number should be specified");
        _;
    }


    //Constructor
    constructor() {
        healthAuthority = msg.sender; //Deployer would be the government health Authority
    }

    //Functions

    //Register user function

    function registerUser(string memory _name, string memory _passNumber) public allFieldsEntered(_name,_passNumber){
        for (uint i=0; i<totalNumber; i++) {
            require(msg.sender != users[i].client);
        }
        users[totalNumber] = User(totalNumber,msg.sender,
            _name,
            _passNumber,
            '',
            false,
            false,
            false,
            false);
        totalNumber++;
        emit Registered(totalNumber, msg.sender, _name, _passNumber);
    }

    //Update User function- It will be called once user gets vaccinated.

    function updateUser(string memory _vaccineName, uint userId) public onlyHealthAuthority{
        require(bytes(_vaccineName).length > 0, "Vaccine's name is required");
        users[userId].vaccinated = true;
        users[userId].vaccineName = _vaccineName;
        emit Updated(userId, users[userId].client, users[userId].name, users[userId].passNumber,_vaccineName, true);
    }

    //For obtaining passes for the current public places present in the DApp
    function obtainPassForWorkplace(uint userId) public onlyHealthAuthority{
        require(users[userId].vaccinated);
        users[userId].workplacePermitted = true;
        emit healthPassToWorkplace(users[userId].client, users[userId].name, users[userId].passNumber);
    }

    function obtainPassForMall(uint userId) public onlyHealthAuthority{
        require(users[userId].vaccinated);
        users[userId].mallPermitted = true;
        emit healthPassToMall(users[userId].client, users[userId].name, users[userId].passNumber);
    }

    function obtainPassForAirport(uint userId) public onlyHealthAuthority{
        require(users[userId].vaccinated);
        users[userId].airportPermitted = true;
        emit healthPassToAirport(users[userId].client, users[userId].name, users[userId].passNumber);
    }
}