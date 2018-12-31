import React from 'react'
import styled, {fontSize, layouts, SVGLibrary} from '../../styles'
import {ButtonProps, ExtractProps} from '@sha/react-fp'
import {useWithContext} from '../../hooks/'
import {DisabledContext} from '../../contexts'
import {media} from '../../styles/media'
import {outline} from '../../styles/constants'

const Label = styled.span`
  ${fontSize.small}
`

const BaseButtonRaw = styled(({children, ...props}: ButtonProps) => (
    <button {...props}>
        <Label>{children}</Label>
    </button>
))`
  font: unset;

  border: none;
  cursor: pointer;
  &:disabled {
    cursor: inherit;
  }
  &:focus {
    ${outline}
  }
`
const BaseButton = useWithContext(DisabledContext, 'disabled')(BaseButtonRaw)

export const PrimaryButton = React.memo(
    styled(BaseButton)`
    color: #2a2a2a;
    background-color: #dcdcdc;
    height: 5em;
    padding: 1.6rem 2.5em;
    box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
    &:hover {
      background-color: #a6a6a6;
    }
    &:active {
      background-color: #dcdcdc;
      box-shadow: inset 0px 3px 0px rgba(0, 0, 0, 0.1);
    }
    &:disabled {
      color: #d5d5d5;
      background-color: #eaeaea;
      box-shadow: none;
    }

    ${media.portraitMax`
        font-size: 0.8em;
    `}
  `,
)

export const AccentButton = React.memo(
    styled(PrimaryButton)`
    filter: invert(100%);
  `,
)

type CloseButtonProps = ExtractProps<typeof BaseButton>

export const CloseButton = React.memo(
    styled((props: CloseButtonProps) => (
        <BaseButton {...props}>
            <SVGLibrary.Close className="icon"/>
        </BaseButton>
    ))`
    ${layouts.reset}
    font-size: 1em;
    width: 5em;
    height: 5em;
    background: none;
    .icon {
      margin: auto;
    }
    &:hover {
      background-color: #a6a6a6;
    }
  `,
)

export const MenuButton = React.memo(
    styled((props: CloseButtonProps) => (
        <BaseButton {...props}>
            <SVGLibrary.Hamburger className="icon"/>
        </BaseButton>
    ))`
    width: 5em;
    height: 5em;
    background: none;
    .icon {
      margin: auto;
    }
    &:hover {
      background-color: #a6a6a6;
    }
  `,
)
