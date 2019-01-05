import React, { useContext } from 'react'
import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import { TableCell } from './TableCell'
import { TableContext } from './Table'
import { CollapseButton } from './CollapseButton'
import compose, { constant } from 'lazy-compose'

const Layout = styled.div`
  display: flex;
  padding-left: 2em;
   padding-right: 2em;
  height: 4.5em;
  align-items: center;
  border-bottom: 1px solid #2B2B2B;
  &:hover{
    background-color: #131313;
  }

  div {

  }
`


export const TableRow = ({columns, index, record}: {columns: ColumnProps<any, any>[], record: any, index: number}) => {

  const tableApi = useContext(TableContext)
  const rowKey = record[tableApi.rowKey]
  const isExpanded = tableApi.expandedKeys.includes(rowKey)

  return [
    <Layout style={{backgroundColor: isExpanded ?  '#000000' : 'rgba(0,0,0,0)'}}>
      {
        // @ts-ignore
        columns.map( (col, colIndex) => React.createElement(TableCell, { index, record, column: col, key: index + '_' + colIndex }))
      }
      {
        tableApi.expandedRowRender
          ?   <CollapseButton
                key={index + 'collapse'}
                value={isExpanded}
                onValueChange={compose(tableApi.toggleKeyExpand, constant(rowKey))}
              />
          :   null
      }
    </Layout>,
    tableApi.expandedKeys.includes(rowKey) && tableApi.expandedRowRender(record, index),
  ]
}
