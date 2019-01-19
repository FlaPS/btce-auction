import React from 'react'
import styled from '../../../styles'
import { InputProps } from '../../inputs/helpers'
import { useWithValue } from '../../../hooks'

const Layout = styled.div`
    width: 100%;
    border-bottom: 0.1em solid #2B2B2B;
    display: flex;


    div {
      font-weight: bold;
      cursor: pointer;
      text-align: center;
      height: 100%;
      width: 100%;
      color: #616161;
      min-height: 4em;
      text-align: center;
      align-content: unset;
      padding-top: 1.1em;
      span {
        font-size: 1.3em;
      }
    }
    .active {
      
      color: white;
      border-bottom: 0.1em solid white;
    }
`


export const AccountInfoTabBar = useWithValue(0)(
  ({data, value, onValueChange, ...props}: InputProps<number, string>) =>
    <Layout>
      {data.map(
        (item, index) =>
          <div
            className={index === value ? 'active' : ''}
            onClick={() => onValueChange(index)}
          >
            <span>{item}</span>
          </div>,
      )}
    </Layout>,
)
