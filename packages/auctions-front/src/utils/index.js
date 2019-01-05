import { DAY_MILIS, now } from '@sha/utils'
import { shortDateFormat } from './dateFormat'

export var getDayStartTimestamp = function (timestamp) {
    if (timestamp === void 0) { timestamp = new Date().getTime(); }
    return timestamp - (timestamp % DAY_MILIS);
};
export var getDayLabel = function (dayStartTimeStamp, nowTimestamp) {
    if (nowTimestamp === void 0) { nowTimestamp = now(); }
    if (dayStartTimeStamp < nowTimestamp &&
        dayStartTimeStamp + DAY_MILIS > nowTimestamp)
        return 'Today';
    if (dayStartTimeStamp - DAY_MILIS < nowTimestamp &&
        dayStartTimeStamp > nowTimestamp)
        return 'Tomorrow';
    return shortDateFormat.format(dayStartTimeStamp);
};
//# sourceMappingURL=index.js.map
