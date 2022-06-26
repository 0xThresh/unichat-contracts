import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

export const Image = styled.img`
  border-radius: 20px;
`

export const Bubble = styled.div`
  position: absolute;
  top: 30%;
  right: 12px;
  cursor: pointer;
  
  display: none;
  padding: 6px;
  border-radius: 6px;
  color: ${colors.text.heading};
  
  border: 1px solid grey;
  
  &:hover {
    background-color: black;
    color: white;
  }
`


export const CommentContainer = styled.div`
  position: relative;
  padding: 12px;
  &:hover {
    backdrop-filter: brightness(0.9);
  }
  
  display: grid;
  grid-template-rows: 22px 22px;
  grid-template-columns: 72px 1fr;
  
  
  &:hover {
    ${Bubble} {
      display: inherit;
    }
  }
`
