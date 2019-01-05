import React, { useContext } from 'react'
import styled from '../../../styles'
import { nav } from '../../../store'
import { Route, Switch } from 'react-router'
import { MyAuctionsTabs } from './MyAuctionsTabs'
import { HistoryContext } from '../../../contexts'
import { useMappedState } from '../../../hooks'
import { ConnectedRouter } from 'connected-react-router'
import { MyBids } from './MyBids'
import { MySells } from './MySells'

const routes = [
  {
    nav: nav.auctionMyAuctionsBids,
    label: 'My response to sell auctions',
    Component: MyBids,
    exact: true,
  },
  {
    nav: nav.auctionMyAuctionsSells,
    label: 'My published name sell',
    Component: MySells,
  },
]

const reactRoutes =
  routes
    .map(({Component, nav, exact}) =>
      <Route
        exact={exact}
        key={nav.pattern}
        path={nav.pattern}
        render={props =>
          // @ts-ignore
          <Component {...props.match.params as any} />
        }
      />,
    )

const Layout = styled.div`
   background-color: #191919;
  border-radius: 0 0 6px 6px;

`

const getSelectedTabIndex = (pathname: string) =>
  pathname.includes('sells') ? 1 : 0

const pathnameSelector = state => state.router.location.pathname

export const MyAuctionsPane = () => {
  const history = useContext(HistoryContext)
  return (
    <div className='main-tab__wrap' >
      <Layout>
        <MyAuctionsTabs
                        data={routes.map( r => r.label)}
                        value={getSelectedTabIndex(useMappedState(pathnameSelector))}
                        onValueChange={ index => history.push(routes[index].nav())}
        >

        </MyAuctionsTabs>
        <ConnectedRouter history={history}><Switch>{reactRoutes}</Switch></ConnectedRouter>
      </Layout>
    </div>
  )
}

