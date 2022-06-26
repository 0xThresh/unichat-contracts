import axios from 'axios'
import { Message, DataStructure } from '../types/data'

const baseAPIURL = 'http://localhost:3000'

export const fetchAllMessagesCall = (): Promise<Array<Message>> => {
  return axios.get(`${baseAPIURL}/dataStructure`).then(res => {
    const dataStructure: DataStructure = res.data.dataStructure
    const allMessages = dataStructure.reduce((_allMessages: Array<Message>, dataEntry) => {
      return _allMessages.concat(dataEntry.messages)
    }, [])
    return allMessages
  });
} //TODO check the above once the backend has some messages

export const submitMessageAPICall = (message: Message): Promise<boolean> => {
  return axios.post(`${baseAPIURL}/localMessages`, {message})
}
