var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { Div } from '../../../../react-fp/src';
import styled, { fontSize } from '../../styles';
export var defaultOnValueChange = function (value) { return undefined; };
export var InputLayout = styled(Div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  label {\n    margin-right: 1.4em;\n    ", "\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  label {\n    margin-right: 1.4em;\n    ", "\n  }\n"])), fontSize.small);
export var onChangeHandler = function (onChange, onValue, event) {
    if (onChange)
        onChange(event);
    if (onValue)
        onValue(event.target['value']);
};
export var onCheckboxChangeHandler = function (onChange, onValue, event) {
    if (onChange)
        onChange(event);
    if (onValue)
        onValue(event.target['checked']);
};
export var memoizedOnChange = function (onChange, onValueChange) {
    return React.useCallback(function (event) {
        return onChangeHandler(onChange, onValueChange, event);
    }, [onChange, onValueChange]);
};
var templateObject_1;
//# sourceMappingURL=helpers.js.map