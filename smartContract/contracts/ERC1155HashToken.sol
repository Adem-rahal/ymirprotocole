// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/// @title startmining NFT contract
/// @author Argonaute
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract ERC1155HashToken is ERC1155, Ownable {


    bool public paused = false; //Is the contract paused 
    
    struct BatchInfo {
        string uri;
        uint  maxSupply;
        uint currentSupply;
        uint price;
    }


    address private _owner; //Owner of the smart contract
    mapping(uint => BatchInfo) idToBatch; // Associates uri to every drop

    constructor() ERC1155("") {
        transferOwnership(msg.sender);
    }


    /** 
    * @notice Set pause to true or false
    *
    * @param _paused True or false if you want the contract to be paused or not
    **/
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    /** 
    * @notice Create new batch of miner
    *
    * @param _id The id of the nft batch we want to create or rewrite                    
    * @param _uri The uri of that batch
    * @param _maxSupply The max supply of token of that batch 
    * @param _price The unit price of that batch
    **/
    function createBatch(uint _id, string memory _uri, uint _maxSupply, uint _price) external onlyOwner {
        idToBatch[_id] = BatchInfo(_uri, _maxSupply, 0, _price);
    }

    /** 
    * @notice Change the maximum number of NFTs that can be minted in a batch
    * 
    * @param _id Batch id                        
    **/
    function getBatchInfo(uint _id) public view returns (uint,uint,uint) {
        BatchInfo memory b = idToBatch[_id];
        return (b.currentSupply, b.maxSupply, b.price);
    }

    /** 
    * @notice Change the maximum number of NFTs that can be minted in a batch
    * 
    * @param _id Batch id 
    * @param _maxSupply The number of NFTs that an address can mint                        
    **/
    function changeMaxSupply(uint _id, uint _maxSupply) external onlyOwner {
        idToBatch[_id].maxSupply = _maxSupply;
    }


    /**
    * @notice Change the price of an NFT of a certain batch
    *
    * @param _id Batch id 
    * @param _price The new price of one NFT
    **/
    function changePrice(uint _id, uint _price) external onlyOwner {
        idToBatch[_id].price = _price;
    }

  
    /**
    * @notice Change the base URI of a certain batch
    *
    * @param _id Batch id 
    * @param _newBaseURI The new base URI 
    **/
    function changeUri(string memory _newBaseURI, uint _id) external onlyOwner {
        idToBatch[_id].uri = _newBaseURI;
    }


    /**
    * @notice Allows to mint NFTs 
    *
    * @param _id Batch id 
    * @param _amount The ammount of NFT they want to mint
    **/
    function mint(uint _id, uint _amount) external payable {

        require(paused == false, "Sorry the contract is paused");
        require(msg.value == idToBatch[_id].price * _amount, "Not enought funds."); //Did the user send enough Ethers ? 
        
        uint nftMaxSupply = idToBatch[_id].maxSupply;
        uint nftCurrentSupply = idToBatch[_id].currentSupply;

        require(nftCurrentSupply + _amount < nftMaxSupply, "Sale is almost done and we don't have enought tokens left.");

        idToBatch[_id].currentSupply += _amount; //Increment the number of NFTs this user minted
        _mint(msg.sender, _id, _amount, "");

    }

    /**
    * @notice Allows to get the complete URI of a specific NFT by his ID
    *
    * @param _id The id of the NFT
    *
    * @return The token URI of the NFT which has _nftId Id
    **/
    function uri(uint _id) public override view returns (string memory) {
        
        return idToBatch[_id].uri;
    }

}