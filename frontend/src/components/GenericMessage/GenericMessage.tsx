import { Absolute, Button, Flex, Text} from '../styles'
import { colors } from '../../constants'
import { Modal, ModalContent } from '../commonComponents'

export const GenericMessage = ({closeCb, text}: { closeCb: () => void, text: string}) => {
  return (
    <Modal>
      <ModalContent>
        <Absolute top={'10px'} right={'10px'}>
          <Button onClick={closeCb}>Close</Button>
        </Absolute>
        <Flex justifyContent={'center'}>
          <Text size={'16px'} color={colors.text.heading}>
            {text}
          </Text>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
