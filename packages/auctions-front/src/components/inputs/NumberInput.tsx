import React, { ChangeEvent } from 'react'
import { HTMLInput, HTMLInputProps } from '@sha/react-fp'
import { InputProps } from './helpers'
import { styled } from '../../styles'

const StyledInput = styled.input`
    color: #FFFFFF;
    background-color: #131313;
    border: 1px solid #2B2B2B;
    padding: 0.55em 0.8em;
    font-size: 1.3rem;
    outline: none;
    border-radius: 3px;
    transition: border .4s ease;

    
    &:hover {
        border: 1px solid #616161;
    }
`

const NumberInput = React.forwardRef(
  (
    {onChange, onValueChange, ...props}: NumberInputProps,
    forwardedRef: React.Ref<HTMLInputProps>,
  ) => (
    <StyledInput
      {...props}
      ref={forwardedRef}
      onChange={React.useCallback(
        (event?: ChangeEvent<HTMLInputElement>) => {
          if (onChange) onChange(event)
          if (onValueChange) onValueChange(event.target.value)
        },
        [onChange, onValueChange],
      )}
    />
),
)

export type NumberInputProps =  HTMLInputProps & InputProps<number>

export {
  HTMLInputProps
}

export default NumberInput as any as React.ComponentType<NumberInputProps>
