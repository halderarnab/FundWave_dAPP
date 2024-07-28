Prerequisites: Node.js should be installed and MetaMask should be present.

Steps to run the project:
1.	In the root folder of the project (publicfundingdapp), run 
npm i or npm install
This will add all the project dependencies.
2.	Open 2 terminal instances.
3.	In the 1st terminal, run
npx hardhat node
This spins up a local version of the Hardhat blockchain and provides 20 different accounts with 10000 ETH to use for testing with MetaMask.
4.	In the 2nd terminal, run
a.	npx hardhat run --network localhost scripts/deploy.js
This will give an address, save this address.
b.	Add this saved address in ‘PublicFundingAddress’ variable of ‘context/context.js file’.
c.	Now in this terminal, run
npm run dev
5.	In your browser, navigate to http://localhost:3000/.

Connect the hardhat accounts to MetaMask:
1.	Go to MetaMask Settings -> Networks -> Add a network.
2.	Fill the below details and click on Save:
Network name: HardHat Node
New RPC URL: http://127.0.0.1:8545 
Chain ID: 31337
Currency symbol: ETH
3.	Select this newly added network from the top left dropdown (Select a network).
4.	Click on the top central dropdown (Select an account) -> Add account or hard wallet -> Import account -> Enter the private key string obtained in step 3 of “Steps to run the project”. Private key string example: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266.
5.	This should import the local hardhat node account containing the accounts with 1000 ETH.
