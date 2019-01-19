import React, { ChangeEvent } from 'react'
import { HTMLInput, HTMLInputProps } from '@sha/react-fp'
import { InputProps } from './helpers'
import { styled } from '../../styles'



const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    color: #616161;
    background-color: #131313;
    border: 1px solid #2B2B2B;
    padding: 0.55em 0.8em;
    font-size: 1.6em;
    outline: none;
    border-radius: 3px;
    transition: border .4s ease;
    resize: none;
`

const StringInput = React.forwardRef(
  (
    {onChange, onValueChange, ...props}: HTMLInputProps & InputProps<string>,
    forwardedRef: React.Ref<HTMLInputProps>,
  ) => (
    <HTMLInput
      {...props}
      ref={forwardedRef}
      className={'form__input'}
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

export {
  HTMLInputProps
}

export default StringInput
