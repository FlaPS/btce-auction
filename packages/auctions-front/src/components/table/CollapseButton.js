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
import { styled, SVGLibrary } from '../../styles';
import compose, { constant } from 'lazy-compose';
var CollapseButtonBase = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: #2A2A2A;\n  border-radius: 0.5em;\n  min-width: 2.2em;\n  min-height: 2.2em;\n  border: none;\n  outline: none;\n  color: #FFAF02;\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 0.8em;\n"], ["\n  background: #2A2A2A;\n  border-radius: 0.5em;\n  min-width: 2.2em;\n  min-height: 2.2em;\n  border: none;\n  outline: none;\n  color: #FFAF02;\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 0.8em;\n"])));
var CollapseButtonToggled = styled(CollapseButtonBase)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: #131313;\n"], ["\n  background: #131313;\n"])));
var CollapseButtonRaw = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, props = __rest(_a, ["value", "onValueChange"]);
    return value
        ? React.createElement(CollapseButtonToggled, { onClick: compose(onValueChange, constant(!value)) }, React.createElement(SVGLibrary.ArrowUp))
        : React.createElement(CollapseButtonBase, { onClick: compose(onValueChange, constant(!value)) }, React.createElement(SVGLibrary.ArrowDown));
};
export var CollapseButton = CollapseButtonRaw;
var templateObject_1, templateObject_2;
//# sourceMappingURL=CollapseButton.js.map