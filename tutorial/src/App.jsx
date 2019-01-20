
import React, {Component} from 'react';
import axios from 'axios';
import Smartcar from '@smartcar/auth';

import Connect from './components/Connect';
import Vehicle from './components/Vehicle';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicle: {},
      code: 0,
    };

    this.authorize = this.authorize.bind(this);

    this.onComplete = this.onComplete.bind(this);

    // TODO: Authorization Step 1: Initialize the Smartcar object
    this.smartcar = new Smartcar({
      clientId: process.env.REACT_APP_CLIENT_ID,
      redirectUri: 'https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:3000',
      testMode: true,
      onComplete: this.onComplete,
    });

    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
  }

  onComplete(err, code, status) {
    console.log("code " + code);
    // TODO: Request Step 2a: Get vehicle information
    console.log("querying on port: ");
    console.log(process.env.REACT_APP_SERVER);
    return axios
      .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`)
      .then(_ => {
        console.log("get vehicle: ")
        return axios.get(`${process.env.REACT_APP_SERVER}/vehicle`);
      })
      .then(res => {
        console.log("res.data ");
        console.log(res.data);
        this.setState({vehicle: res.data, code: code});
      });
  }

  lock() {
    // let header = {"action": "LOCK"};
    // axios.post(`https://api.smartcar.com/v1.0/vehicles/${this.state.vehicle.id}/security`, header)
    // .then(res => {
    //   console.log("lock result: ");
    //   console.log(res);
    // })
    console.log("lock code is "+this.state.code);
    return axios.post(`${process.env.REACT_APP_SERVER}/lock`);
  }

  unlock() {
    return axios.post(`${process.env.REACT_APP_SERVER}/unlock`);
  }

  authorize() {
    // TODO: Authorization Step 2a: Launch the authorization flow
    this.smartcar.openDialog({forcePrompt: true});
  }

  render() {
    // TODO: Request Step 2b: Get vehicle information
    return (Object.keys(this.state.vehicle).length !== 0 ? (
      <div>
        <Vehicle info={this.state.vehicle} />
        <button onClick={this.lock}>Lock</button>
        <button onClick={this.unlock}>Unlock</button>
      </div>
    ) : (
      <Connect onClick={this.authorize} />
    ));
  }
}

export default App;
