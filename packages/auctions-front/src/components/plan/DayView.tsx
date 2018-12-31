import React from 'react'
import styled from '../../styles'
import {DayVO, PostVO, StatisticsVO} from '../../store/valueObjects'
import {Div, ExtractProps} from '@sha/react-fp'
import {reduce} from 'ramda'
import {weekDayFormat} from '../../utils/dateFormat'
import {DAY_MILIS} from '@sha/utils'
import DayHeader from './DayHeader'
import CardsGrid from './CardsSection'
import {getDayLabel} from '../../utils'
import {useWithContext} from '../../hooks/'
import {NowContext} from '../../contexts'

const DayView = React.forwardRef(
    ({posts, plan, nowTimestamp, ...props}: DayPlanProps, forwardedRef) => (
        <Layout {...props} ref={forwardedRef}>
            <DayHeader
                {...getDayTitleProps(nowTimestamp, plan.dayStartTimestamp)}
                currentStat={
                    nowTimestamp > plan.dayStartTimestamp && getCurrentStatistics(posts)
                }
                targetStat={plan.targetStatistics}
            />
            <CardsGrid
                posts={posts}
                slots={plan.slotTimestamps}
                endDayTimestamp={plan.dayStartTimestamp + DAY_MILIS}
            />
        </Layout>
    ),
)

export default useWithContext(NowContext, 'nowTimestamp')(React.memo(DayView))

const Layout = styled(Div)`
  margin-bottom: 1em;
`

const getDayTitleProps = (nowTimestamp: number, dayStartTimeStamp: number) => ({
    dayLabel: getDayLabel(dayStartTimeStamp, nowTimestamp),
    weekday: getWeekday(dayStartTimeStamp),
})

const getWeekday = (time: number) => weekDayFormat.format(time)

const getCurrentStatistics = reduce(
    (result: StatisticsVO, {statistics}: PostVO) => ({
        likes: (statistics.likes || 0) + result.likes,
        followers: (statistics.followers || 0) + result.followers,
        comments: (statistics.comments || 0) + result.comments,
        reposts: (statistics.reposts || 0) + result.reposts,
    }),
    {
        likes: 0,
        followers: 0,
        comments: 0,
        reposts: 0,
    },
)

export type DayPlanProps = ExtractProps<typeof Div> & {
    posts: PostVO[]
    plan: DayVO
    nowTimestamp?: number
}
