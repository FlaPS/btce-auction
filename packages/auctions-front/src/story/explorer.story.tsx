import React from 'react'
import { storiesOf } from '@storybook/react'
import { ExplorerTabs } from '../components/explorer/ExplorerTabs'
import { FooterTabs } from '../components/explorer/FooterTabs'

const explorerTabs = [
  'EOS Live Feed',
  'Block Producers',
  'Proxies',
  'Smart Contracts',
  'Accounts / Black Lists',
  'RAM',
  'Account Bids',
  'Tokens'
]


storiesOf('explorer', module)
  .add('ExplorerTabs', () => (
    <ExplorerTabs data={explorerTabs} />
  ))
  .add('FooterTabs', () => (
    <FooterTabs data={explorerTabs} />
  ))
