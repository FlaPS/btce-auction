import React from 'react'
import styled from '../../styles'
import DayTitle from './DayTitle'
import DayStat from './DayStat'
import {StatisticsVO} from '../../store/valueObjects'
import {Div, ExtractProps} from '@sha/react-fp'

export default ({
                    weekday,
                    dayLabel,
                    currentStat,
                    targetStat,
                    noCards,
                    ...props
                }: DayHeaderProps) =>
    React.createElement(
        Layout,
        props,
        [
            DayTitle({dayLabel, weekday}),
            currentStat ? DayStat({currentStat, targetStat}) : null,
        ],
    )


const Layout = styled(Div)`
  display: flex;
  justify-content: space-between;
`

export type DayHeaderProps = ExtractProps<typeof Layout> & {
    weekday: string
    dayLabel: string
    noCards?: boolean
    currentStat: StatisticsVO
    targetStat: StatisticsVO
}
