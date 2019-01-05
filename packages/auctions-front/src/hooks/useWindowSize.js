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
import { useEffect, useState } from 'react'

var isClient = typeof window === 'object';
var useWindowSize = function (initialWidth, initialHeight) {
    if (initialWidth === void 0) { initialWidth = Infinity; }
    if (initialHeight === void 0) { initialHeight = Infinity; }
    var _a = __read(useState({
        width: isClient ? window.innerWidth : initialWidth,
        height: isClient ? window.innerHeight : initialHeight,
    }), 2), state = _a[0], setState = _a[1];
    useEffect(function () {
        var handler = function () {
            setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handler);
        return function () { return window.removeEventListener('resize', handler); };
    }, [1]);
    return state;
};
export default useWindowSize;
//# sourceMappingURL=useWindowSize.js.map
