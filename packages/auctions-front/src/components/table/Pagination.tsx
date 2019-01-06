import React from 'react'
import styled, { colors, fontSize, SVGLibrary } from '../../styles'
import { InputProps } from '../inputs/helpers'
import { range } from 'ramda'
import compose, { constant } from 'lazy-compose'
import { useWithValue } from '../../hooks'


const Layout = styled.div`
  font-family: 'Brandon Grotesque';
  display: flex;

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
    span {
      vertical-align: middle;
      ${fontSize.small}
    }

    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  .icon {
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

type PaginationProps =  InputProps<number> &
  {
    totalPages?: number
    maxPagesToShow?: number
  }


const PaginationRaw = ({value, onValueChange, totalPages, maxPagesToShow = 5, ...props}: PaginationProps ) => {

  totalPages = Math.max(1, totalPages)

  if (totalPages === 1)
    return null

  const currentPage = Math.min(value, totalPages - 1)

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
      <div className={'icon'} onClick={() => onValueChange(Math.max(0, currentPage - 1))}>
        <SVGLibrary.ArrowLeft/>
      </div>
      {list.map( (item, index) =>
          <div
            className={'page ' + (item === currentPage ? 'selected' : '')}
            onClick={compose(onValueChange, constant(item))}
            key={index}
          >
            <span>{item + 1}</span>
          </div>,
      )}
      <div className={'icon'} onClick={() => onValueChange(Math.min(totalPages - 1, currentPage + 1))}>
        <SVGLibrary.ArrowRight/>
      </div>
      <div className={'icon'} onClick={() => onValueChange(totalPages - 1)}>
        <SVGLibrary.ArrowRightDouble />
      </div>
    </Layout>
  )
}


export const Pagination = useWithValue(0)(PaginationRaw)
