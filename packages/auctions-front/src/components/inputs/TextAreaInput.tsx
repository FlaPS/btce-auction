import React, {ChangeEvent} from 'react'
import {TextArea, TextAreaProps} from '@sha/react-fp/src'
import {InputProps} from './helpers'

const TextAreaInput = React.forwardRef(
    (
        {onChange, onValueChange, ...props}: TextAreaProps & InputProps<string>,
        forwardedRef: React.Ref<TextAreaProps>,
    ) => (
        <TextArea
            {...props}
            ref={forwardedRef}
            onChange={React.useCallback(
                (event?: ChangeEvent<HTMLTextAreaElement>) => {
                    if (onChange) onChange(event)
                    if (onValueChange) onValueChange(event.target.value)
                },
                [onChange, onValueChange],
            )}
        />
    ),
)

export {
    TextAreaProps
}

export default TextAreaInput
