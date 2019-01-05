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
import React from 'react'
import { identity } from 'ramda'
import { useSubscribe } from '../contexts'

var useWithContext = function (context, property, contextMapper) {
    if (contextMapper === void 0) { contextMapper = identity; }
    return function (Component) {
        return (React.forwardRef(function (props, ref) {
            var _a;
            var value = useSubscribe(context, contextMapper);
            var forwardProps = !props || !props.hasOwnProperty(property)
                ? __assign({}, props, (_a = { ref: ref }, _a[property] = value, _a)) : props;
            return React.createElement(Component, forwardProps);
        }));
    };
};
export default useWithContext;
//# sourceMappingURL=useWithContext.js.map
