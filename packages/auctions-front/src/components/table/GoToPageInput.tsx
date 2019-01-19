import React, { useCallback, useRef } from 'react'
import styled from '../../styles'
import { InputProps } from '../inputs/helpers'
import { Gold12, Gold13, Grey12, Grey13 } from '../../styles/Spans'
import {NumberInput} from '../inputs/NumberInput'
import {clamp} from 'ramda'
import useWithValue from '../../hooks/useWithValue'

export type GoToPageInputProps =
  & InputProps<number>
  & {
    maxValue: number
  }

const Layout = styled.div`
  font-family: 'Brandon Grotesque';
  font-weight: bold;
  
  display: flex;
  align-items: center;

  span {
    padding-right: 1.2em;
  }

  :first-child {
    cursor: pointer;
  }
  
  input {
    margin-right: 0.6em;
    width: 3.5em;
    text-align: center;
  }
`

const GoToPageInputRaw = ({value, onValueChange, maxValue, ...props}: GoToPageInputProps) => {
  const valueRef = useRef(value)

  const [currentValue, setCurrentValue] = React.useState(value as (number | string))

  let actualValue = currentValue

  if (valueRef.current !== value)
    actualValue = valueRef.current = value

  const onGoCallback = useCallback(
    () => {
      const numericValue = Number(actualValue).toString() === actualValue
        ? Number(actualValue)
        : value
      const clumpedValue = clamp(1, maxValue, numericValue)
      setCurrentValue(clumpedValue)
      onValueChange(clumpedValue)
    },
    [maxValue, actualValue],
  )


  const onBlur = useCallback(
    () => {
      setCurrentValue(value)
    },
    [],
  )

  return (
      <Layout
        {...props}
      >
        <Gold12 onClick={onGoCallback}>
          GO TO PAGE
        </Gold12>
        <NumberInput
          value={actualValue as any as number}
          onValueChange={setCurrentValue}
        />
        <Grey12>OF {maxValue}</Grey12>
      </Layout>
  )
}


export const GoToPageInput = useWithValue(1)(GoToPageInputRaw)
