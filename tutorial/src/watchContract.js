const axios = require('axios')


const ethers = require('ethers')

const abi = require('../../../EtherRide/foo/build/contracts/CounterApp.json').abi

let provider = new ethers.providers.JsonRpcProvider('http://localhost:8545', 'unspecified')

let contract = new ethers.Contract('0xc7d453d31ac839088ea3cda6ea6a22d8758ae478', abi, provider)

contract.on('UnlockCar', () => {
    console.log("Received Unlock Event from Aragon");
    return axios.post(`http://localhost:8000/unlock`);
})

contract.on('LockCar', () => {
    console.log("Received Lock Event from Aragon");
    return axios.post(`http://localhost:8000/lock`);
})
