import React from 'react'
import { storiesOf } from '@storybook/react'
import { ExplorerTabs } from '../components/explorer/ExplorerTabs'
import { FooterTabs } from '../components/explorer/FooterTabs'
import { NumberInput } from '../components/inputs/NumberInput'
import { AccountInfoData } from '../components/auction/sidebar/AccountInfoData'
import { accountInfoMock } from '../store/api/explorer/accounts'


storiesOf('scatterSidebar', module)
  .add('AccountInfoData', () => (
      <AccountInfoData
        accountInfo={accountInfoMock}
      />
  ))
  .add('AccountInfoData no account', () => (
    <AccountInfoData />
  ))
