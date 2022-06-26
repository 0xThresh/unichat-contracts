import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Modal, ModalContent } from '../commonComponents'
import { Flex, Grid, GridItem, Absolute, Button, Text} from '../styles'
import { colors } from '../../constants'
import { signMessage, PartialMessage } from '../../helpers/metamask'
import { Message } from '../../types/data'

const Input = styled.input`
  background-color: #f8fafd;
  opacity: 1;
  width: 100%;
  border: 1px solid #d5dae2;
  font-size: 14px;
  padding: .75rem 1rem;
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
    background-color: #f8fafd;
  opacity: 1;
  width: 100%;
  border: 1px solid #d5dae2;
  font-size: 14px;
  padding: .75rem 1rem;
  margin-bottom: 10px;
`

const BigButton = styled(Button)`
  font-size: 20px;
  color: white;
  background-color: ${colors.border.regular};
`

export const CommentConfirmation = ({closeCb, text, onMessageSign}: { closeCb: () => void, text: string, onMessageSign: (m: Message) => void}) => {
  const [inputValue, setInputValue] = useState('');
  const handleOnClick = useCallback(() => {
    const time = Math.round(Date.now()/1000)
    const partialMessage: PartialMessage = { text, time, cid: '', to: inputValue}
    signMessage(partialMessage).then(message => {
      onMessageSign(message)
    })
    closeCb()
  }, [text, closeCb, inputValue])

  return (
    <Modal>
      <ModalContent>
        <Absolute top={'10px'} right={'10px'}>
          <Button onClick={closeCb}>Close</Button>
        </Absolute>
        <Grid gridTemplateRows={'1fr 1fr 1fr 1fr 1fr 1fr'} gridTemplateColumns={'1fr'} style={{padding: '10px'}}>
          <Flex alignItems={'center'}>
            <Text color={colors.text.heading} size={'18px'}>To (optional):</Text>
          </Flex>
          <GridItem>
            <Input type="text" value={inputValue} onChange={(e => setInputValue(e.target.value))}/>
          </GridItem>
          <Flex alignItems={'center'}>
            <Text color={colors.text.heading} size={'18px'}>Your Message</Text>
          </Flex>
          <GridItem>
            <TextArea value={text} readOnly/>
          </GridItem>
        </Grid>
        <Flex justifyContent={'center'} onClick={handleOnClick}><BigButton>Sign and Broadcast</BigButton></Flex>
      </ModalContent>
    </Modal>
  )
}
