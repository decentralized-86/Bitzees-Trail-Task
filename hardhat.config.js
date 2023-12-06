require("hardhat-deploy");
require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
require('@nomiclabs/hardhat-etherscan');

const FUJI_TESTNET_RPC_URL = 'https://api.avax-test.network/ext/bc/C/rpc';
const PRIVATE_KEY = process.env.PRIVATE_KEY; 
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL ;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY 
console.log(PRIVATE_KEY)

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        fuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            gasPrice: 225000000000,
            chainId: 43113,
            accounts: [PRIVATE_KEY],
    },
    Mumbai: {
        url: POLYGON_RPC_URL,
        accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        saveDeployments: true,
        chainId: 80001,
    }
    },
    etherscan: {
        apiKey: {
            fuji: process.env.SNOWTRACE_TESTNET_API_KEY || '',
            polygonMumbai:POLYGONSCAN_API_KEY,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.15",
            },
            {
                version: "0.8.20",
            },
        ],
    },
    namedAccounts: {
            deployer: {
                default: 0,
            },
            player: {
                default: 1,
            },
        },
    mocha: {
        timeout: 500000,
    },
};
