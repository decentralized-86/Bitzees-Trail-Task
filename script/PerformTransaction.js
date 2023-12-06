const { ethers, getNamedAccounts } = require("hardhat");
const { insertTransaction } = require("../databse/dbInteraction");

async function main() {
    const transactionHash = process.argv[2]; 
    const { deployer  } = await getNamedAccounts();
    const player = "0x1E56660b715a934a568e19DDF15528f0C7b4A705"
    console.log("deployer",deployer);
    console.log("player",player);
    // const player = (await ethers.getSigners())[1];
    const proxyContractAddress = "0xdF3a1e5531C260D527bf18ca3028F023bbd886e8"; 
    const TetherToken = await ethers.getContractFactory("TetherToken");
    const tetherTokenProxy = await TetherToken.attach(proxyContractAddress);

    let receipt;

    if (transactionHash) {
        console.log(`Processing existing transaction with hash: ${transactionHash}`);
        receipt = await ethers.provider.getTransactionReceipt(transactionHash);
    } else {
        const transferAmount = ethers.parseUnits("100", "ether");
        console.log(`Transferring ${transferAmount} tokens from deployer to player...`);
        console.log("player Address",player);
        const transferTx = await tetherTokenProxy.connect(await ethers.getSigner(deployer)).transfer(player, transferAmount);
        receipt = await transferTx.wait();
        console.log(receipt)
    }

    try {
        console.log("We entered in this block")
        const txHash = receipt.hash;
        console.log(ethers.formatUnits(receipt.gasPrices));
        await insertTransaction(deployer, player.address, ethers.formatUnits(receipt.gasPrices, "ether"), txHash);
        console.log(`Transaction details inserted into the database. Transaction Hash: ${txHash}`);
    } catch (error) {
        console.error('Error inserting transaction details into the database:', error);
    }

    if (!transactionHash) {
        const balanceDeployer = await tetherTokenProxy.balanceOf(deployer);
        const balancePlayer = await tetherTokenProxy.balanceOf(player.address);
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
