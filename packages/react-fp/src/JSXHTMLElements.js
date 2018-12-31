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
import React from 'react';
export var makeComponent = function (tag) {
    return React.memo(React.forwardRef(function (props, ref) {
        return React.createElement(tag, __assign({}, props, { ref: ref }));
    }));
};
export var Div = makeComponent('div');
export var Label = makeComponent('label');
export var H1 = makeComponent('h1');
export var H2 = makeComponent('h2');
export var Span = makeComponent('span');
export var Section = makeComponent('section');
export var Button = makeComponent('button');
export var HTMLInput = makeComponent('input');
export var HTMLSelect = makeComponent('select');
export var SVG = makeComponent('svg');
export var TextArea = makeComponent('textarea');
export var Ul = makeComponent('ul');
export var Li = makeComponent('li');
//# sourceMappingURL=JSXHTMLElements.js.map