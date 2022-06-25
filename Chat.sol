// SPDX-License-Identifier: no
pragma solidity ^0.8.14; 

contract Unichat {
    // data 
    uint256 fixedPaymentAmount = 1 ether; // 1000000000000000 this is in .001 ETH in wei 

    mapping(string => address) hashSender; 
    mapping(address => uint256) balance;

    // events
    event newMessage(string _hash);  

    // this needs to be executed before addData() can be called
    function fundContract() payable public {
        require(msg.value == fixedPaymentAmount); 
        hashSender['initial'] = msg.sender;
    }
        

    function addData(string memory _oldHash, string memory _newHash) payable public { // could add payment as an option          

        // require that the sender has the appopriate amount of eth
        require(address(msg.sender).balance >= fixedPaymentAmount, "Address does not contain enough ETH to stake.");
        
        
        // take the ETH to store 
        (bool storeSuccess,) = msg.sender.call{value: fixedPaymentAmount}("");
        require(storeSuccess, "Transfer IN failed.");

        
        // update hashSender with _newHash to msg.sender 
        hashSender[_newHash] = msg.sender;


        // add the freed up balance to the balance map 
        balance[hashSender[_oldHash]] + fixedPaymentAmount;

        emit newMessage(_newHash);
    }

    /*function viewData(string memory _oldHash) public pure returns(string memory) {
        return _oldHash;
    }*/

    function withdrawFunds(address payable _address) external {
        // sends back ETH to anyone whose funds have been freed up after another address submits hashes
        bool locked;
        require(!locked, "Reentrant call detected!");
        
        locked = true;
        
       (bool success,) =    
        _address.call{value: balance[_address]}('');
        
        require(success, "Transfer OUT failed.");
        
        locked = false;
    }
}