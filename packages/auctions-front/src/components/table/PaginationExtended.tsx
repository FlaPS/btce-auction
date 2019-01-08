import React from 'react'
import styled from '../../styles'
import { Pagination, PaginationProps } from './Pagination'
import { ExtractProps } from '@sha/react-fp'
import { SimpleRadioGroup } from '../inputs/SimpleRadioGroup'
import { GoToPageInput } from './GoToPageInput'
import { useWithValue } from '../../hooks'

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.0em;

`

export type PaginationExtendedProps =
  & ExtractProps<typeof Layout>
  & PaginationProps
  & {
    rowsPerPageOptions: number[]
    onRowsPerPageChange: (value: number) => any
  }

const PaginationExtendedRaw = ({
   rowsPerPageOptions = [10, 25, 100],
   totalRows,
   rowsPerPage = rowsPerPageOptions[0],
   onValueChange,
   value,
   maxPagesToShow = 7,
   onRowsPerPageChange,
   ...props}: PaginationExtendedProps) => {

  const currentPage = Math.ceil(value / rowsPerPage)
  const maxPages = Math.ceil(totalRows / rowsPerPage)

  const onRowsChange =  React.useCallback((rows: number) => {
    onRowsPerPageChange(rows)
    },
    [onRowsPerPageChange],
  )

  return (
    <Layout {...props}>
      <SimpleRadioGroup
        data={rowsPerPageOptions}
        value={rowsPerPage}
        onValueChange={onRowsChange}
      />
      <Pagination
        value={value}
        rowsPerPage={rowsPerPage}
        maxPagesToShow={maxPagesToShow}
        totalRows={totalRows}
        onValueChange={onValueChange}
      />
      <GoToPageInput
        value={(Number(currentPage) + 1)}
        maxValue={maxPages}
        onValueChange={ page =>
          onValueChange( (page - 1) * rowsPerPage)
        }
      />
    </Layout>
  )
}

export const PaginationExtended = useWithValue(0)(PaginationExtendedRaw)
