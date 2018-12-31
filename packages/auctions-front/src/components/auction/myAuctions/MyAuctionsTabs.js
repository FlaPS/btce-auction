var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { compose, constant } from 'lazy-compose';
import { styled } from '../../../styles';
import { useWithValue } from '../../../hooks';
var TabButton = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: 'Brandon Grotesque';\n\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n  div {\n    width: 100%\n    display: flex;\n    justify-content: center;\n    cursor: pointer;\n    color: #FEFEFE;\n    opacity: 0.3;\n    height: 4.3em;\n    pointer-events: none;\n    align-items: center;\n    background-color: #616161;\n    label {\n      width: 100%;\n      text-align: center;\n      font-size: 2.2em;\n      text-transform: uppercase;\n    \n    }\n  }\n  \n  \n  .active {\n      opacity: 1;\n      background-color: #191919;\n      color: #FEFEFE;\n  }\n"], ["\n  font-family: 'Brandon Grotesque';\n\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n  div {\n    width: 100%\n    display: flex;\n    justify-content: center;\n    cursor: pointer;\n    color: #FEFEFE;\n    opacity: 0.3;\n    height: 4.3em;\n    pointer-events: none;\n    align-items: center;\n    background-color: #616161;\n    label {\n      width: 100%;\n      text-align: center;\n      font-size: 2.2em;\n      text-transform: uppercase;\n    \n    }\n  }\n  \n  \n  .active {\n      opacity: 1;\n      background-color: #191919;\n      color: #FEFEFE;\n  }\n"])));
var Layout = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  z-index: 100;\n  background-color: #000000;\n  display: flex;\n  justify-content: space-around;\n  bottom-border: #272727 solid 0.2em;\n"], ["\n  z-index: 100;\n  background-color: #000000;\n  display: flex;\n  justify-content: space-around;\n  bottom-border: #272727 solid 0.2em;\n"])));
var MyAuctionsTabsRaw = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, data = _a.data, props = __rest(_a, ["value", "onValueChange", "data"]);
    return React.createElement(Layout, null, data.map(function (item, index) {
        return React.createElement(TabButton, { onClick: compose(onValueChange, constant(index)) },
            React.createElement("div", { className: (index === value ? 'active' : '') },
                React.createElement("label", null, item)));
    }));
};
export var MyAuctionsTabs = useWithValue(0)(MyAuctionsTabsRaw);
var templateObject_1, templateObject_2;
//# sourceMappingURL=MyAuctionsTabs.js.map