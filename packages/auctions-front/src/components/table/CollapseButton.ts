import React from 'react'
import { styled, SVGLibrary } from '../../styles'
import { ButtonProps } from '@sha/react-fp'
import { InputProps } from '../inputs/helpers'
import compose, { constant } from 'lazy-compose'

const CollapseButtonBase = styled.div`
  background: #2A2A2A;
  border-radius: 0.5em;
  min-width: 2.2em;
  min-height: 2.2em;
  border: none;
  outline: none;
  color: #FFAF02;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.8em;
`

const CollapseButtonToggled = styled(CollapseButtonBase)`
  background: #131313;
`


const CollapseButtonRaw = ({value, onValueChange, ...props}: ButtonProps & InputProps<boolean>) =>
  value
    ? React.createElement(
        CollapseButtonToggled,
        {onClick: compose(onValueChange, constant(!value))},
        React.createElement(SVGLibrary.ArrowUp),
      )
    : React.createElement(
        CollapseButtonBase,
        {onClick: compose(onValueChange, constant(!value))},
        React.createElement(SVGLibrary.ArrowDown),
      )

export const CollapseButton = CollapseButtonRaw
