import React, { useContext } from 'react'
import styled from '../../styles'
import { nav } from '../../store'
import { Route, Switch } from 'react-router'
import { renderChildren } from '@sha/react-fp'
import { ExplorerTabs } from './ExplorerTabs'
import { useMappedState } from '../../hooks'
import { HistoryContext } from '../../contexts'
import { ConnectedRouter } from 'connected-react-router'

const routes = [
  {
    nav: nav.explorer.liveFeed,
    label: 'EOS live feed',
  },
  {
    nav: nav.explorer.producers,
    label: 'Block producers',
  },
  {
    nav: nav.explorer.proxies,
    label: 'Proxies',
  },
  {
    nav: nav.explorer.smartContracts,
    label: 'Smart contracts',
  },
  {
    nav: nav.explorer.accounts,
    label: 'accounts/black list',
  },
  {
    nav: nav.explorer.ram,
    label: 'RAM',
  },
  {
    nav: nav.explorer.bids,
    label: 'Account bids',
  },
  {
    nav: nav.explorer.tokens,
    label: 'Tokens',
  },
]

const reactRoutes =
  routes
    .map(({label, Component = label, nav}) =>
      <Route
        exact={false}
        key={nav.pattern}
        path={nav.pattern}
        render={props =>
          // @ts-ignore
          renderChildren(Component, {...props.match.params as any})
        }
      />,
    )

const Layout = styled.div`
  display: block;
  position: relative;
  .frame {
    position: absolute;
    width: 183em;
    height: 108em;
    background-image: url("/assets/explorerFrame.jpg");
  }
  .tables {
    width: 966px;
    height: 488px;
    opacity: 0.75;
    border-radius: 8px;
    background-color: #212121;
    position: absolute;
    /* width: 95em; */
    /* height: 42em; */
    left: 486px;
    top: 557px;
  }
`

const tabsData = routes.map( r => r.label)

const getSelectedTabIndex = (pathname: string) =>
  routes.findIndex( r => pathname.includes(r.nav.pattern))

const pathnameSelector = state => state.router.location.pathname

export const ExplorerPage = () => {
  const history = useContext(HistoryContext)
  return (
    <Layout>
      <div className={'frame'}>

      </div>
      <div className={'tables'}>
          <ExplorerTabs
            data={tabsData}
            value={getSelectedTabIndex(useMappedState(pathnameSelector))}
            onValueChange={ index => history.push(routes[index].nav({}))}
          />
        <ConnectedRouter history={history}>
          <Switch>
            {
              reactRoutes
            }
          </Switch>
        </ConnectedRouter>
      </div>
    </Layout>
  )
}



