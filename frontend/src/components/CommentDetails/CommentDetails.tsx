import styled from 'styled-components'
import { Modal, ModalContent } from '../commonComponents'
import { Flex, Grid, GridItem, Absolute, Button, Text} from '../styles'
import { Message } from '../../types/data'
import { colors } from '../../constants'

const ReadOnlyInput = styled.input`
  background-color: #f8fafd;
  opacity: 1;
  width: 100%;
  border: 1px solid #d5dae2;
  font-size: 14px;
  padding: .75rem 1rem;
  margin-bottom: 10px;
`

export const CommentDetails = ({closeCb, message}: { closeCb: () => void, message: Message}) => {
  const signedMessage = {...message}
  // @ts-ignore
  delete signedMessage.signature

  return (
    <Modal>
      <ModalContent>
        <Absolute top={'10px'} right={'10px'}>
          <Button onClick={closeCb}>Close</Button>
        </Absolute>
        <Grid gridTemplateRows={'1fr 1fr 1fr 1fr 1fr 1fr'} gridTemplateColumns={'1fr'} style={{padding: '10px'}}>
          <Flex alignItems={'center'}>
            <Text color={colors.text.heading} size={'18px'}>Address</Text>
          </Flex>
          <GridItem>
              <ReadOnlyInput type="text" value={message.from} readOnly/>
          </GridItem>
          <Flex alignItems={'center'}>
            <Text color={colors.text.heading} size={'18px'}>Signed Message</Text>
          </Flex>
          <GridItem>
            <ReadOnlyInput type="text" value={JSON.stringify(signedMessage)} readOnly/>
          </GridItem>
            <Flex alignItems={'center'}>
              <Text color={colors.text.heading} size={'18px'}>Signature</Text>
            </Flex>
          <GridItem>
            <ReadOnlyInput type="text" value={message.signature} readOnly/>
          </GridItem>
        </Grid>
      </ModalContent>
    </Modal>
  )
}
