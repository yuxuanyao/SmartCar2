const smartcar = require('smartcar');
const express = require('express');
var cors = require('cors');

var app = express();
app.use(cors());

const port = 8000;
const client = new smartcar.AuthClient({
  clientId: 'a429175f-fba9-4827-9b38-a168c3b057b7',
  clientSecret: 'a5443202-4f75-46f4-9eaf-1afe850c57de',
  redirectUri: 'https://javascript-sdk.smartcar.com/redirect-2.0.0?app_origin=http://localhost:3000',
  scope: ['control_security', 'control_security:unlock', 'control_security:lock'],
  testMode: true, // launch the Smartcar auth flow in test mode
});

var access = '';

app.get('/exchange', function(req, res) {
  const code = req.query.code;
  console.log("code: " + code);
  // TODO: Request Step 1: Obtain an access token
  return client.exchangeCode(code)
    .then(function(_access) {    
      // in a production app you'll want to store this in some kind of persistent storage
      console.log("access token: ");
      console.log(_access);
      access = _access;

      res.sendStatus(200);
    })
});

app.get('/vehicle', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      // the list of vehicle ids
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      console.log(vehicle);
      // TODO: Request Step 4: Make a request to Smartcar API
      return vehicle.info();
    })
    .then(function(info) {
      console.log(info);
      // {
      //   "id": "36ab27d0-fd9d-4455-823a-ce30af709ffc",
      //   "make": "TESLA",
      //   "model": "Model S",
      //   "year": 2014
      // }
      res.json(info);
    });
});

app.post('/lock', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      // the list of vehicle ids
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      vehicle.lock().then(function(response) {
        if(response){
          console.log(response);
        }
        else {
          console.log('vehicle locked successfully');
        }
      });
    });
});

app.post('/unlock', function(req, res) {
  return smartcar.getVehicleIds(access.accessToken)
    .then(function(data) {
      // the list of vehicle ids
      return data.vehicles;
    })
    .then(function(vehicleIds) {
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      vehicle.unlock().then(function(response) {
        if(response){
          console.log(response);
        }
        else {
          console.log('vehicle unlocked successfully');
        }
      });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));