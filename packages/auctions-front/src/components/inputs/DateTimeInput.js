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
import styled, { fontColor, fontSize } from '../../styles';
import { Div } from '../../../../react-fp/src';
import { DAY_MILIS, HOUR_MILIS, MINUTE_MILIS, now, shortTimeZone, WEEK_MILIS, } from '../../../../utils/src';
import SelectInputRaw from './SelectInput';
import { clamp } from 'ramda';
import { getDayLabel, getDayStartTimestamp } from '../../utils';
import { useWithContext } from '../../hooks/';
import { DisabledContext, NowContext } from '../../contexts';
import { media } from '../../styles/media';
var SelectInput = useWithContext(DisabledContext, 'disabled')(SelectInputRaw);
var DateTimeInput = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, label = _a.label, _b = _a.minValue, minValue = _b === void 0 ? now() : _b, _c = _a.maxValue, maxValue = _c === void 0 ? now() + WEEK_MILIS : _c, props = __rest(_a, ["value", "onValueChange", "label", "minValue", "maxValue"]);
    var day = getDayStartTimestamp(value);
    var hour = Math.floor((value % DAY_MILIS) / HOUR_MILIS);
    var minute = Math.floor((value % HOUR_MILIS) / MINUTE_MILIS);
    var callback = function (value) {
        return onValueChange && onValueChange(clamp(minValue, maxValue, value));
    };
    return (React.createElement(Layout, __assign({}, props),
        React.createElement("label", { className: 'label' }, label),
        React.createElement(SelectInput, { data: getDayOptions(minValue, maxValue), value: day, renderOption: getDayLabel, onValueChange: function (day) {
                return callback(Number(day) +
                    Number(hour * HOUR_MILIS) +
                    Number(minute * MINUTE_MILIS));
            } }),
        React.createElement("span", { className: "delimiter" }, "at"),
        React.createElement(SelectInput, { data: getHourInputOptions(minValue, maxValue, value), value: hour, onValueChange: function (hour) {
                return callback(day + hour * HOUR_MILIS + minute * MINUTE_MILIS);
            } }),
        React.createElement(SelectInput, { data: getMinuteInputOption(minValue, maxValue, value), value: minute, onValueChange: function (minute) {
                return callback(day + hour * HOUR_MILIS + minute * MINUTE_MILIS);
            } }),
        React.createElement("div", { className: "timezone" },
            "UTC",
            shortTimeZone())));
};
export default React.memo(useWithContext(NowContext, 'minValue')(DateTimeInput));
var Layout = styled(Div)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n\n  align-items: center;\n\n  padding: 1.6em 2em 1.6em 2em;\n\n  .delimiter {\n    margin: 0rem 0.6rem 0rem 0.6em;\n    ", "\n  }\n  \n  .timezone {\n    ", "\n    ", "\n    margin-left: 1.0em;\n  }\n  \n  .label {\n       margin-right: 1em;\n       ", "\n  }\n  \n  ", "\n"], ["\n  display: flex;\n\n  align-items: center;\n\n  padding: 1.6em 2em 1.6em 2em;\n\n  .delimiter {\n    margin: 0rem 0.6rem 0rem 0.6em;\n    ", "\n  }\n  \n  .timezone {\n    ", "\n    ", "\n    margin-left: 1.0em;\n  }\n  \n  .label {\n       margin-right: 1em;\n       ", "\n  }\n  \n  ",
    "\n"])), fontSize.regular, fontSize.small, fontColor.caption, fontSize.small, media.phone(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    justify-content: center;\n    .label {\n        display: none;\n    }\n    .timezone {\n        display: none;\n    }\n  "], ["\n    justify-content: center;\n    .label {\n        display: none;\n    }\n    .timezone {\n        display: none;\n    }\n  "]))));
var getDayOptions = function (minValue, maxValue) {
    var dayStart = getDayStartTimestamp(minValue);
    var dayEnd = Math.min(getDayStartTimestamp(maxValue) + DAY_MILIS, maxValue);
    var data = [];
    for (var i = dayStart; i < dayEnd; i += DAY_MILIS)
        data.push(i);
    return data;
};
var getHourInputOptions = function (minValue, maxValue, value) {
    var startOfTheDay = getDayStartTimestamp(value);
    var endOfTheDay = startOfTheDay + DAY_MILIS;
    var hourStart = Math.max(startOfTheDay, minValue);
    var hourEnd = Math.min(endOfTheDay, maxValue) - (value % HOUR_MILIS);
    var data = [];
    for (var i = hourStart; i < hourEnd; i += HOUR_MILIS)
        data.push(Math.floor((i % DAY_MILIS) / HOUR_MILIS));
    return data;
};
var getMinuteInputOption = function (minValue, maxValue, value) {
    var startOfTheHour = value - (value % HOUR_MILIS);
    var endOfTheHour = startOfTheHour + HOUR_MILIS;
    var minuteStart = Math.max(startOfTheHour, minValue);
    var minuteEnd = Math.min(endOfTheHour, maxValue) - (value % MINUTE_MILIS);
    var data = [];
    for (var i = minuteStart; i < minuteEnd; i += MINUTE_MILIS)
        data.push(Math.floor((i % HOUR_MILIS) / MINUTE_MILIS));
    return data;
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=DateTimeInput.js.map