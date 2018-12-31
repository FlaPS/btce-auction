var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled, { layouts } from '../../styles';
import TextAreaInput from './TextAreaInput';
import { Div } from '@sha/react-fp/src';
var makeShadow = function (value) {
    return value
        // .replace('&', '&amp')
        // .replace('<', '&lt')
        // .replace('>', '&gt')
        // .replace('"', '&quot')
        .replace(/\r?\n/g, '<br/>')
        .replace(/\s\s/g, ' &nbsp;');
};
var TextAreaAutosizeInput = React.forwardRef(function (props, ref) {
    var textArea = React.useRef(null);
    var divRef = React.useRef(null);
    React.useLayoutEffect(function () {
        if (textArea.current) {
            divRef.current.innerHTML = makeShadow(textArea.current.innerHTML);
        }
    });
    React.useEffect(function () {
        ref.current = textArea.current;
    });
    return (React.createElement(Layout, null,
        React.createElement("div", { ref: divRef, className: 'shadow' }),
        React.createElement(TextAreaInput, __assign({ autoFocus: true }, props, { ref: textArea }))));
});
var Layout = styled(Div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n\n  .shadow {\n    word-wrap: break-word;\n    word-break: break-all;\n    white-space: pre-wrap;\n    color: transparent;\n    opacity: 0;\n    height: auto;\n    z-index: -100;\n    ", "\n  }\n\n  textarea {\n    opacity: 1;\n    position: absolute;\n    top: 0px;\n    overflow-y: hidden;\n  }\n"], ["\n  position: relative;\n  width: 100%;\n  height: 100%;\n\n  .shadow {\n    word-wrap: break-word;\n    word-break: break-all;\n    white-space: pre-wrap;\n    color: transparent;\n    opacity: 0;\n    height: auto;\n    z-index: -100;\n    ", "\n  }\n\n  textarea {\n    opacity: 1;\n    position: absolute;\n    top: 0px;\n    overflow-y: hidden;\n  }\n"])), layouts.autoSizeText);
export default TextAreaAutosizeInput;
var templateObject_1;
//# sourceMappingURL=TextAreaAutosizeInput.js.map