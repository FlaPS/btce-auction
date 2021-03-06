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
import React from 'react'

var useWithValue = function (initialValue) { return function (Component) {
    return React.memo(function (_a) {
        var value = _a.value, onValueChange = _a.onValueChange, props = __rest(_a, ["value", "onValueChange"]);
        var _b = __read(React.useState(value || initialValue), 2), valueFromHook = _b[0], onValueChangeFromHook = _b[1];
        if (value === initialValue)
            value = undefined;
        var forwardProps = __assign({}, props, { value: value || valueFromHook, onValueChange: onValueChange || onValueChangeFromHook });
        return React.createElement(Component, 
        // @ts-ignore
        forwardProps);
    });
}; };
export default useWithValue;
//# sourceMappingURL=useWithValue.js.map
