import * as React from 'react'
import {Provider} from 'react-redux'
import { Redirect, Route, Switch } from 'react-router' // react-router v4
import {ConnectedRouter} from 'connected-react-router'
import { configureFrontendStore, nav } from '../store/'

import {StoreProvider} from '../hooks'
import { HistoryContext } from '../contexts'
import { AuctionPage } from './auction/AuctionPage'
import { styled } from '../styles'
import { Menu } from './auction/Menu'
import {history} from '../history'

const store = configureFrontendStore(history)

const routes = [
  {
    path: '/auction',
    label: 'home',
    Component: AuctionPage,
  },

]

const reactRoutes =
  routes
  .map(({Component, path}) =>
    <Route
      exact={false}
      key={path}
      path={path}
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
     width: calc(100%);
  }
`

/**
 * Legacy provider used for connected-react-router
 * @constructor
 */
const App = () =>
  <StoreProvider value={store}>
    <Provider store={store}>
      <HistoryContext.Provider value={history}>
        <Layout>
            <Menu />
          <div className={'content'}>
            <ConnectedRouter history={history}>
              <Switch>
                {
                  [
                    ...reactRoutes,
                    <Redirect from='/' to='/auction/home' />,
                  ]
                }
              </Switch>
            </ConnectedRouter>
          </div>
        </Layout>
      </HistoryContext.Provider>
    </Provider>
  </StoreProvider>

export default App
