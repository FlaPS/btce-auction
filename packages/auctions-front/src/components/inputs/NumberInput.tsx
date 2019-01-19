import React, { ChangeEvent, useCallback } from 'react'
import { HTMLInput, HTMLInputProps } from '@sha/react-fp'
import { InputProps } from './helpers'
import { styled } from '../../styles'
import { useWithValue } from '../../hooks'

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

const NumberInputRaw = React.forwardRef(
  (
    {onChange, onValueChange, value, fixedDigits = 0, ...props}: NumberInputProps,
    forwardedRef: React.Ref<HTMLInputProps>,
  ) => {

    const onChangeCallBack = React.useCallback(
      (event?: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event)
        if (onValueChange) onValueChange(event.target.value)
      },
      [onChange, onValueChange],
    )
/*
    const isValidNumber = !isNaN(Number(value))

    if (isValidNumber) {
      const part = Number(value) % 1
      if (!String(value).endsWith('.') || String(part).length < fixedDigits + 2)
        value = Number(value).toFixed(fixedDigits)
    }
*/
    return (
      <StyledInput
        {...props}
        value={value}
        ref={forwardedRef}
        onChange={onChangeCallBack}
      />
    )
  },
)

export type NumberInputProps =  HTMLInputProps & InputProps<string | number> & {
  fixedDigits?: number
  error?: string
}

export {
  HTMLInputProps
}
export const NumberInput = useWithValue(0)(NumberInputRaw)


export default NumberInput
