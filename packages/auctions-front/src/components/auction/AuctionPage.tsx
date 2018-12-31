import { nav } from '../../store'
import { Route, Switch } from 'react-router'
import * as React from 'react'
import { styled } from '../../styles'
import { ConnectedRouter } from 'connected-react-router'
import { useContext, useState } from 'react'
import { HistoryContext, useSubscribe } from '../../contexts'
import { SideBar } from './sidebar/SideBar'
import { AuctionTabs } from './AuctionTabs'
import { useMappedState } from '../../hooks'
import { SellPane } from './sellPane/SellPane'
import { BuyPane } from './buyPane/BuyPane'

const routes = [
  {
    nav: nav.auctionHome,
    label: 'home',
    Component: () => <div>Auction home</div>,
  },
  {
    nav: nav.auctionBuyName,
    label: 'Buy name',
    Component: () => <BuyPane />,
  },
  {
    nav: nav.auctionSellName,
    label: 'sell name',
    Component: () => <SellPane/>,
  },
  {
    nav: nav.auctionMyAuctions,
    label: 'my auctions',
    Component: () => <div>My auctions</div>,
  },
  {
    nav: nav.auctionHouseRules,
    label: 'house rules',
    Component: () => <div>House rules</div>,
  },
]

const reactRoutes =
  routes
    .map(({Component, nav}) =>
      <Route
        exact
        key={nav.pattern}
        path={nav.pattern}
        render={props =>
          // @ts-ignore
          <Component {...props.match.params as any} />
        }
      />,
    )

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  .content {
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 0.4em;
  }
  .sidebar {
    width: 37em;
  }
`

const getSelectedTabIndex = (pathname: string) =>
  routes.findIndex( r => r.nav.match(pathname) !== null)

const pathnameSelector = state => state.router.location.pathname

const AuctionPageRaw = () => {
  const history = useContext(HistoryContext)
  return (
    <Layout>
      <div className={'content'}>
        <AuctionTabs
          data={routes.map( r => r.label)}
          value={getSelectedTabIndex(useMappedState(pathnameSelector))}
          onValueChange={ index => history.push(routes[index].nav())}
        />
        <ConnectedRouter history={useSubscribe(HistoryContext)}>
          <Switch>{reactRoutes}</Switch>
        </ConnectedRouter>
      </div>
      <SideBar className={'sidebar'}/>
    </Layout>
  )
}
export const AuctionPage = AuctionPageRaw
