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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import styled, { SVGLibrary } from '../../styles';
import { Div } from '../../../../react-fp/src';
import { onCheckboxChangeHandler } from './helpers';
import AccountIcon from '../AccountIcon';
import { useWithValue } from '../../hooks/';
console.log('React', React);
window['react'] = React;
export var AccountCheckbox = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, label = _a.label, onChange = _a.onChange, account = _a.account, disabled = _a.disabled, tabIndex = _a.tabIndex, props = __rest(_a, ["value", "onValueChange", "label", "onChange", "account", "disabled", "tabIndex"]);
    return (React.createElement(Layout, __assign({}, props, { tabIndex: tabIndex }),
        React.createElement("div", { className: 'container ' + (disabled ? 'disabled' : '') },
            React.createElement("input", { tabIndex: tabIndex, disabled: disabled, type: 'checkbox', checked: value, onChange: React.useCallback(function (event) {
                    // @ts-ignore   derived onChange prop is for label
                    // but used for an input here
                    return onCheckboxChangeHandler(onChange, onValueChange, event);
                }, [onChange, onValueChange]) }),
            React.createElement(AccountIcon, { avatar: account.avatarBig, network: account.network, className: "account" }),
            React.createElement("div", { className: "border" }),
            React.createElement(SVGLibrary.AccountCheckMark, { className: "checkmark" }))));
};
// Inset border needed, hense shadow-box used
var greenBorder = 'box-shadow: inset 0 0 0 2px #0CBD97;';
var Layout = styled(Div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* The container */\n  .container {\n    cursor: pointer;\n    user-select: none;\n    width: 4em;\n    height: 4em;\n    content: ' ';\n    position: relative;\n    background-size: cover;\n    /* Hide the browser's default checkbox */\n    input {\n      margin: 0em;\n      position: absolute;\n      top: 0em;\n      opacity: 0;\n      cursor: pointer;\n      height: 100%;\n      width: 100%;\n      z-index: 200;\n    }\n\n    .account {\n      transition: all 0.3s ease-in-out;\n      outline: none;\n      width: 100%;\n      height: 100%;\n      opacity: 0.3;\n    }\n    /* Create left-top corner checkmark*/\n    .checkmark {\n      display: none;\n      position: absolute;\n      top: -6px;\n      left: -6px;\n      height: 16px;\n      width: 16px;\n      box-sizing: border-box;\n    }\n    .border {\n      transition: all 0.3s ease-in-out;\n      position: absolute;\n      top: 0em;\n      left: 0em;\n      width: 100%;\n      height: 100%;\n    }\n    //padding: 3px 0px 3px 3px;\n    //margin: 5px 1px 3px 0px;\n\n    input:focus ~ .border {\n      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);\n      //padding: 3px 0px 3px 3px;\n      //margin: 5px 1px 3px 0px;\n      //border: 1px solid rgba(81, 203, 238, 1);;;;\n    }\n    input:hover ~ .border {\n      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);\n    }\n    /* On mouse-over, add a grey background color */\n    input:hover ~ .account {\n      opacity: 1;\n      ", "\n    }\n\n    input:checked ~ .account {\n      opacity: 1;\n      ", "\n    }\n\n    /* When the checkbox is checked, add a backgound & change borders */\n    > input:checked ~ .checkmark {\n      display: block;\n    }\n  }\n\n  .disabled {\n    pointer-events: none;\n  }\n"], ["\n  /* The container */\n  .container {\n    cursor: pointer;\n    user-select: none;\n    width: 4em;\n    height: 4em;\n    content: ' ';\n    position: relative;\n    background-size: cover;\n    /* Hide the browser's default checkbox */\n    input {\n      margin: 0em;\n      position: absolute;\n      top: 0em;\n      opacity: 0;\n      cursor: pointer;\n      height: 100%;\n      width: 100%;\n      z-index: 200;\n    }\n\n    .account {\n      transition: all 0.3s ease-in-out;\n      outline: none;\n      width: 100%;\n      height: 100%;\n      opacity: 0.3;\n    }\n    /* Create left-top corner checkmark*/\n    .checkmark {\n      display: none;\n      position: absolute;\n      top: -6px;\n      left: -6px;\n      height: 16px;\n      width: 16px;\n      box-sizing: border-box;\n    }\n    .border {\n      transition: all 0.3s ease-in-out;\n      position: absolute;\n      top: 0em;\n      left: 0em;\n      width: 100%;\n      height: 100%;\n    }\n    //padding: 3px 0px 3px 3px;\n    //margin: 5px 1px 3px 0px;\n\n    input:focus ~ .border {\n      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);\n      //padding: 3px 0px 3px 3px;\n      //margin: 5px 1px 3px 0px;\n      //border: 1px solid rgba(81, 203, 238, 1);;;;\n    }\n    input:hover ~ .border {\n      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);\n    }\n    /* On mouse-over, add a grey background color */\n    input:hover ~ .account {\n      opacity: 1;\n      ", "\n    }\n\n    input:checked ~ .account {\n      opacity: 1;\n      ", "\n    }\n\n    /* When the checkbox is checked, add a backgound & change borders */\n    > input:checked ~ .checkmark {\n      display: block;\n    }\n  }\n\n  .disabled {\n    pointer-events: none;\n  }\n"])), greenBorder, greenBorder);
export default useWithValue(true)(AccountCheckbox);
var templateObject_1;
//# sourceMappingURL=AccountCheckbox.js.map