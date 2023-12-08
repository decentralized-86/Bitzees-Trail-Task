const { ethers, upgrades, deployments, getNamedAccounts, network } = require("hardhat");

module.exports = async function deployTetherToken() {
    const { log } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log(deployer);

    const args = ["USDT Token", "USDT", ethers.parseUnits("1000000", "ether")]; 

    log("Deploying TetherToken...");
    try {
        const TetherToken = await ethers.getContractFactory("TetherToken");
        const tetherToken = await upgrades.deployProxy(TetherToken, args);
        await tetherToken.waitForDeployment();
        console.log(tetherToken)

        
        console.log(`TetherToken Proxy deployed to ${tetherToken.address} on network: ${network.name}`);

        if (network.name !== 'hardhat' && network.name !== 'localhost' && process.env.SNOWTRACE_API_KEY) {
            log("Verifying...");
            await verify(tetherToken.address, args);
        }
    } catch (error) {
        console.error("Deployment failed:", error);
    }
};

module.exports.tags = ["all", "tetherToken"];