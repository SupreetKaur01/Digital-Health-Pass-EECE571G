const HealthPass = artifacts.require("HealthPass");
const truffleAssert = require('truffle-assertions');
require('chai')
.use(require('chai-as-promised'))
.should();

contract(HealthPass,([healthAuthority, user, user2])=>{
    let healthPass;
    before(async () =>{
        healthPass = await HealthPass.deployed()
    })

    describe('Deployment', async()=>{
        it('The deployment should be done successfully',async() =>{
            const address = await healthPass.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
    })

    describe('Adding user to the system', async()=>{
        let result,totalNumber
        before(async ()=>{
            result = await healthPass.registerUser('John', 'A1234567',{from: user})
            totalNumber = await healthPass.totalNumber()
        })

        it ('Adding user should be successful if all correct', async ()=>{
            truffleAssert.eventEmitted(result, 'Registered', (ev) => {
                return ev.name.toString() === 'John'
                    && ev.passNumber.toString() === 'A1234567';
            });
        })

        it ('Creating user  should be failed if either no name or no passport', async ()=>{
            //User must have a name
            await healthPass.registerUser('', 'A1234567',{from: user}).should.be.rejected;
            //User must have a passport number
            await healthPass.registerUser('John', '',{from: user}).should.be.rejected;
        })
    })

    describe('Updating user vaccination status in the system', async()=>{
        let result
        before(async ()=>{
                    result = await healthPass.updateUser('ABCVaccine', user ,{from: healthAuthority})
                })

        it('Update the users vaccination status', async () => {
            // SUCCESS: Health Authority updates user vaccination status
             truffleAssert.eventEmitted(result, 'Updated', (ev) => {
                return ev.vaccineName.toString() === 'ABCVaccine'
                    && ev.vaccinated === true;
            });
        })

        it('The updateUser function cannot be called but by Health Authority.', async() => {
                        await truffleAssert.fails(
                            healthPass.updateUser('ABCVaccine', user ,{from: user}),
                            truffleAssert.ErrorType.REVERT
                        );
                    });

        it ('Updating user should be failed if no vaccine name present', async ()=>{
                            //Vaccine must have a name
                            await  healthPass.updateUser('', user ,{from: healthAuthority}).should.be.rejected;
                        })
        })


    describe('User allowed Digital health Pass - Workplace', async()=>{
        before(async () =>{
            healthPass.registerUser('John','A123',{from: user2});
            healthPass.updateUser('ABCVaccine', 1 ,{from: healthAuthority});
        })           
                 it('Health Pass alotted', async () => {
                        const result = await healthPass.obtainPassForWorkplace(1,{from: healthAuthority});
                        truffleAssert.eventEmitted(result, 'healthPassToWorkplace', (ev) => {
                            return ev.name.toString() === 'John'
                                    && ev.passNumber === 'A123'
                            });
                    })
                })

        describe('User allowed Digital health Pass - Mall', async()=>{           
                     it('Health Pass alotted', async () => {
                            const result = await healthPass.obtainPassForMall(1,{from: healthAuthority});
                            truffleAssert.eventEmitted(result, 'healthPassToMall', (ev) => {
                                return ev.name.toString() === 'John'
                                        && ev.passNumber === 'A123'
                                });
                        })
                    })


        describe('User allowed Digital health Pass - Airport', async()=>{
            it('Health Pass alotted', async () => {
                const result = await healthPass.obtainPassForAirport(1,{from: healthAuthority});
                truffleAssert.eventEmitted(result, 'healthPassToAirport', (ev) => {
                    return ev.name.toString() === 'John'
                            && ev.passNumber === 'A123'
                    });
            })
        })
    })
