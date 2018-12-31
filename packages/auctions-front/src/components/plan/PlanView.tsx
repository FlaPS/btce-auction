import React from 'react'
import styled from '../../styles/'
import {DayVO, PlanVO, PostVO} from '../../store/valueObjects'
import {Div, ExtractProps} from '@sha/react-fp'
import DayView from './DayView'
import {DAY_MILIS} from '@sha/utils'
import {getDayStartTimestamp} from '../../utils'
import scrollToRef from '../../utils/scrollToRef'

const PlanView = ({plan, ...props}: PlanListProps) => {
    const today = React.useRef(null)
    const [isRendered, setRendered] = React.useState(false)
    React.useLayoutEffect(() => {
        if (!isRendered && today) {
            setRendered(true)
            scrollToRef(today.current)
        }
    })

    return (
        <Layout {...props}>
            {plan.days.map(day => (
                <DayView
                    key={day.dayStartTimestamp}
                    ref={
                        day.dayStartTimestamp === getDayStartTimestamp() ? today : undefined
                    }
                    plan={day}
                    posts={filterPostsInDay(day)(plan.posts)}
                />
            ))}
        </Layout>
    )
}

const filterPostsInDay = (day: DayVO) => (posts: PostVO[]) =>
    posts.filter(
        post =>
            post.timestamp >= day.dayStartTimestamp &&
            post.timestamp < day.dayStartTimestamp + DAY_MILIS,
    )

const Layout = styled(Div)`
  font-size: var(--plan-size);
  overflow-x: visible;
  margin: 1.6em;
`

export type PlanListProps = ExtractProps<typeof Layout> & {
    plan: PlanVO
}

export default React.memo(PlanView)
