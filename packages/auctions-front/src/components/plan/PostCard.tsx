import React from 'react'
import styled, {fontSize} from '../../styles'
import {ExtractProps} from '@sha/react-fp'
import {PostVO} from '../../store/valueObjects'
import dateFormat from '../../utils/dateFormat'
import NetworksTray from './NetworksTray'
import compose, {constant} from 'lazy-compose'
import {media} from '../../styles/media'
import {NowContext, useSubscribe} from '../../contexts'
import CardBase from './CardBase'

const PostCard = ({timestamp, post, ...props}: BlockProps) => {
    const [isHovered, setHover] = React.useState(false)
    const hoverTrue = compose(
        setHover,
        constant(true),
    )
    const hoverFalse = compose(
        setHover,
        constant(false),
    )

    const timeString = dateFormat.format(post.timestamp)
    const isOutdated = post.timestamp < useSubscribe(NowContext)

    const Component = isOutdated ? OutdatedBlock : ScheduledBlock

    return (
        <Component
            {...props}
            onBlur={hoverFalse}
            onFocus={hoverTrue}
            onMouseEnter={hoverTrue}
            onMouseLeave={hoverFalse}
        >
            <div className={'cover'}>
                <Header>
                    <ScheduleTime>{timeString}</ScheduleTime>
                    <NetworksTray accountIds={post.accountIds} showAccounts={isHovered}/>
                </Header>
                <Content>
                    <div>{post.content}</div>
                </Content>
            </div>
            {post.isDraft && (
                <Draft>
                    <div className={'label'} aria-hidden>
                        {' '}
                        DRAFT
                    </div>
                </Draft>
            )}
        </Component>
    )
}

const Draft = styled.div`
  position: absolute;
  width: 20em;
  height: 20em;
  ${media.phone`
     width: 100%;
     font-size: 0.7em;
     transform: rotate(19deg);
  `}
  color: #d4d4d4;
  font-weight: bold;

  top: 0em;
  left: 0em;
  text-align: center;
  align-items: center;
  transform: rotate(45deg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .label {
    font-size: 4.5em;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ScheduleTime = styled.b`
  line-height: 1.7em;
  ${fontSize.small}
`

const Content = styled.div`
  /* &:after {
    content: '';
    width: 100%;
    height: 3.5em;
    position: absolute;
    left: 0;
    bottom: 0em;
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      var(--rollover-bg-color),
      var(--rollover-bg-color)
    );
  }
  */
  padding-top: 0.6em;
  padding-bottom: 1.5em;
 line-height: 1.8em;
  overflow-y: hidden;
  div {
   
    font-size: 1.3em;
  }
`

export const ScheduledBlock = styled(CardBase)`
  --rollover-bg-color: #ffffff;
  z-index: 500;
  background-color: var(--rollover-bg-color);
  border: 1px solid #e3e3e3;
  .cover {
    @media (max-width: 420px) {
        font-size: 1.4em;
    }
    overflow: hidden;
    top: 0px;
    left: 0px;
    position: absolute;
    padding: 1.2rem 1.1rem 2.2rem 1.5em;
    z-index: 100;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`

const OutdatedBlock = styled(ScheduledBlock)`
  filter: opacity(0.4);
`

type BlockProps = ExtractProps<typeof ScheduledBlock> & {
    timestamp?: number
    post?: PostVO
}

export default React.memo(PostCard)
