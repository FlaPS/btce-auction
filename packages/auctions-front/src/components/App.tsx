import React from 'react'
import { useContext } from 'react'
import { connect, Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { configureFrontendStore, nav } from '../store/'
import { StoreProvider, useMappedState } from '../hooks'
import { HistoryContext } from '../contexts'
import { AuctionPage } from './auction/AuctionPage'
import { styled } from '../styles'
import { Menu } from './Menu'
import { history } from '../history'
import { ExplorerPage } from './explorer/ExplorerPage'
import { FrontState } from '../store/reducer'
import { SnackBar } from './elements/SnackBar'

const store = configureFrontendStore(history)

const routes = [
  {
    path: '/explorer',
    label: 'Explorer',
    Component: ExplorerPage,
  },
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
    .content {
       width: calc(100%);
       min-width: 81em;
    }
    display: flex;
    flex-direction: row;
`

const pathnameSelector = state => state.router.location.pathname

const Root = () => {

  const history = useContext(HistoryContext)

  const pathname = useMappedState(pathnameSelector)

  return (
      <Layout>
          <Menu
            value={pathname.includes('explorer') ? 0 : 3}
            onValueChange={
              (value) =>
                value === 0
                  ? history.push(nav.explorer.liveFeed())
                  : history.push(nav.auctionHome())
            }
          />
          <div className={'content'}>
            <ConnectedRouter history={history}>
              <Switch>
                {
                  [
                    ...reactRoutes,
                    <Redirect exact from='/' to='/auction/home' key={'/'}/>,
                    <Redirect exact from='/auction' to='/auction/home' key={'/dome'}/>,
                  ]
                }
              </Switch>
            </ConnectedRouter>
          </div>
        <SnackBar />
      </Layout>
  )
}


const BusLayout = styled.div`

  div {
    transition: all 0.3s ease-in;
  }
  
  .busy {
    pointer-events: none;
    opacity: 0.3;
  }
`


const BusyContainer = connect(
  (state: FrontState) =>
    ({isBusy: state.ui.busy.length > 0}),
)
(({isBusy}: {isBusy: boolean}) =>
  <BusLayout>
    <div className={isBusy ? 'busy' : ''}>
      <Root/>
    </div>
  </BusLayout>
)

/**
 * Legacy provider used for connected-react-router
 * @constructor
 */

const App = () => {
          return(
    <StoreProvider value={store}>
      <Provider store={store}>
        <HistoryContext.Provider value={history}>
          <BusyContainer />
        </HistoryContext.Provider>
      </Provider>
    </StoreProvider>
  )
}
export default App
