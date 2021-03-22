import styled, { keyframes } from 'styled-components'


const fadeIn = keyframes`
  0% {
    left: -60px;
  }
  100% {
    left: 0px;
  }
`

export const Container = styled.div`
    animation-duration: ${props => props.idx / 100 + 's'};
  animation-name: ${fadeIn};
`
