import React from 'react'
import { HTMLInputProps, renderChildren } from '../../../../react-fp/src'
import { InputLayout, InputProps, memoizedOnChange } from './helpers'

type DateInputProps = InputProps<string> & HTMLInputProps

export default ({
                    onValueChange,
                    label,
                    onChange,
                    ...props
                }: DateInputProps) => (
    <InputLayout>
        <label>{renderChildren(label)}</label>
        <input
            type="date"
            {...props}
            onChange={memoizedOnChange(onChange, onValueChange)}
        />
    </InputLayout>
)
