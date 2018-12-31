import * as React from 'react'
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router' // react-router v4
import {ConnectedRouter} from 'connected-react-router'
import { configureFrontendStore, nav } from '../store/'
import {createBrowserHistory} from 'history'
import {StoreProvider} from '../hooks'
import { HistoryContext } from '../contexts'
import { AuctionPage } from './auction/AuctionPage'
import { styled } from '../styles'
import { Menu } from './auction/Menu'

const history = createBrowserHistory()
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
    width: 100%
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
                  reactRoutes
                }
              </Switch>
            </ConnectedRouter>
          </div>
        </Layout>
      </HistoryContext.Provider>
    </Provider>
  </StoreProvider>

export default App
