var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { styled } from '../../styles';
var DefaultLayout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: #E9DBC4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  span {\n    font-size: 1.6em;\n  }\n"], ["\n  color: #E9DBC4;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  span {\n    font-size: 1.6em;\n  }\n"])));
var defaultRender = function (value, record, index) {
    return React.createElement(DefaultLayout, {}, [
        React.createElement('span', {}, (typeof value === 'string' || typeof value === 'number')
            ? value
            : JSON.stringify(value)),
    ]);
};
var getRenderer = function (column) {
    return column.render || defaultRender;
};
var renderSafely = function (f) {
    var result = 'Error';
    try {
        result = f();
    }
    catch (e) {
        console.warn(e);
    }
    return result;
};
export var TableCell = function (_a) {
    var column = _a.column, record = _a.record, index = _a.index;
    return React.createElement('div', { style: { width: column.width } }, [
        renderSafely(function () {
            return getRenderer(column)(column.mapValue ? column.mapValue(record[column.dataIndex], record, index) : record[column.dataIndex], record, index);
        }),
    ]);
};
var templateObject_1;
//# sourceMappingURL=TableCell.js.map