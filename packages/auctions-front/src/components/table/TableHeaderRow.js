var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '../../styles';
import React from 'react';
var Layout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\npadding-left: 2em;\n    padding-right: 2em;\n  height: 4.5em;\n  align-items: center;\n  background: #191919;\n  /* Shadow */\n  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.65);\n"], ["\n  display: flex;\npadding-left: 2em;\n    padding-right: 2em;\n  height: 4.5em;\n  align-items: center;\n  background: #191919;\n  /* Shadow */\n  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.65);\n"])));
var LayoutExpandable = styled(Layout)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\n  padding-right: 3.0em;\n"], ["\n\n  padding-right: 3.0em;\n"])));
var TableHeaderCell = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #FEFEFE;\n  span {\n    font-size: 1.3em;\n    text-transform: uppercase;\n  }\n"], ["\n  color: #FEFEFE;\n  span {\n    font-size: 1.3em;\n    text-transform: uppercase;\n  }\n"])));
export var TableHeaderRow = function (_a) {
    var columns = _a.columns, isExpandable = _a.isExpandable;
    return (React.createElement(isExpandable ? LayoutExpandable : Layout, {}, [
        // @ts-ignore
        columns.map(function (col) {
            return React.createElement(TableHeaderCell, { style: { width: col.width } }, [
                React.createElement('span', {}, [col.title]),
            ]);
        }),
    ]));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=TableHeaderRow.js.map