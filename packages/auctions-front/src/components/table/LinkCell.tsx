import { styled } from '../../styles'
import { history } from '../../history'
import { nav } from '../../store'
import React from 'react'

const Layout = styled.div`
  cursor: pointer;
  span {  
    font-size: 1.6em;
    color: #FFAE00;
  }
  
`

export const LinkCell = (value, record, index, column) =>
  <Layout>
    <span>{value}</span>
  </Layout>
