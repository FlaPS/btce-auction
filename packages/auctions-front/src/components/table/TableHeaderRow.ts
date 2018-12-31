import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import React from 'react'
import { TableCell } from './TableCell'

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 4.5em;
  align-items: center;
  background: #191919;
  /* Shadow */
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.65);
`


const TableHeaderCell = styled.div`
  color: #FEFEFE;
  padding-left: 2em;
  span {
    font-size: 1.3em;
    text-transform: uppercase;
  }
`
export const TableHeaderRow = <T>({columns}: {columns: ColumnProps<T, any>[]}) =>
  React.createElement(Layout,
    {},
    [
    // @ts-ignore
    columns.map( col =>
      React.createElement(TableHeaderCell, {style: {width: col.width}},[
        React.createElement('span', {}, [col.title])
      ]),
    ),
  ])
