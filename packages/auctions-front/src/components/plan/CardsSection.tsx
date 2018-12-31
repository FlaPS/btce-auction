import React from 'react'
import styled, {fontColor, fontSize} from '../../styles'
import {PostVO} from '../../store/valueObjects'
import {Div, ExtractProps} from '@sha/react-fp'
import PostCard from './PostCard'
import SlotCard from './SlotCard'
import {createCardDataAttributes} from './cardDataSet'
import {useWithContext} from '../../hooks/'
import {NowContext} from '../../contexts'
import {MINUTE_MILIS} from '@sha/utils'

const CardsGrid = ({
                       slots = [],
                       posts = [],
                       nowTimestamp,
                       endDayTimestamp,
                       ...props
                   }: CardsGridProps) => {
    const dayWasEnded = nowTimestamp > endDayTimestamp

    const slotsToShow = !dayWasEnded
        ? slots
            .sort((a, b) => a - b)
            .map(createSlot)
            .filter(({timestamp}) => timestamp > nowTimestamp)
            .filter(slotNotIntersectsPosts(posts))
        : []

    const lastSlot = !dayWasEnded
        ? [
            {
                label: 'Schedule post on this day',
                type: 'new',
                timestamp: endDayTimestamp - MINUTE_MILIS,
            },
        ]
        : []

    return (
        <MaybeEmptyLayout {...props}>
            {posts
                .filter(isNotOutdatedDraft(nowTimestamp))
                .concat(slotsToShow)
                .sort((a, b) => a.timestamp - b.timestamp)
                .concat(lastSlot)
                .map(renderCard)}
        </MaybeEmptyLayout>
    )
}

const renderCard = (postOrSlot: PostVO | SlotVO, index) =>
    isSlotVO(postOrSlot) ? (
        <SlotCard
            key={index}
            timestamp={postOrSlot.timestamp}
            {...createCardDataAttributes('slot', postOrSlot.timestamp)}
            label={postOrSlot.label}
            type={postOrSlot.type}
        />
    ) : (
        <PostCard
            key={index}
            {...createCardDataAttributes('post', postOrSlot.id)}
            post={postOrSlot}
        />
    )

const isNotOutdatedDraft = (nowTimestamp: number) => (post: PostVO) =>
    !(post.isDraft && post.timestamp < nowTimestamp)

const slotNotIntersectsPosts = (posts: PostVO[]) => (slot: SlotVO) =>
    posts.every(
        ({timestamp}) =>
            getStartOfTheHour(timestamp) !== getStartOfTheHour(slot.timestamp),
    )

const getStartOfTheHour = (time: number) => time - (time % (60 * 60 * 1000))

const pluralize = ['first', 'second', 'third']

type SlotVO = Partial<ReturnType<typeof createSlot>>

const createSlot = (timestamp: number, index: number) => ({
    type: 'slot' as 'slot' | 'new',
    timestamp,
    label: pluralize[index] ? pluralize[index] + ' slot' : 'Slot #' + (index + 1),
})

const isSlotVO = (value: any): value is SlotVO =>
    value.label !== undefined

const Layout = styled(Div)`
  display: flex;
  flex-flow: row wrap;
  margin-top: 2.1em;
  margin-bottom: 3.4em;
`

const EmptyLayout = styled(Div)`
  text-align: center;
  margin-bottom: 0.5em;
  width: 100%;
  ${fontColor.caption}
  ${fontSize.regular}
`

const MaybeEmptyLayout = ({
                              children,
                              ...props
                          }: ExtractProps<typeof Layout>) => (
    children
        ? <Layout {...props}>
            {children}
        </Layout>
        : <EmptyLayout>No posts for this day</EmptyLayout>
)

type CardsGridProps = ExtractProps<typeof Layout> & {
    slots: number[]
    posts: PostVO[]
    endDayTimestamp: number
    nowTimestamp: number
}

export default useWithContext(NowContext, 'nowTimestamp')(CardsGrid)
