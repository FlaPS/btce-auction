import React from 'react'
import { HTMLSelectProps, renderChildren } from '@sha/react-fp/src'
import { InputLayout, InputProps, memoizedOnChange } from './helpers'
import { identity } from 'ramda'
import shallowEqual from '../../hooks/shallowEqual'
import styled from '../../styles'

type SelectInputProps<T = any> = InputProps<T> &
    HTMLSelectProps & {
    renderOption?: (option: T) => React.ReactNode
}

const defaultRenderOption = identity

const SelectInput = ({
                         value,
                         onValueChange,
                         label,
                         onChange,
                         data = [],
                         disabled,
                         renderOption = defaultRenderOption,
                         ...props
                     }: SelectInputProps) => (
    <InputLayout>
        {label && <label>{renderChildren(label)}</label>}
        <StyledSelect
            disabled={disabled}
            onChange={memoizedOnChange(onChange, onValueChange)}
            value={value}
        >
            {data.map((item, index) => (
                <option key={index} value={item}>
                    {renderOption(item)}
                </option>
            ))}
        </StyledSelect>
    </InputLayout>
)

const StyledSelect = styled.select`
  padding: 5px 0px 5px 5px;
  margin: 5px 1px 3px 0px;

  transition: all 0.2s ease-in-out;
  //padding: 3px 0px 3px 3px;
  //margin: 5px 1px 3px 0px;

  &:focus {
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
  }
`

export default React.memo(
    SelectInput,
    ({data: dataA, ...a}, {data: dataB, ...b}) =>
        shallowEqual(a, b) && shallowEqual(dataA, dataB),
)
