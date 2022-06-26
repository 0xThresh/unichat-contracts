import styled from 'styled-components'
import { colors } from '../constants'

export const Wrapper = styled.div`
  background-color: #f8f9fa;
  width: 100%;
  height: 100%;
  
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  grid-template-rows: 10px 100px 20px 1fr 40px 10px 20px;
`

export const TextInput = styled.input`
  color: white;
  font-size: 16px;
  background-color: ${colors.border.regular};
  padding: 10px 0 10px 8px;

  width: 100%;

  outline: none;
  border-style: none;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.text.light};
    opacity: 1; /* Firefox */
  }
`;

export const Grid = styled.div<{gridTemplateRows: string, gridTemplateColumns: string}>`
  display: grid;
  grid-template-columns: ${({gridTemplateColumns}) => gridTemplateColumns};
  grid-template-rows: ${({gridTemplateRows}) => gridTemplateRows};
`

export const GridItem = styled.div<{
  gridRow?: string;
  gridColumn?: string;
  border?: string
  padding?: string
}>`
  ${({ gridColumn }) => gridColumn && `grid-column: ${gridColumn};`}
  ${({ gridRow }) => gridRow && `grid-row: ${gridRow};`}
  ${({border}) => border && `border: ${border};`}
`

export const Text = styled.div<{
  size?: string;
  color?: string
  fontWeight?: number
}>`
  font-size: ${({size}) => size};
  color: ${({color}) => color};
  ${({fontWeight}) => fontWeight && `font-weight: ${fontWeight};`}
`

export const Flex = styled.div<{justifyContent?: string, alignItems?: string}>`
  display: flex;
  ${({justifyContent}) => justifyContent && `justify-content: ${justifyContent};`}
  ${({alignItems}) => alignItems && `align-items: ${alignItems};`}
`

export const Absolute = styled.div<{
  top: string;
  left?: string;
  right?: string;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left && left};
  right: ${({ right }) => right && right};
`;

export const Button = styled.button`
  cursor: pointer;
  font-weight: 600;
  padding: 6px;
  border-style: none;
  color: ${colors.text.heading};
  border-radius: 6px;
`
