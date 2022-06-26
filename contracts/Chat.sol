// SPDX-License-Identifier: None
pragma solidity ^0.8.14; 

contract Unichat {
    // variables
    uint256 fixedPaymentAmount = 1000000000000000; // .001 eth in wei
    mapping(string => address) public submitters; 
    mapping(address => uint256) public balances;

    // events
    event NewEntry(string _hash);  

    // this needs to be executed before addData() can be called
    function fundContract() payable public returns(bool) {
        require(msg.value == fixedPaymentAmount); 
        submitters['initial'] = msg.sender;
        return true;
    }
        

    function addData(string memory _oldHash, string memory _newHash) payable public returns(bool) {          
        require((msg.value) >= fixedPaymentAmount, "Not enough ETH sent to stake.");
        require(bytes20(submitters[_oldHash]) != 0, "Another hash has been submitted by another node.");
        
        
        // receive ETH to be staked 
        (bool storeSuccess,) = msg.sender.call{value: fixedPaymentAmount}("");
        require(storeSuccess, "Transfer IN failed.");

        
        // update submitters with _newHash to msg.sender 
        submitters[_newHash] = msg.sender;


        // add the freed up balance to the balances map 
        balances[submitters[_oldHash]] += fixedPaymentAmount;

        // clean up submitters[_oldHash]]
        delete submitters[_oldHash];

        emit NewEntry(_newHash);

        return true; 
    }


    function withdrawFunds(address payable _address) external returns(bool) {
        // sends back ETH to anyone whose funds have been freed up after another address submits hashes
        uint256 currentBalance;
        currentBalance = balances[_address];
        balances[_address] = 0;
       (bool success,) =    
        _address.call{value: currentBalance}('');
        
        require(success, "Transfer OUT failed.");
    
        return true;
    }
}


