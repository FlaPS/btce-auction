import React from 'react'
import styled, { colors, fontSize, SVGLibrary } from '../../styles'
import { InputProps } from '../inputs/helpers'
import { range } from 'ramda'
import compose, { constant } from 'lazy-compose'
import { useWithValue } from '../../hooks'


const Layout = styled.div`
  font-family: 'Brandon Grotesque';
  display: flex;
  margin-left: 2em;

  *:hover {
    color: ${colors.accent};
  }

  .selected {
    color: ${colors.accent};
    border-bottom: ${colors.accent} solid 0.2em;
  }

  .page {
    color: white;
    height: 3.0em;
    line-height: 3.0em;
    width: 2.0em;
    text-align: center;
    cursor: pointer;
    span {
      vertical-align: middle;
      font-weight: bold;
      ${fontSize.small}
    }

    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  .icon {
    cursor: pointer;
    color: #616161;
    width: 2.0em;
    height: 3.0em;
    line-height: 3.0em;
    text-align: center;
    svg {
      vertical-align: middle;
    }
  }
`

export type PaginationProps =  InputProps<number> &
  {
    rowsPerPage: number
    totalRows: number
    maxPagesToShow?: number
  }


const PaginationRaw = ({value, onValueChange, totalRows, rowsPerPage, maxPagesToShow, ...props}: PaginationProps ) => {
  let totalPages = Math.ceil(totalRows / rowsPerPage)
  const suggestedPage = Math.ceil(value / rowsPerPage)
  totalPages = Math.max(1, totalPages)

  // onValueChange = console.log
  if (totalPages === 1)
    return null

  const currentPage = Math.min(suggestedPage, totalPages - 1)

  const startPage = Math.max(
    0,
    totalPages > maxPagesToShow
    ? currentPage - Math.floor((maxPagesToShow / 2))
    : 0,
  )

  const listStart = startPage > totalPages - maxPagesToShow
    ? Math.max(0, totalPages - maxPagesToShow)
    : startPage

  const list = range(listStart, Math.min(totalPages, listStart +  maxPagesToShow))

  return (
    <Layout {...props}>
      <div className={'icon'} onClick={() => onValueChange(0)}>
        <SVGLibrary.ArrowLeftDouble />
      </div>
      <div className={'icon'} onClick={() => onValueChange(Math.max(0, (currentPage - 1) * rowsPerPage))}>
        <SVGLibrary.ArrowLeft/>
      </div>
      {list.map( (item, index) =>
          <div
            className={'page ' + (item === currentPage ? 'selected' : '')}
            onClick={compose(onValueChange, constant(item * rowsPerPage))}
            key={index}
          >
            <span>{item + 1}</span>
          </div>,
      )}
      <div className={'icon'} onClick={() => onValueChange(Math.min((totalPages - 1) * rowsPerPage, (currentPage + 1) * rowsPerPage))}>
        <SVGLibrary.ArrowRight/>
      </div>
      <div className={'icon'} onClick={() => onValueChange((totalRows - 1) * rowsPerPage)}>
        <SVGLibrary.ArrowRightDouble />
      </div>
    </Layout>
  )
}


export const Pagination = useWithValue(0)(PaginationRaw)
