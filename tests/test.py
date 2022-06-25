'''
Test Cases:
1. Contract deploys successfully
2. FundContract succeeds when supplying 1 ETH and sets "submitters['initial'] = msg.sender;" 
3. FundContract fails when supply <1 ETH 
4. AddData fails when not enough ETH is sent for staking 
5. ETH transfer succeeds 
6. submitters[_newHash] = msg.sender;
7. balances mapping is updated to the correct amount 
8. _oldHash is deleted 
9. Events emit correct values
10. balances[_address] contains at least 1 ETH for an account with ETH ready to be unstaked 
11. withdrawFunds allows withdrawls 
'''
from brownie import accounts
from scripts.deploy_chat import deploy_chat

def test_create_bounty():
  # Arrange
  standard_bounties = deploy_standard_bounties() # ContractTx
  #contract_owner = accounts[0]
  sender = accounts[0] # this should normally be msg.sender in the contract unless coming through meta tx relayer
  issuers = [accounts[0], accounts[3]]
  approvers = [accounts[0], accounts[2]]
  data = "QmNnWrwfAbsnWvyTgGpaYLdh1oAkBR5B74MjwZh8stTL97" # need an example IPFS hash here; this is an NFT hash currently
  deadline = "1654045200" # May 31st, 2022 at 18:00 UTC
  token = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" # using USDC; not sure this is needed when using ETH
  token_version = "20" # 0 for ETH, 20 for ERC20, 721 for ERC721'
  bounty_id = 0
  print(f"Output from deployment: {standard_bounties}")


  # Act - check that we can issue a bounty
  tx = standard_bounties.issueBounty(sender, issuers, approvers, data, deadline, token, token_version, {"from": sender}) # TransactionReceipt
  tx.wait(1)

  # Assert - check that bounty is set up correctly
  assert tx.return_value == bounty_id, "Bounty ID is incorrect"
  assert tx.sender == sender, "Sender is incorrect"

  # Act 
  tx_get_bounty = standard_bounties.getBounty(bounty_id, {"from": accounts[5]}) # TransactionReceipt
  #tx_get_bounty.wait(1)

  # Assert - get resulting bounty
  #assert simple_storage.getNumber() == expected
  print(f"Output from getBounty: {tx_get_bounty}")
  #assert tx_get_bounty.return_value == bounty_id, "Bounty ID is correct"