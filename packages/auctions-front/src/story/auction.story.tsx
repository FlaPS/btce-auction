import React from 'react'
import ReactDOM from 'react-dom'
import {storiesOf} from '@storybook/react'
import {compose, reduce, sort, toPairs} from 'ramda'

import AccountCheckbox from '../components/inputs/AccountCheckbox'
import { SideBar } from '../components/auction/sidebar/SideBar'
import { BuyPane } from '../components/auction/buyPane/BuyPane'
import { SellPane } from '../components/auction/sellPane/SellPane'
import { Menu } from '../components/auction/Menu'
import { Ticker } from '../components/auction/Ticker'
import { AuctionTabs } from '../components/auction/AuctionTabs'

storiesOf('auction', module)
  .add('SideBar', () => (
      <SideBar />
))
  .add('buyForm', () =>(
    <BuyPane/>
  ))
  .add('sellPane', () =>(
    <SellPane/>
  ))
  .add('menu', () =>(
    <Menu/>
  ))
  .add('ticker', () =>(
    <Ticker/>
  ))
  .add('auction tabs' , () =>
    <AuctionTabs data={['home', 'sell name', 'buy name', 'my auctions', 'house rules']} />
  )
