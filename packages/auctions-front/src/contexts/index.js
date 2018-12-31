import React from 'react';
import { identity } from 'ramda';
import { now } from '@sha/utils';
import createBrowserHistory from 'history/createBrowserHistory';
var defaultValues = new Map();
var createAdvancedContext = function (defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    var context = React.createContext(defaultValue);
    defaultValues.set(context, defaultValue);
    return Object.assign(context, {
        subscribe: function (selector) {
            if (selector === void 0) { selector = identity; }
            return useSubscribe(context, selector);
        },
    });
};
export var useSubscribe = function (context, selector) {
    if (selector === void 0) { selector = identity; }
    var value = React.useContext(context);
    /*
      if (value === defaultValues.get(context))
        console.warn(
          'No Provider for context ',
          context,
          'default value used instead',
          value,
        )
    */
    return selector(value);
};
export var DisabledContext = createAdvancedContext(false);
export var NowContext = createAdvancedContext(now());
export var HistoryContext = createAdvancedContext(createBrowserHistory());
//# sourceMappingURL=index.js.map