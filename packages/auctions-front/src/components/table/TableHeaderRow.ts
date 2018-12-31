import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import React from 'react'
import { TableCell } from './TableCell'

const Layout = styled.div`
  display: flex;
padding-left: 2em;
    padding-right: 2em;
  height: 4.5em;
  align-items: center;
  background: #191919;
  /* Shadow */
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.65);
`


const LayoutExpandable = styled(Layout)`

  padding-right: 3.0em;
`

const TableHeaderCell = styled.div`
  color: #FEFEFE;
  span {
    font-size: 1.3em;
    text-transform: uppercase;
  }
`
export const TableHeaderRow = <T>({columns, isExpandable}: {columns: ColumnProps<T, any>[], isExpandable}) => {
  return (
    React.createElement(
      isExpandable ? LayoutExpandable : Layout,
      {},
      [
        // @ts-ignore
        columns.map(col =>
          React.createElement(TableHeaderCell, { style: { width: col.width } }, [
            React.createElement('span', {}, [col.title]),
          ]),
        ),
      ])
  )
}
