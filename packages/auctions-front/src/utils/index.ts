import { DAY_MILIS, now } from '@sha/utils'
import { shortDateFormat } from './dateFormat'

export const getDayStartTimestamp = (
    timestamp: number = new Date().getTime(),
) => timestamp - (timestamp % DAY_MILIS)

export const getDayLabel = (
    dayStartTimeStamp: number,
    nowTimestamp: number = now(),
): string => {
    if (
        dayStartTimeStamp < nowTimestamp &&
        dayStartTimeStamp + DAY_MILIS > nowTimestamp
    )
        return 'Today'
    if (
        dayStartTimeStamp - DAY_MILIS < nowTimestamp &&
        dayStartTimeStamp > nowTimestamp
    )
        return 'Tomorrow'

    return shortDateFormat.format(dayStartTimeStamp)
}
