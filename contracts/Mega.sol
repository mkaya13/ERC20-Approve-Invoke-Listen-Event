//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mega is ERC20 {
    address public owner;

    uint constant _initial_supply = 100000 * (10 ** 18);

    constructor() ERC20("Mega", "MG") {
        owner = msg.sender;
        _mint(msg.sender, _initial_supply);
    }

    // Initialize burn function

    function burn(uint256 value) public {
        _burn(msg.sender, value);
    }

    // Initialize mint function

    function mint(uint256 value) public {
        require(msg.sender == owner);
        _mint(msg.sender, value);
    }
}
