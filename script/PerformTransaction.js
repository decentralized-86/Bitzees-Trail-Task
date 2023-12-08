const { ethers, getNamedAccounts } = require("hardhat");
const axios = require('axios');

async function main() {
    const transactionHash = process.argv[2];
    const { deployer } = await getNamedAccounts();
    const player = "0x1E56660b715a934a568e19DDF15528f0C7b4A705";
    const proxyContractAddress = "0xa621A7887b995A59509a8959aD4caE669fD1F170";
    const TetherToken = await ethers.getContractFactory("TetherToken");
    const tetherTokenProxy = TetherToken.attach(proxyContractAddress);

    let txHash;

    if (transactionHash) {
        console.log(`Processing existing transaction with hash: ${transactionHash}`);
        txHash = transactionHash;
    } else {
        const transferAmount = ethers.parseUnits("100", "ether");
        console.log(`Transferring ${transferAmount} tokens from deployer to player...`);
        const transferTx = await tetherTokenProxy.connect(await ethers.getSigner(deployer)).transfer(player, transferAmount);
        const receipt = await transferTx.wait();
        console.log(receipt);
        txHash = receipt.hash;
    }

    console.log(txHash);

    // Send request to your API
    try {
        const apiResponse = await axios.post('http://localhost:3000/transaction', { txHash: txHash });
        console.log("API Response:", apiResponse.data);
    } catch (error) {
        console.error('Error calling the API:', error);
    }

    // Optional: Fetch and log balances after the transaction
    if (!transactionHash) {
        const balanceDeployer = await tetherTokenProxy.balanceOf(deployer);
        const balancePlayer = await tetherTokenProxy.balanceOf(player);
        console.log(`Deployer balance: ${ethers.formatUnits(balanceDeployer, "ether")} USDT`);
        console.log(`Player balance: ${ethers.formatUnits(balancePlayer, "ether")} USDT`);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
