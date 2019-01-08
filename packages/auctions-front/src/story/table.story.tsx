import React from 'react'
import { storiesOf } from '@storybook/react'
import { FooterTabs } from '../components/explorer/FooterTabs'
import { Pagination } from '../components/table/Pagination'
import { EmptyRows } from '../components/table/EmptyRows'
import { SimpleRadioGroup } from '../components/inputs/SimpleRadioGroup'
import { GoToPageInput } from '../components/table/GoToPageInput'
import { PaginationExtended } from '../components/table/PaginationExtended'

const explorerTabs = [
  'EOS Live Feed',
  'Block Producers',
  'Proxies',
  'Smart Contracts',
  'Accounts / Black Lists',
  'RAM',
  'Account Bids',
  'Tokens',
]

const log = console.log

storiesOf('table', module)
  .add('Pagination with a lot of pages', () => (
    <Pagination totalRows={200} rowsPerPage={10} maxPagesToShow={7} />
  ))
  .add('Pagination with a one page', () => (
    <Pagination totalRows={200} rowsPerPage={10} maxPagesToShow={7} />
  ))
  .add('Pagination with a few pages', () => (
    <Pagination totalRows={200} rowsPerPage={10}/>
  ))
  .add('FooterTabs', () => (
    <FooterTabs data={explorerTabs} />
  ))
  .add('Empty rows', () => (
    <EmptyRows
      text={'This is an "empty rows" text, '}
      actionText={'And this is an action. Click one!'}
      onClick={console.log}
    />
  ))
  .add('SimpleRadioGroup', () => (
    <SimpleRadioGroup />
  ))
  .add('GoToPageInput big values', () => (
    <GoToPageInput value={12} maxValue={787} onValueChange={log} />
  ))
  .add('PaginationExtended', () =>
    <PaginationExtended
      totalRows={1287}
      rowsPerPageOptions={[10, 25, 50, 100]}
    />,
  )
