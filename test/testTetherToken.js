const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("TetherToken Contract", function () {
    let TetherToken, tetherToken;
    let owner, addr1, addr2;
    const initialSupply = ethers.parseUnits("1000000", "ether");
    const basisPointsRate = 99; 
    const maximumFee = ethers.parseUnits("10", "ether");

    beforeEach(async function () {
        TetherToken = await ethers.getContractFactory("TetherToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        
        tetherToken = await upgrades.deployProxy(TetherToken, ["Tether Token", "USDT", initialSupply], { initializer: 'initialize' });
        await tetherToken.waitForDeployment();
        await tetherToken.setFeeParameters(basisPointsRate, maximumFee);
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await tetherToken.owner()).to.equal(owner.address);
        });

        it("Should have the correct initial supply", async function () {
            expect(await tetherToken.totalSupply()).to.equal(initialSupply);
        });
    });

    describe("Minting with Fee", function () {
        const mintAmount = ethers.parseUnits("5", "ether");

        it("Should mint tokens correctly accounting for fee", async function () {
            await tetherToken.mint(addr1.address, mintAmount);
            const expectedBalance = mintAmount; 
            expect(await tetherToken.balanceOf(addr1.address)).to.equal(expectedBalance);
        });
    });

    describe("Transfers with Fee", function () {
        const transferAmount = ethers.parseUnits("2", "ether");

        beforeEach(async function () {
            await tetherToken.mint(owner.address, transferAmount);
        });

        it("Should transfer tokens correctly accounting for fee", async function () {
            await tetherToken.transfer(addr1.address, transferAmount);
            const expectedBalance = transferAmount.sub(feeDeducted);
            expect(await tetherToken.balanceOf(addr1.address)).to.equal(expectedBalance);
        });
        
    });

});
