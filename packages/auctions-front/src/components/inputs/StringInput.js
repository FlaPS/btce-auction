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
import { HTMLInput } from '@sha/react-fp/src';
var StringInput = React.forwardRef(function (_a, forwardedRef) {
    var onChange = _a.onChange, onValueChange = _a.onValueChange, props = __rest(_a, ["onChange", "onValueChange"]);
    return (React.createElement(HTMLInput, __assign({}, props, { ref: forwardedRef, onChange: React.useCallback(function (event) {
            if (onChange)
                onChange(event);
            if (onValueChange)
                onValueChange(event.target.value);
        }, [onChange, onValueChange]) })));
});
export default StringInput;
//# sourceMappingURL=StringInput.js.map