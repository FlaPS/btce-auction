import React from 'react'
import styled, {fontColor, fontSize} from '../../styles'
import {media} from '../../styles/media'

export default ({
                    dayLabel,
                    weekday,
                }: {
    dayLabel: string
    weekday: string
}) => (
    <div>
        <DayLabel>{dayLabel}</DayLabel>
        <Weekday>{weekday}</Weekday>
    </div>
)

const DayLabel = styled.h2`
  display: inline;
  ${fontSize.big}
  ${fontColor.header}
`

const Weekday = styled.span`
  ${media.portraitMax`
    display: none;
  `}
  font-weight: normal;
  margin-left: 3em;
  ${fontSize.regular}
  ${fontColor.caption}
`
