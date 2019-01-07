import { nav } from '../../store'
import { Redirect, Route, Switch } from 'react-router'
import React from 'react'
import { useContext } from 'react'
import { styled } from '../../styles'
import { ConnectedRouter } from 'connected-react-router'
import { HistoryContext, useSubscribe } from '../../contexts'
import { SideBar } from './sidebar/SideBar'
import { AuctionTabs } from './AuctionTabs'
import { useMappedState } from '../../hooks'
import { SellPane } from './sellPane/SellPane'
import { BuyPane } from './buyPane/BuyPane'
import { HomePane } from './home/HomePane'
import { MyAuctionsPane } from './myAuctions/MyAuctionsPane'
import { HouseRulesPane } from './houseRules/HouseRulesPane'

const routes = [
  {
    nav: nav.auctionHome,
    label: 'home',
    Component: HomePane,
  },
  {
    nav: nav.auctionBuyName,
    label: 'Buy name',
    Component: BuyPane ,
  },
  {
    nav: nav.auctionSellName,
    label: 'sell name',
    Component: SellPane,
  },
  {
    nav: nav.auctionMyAuctionsBids,
    label: 'my auctions',
    Component: MyAuctionsPane,
    exact: false,
  },
  {
    nav: nav.auctionHouseRules,
    label: 'house rules',
    Component: HouseRulesPane,
  },
]

const reactRoutes =
  routes
    .map(({Component, nav, exact = true}) =>
      <Route
        exact={exact}
        key={nav.pattern}
        path={nav.pattern.startsWith('/auction/myAuctions') ? '/auction/myAuctions' : nav.pattern}
        render={props =>
          // @ts-ignore
          <Component {...props.match.params as any} />
        }
      />,
    ).concat(
      <Redirect
        from={'auction/myAuctions'}
        to={'auction/myAuctions/bids'}
        key={'redirect1'}
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
    margin-top: 0.4em;
    border: 1px solid #2B2B2B;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .sidebar {
    width: 37em;
  }
`

const Header1 = styled.div`
  width: 100%;
  text-align: center;
  font-family: Muller;
  line-height: 6.0em;
  margin-top: 3.0em;
  text-align: center;
  color: #FFFFFF;
  text-transform: uppercase;
  label {
      width: 100%;
      font-size: 3.2em;
  }
`

const Header2 = styled(Header1)`
  margin-top: 0.3em;
  label {
    font-size: 2.2em;
  }
`

const getSelectedTabIndex = (pathname: string) =>
  pathname.includes('/dome/myAuctions')
    ? 3
    : routes.findIndex( r => r.nav.match(pathname) !== null)

const pathnameSelector = state =>
  state.router.location.pathname

const AuctionPageRaw = () => {
  const history = useContext(HistoryContext)
  return (
    <Layout>
      <div className={'content'}>
        <Header1><label>EOS Namespace Auction House</label></Header1>
        <Header2><label>The Largest Marketplace for Premium EOS Accounts</label> </Header2>
        <AuctionTabs
          data={routes.map( r => r.label)}
          value={getSelectedTabIndex(useMappedState(pathnameSelector))}
          onValueChange={ index =>
            history.push(routes[index].nav({fullName: '_'}))
          }
        />
        <ConnectedRouter history={useSubscribe(HistoryContext)}>
          <Switch>
            {
              reactRoutes
            }
          </Switch>
        </ConnectedRouter>
      </div>
      <SideBar className={'sidebar'}/>
    </Layout>
  )
}

export const AuctionPage = AuctionPageRaw
