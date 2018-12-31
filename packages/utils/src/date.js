export var MINUTE_MILIS = 60 * 1000;
export var HOUR_MILIS = 60 * MINUTE_MILIS;
export var DAY_MILIS = 24 * HOUR_MILIS;
export var WEEK_MILIS = DAY_MILIS * 7;
export var now = function (offser) {
    if (offser === void 0) { offser = 0; }
    return new Date().getTime() + offser;
};
export var cloneDate = function (date) { return new Date(date.getTime()); };
export var formatYYYYMMDD = function (date, delimiter) {
    if (delimiter === void 0) { delimiter = '-'; }
    return date.getFullYear() + delimiter + formatMM(date) + delimiter + formatDD(date);
};
export var formatMM = function (date) {
    return formatTwoSignFromInt(date.getMonth() + 1);
};
export var formatDD = function (date) {
    return formatTwoSignFromInt(date.getDate());
};
export var formatTwoSignFromInt = function (value) {
    return value >= 10 ? String(value) : '0' + value;
};
export var shortTimeZone = function (offset) {
    if (offset === void 0) { offset = new Date().getTimezoneOffset(); }
    return (offset > 0 ? '-' : '+') +
        formatTwoSignFromInt(Math.floor(-offset / 60)) +
        ':' +
        formatTwoSignFromInt(-offset % 60);
};
//# sourceMappingURL=date.js.map