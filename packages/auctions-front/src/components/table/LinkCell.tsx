import { styled } from '../../styles'
import { history } from '../../history'
import { nav } from '../../store'
import React from 'react'

export const LinkCellLayout = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {  
    font-size: 1.6em;
    color: #FFAE00;
  }
  a {  
    font-size: 1.6em;
    color: #FFAE00;
  }
`

export const LinkCell = (value, record, index, column) =>
  <LinkCellLayout>
    <span>{value}</span>
  </LinkCellLayout>
