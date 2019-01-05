import React, { ChangeEvent } from 'react'
import { HTMLInput, HTMLInputProps } from '@sha/react-fp/src'
import { InputProps } from './helpers'

const NumberInput = React.forwardRef(
  (
    {onChange, onValueChange, ...props}: HTMLInputProps & InputProps<number>,
    forwardedRef: React.Ref<HTMLInputProps>,
  ) => (
    <HTMLInput
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

export {
  HTMLInputProps
}

export default NumberInput
