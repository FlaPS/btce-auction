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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import React from 'react';
import { styled } from '../../styles';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import * as R from 'ramda';
var Layout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-bottom: 2em;\n"], ["\n  padding-bottom: 2em;\n"])));
export var TableContext = React.createContext({
    expandedKeys: [],
    toggleKeyExpand: function (key) { return []; },
    expandedRowRender: function (record, index) { return JSON.stringify(record); },
    rowKey: 'id'
});
export var Table = function (_a) {
    var columns = _a.columns, data = _a.data, _b = _a.rowKey, rowKey = _b === void 0 ? columns[0].dataIndex : _b, expandedRowRender = _a.expandedRowRender, props = __rest(_a, ["columns", "data", "rowKey", "expandedRowRender"]);
    var _c = __read(React.useState([]), 2), expandedKeys = _c[0], setExpandedKeys = _c[1];
    var api = {
        expandedKeys: expandedKeys,
        toggleKeyExpand: function (key) {
            return setExpandedKeys(expandedKeys.includes(key)
                ? R.remove(expandedKeys.indexOf(key), 1, expandedKeys)
                : __spread(expandedKeys, [key]));
        },
        expandedRowRender: expandedRowRender,
        rowKey: rowKey,
    };
    return (React.createElement(TableContext.Provider, { value: api }, [
        React.createElement(Layout, {}, __spread([
            React.createElement(TableHeaderRow, { columns: columns, isExpandable: expandedRowRender !== undefined })
        ], data.map(function (record, index) {
            return React.createElement(TableRow, { record: record, index: index, columns: columns });
        } //, expandedRowRender: expandedKeys[record[rowKey]] && expandedRowRender })
        )))
    ]));
};
var templateObject_1;
//# sourceMappingURL=Table.js.map