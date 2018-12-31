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
import React from 'react';
import { renderChildren } from '../../../../react-fp/src';
import { InputLayout, memoizedOnChange } from './helpers';
export default (function (_a) {
    var onValueChange = _a.onValueChange, label = _a.label, onChange = _a.onChange, props = __rest(_a, ["onValueChange", "label", "onChange"]);
    return (React.createElement(InputLayout, null,
        React.createElement("label", null, renderChildren(label)),
        React.createElement("input", __assign({ type: "date" }, props, { onChange: memoizedOnChange(onChange, onValueChange) }))));
});
//# sourceMappingURL=TODO_DateInput.js.map