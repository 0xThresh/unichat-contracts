import React, { useEffect, useState } from 'react'
import Blockies from '../Blocky/Blocky'
import { Message } from '../../types/data'
import { Flex, GridItem, Text } from '../styles'
import { CommentContainer, Image, Bubble} from './Comment.styles'
import { colors } from '../../constants'

import { getTimeText } from '../../helpers/helpers';
import { truncateAddress } from './Comment.helpers'


type props = {
  message: Message
  showDetails: () => void
}

export const Comment = ({message, showDetails}: props) => {
  const [src, setSrc] = useState('')
  useEffect(() => {
    const avatarSource = Blockies.create({ // All options are optional
      seed: message.from,
      size: 8, // width/height of the icon in blocks, default: 8
      scale: 5, // width/height of each block in pixels, default: 4
      // default: random. Set to -1 to disable it. These "spots" create structures
      // that look like eyes, mouths and noses.
    }).toDataURL();
    setSrc(avatarSource)
  }, [])

  return (
    <CommentContainer>
      <Image src={src}/>
      <GridItem gridRow={'1/2'} gridColumn={'2/3'}>
        <Flex alignItems={'center'}>
          <Text size={'16px'} color={colors.text.heading} fontWeight={600} style={{marginRight: '12px'}}>{truncateAddress(message.from)}</Text>
          <Text size={'12px'} color={colors.text.light}>{getTimeText(message.time)}</Text>
        </Flex>
      </GridItem>
      <GridItem gridRow={'2/3'} gridColumn={'2/3'}>
        <Text size={'16px'} color={colors.text.regular}>{message.text}</Text>
      </GridItem>
      <Bubble onClick={showDetails}>View More</Bubble>
    </CommentContainer>
  )

}
