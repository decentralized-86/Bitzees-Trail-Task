// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title TetherToken
 * @dev Implementation of the Tether USDT
 */
contract TetherToken is ERC20Upgradeable, OwnableUpgradeable, PausableUpgradeable {
    mapping(address => bool) private _blacklisted;

    // Fee parameters
    uint256 internal basisPointsRate;
    uint256 internal maximumFee;

    error SenderBlacklisted();
    error RecipientBlacklisted();
    error BasisPointsRateTooHigh();
    error MaxFeeTooHigh();

    function initialize(string memory name, string memory symbol, uint256 initialSupply) external initializer {
        __ERC20_init(name, symbol);
        __Ownable_init(msg.sender);
        __Pausable_init();

        _mint(_msgSender(), initialSupply); 
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        if (_blacklisted[msg.sender]) revert SenderBlacklisted();
        if (_blacklisted[to]) revert RecipientBlacklisted();

        uint fee = calculateFee(amount);
        uint sendAmount = amount - fee;

        _transfer(msg.sender, to, sendAmount);
        if (fee > 0) {
            _transfer(msg.sender, owner(), fee);
        }
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused returns (bool) {
        if (_blacklisted[from]) revert SenderBlacklisted();
        if (_blacklisted[to]) revert RecipientBlacklisted();

        uint fee = calculateFee(amount);
        uint sendAmount = amount - fee;

        _transfer(from, to, sendAmount);
        _approve(from, _msgSender(), allowance(from, _msgSender()) - amount);

        if (fee > 0) {
            _transfer(from, owner(), fee);
        }
        return true;
    }

    function setFeeParameters(uint newBasisPoints, uint newMaxFee) external onlyOwner {
        if (newBasisPoints >= 100) revert BasisPointsRateTooHigh();
        if (newMaxFee >= 50 ether) revert MaxFeeTooHigh();

        basisPointsRate = newBasisPoints;
        maximumFee = newMaxFee;
    }

    function calculateFee(uint256 amount) internal view returns (uint) {
        uint fee = (amount * basisPointsRate) / 10000;
        return fee > maximumFee ? maximumFee : fee;
    }

    function addToBlacklist(address account) external onlyOwner {
        _blacklisted[account] = true;
    }

    function removeFromBlacklist(address account) external onlyOwner {
        _blacklisted[account] = false;
    }

    function isBlacklisted(address account) public view returns (bool) {
        return _blacklisted[account];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
