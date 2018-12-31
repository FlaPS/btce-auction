var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from 'react';
import { styled } from '../../styles';
import { TableCell } from './TableCell';
import { TableContext } from './Table';
import { CollapseButton } from './CollapseButton';
import compose, { constant } from 'lazy-compose';
var Layout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\npadding-left: 2em;\n    padding-right: 2em;\n  height: 4.5em;\n  align-items: center;\n  border-bottom: 1px solid #2B2B2B;\n  &:hover{\n    background-color: #131313;\n  }\n  \n  div {\n  \n  }\n"], ["\n  display: flex;\npadding-left: 2em;\n    padding-right: 2em;\n  height: 4.5em;\n  align-items: center;\n  border-bottom: 1px solid #2B2B2B;\n  &:hover{\n    background-color: #131313;\n  }\n  \n  div {\n  \n  }\n"])));
export var TableRow = function (_a) {
    var columns = _a.columns, index = _a.index, record = _a.record;
    var tableApi = useContext(TableContext);
    var rowKey = record[tableApi.rowKey];
    var isExpanded = tableApi.expandedKeys.includes(rowKey);
    return [
        React.createElement(Layout, { style: { backgroundColor: isExpanded ? '#000000' : 'rgba(0,0,0,0)' } },
            // @ts-ignore
            columns.map(function (col) { return React.createElement(TableCell, { index: index, record: record, column: col }); }),
            tableApi.expandedRowRender
                ? React.createElement(CollapseButton, { value: isExpanded, onValueChange: compose(tableApi.toggleKeyExpand, constant(rowKey)) })
                : null),
        tableApi.expandedKeys.includes(rowKey) && tableApi.expandedRowRender(record, index)
    ];
};
var templateObject_1;
//# sourceMappingURL=TableRow.js.map