import App from './App.jsx'


const ethers = require('ethers')

const abi = require('../EtherRide/foo/build/contracts/CounterApp.json').abi

let provider = new ethers.providers.JsonRpcProvider('http://localhost:8545', 'undefined')

let contract = new ethers.Contract('0xc1f4085e8a1eccdcf198f40762469e6bbb4dae52', abi, provider)

contract.on('UnlockCar', () => { App.unlock() })

contract.on('LockCar', () => { App.lock() })
