import React from 'react'
import { storiesOf } from '@storybook/react'
import { FooterTabs } from '../components/explorer/FooterTabs'
import { Pagination } from '../components/table/Pagination'

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


storiesOf('table', module)
  .add('Pagination with a lot of pages', () => (
    <Pagination totalPages={33} maxPagesToShow={7} />
  ))
  .add('Pagination with a one page', () => (
    <Pagination totalPages={1} maxPagesToShow={7} />
  ))
  .add('Pagination with a few pages', () => (
    <Pagination totalPages={6} maxPagesToShow={7} />
  ))
  .add('FooterTabs', () => (
    <FooterTabs data={explorerTabs} />
  ))
