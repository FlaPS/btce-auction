import React from 'react'
import styled, { colors } from '../../styles'
import { ExtractProps } from '@sha/react-fp'
import { InputProps } from './helpers'
import {compose, constant} from 'lazy-compose'
import { useWithValue } from '../../hooks'


const SimpleRadioGroupRaw = ({
   label = 'showing',
   value = 10,
   data = [10, 25, 100],
   onValueChange,
   ...props}: SimpleRadioGroupProps) =>
  <Layout {...props}>
    <div>{label}</div>
    {
      data.map((text, index) =>
        <div
          className={'item ' + (String(text) === String(value) ? 'active' : 'inactive')}
          key={index}
          onClick={compose(onValueChange, constant(text))}
        >
          {text}
        </div>,
      )
    }
  </Layout>

export const SimpleRadioGroup = useWithValue(10)(SimpleRadioGroupRaw)

const Layout = styled.div`
  font-family: 'Brandon Grotesque';
  text-transform: uppercase;
  display: flex;
  font-weight: bold;
  
  div {
    color: #FFFFFF;
    transition: all 0.3s ease;

    font-size: 1.2em;
    line-height: 2em;
  }

  .item {
    padding-left: 0.7em;
    padding-right: 0.7em;
  }
  
  .item:hover {
    color: ${colors.accent}
  }

  .active {
    cursor: pointer;
  }

  .inactive {
    color: #616161;
    cursor: pointer;
  }

`

export type SimpleRadioGroupProps =
  & ExtractProps<typeof Layout>
  & InputProps<number, number>
  & {
    label?: string
  }
