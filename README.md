Deployment of the Upgradable Stablecoin Contract


Contract Deployment on Fuji Testnet
<br>Contract Address: [0xa621A7887b995A59509a8959aD4caE669fD1F170]
<br>Transaction Hash of Deployment: [0xa621A7887b995A59509a8959aD4caE669fD1F170]

Interacting with the Contract
Transferring Tokens
<br>Transaction Hash: [0x31ecebc238b8f685a330a31a2fc5e9d54569162069e864cf0153b18e0b9d0dab]
<br>Sender Address: [0xA7a4CC554052386B492760AC43c1e5d0BDeb1667]
<br>Receiver Address: [0xa621A7887b995A59509a8959aD4caE669fD1F170]
<br>Amount Transferred: [100000000000000000000] price in wei



API Development and Testing
API Overview

Testing with Postman
<br>Test Case 1: Valid Transaction Hash
<br>Request:

<br>Method: POST
<br>Endpoint: /transaction
<br>Body: { "txHash": "[0x59c0b9f77f7e55b089348b8cf1f535541e274672d9e08bf68792843fb836a740]" }


<br>Status Code: 200
<br>Body: [```{
    "_type": "TransactionReceipt",
    "accessList": null,
    "blockNumber": 28407019,
    "blockHash": "0xd072cc05a67d72906f9cb4d38200958e76f70797b1c0f458c796ad79d6e085e1",
    "chainId": "43113",
    "data": "0xa9059cbb0000000000000000000000001e56660b715a934a568e19ddf15528f0c7b4a7050000000000000000000000000000000000000000000000056bc75e2d63100000",
    "from": "0xA7a4CC554052386B492760AC43c1e5d0BDeb1667",
    "gasLimit": "54362",
    "gasPrice": "25000000000",
    "hash": "0x59c0b9f77f7e55b089348b8cf1f535541e274672d9e08bf68792843fb836a740",
    "maxFeePerGas": null,
    "maxPriorityFeePerGas": null,
    "nonce": 6,
    "signature": {
        "_type": "signature",
        "networkV": "86261",
        "r": "0xa57bc2233a08b499f84ed62caa1e82b2f0a0d3e176ea419780b3b5290e02e868",
        "s": "0x14f6f6e2548320ba654c2791e44dd311b0af3008c0de87fffcafdb0080fba0d3",
        "v": 27
    },
    "to": "0xa621A7887b995A59509a8959aD4caE669fD1F170",
    "type": 0,
    "value": "0"
}```]
Screenshot: ![Screenshot 2023-12-08 213851](https://github.com/decentralized-86/Bitzees-Trail-Task/assets/109427449/1ff578a8-01ad-4d60-9dbb-3d6ed7cfbb48)

Valid Transaction Hash Test
