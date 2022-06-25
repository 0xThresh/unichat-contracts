from brownie import Chat, accounts

def deploy_chat():
    account = accounts.load('new-deployer')
    chat = Chat.deploy({"from": account, "gas_limit": 0.02, "allow_revert": "true"}) 
    #(contract, *args, amount=None, gas_limit=None, gas_price=None, max_fee=None, priority_fee=None, nonce=None, required_confs=1, allow_revert=False, silent=False, publish_source=False)
    return chat


def main():
    deploy_chat()


if __name__ == "__main__":
    main()