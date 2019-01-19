import React from 'react'
import { ColumnProps } from './ColumnProps'
import { styled } from '../../styles'
import { LinkCell } from './LinkCell'

export const DefaultCellLayout = styled.div`
  color: #E9DBC4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  span {
    line-height: 1.6em;
    font-size: 1.6em;
  }
`


const defaultRender = (value: any, record: any, index: number) =>
  React.createElement(DefaultCellLayout, {},
    React.createElement('span', {key: 'span'},
      (typeof value === 'string' || typeof value === 'number')
        ? value
        : JSON.stringify(value),
    ),
  )

const getRenderer = <T, K extends keyof T>(column: ColumnProps<T, K>) => {
  if (column.render)
    return column.render

  if (column.link)
    return LinkCell

  return  defaultRender
}

const renderSafely = (f: () => any) => {
  let result = 'Error'
  try {
    result = f()
  } catch (e) {
    console.warn(e)
  }
  return result
}

export const TableCell = <T, K extends keyof T>({column, record, index}:
              {column: ColumnProps<T, K>, index: number, record: T}) =>
  React.createElement('div',
    {
      style: {
        width: column.width,
        pointer: column.link ? 'cursor' : 'unset',
      },
      onClick: column.link
        ? () => window.open(column.link(record[column.dataIndex], record), '_blank')
        : undefined,
    },

      renderSafely(
        () =>
        getRenderer(column)(
          column.mapValue ? column.mapValue(record[column.dataIndex], record, index) : record[column.dataIndex],
          record,
          index,
          column,
        ),
      ),

  )
