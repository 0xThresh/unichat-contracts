import { Message } from '../types/data'

async function evaluateWeb3() {
  let message = ''
  let accounts = null

  if (window.ethereum) {
    try {
       accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      message = 'Account request failed'
    }
  }
  else {
    message = 'Non-Ethereum environment detected. Please connect with a Web3 extension like Metamask or enabled browser like Coinbase Wallet.'
  }

  return { account: accounts[0], message }
}

export type PartialMessage = Omit<Message, 'signature' | 'from'>

export const signMessage = async (partialMessage: PartialMessage): Promise<Message> => {
  const { message, account} = await evaluateWeb3()
  if (message) throw message

  const stringifiedPartialMessage = JSON.stringify(partialMessage)

  const msgParams = [
    {
      type: 'string',
      name: 'New Message',
      value: stringifiedPartialMessage
    }
  ]
  return window.ethereum.request({
      method: 'eth_signTypedData',
      params: [msgParams, account],
      from: account,
    }).then((signature: string) => {
    const message: Message = {...partialMessage, signature, from: account}
    return message
  })

}

