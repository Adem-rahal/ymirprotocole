// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/// @title ERC1155 semi-fungible staking contract
/// @author Argonaute

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingERC1155 is Ownable {

    IERC1155 public HashToken;

    address public tokenAddress;    // address of the ERC1155 smartcontract holding the tokens

    // each Farm contains the current network address (btcaddress for example if on th bitcoin mainnet) and the number of token associated with that batch
    struct FarmInfo {
        string networkAddress;
        uint balance;
    }

    mapping(address => mapping(uint => FarmInfo)) userFarmsInfo;
    mapping (uint => bool) batchIsActive;

    event UpdateDataBase(address indexed user, string networkAddress, uint updatedBalance, uint id);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        HashToken = IERC1155(tokenAddress);
    }

    function activateBatch(uint _id, bool _active) external onlyOwner {
        batchIsActive[_id] = _active;
    }

    function modifyTokenAddress(address _newTokenAddress) external onlyOwner {
        HashToken = IERC1155(_newTokenAddress);
    }
    
    
    /**
    * @notice Allows to stake your NFT
    *
    * @param _id id of the Token you are trying to stake
    * @param _amount The amount of token you want to stake
    * @param _networkAddress wallet address of the network you are trying to mine to (example BTC network = btcAddress) 
    **/
    function stake(uint _id, uint _amount, string memory _networkAddress) external {  
        // Verify that the batch has been activated  
        require(batchIsActive[_id] == true, "You can't stake this token yet, it has not been activated!");
        
        //Transfer the tokens to this contract (stake them for the user)
        HashToken.safeTransferFrom(msg.sender, address(this), _id, _amount,"");

        uint updatedBalance = userFarmsInfo[msg.sender][_id].balance + _amount;
        //Update User balance staked for this tokens
        userFarmsInfo[msg.sender][_id] = FarmInfo(_networkAddress, updatedBalance);

        // push the staker infos on the network for the API
        emit UpdateDataBase(msg.sender, _networkAddress, updatedBalance, _id); 
    }

    function unstake(uint _id, uint _amount) external {
        // Verify that the user is withdrawing an amount of token available in his balance
        require(userFarmsInfo[msg.sender][_id].balance > _amount - 1, "You are trying to withdraw more token than you have");

        //Transfer the tokens from this contract to the user 
        HashToken.safeTransferFrom(address(this), msg.sender, _id, _amount,"");

        uint updatedBalance = userFarmsInfo[msg.sender][_id].balance - _amount;
        string memory networkAddress = userFarmsInfo[msg.sender][_id].networkAddress;
        //Update User balance staked for this tokens
        userFarmsInfo[msg.sender][_id].balance =  updatedBalance;

        // push the staker infos on the network for the API
        emit UpdateDataBase(msg.sender, networkAddress, updatedBalance, _id); 

    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    )
        external
        returns(bytes4)
    {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }



}