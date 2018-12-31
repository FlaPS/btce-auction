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
import React, { useContext } from 'react';
import styled from '../../../styles';
import { nav } from '../../../store';
import { Route, Switch } from 'react-router';
import { MyAuctionsTabs } from './MyAuctionsTabs';
import { HistoryContext } from '../../../contexts';
import { useMappedState } from '../../../hooks';
import { ConnectedRouter } from 'connected-react-router';
import { MyBids } from './MyBids';
import { MySells } from './MySells';
var routes = [
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
];
var reactRoutes = routes
    .map(function (_a) {
    var Component = _a.Component, nav = _a.nav, exact = _a.exact;
    return React.createElement(Route, { exact: exact, key: nav.pattern, path: nav.pattern, render: function (props) {
            // @ts-ignore
            return React.createElement(Component, __assign({}, props.match.params));
        } });
});
var Layout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n   background-color: #191919;\n  border-radius: 0 0 6px 6px;\n\n"], ["\n   background-color: #191919;\n  border-radius: 0 0 6px 6px;\n\n"])));
var getSelectedTabIndex = function (pathname) {
    return pathname.includes('sells') ? 1 : 0;
};
var pathnameSelector = function (state) { return state.router.location.pathname; };
export var MyAuctionsPane = function () {
    var history = useContext(HistoryContext);
    return (React.createElement("div", { className: 'main-tab__wrap' },
        React.createElement(Layout, null,
            React.createElement(MyAuctionsTabs, { data: routes.map(function (r) { return r.label; }), value: getSelectedTabIndex(useMappedState(pathnameSelector)), onValueChange: function (index) { return history.push(routes[index].nav()); } }),
            React.createElement(ConnectedRouter, { history: history },
                React.createElement(Switch, null, reactRoutes)))));
};
var templateObject_1;
//# sourceMappingURL=MyAuctionsPane.js.map