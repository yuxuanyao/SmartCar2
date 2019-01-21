# EtherRide 
### - Think AirBnB for cars, using the Ethereum Blockchain

#### DevPost: https://devpost.com/software/etherride
#### This project is split to two git repos as we used boilerplate code from two different API sponsors. Please also visit this page: https://github.com/yuxuanyao/SmartCar2

#### This project also only worked within the duration of the hackathon as we were provided log in credentials for a Tesla Model S only during UofTHacks VI

### What it Does
This application allows the user to rent from a list of vehicles that are registered with SmartCar. Through the use of smart contracts from the Aragon Platform, location data and travel patterns are preserved from third-party access. After selecting a car on the landing page, the user can create a transaction using the Ethereum blockchain. When the transaction goes through, the Car would be unlocked through a request to SmartCar API to unlock the door.

### This repo 
This repo allows users to log in to smartCar and processes requests to the SmartCar API. It also includes a testing framework to test if the car physically locks and unlocks. 

Includes a local server of endpoints to act as an adapter to the SmartCar API, which has a centralized authentication service that prevents cross-site scripting and access tokens to be leaked. This allows users to log in to Tesla or the other car brands that SmartCar provides. In addition, we used ethers.js to monitor the transaction at our local address, which then calls the SmartCar methods to physically lock/unlock the car doors.
