import React from 'react'
import styled, {fontColor, fontSize} from '../../styles'
import {Div, ExtractProps} from '../../../../react-fp/src'
import {InputProps} from './helpers'
import {DAY_MILIS, HOUR_MILIS, MINUTE_MILIS, now, shortTimeZone, WEEK_MILIS,} from '../../../../utils/src'
import SelectInputRaw from './SelectInput'
import {clamp} from 'ramda'
import {getDayLabel, getDayStartTimestamp} from '../../utils'
import {useWithContext} from '../../hooks/'
import {DisabledContext, NowContext} from '../../contexts'
import {media} from '../../styles/media'

const SelectInput = useWithContext(DisabledContext, 'disabled')(SelectInputRaw)

const DateTimeInput = ({
                           value,
                           onValueChange,
                           label,
                           minValue = now(),
                           maxValue = now() + WEEK_MILIS,
                           ...props
                       }: DateTimeInputProps) => {
    const day = getDayStartTimestamp(value)
    const hour = Math.floor((value % DAY_MILIS) / HOUR_MILIS)
    const minute = Math.floor((value % HOUR_MILIS) / MINUTE_MILIS)

    const callback = value =>
        onValueChange && onValueChange(clamp(minValue, maxValue, value))

    return (
        <Layout {...props}>
            <label className={'label'}>{label}</label>
            <SelectInput

                data={getDayOptions(minValue, maxValue)}
                value={day}
                renderOption={getDayLabel}
                onValueChange={day =>
                    callback(
                        Number(day) +
                        Number(hour * HOUR_MILIS) +
                        Number(minute * MINUTE_MILIS),
                    )
                }
            />
            <span className="delimiter">at</span>
            <SelectInput
                data={getHourInputOptions(minValue, maxValue, value)}
                value={hour}
                onValueChange={hour =>
                    callback(day + hour * HOUR_MILIS + minute * MINUTE_MILIS)
                }
            />
            <SelectInput
                data={getMinuteInputOption(minValue, maxValue, value)}
                value={minute}
                onValueChange={minute =>
                    callback(day + hour * HOUR_MILIS + minute * MINUTE_MILIS)
                }
            />
            <div className="timezone">UTC{shortTimeZone()}</div>
        </Layout>
    )
}

export default React.memo(useWithContext(NowContext, 'minValue')(DateTimeInput))

const Layout = styled(Div)`
  display: flex;

  align-items: center;

  padding: 1.6em 2em 1.6em 2em;

  .delimiter {
    margin: 0rem 0.6rem 0rem 0.6em;
    ${fontSize.regular}
  }
  
  .timezone {
    ${fontSize.small}
    ${fontColor.caption}
    margin-left: 1.0em;
  }
  
  .label {
       margin-right: 1em;
       ${fontSize.small}
  }
  
  ${media.phone`
    justify-content: center;
    .label {
        display: none;
    }
    .timezone {
        display: none;
    }
  `}
`

type DateTimeInputProps = InputProps<number> &
    ExtractProps<typeof Layout> & {
    minValue?: number
    maxValue?: number
}

const getDayOptions = (minValue, maxValue) => {
    const dayStart = getDayStartTimestamp(minValue)
    const dayEnd = Math.min(getDayStartTimestamp(maxValue) + DAY_MILIS, maxValue)
    const data = []
    for (let i = dayStart; i < dayEnd; i += DAY_MILIS) data.push(i)

    return data
}

const getHourInputOptions = (minValue, maxValue, value) => {
    const startOfTheDay = getDayStartTimestamp(value)
    const endOfTheDay = startOfTheDay + DAY_MILIS
    const hourStart = Math.max(startOfTheDay, minValue)
    const hourEnd = Math.min(endOfTheDay, maxValue) - (value % HOUR_MILIS)
    const data = []
    for (let i = hourStart; i < hourEnd; i += HOUR_MILIS)
        data.push(Math.floor((i % DAY_MILIS) / HOUR_MILIS))

    return data
}

const getMinuteInputOption = (minValue, maxValue, value) => {
    const startOfTheHour = value - (value % HOUR_MILIS)
    const endOfTheHour = startOfTheHour + HOUR_MILIS
    const minuteStart = Math.max(startOfTheHour, minValue)
    const minuteEnd = Math.min(endOfTheHour, maxValue) - (value % MINUTE_MILIS)
    const data = []
    for (let i = minuteStart; i < minuteEnd; i += MINUTE_MILIS)
        data.push(Math.floor((i % HOUR_MILIS) / MINUTE_MILIS))

    return data
}
