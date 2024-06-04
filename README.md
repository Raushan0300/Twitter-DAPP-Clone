Deciding which workspace information to collect

Collecting workspace information

Filtering to most relevant information

# Twitter DApp Clone Documentation

This project is a decentralized application (DApp) that mimics the basic functionality of Twitter. It allows users to create, like, and unlike tweets. The DApp is built using React for the frontend and Ethereum smart contracts for the backend.

## Project Structure

The project is divided into two main directories: [``client``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/client") and [``server``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fserver%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/server").

### Client

The [``client``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/client") directory contains the frontend of the application, which is built using React and Vite. The main entry point of the application is `main.jsx`. The application's components are located in the `components` directory. Each component has its own directory, and the main ones are:

- [`FeedPage`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%2520DAPP%2520Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A12%2C%22character%22%3A0%7D%5D "client/src/components/FeedPage/FeedPage.jsx"): This is where the tweets are displayed. It uses the [`TwitterContract`](command:_github.copilot.openSymbolInFile?%5B%22client%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22TwitterContract%22%5D "client/src/components/FeedPage/FeedPage.jsx") to fetch and display tweets from the Ethereum blockchain.
- `Header`: This component displays the header of the application.
- [`LoaderDialog`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FLoaderDialog%2FLoaderDialog.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%2520DAPP%2520Clone%2Fclient%2Fsrc%2Fcomponents%2FLoaderDialog%2FLoaderDialog.jsx%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FLoaderDialog%2FLoaderDialog.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A5%2C%22character%22%3A0%7D%5D "client/src/components/LoaderDialog/LoaderDialog.jsx"): This component displays a loading spinner when the application is fetching data.
- `Profile`: This component displays the user's profile.
- `Settings`: This component allows the user to change application settings.

The [`utils`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Futils%2FTwitterContract.json%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A0%2C%22character%22%3A0%7D%5D "client/src/utils/TwitterContract.json") directory contains utility functions and the [`TwitterContract.json`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%2520DAPP%2520Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A32%2C%22character%22%3A8%7D%5D "client/src/components/FeedPage/FeedPage.jsx") file, which is the ABI of the TwitterContract Ethereum smart contract.

### Server

The [``server``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fserver%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/server") directory contains the backend of the application, which is built using Ethereum smart contracts and the Hardhat development environment. The main smart contract of the application is `TwitterContract.sol`, located in the `contracts` directory. This contract is responsible for creating, liking, and unliking tweets.

The `test` directory contains tests for the [`TwitterContract.sol`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%2520DAPP%2520Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A32%2C%22character%22%3A8%7D%5D "client/src/components/FeedPage/FeedPage.jsx") contract. These tests are written using the Hardhat testing framework and Chai for assertions.

The `ignition` directory contains Hardhat Ignition modules, which are scripts that can be run using the Hardhat Ignition CLI. The [``Deploy.js``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fserver%2Fignition%2Fmodules%2FDeploy.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/server/ignition/modules/Deploy.js") module deploys the `TwitterContract.sol` contract to the Ethereum blockchain.

## Running the Application

To run the application, you need to start both the frontend and the backend.

### Frontend

Navigate to the [``client``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/client") directory and run the following command to start the frontend:

```sh
npm run dev
```

### Backend

Navigate to the [``server``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fserver%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/server") directory and run the following command to compile and deploy the smart contracts:

```sh
npx hardhat ignition deploy ./ignition/modules/Deploy.js
```

Then, start the Hardhat node:

```sh
npx hardhat node
```

## Testing

To run the tests for the [`TwitterContract.sol`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%2520DAPP%2520Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fclient%2Fsrc%2Fcomponents%2FFeedPage%2FFeedPage.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A32%2C%22character%22%3A8%7D%5D "client/src/components/FeedPage/FeedPage.jsx") contract, navigate to the [``server``](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fraushan%2FDocuments%2FCode%2FTwitter%20DAPP%20Clone%2Fserver%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/raushan/Documents/Code/Twitter DAPP Clone/server") directory and run the following command:

```sh
npx hardhat test
```

## Contributing

Contributions are welcome. Please make sure to read the React + Vite and Sample Hardhat Project guides before contributing.