import { colors, styled, SVGLibrary } from '../../styles'
import { ColumnProps } from './ColumnProps'
import React from 'react'
import { SortState } from './Table'
import { compose, constant } from 'lazy-compose'

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

  padding-right: 5.0em;
`

const TableHeaderCell = styled.div`
  cursor: pointer;
  color: #FEFEFE;
  span {
    font-size: 1.3em;
    text-transform: uppercase;
  
  }
  
  svg {
    opacity: 0;
    margin-left: 0.5em;
    color: ${colors.accent};
    transition: transform 0.2s linear;
    transform-origin: center center;
  }
  
  .visible {
    opacity: 1;
  }
  .invisible {
    display: none;
    opacity: 0;
    rotate:(0deg);
  }
  
  .down {
    transform: rotate(-360deg);
  }
  
  .up {
    transform: rotate(-180deg);
  }
`


type TableHeaderRowProps<T> = {
  columns: ColumnProps<T, any>[],
  isExpandable,
  onSort: (value: SortState) => any,
  sortState: SortState,
}

export const TableHeaderRow = <T>({columns, isExpandable, onSort, sortState}: TableHeaderRowProps<T>) => {

  const onSortCallback = React.useCallback( (columnIndex: number) => {
      if (columnIndex === sortState.columnIndex)
          sortState.order === 'desc'
            ? onSort({ order: 'asc', columnIndex})
            : onSort({ order: 'desc', columnIndex: -1})
      else
        onSort({ order: 'desc', columnIndex})

    },
    [onSort, sortState, columns],
  )
  return (
    React.createElement(
      isExpandable ? LayoutExpandable : Layout,
      {},
      [
        // @ts-ignore
        columns.map((col, index) =>
          React.createElement(TableHeaderCell,
            { style: { width: col.width}, onClick: col.title !== '' && compose(onSortCallback, constant(index)), key: index },
            [
              React.createElement('span', {key: 'span'}, [col.title]),
              React.createElement(SVGLibrary.ArrowDown, {
                key: 'arrow',
                className:
                  (sortState.columnIndex === index ? 'visible ' : ' invisible ') +
                  (sortState.order === 'asc' ? 'up ' : 'down'),
              }),
            ]),
        ),
      ])
  )
}
