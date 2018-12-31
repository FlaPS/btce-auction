var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
import React from 'react';
import { storiesOf } from '@storybook/react';
import { compose, reduce, sort, toPairs } from 'ramda';
import SVGLibrary from './SVGLibrary';
import styled from './styled';
compose(reduce(function (story, _a) {
    var _b = __read(_a, 2), iconName = _b[0], icon = _b[1];
    return story.add(iconName, icon);
}, storiesOf('styles/icons', module)), sort(function (_a, _b) {
    var _c = __read(_a, 1), nameA = _c[0];
    var _d = __read(_b, 1), nameB = _d[0];
    return (nameA > nameB ? 1 : -1);
}))(toPairs(SVGLibrary));
var Lib = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n"])));
var IconContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 12px;\n"], ["\n  padding: 12px;\n"])));
storiesOf('styles', module).add('SVGLibrary', function () { return (React.createElement(Lib, null, Object.entries(SVGLibrary).map(function (_a) {
    var _b = __read(_a, 2), key = _b[0], Icon = _b[1];
    return (React.createElement(IconContainer, { key: key, title: key },
        React.createElement(Icon, null)));
}))); });
var templateObject_1, templateObject_2;
//# sourceMappingURL=SVGLibrary.story.js.map