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
import { renderChildren } from '@sha/react-fp/src';
import { InputLayout, memoizedOnChange } from './helpers';
import { identity } from 'ramda';
import shallowEqual from '../../hooks/shallowEqual';
import styled from '../../styles';
var defaultRenderOption = identity;
var SelectInput = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, label = _a.label, onChange = _a.onChange, _b = _a.data, data = _b === void 0 ? [] : _b, disabled = _a.disabled, _c = _a.renderOption, renderOption = _c === void 0 ? defaultRenderOption : _c, props = __rest(_a, ["value", "onValueChange", "label", "onChange", "data", "disabled", "renderOption"]);
    return (React.createElement(InputLayout, null,
        label && React.createElement("label", null, renderChildren(label)),
        React.createElement(StyledSelect, { disabled: disabled, onChange: memoizedOnChange(onChange, onValueChange), value: value }, data.map(function (item, index) { return (React.createElement("option", { key: index, value: item }, renderOption(item))); }))));
};
var StyledSelect = styled.select(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 5px 0px 5px 5px;\n  margin: 5px 1px 3px 0px;\n\n  transition: all 0.2s ease-in-out;\n  //padding: 3px 0px 3px 3px;\n  //margin: 5px 1px 3px 0px;\n\n  &:focus {\n    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);\n  }\n"], ["\n  padding: 5px 0px 5px 5px;\n  margin: 5px 1px 3px 0px;\n\n  transition: all 0.2s ease-in-out;\n  //padding: 3px 0px 3px 3px;\n  //margin: 5px 1px 3px 0px;\n\n  &:focus {\n    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);\n  }\n"])));
export default React.memo(SelectInput, function (_a, _b) {
    var dataA = _a.data, a = __rest(_a, ["data"]);
    var dataB = _b.data, b = __rest(_b, ["data"]);
    return shallowEqual(a, b) && shallowEqual(dataA, dataB);
});
var templateObject_1;
//# sourceMappingURL=SelectInput.js.map