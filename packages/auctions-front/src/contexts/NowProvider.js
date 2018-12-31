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
import React from 'react';
import { renderChildren } from '../../../react-fp/src';
import { NowContext } from '.';
import { now } from '../../../utils/src';
import { useMount, useUnmount } from '../hooks/';
export default (function (_a) {
    var children = _a.children;
    var _b = __read(React.useState(now()), 2), value = _b[0], setValue = _b[1];
    var nowRef = React.useRef(null);
    // 5 minutes ahead
    var setNow = React.useCallback(function () { return setValue(now(5 * 60 * 1000)); }, []);
    useMount(function () {
        // update each 2 minutes
        nowRef.current = setInterval(setNow, 1000 * 120);
    });
    useUnmount(function () { return clearInterval(nowRef.current); });
    return React.createElement(NowContext.Provider, {
        children: renderChildren(children),
        value: value,
    });
});
//# sourceMappingURL=NowProvider.js.map