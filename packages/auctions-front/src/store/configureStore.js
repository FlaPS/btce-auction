import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { isFrontend } from '@sha/utils';
import createRootReducer from './reducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { auctionSaga } from './btce/auctionSaga';
// import saga from './walli/saga'
// import api from './walli/api'
// import {walliDuck} from './walli/walliDuck'
var REDUX_DEV_TOOLS = '__REDUX_DEVTOOLS_EXTENSION__';
var configureFrontendStore = function (initialState, history) {
    if (history === void 0) { history = createBrowserHistory(); }
    var store = createStore(createRootReducer(history), initialState, getFrontEndMiddlewares(history));
    store['runSaga'] = sagaMiddleware.run;
    store['runSaga'](auctionSaga);
    return store;
};
var sagaMiddleware = createSagaMiddleware();
var getFrontEndMiddlewares = function (history) {
    return isFrontend() && window[REDUX_DEV_TOOLS]
        ?
            compose(applyMiddleware(routerMiddleware(history), sagaMiddleware), window[REDUX_DEV_TOOLS]())
        :
            compose(applyMiddleware(routerMiddleware(history), sagaMiddleware));
};
export default configureFrontendStore;
//# sourceMappingURL=configureStore.js.map