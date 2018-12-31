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
import { nav } from '../../store';
import { Redirect, Route, Switch } from 'react-router';
import * as React from 'react';
import { styled } from '../../styles';
import { ConnectedRouter } from 'connected-react-router';
import { useContext } from 'react';
import { HistoryContext, useSubscribe } from '../../contexts';
import { SideBar } from './sidebar/SideBar';
import { AuctionTabs } from './AuctionTabs';
import { useMappedState } from '../../hooks';
import { SellPane } from './sellPane/SellPane';
import { BuyPane } from './buyPane/BuyPane';
import { HomePane } from './home/HomePane';
import { MyAuctionsPane } from './myAuctions/MyAuctionsPane';
var routes = [
    {
        nav: nav.auctionHome,
        label: 'home',
        Component: HomePane,
    },
    {
        nav: nav.auctionBuyName,
        label: 'Buy name',
        Component: BuyPane,
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
        Component: function () { return React.createElement("div", null, "House rules"); },
    },
];
var reactRoutes = routes
    .map(function (_a) {
    var Component = _a.Component, nav = _a.nav, _b = _a.exact, exact = _b === void 0 ? true : _b;
    return React.createElement(Route, { exact: exact, key: nav.pattern, path: nav.pattern.startsWith('/auction/myAuctions') ? '/auction/myAuctions' : nav.pattern, render: function (props) {
            // @ts-ignore
            return React.createElement(Component, __assign({}, props.match.params));
        } });
}).concat(React.createElement(Redirect, { from: 'auction/myAuctions', from: 'auction/myAuctions/bids' }));
var Layout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  .content {\n    color: white;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    margin-right: 0.4em;\n    margin-top: 0.4em;\n    border: 1px solid #2B2B2B;\n    box-sizing: border-box;\n    border-radius: 6px;\n  }\n  .sidebar {\n    width: 37em;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  .content {\n    color: white;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    margin-right: 0.4em;\n    margin-top: 0.4em;\n    border: 1px solid #2B2B2B;\n    box-sizing: border-box;\n    border-radius: 6px;\n  }\n  .sidebar {\n    width: 37em;\n  }\n"])));
var Header1 = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  text-align: center;\n  font-family: Muller;\n  line-height: 6.0em;\n  margin-top: 3.0em;\n  text-align: center;\n  color: #FFFFFF;\n  text-transform: uppercase;\n  label {\n      width: 100%;\n      font-size: 3.2em;\n  }\n"], ["\n  width: 100%;\n  text-align: center;\n  font-family: Muller;\n  line-height: 6.0em;\n  margin-top: 3.0em;\n  text-align: center;\n  color: #FFFFFF;\n  text-transform: uppercase;\n  label {\n      width: 100%;\n      font-size: 3.2em;\n  }\n"])));
var Header2 = styled(Header1)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-top: 0.3em;\n  label {\n    font-size: 2.2em;\n  }\n"], ["\n  margin-top: 0.3em;\n  label {\n    font-size: 2.2em;\n  }\n"])));
var getSelectedTabIndex = function (pathname) {
    return pathname.includes('/auction/myAuctions')
        ? 3
        : routes.findIndex(function (r) { return r.nav.match(pathname) !== null; });
};
var pathnameSelector = function (state) { return state.router.location.pathname; };
var AuctionPageRaw = function () {
    var history = useContext(HistoryContext);
    return (React.createElement(Layout, null,
        React.createElement("div", { className: 'content' },
            React.createElement(Header1, null,
                React.createElement("label", null, "EOS Namespace Auction House")),
            React.createElement(Header2, null,
                React.createElement("label", null, "The Largest Marketplace for Premium EOS Accounts"),
                " "),
            React.createElement(AuctionTabs, { data: routes.map(function (r) { return r.label; }), value: getSelectedTabIndex(useMappedState(pathnameSelector)), onValueChange: function (index) { return history.push(routes[index].nav({})); } }),
            React.createElement(ConnectedRouter, { history: useSubscribe(HistoryContext) },
                React.createElement(Switch, null, reactRoutes))),
        React.createElement(SideBar, { className: 'sidebar' })));
};
export var AuctionPage = AuctionPageRaw;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=AuctionPage.js.map