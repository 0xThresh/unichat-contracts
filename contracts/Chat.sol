// SPDX-License-Identifier: no
pragma solidity ^0.8.14; 

contract Unichat {
    // variables
    uint256 fixedPaymentAmount = 1000000000000000000; // 1 eth in wei
    mapping(string => address) public submitters; 
    mapping(address => uint256) public balances;

    // events
    event newMessage(string _hash);  

    // this needs to be executed before addData() can be called
    function fundContract() payable public returns(bool) {
        require(msg.value == fixedPaymentAmount); 
        submitters['initial'] = msg.sender;
        return true;
    }
        

    function addData(string memory _oldHash, string memory _newHash) payable public returns(bool) {         
        // require that the sender included the required amount of eth
        require((msg.value) >= fixedPaymentAmount, "Not enough ETH sent to stake.");
        
        
        // receive ETH to be staked 
        (bool storeSuccess,) = msg.sender.call{value: fixedPaymentAmount}("");
        require(storeSuccess, "Transfer IN failed.");

        
        // update submitters with _newHash to msg.sender 
        submitters[_newHash] = msg.sender;


        // add the freed up balances to the balances map 
        balances[submitters[_oldHash]] += fixedPaymentAmount;

        // clean up submitters[_oldHash]]
        delete submitters[_oldHash];

        emit newMessage(_newHash);

        return true; 
    }


    function withdrawFunds(address payable _address) external {
        // sends back ETH to anyone whose funds have been freed up after another address submits hashes
        //bool locked;
        //require(!locked, "Reentrant call detected!");
        uint256 currentBalance;
        
        //locked = true;
        currentBalance = balances[_address];
        balances[_address] = 0;
       (bool success,) =    
        _address.call{value: currentBalance}('');
        
        require(success, "Transfer OUT failed.");
        
        //locked = false;
    }
}