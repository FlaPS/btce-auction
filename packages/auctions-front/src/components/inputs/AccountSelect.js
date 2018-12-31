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
import styled, { layouts } from '../../styles';
import { Li, Ul } from '@sha/react-fp/src';
import { AccountCheckbox } from './AccountCheckbox';
import { uniq, without } from 'ramda';
import { useWithContext, useWithValue } from '../../hooks/';
import { AccountsContext } from '../../contexts';
import shallowEqual from '../../hooks/shallowEqual';
var onItemValueChangeHandler = function (value, itemValue, onValueChange, checked) {
    return onValueChange &&
        onValueChange(checked ? uniq(value.concat([itemValue])) : without([itemValue], value));
};
export var memoizedItemValueChangeHandler = function (value, itemValue, onValueChange) {
    return React.useCallback(function (state) {
        return onItemValueChangeHandler(value, itemValue, onValueChange, state);
    }, [value, itemValue, onValueChange]);
};
var AccountSelect = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, data = _a.data, disabled = _a.disabled, props = __rest(_a, ["value", "onValueChange", "data", "disabled"]);
    return (React.createElement(List, null, data
        .filter(function (account) {
        return !disabled ||
            value.includes(account.accountId);
    })
        .map(function (account, index) { return (React.createElement(Item, { key: index },
        React.createElement(AccountCheckbox, { disabled: disabled, value: value.includes(account.accountId), account: account, onValueChange: memoizedItemValueChangeHandler(value, account.accountId, onValueChange) }))); })));
};
var List = styled(Ul)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  li {\n    margin-right: 1em;\n    margin-bottom: 1em;\n  }\n  padding: 1em;\n  ", "\n"], ["\n  list-style: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  li {\n    margin-right: 1em;\n    margin-bottom: 1em;\n  }\n  padding: 1em;\n  ", "\n"])), layouts.primary);
var Item = styled(Li)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), layouts.reset);
export default useWithContext(AccountsContext, 'data')(useWithValue([])(React.memo(AccountSelect, function (_a, _b) {
    var dataA = _a.data, a = __rest(_a, ["data"]);
    var dataB = _b.data, b = __rest(_b, ["data"]);
    return shallowEqual(a, b) && shallowEqual(dataA, dataB);
})));
var templateObject_1, templateObject_2;
//# sourceMappingURL=AccountSelect.js.map