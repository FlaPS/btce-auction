import React from 'react'
import styled, {fontColor, fontSize} from '../../styles'
import {Div, ExtractProps} from '@sha/react-fp'
import {StatisticsVO} from '../../store/valueObjects'
import StatProgress from './StatProgress'
import SVGLibrary from '../../styles/SVGLibrary'

export default ({currentStat, targetStat, ...props}: StatTrayProps) => (
    <Layout {...props}>
        <Item>
            <StatProgress
                icon={SVGLibrary.Comments}
                value={currentStat.comments / targetStat.comments}
            />
            <Caption>{currentStat.comments}</Caption>
        </Item>
        <Item>
            <StatProgress
                icon={SVGLibrary.Likes}
                value={currentStat.likes / targetStat.likes}
            />
            <Caption>{currentStat.likes}</Caption>
        </Item>

        <Item>
            <StatProgress
                icon={SVGLibrary.Reposts}
                value={currentStat.reposts / targetStat.reposts}
            />
            <Caption>{currentStat.reposts}</Caption>
        </Item>
        <Item>
            <StatProgress
                icon={SVGLibrary.Followers}
                value={currentStat.followers / targetStat.followers}
            />
            <Caption>+{currentStat.followers}</Caption>
        </Item>
    </Layout>
)

type StatTrayProps = {
    currentStat: StatisticsVO
    targetStat: StatisticsVO
} & ExtractProps<typeof Layout>

const Caption = styled.div`
  ${fontSize.small}
`
const Item = styled(Div)`
  display: flex;
  margin-left: 1em;
  margin-bottom: 1em;
  min-width: 6em;
`
const Layout = styled(Div)`
  flex-wrap: wrap;
  display: inline-flex;
  flex-direction: row-reverse;
  line-height: 2em;
  align-items: center;
  padding-top: 1em;

  ${fontColor.caption}
`
