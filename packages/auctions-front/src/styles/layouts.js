var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { fontSize } from './index';
import { media } from './media';
export var primary = "\n    background: #FFFFFF;\n    border: 1px solid #E3E3E3;\n    box-sizing: border-box;\n    margin: 0rem 0px -1px 0em;\n    overflow: hidden;\n";
export var reset = "\n    margin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: inherit;\n\tfont: inherit;\n\tvertical-align: baseline;\n";
export var primaryHeader = "\n    background: #FFFFFF;\n    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);\n    align-items: center;\n    font-weight: bold;\n    display: flex;\n\n";
export var autoSizeText = "\n    line-height: 2.3em;\n    resize: none;\n    font-family: Stem;\n    width: 100%;\n    min-height: 12em;\n\n    " + media.phone(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n       padding: 1rem 0.5rem 0.5rem 1em;\n    "], ["\n       padding: 1rem 0.5rem 0.5rem 1em;\n    "]))) + "\n    padding: 1rem 1.5rem 1.5rem 2em;\n    &::placeholder {\n      color: #CDCCCC;\n    }\n    " + primary + "\n    " + fontSize.regular + "\n";
var templateObject_1;
//# sourceMappingURL=layouts.js.map