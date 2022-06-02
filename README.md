# Dapp-NEEDS

A web application where users are able to create an account, buy products, sell their own product by posting an Ad, rent a product and can give review of the product they have bought or rented. Web Application name is Needs. All the data for the record of the users and products are maintained on the blockchain through the smart contracts. The smart contracts for Users and Products are created in which functions are written to manipulate the data through transactions on the blockchain using the smart contracts. In this way the data is completely decentralized and is managed using the transactions on the blockchain using smart contracts.
## Features
The features include creation of account by user using the metamask wallet. The address of the wallet is also saved on the blockchain in this way only one account can be created by one wallet address. Then a user can buy a product using a metamask, a transaction is executed to run the function of the smart contract. User can also sell a product by posting the Ad on the website. The user can rent a product from the available products and can un-rent it anytime. The user can give review of the product which they have bought or rented. 

## Requirements
The DAPP web application has the following features:
#### 1. User Account Creation
In this feature the user will create an account using the metamask wallet. The address of the wallet is also saved on the blockchain in this way only one account can be created by one wallet address.

#### 2. User can buy a product
In this feature the user can buy a product using the metamask wallet. The address of the owner of the product is changed whenever the product is bought by the user. The address of owner is replaced by the address of the buyer and its status is also updated on the blockchain.

#### 3. User can sell a product
In this feature the user can sell a product using the metamask wallet by posting an Ad on the DAPP. The address of the owner of the product is placed as wallet address of the seller user. And its status is set to available to all the other users for the purchase.

#### 4. User can rent a product
In this feature the user can rent a product using the metamask wallet. The address of the renter of the product is changed whenever the product is rented by the user. The address of renter is replaced by the address of the user who rented it and its status is also updated on the blockchain and it is then not available for the other users to rent it.

#### 5. User can give review of the product
In this feature the user can give review of a product using the metamask wallet. The user can give review of the product which he/she bought or rented out. When a review is given by user the reviews of the product are updated on the blockchain using the execution of the smart contracts.

## Implementation
The DAPP is implemented using different technologies for frontend and backend. Initially the truffle template/box of React JS is used.

### Frontend
The frontend is developed using React JS. Web3 library is used to connect the frontend to the backend to interact with the smart contracts and blockchain. The smart contracts are executed, transactions on blockchain are made using the web3 library. Metamask is used as wallet to interact with the frontend. Web3 library connects the frontend to the metamask wallet extension in the browser. The information about the metamask wallet is obtained using web3. Also the information about the smart contracts, accounts in metamask is also obtained using web3. The JSON file of each smart contract is available in the src folder of the frontend which are used to interact with the smart contracts on the blockchain.
### Backend
The Backend is developed using solidity and truffle. The smart contracts are written in solidity and implemented on blockchain using truffle. The Ganache Blockchain is used for the implementation of the blockchain and smart contracts. When the contracts are migrated to the Ganache their JSON files are stored in the src folder of the frontend to interact with the smart contracts using those JSON files. The JSON file of each smart contract has all the methods, information about that smart contract, which is created when the smart contract is migrated to the Ganache Blockchain.

## Conclusion
The project is a DAPP where the user can experience the ecommerce in a different way and can perform all the features using a metamask wallet. A DAPP where users are able to create an account, buy products, sell their own product by posting an Ad, rent a product and can give review of the product they have bought or rented by just using metamask wallet. The front end is made using ReactJS and web3 library is used to interact with the blockchain and smart contract. The backend is made using solidity, truffle and Ganache.

## How to Run:
Take help from this link : https://trufflesuite.com/tutorial/ . It will complete each step and help you in understanding the truffle and smart contracts.


HAVE FUN !!! ✌
