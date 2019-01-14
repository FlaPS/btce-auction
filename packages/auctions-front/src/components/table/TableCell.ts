import React from 'react'
import { ColumnProps } from './ColumnProps'
import { styled } from '../../styles'

const DefaultLayout = styled.div`
  color: #E9DBC4;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    font-size: 1.6em;
  }
`

const defaultRender = (value: any, record: any, index: number) =>
  React.createElement(DefaultLayout, {},
    React.createElement('span', {key: 'span'},
      (typeof value === 'string' || typeof value === 'number')
        ? value
        : JSON.stringify(value),
    ),
  )

const getRenderer = <T, K extends keyof T>(column: ColumnProps<T, K>) => {
  return column.render || defaultRender
}

const renderSafely = (f: () => any) => {
  let result = 'Error'
  try {
    result = f()
  } catch(e) {
    console.warn(e)
  }
  return result
}

export const TableCell = <T, K extends keyof T>({column, record, index}:
              {column: ColumnProps<T, K>, index: number, record: T}) =>
  React.createElement('div',
    {style: {width: column.width}},

      renderSafely(
        () =>
        getRenderer(column)(
          column.mapValue ? column.mapValue(record[column.dataIndex], record, index) : record[column.dataIndex],
          record,
          index,
        ),
      ),

  )
