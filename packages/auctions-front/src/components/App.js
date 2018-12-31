var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import * as React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router'; // react-router v4
import { ConnectedRouter } from 'connected-react-router';
import { configureFrontendStore } from '../store/';
import { StoreProvider } from '../hooks';
import { HistoryContext } from '../contexts';
import { AuctionPage } from './auction/AuctionPage';
import { styled } from '../styles';
import { Menu } from './auction/Menu';
import { history } from '../history';
var store = configureFrontendStore(history);
var routes = [
    {
        path: '/auction',
        label: 'home',
        Component: AuctionPage,
    },
];
var reactRoutes = routes
    .map(function (_a) {
    var Component = _a.Component, path = _a.path;
    return React.createElement(Route, { exact: false, key: path, path: path, render: function (props) {
            // @ts-ignore
            return React.createElement(Component, __assign({}, props.match.params));
        } });
});
var Layout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  .content {\n     width: calc(100%);\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  .content {\n     width: calc(100%);\n  }\n"
    /**
     * Legacy provider used for connected-react-router
     * @constructor
     */
])));
/**
 * Legacy provider used for connected-react-router
 * @constructor
 */
var App = function () {
    return React.createElement(StoreProvider, { value: store },
        React.createElement(Provider, { store: store },
            React.createElement(HistoryContext.Provider, { value: history },
                React.createElement(Layout, null,
                    React.createElement(Menu, null),
                    React.createElement("div", { className: 'content' },
                        React.createElement(ConnectedRouter, { history: history },
                            React.createElement(Switch, null, __spread(reactRoutes, [
                                React.createElement(Redirect, { from: '/', to: '/auction/home' }),
                            ]))))))));
};
export default App;
var templateObject_1;
//# sourceMappingURL=App.js.map