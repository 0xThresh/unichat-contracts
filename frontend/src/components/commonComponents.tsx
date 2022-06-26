import styled from 'styled-components'

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

export const ModalContent = styled.div`
 background-color: #fefefe;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 40px;
  border: 1px solid #888;
  width: 100%; /* Could be more or less, depending on screen size */
`
