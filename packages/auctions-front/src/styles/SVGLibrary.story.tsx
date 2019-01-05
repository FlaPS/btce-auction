import React from 'react'
import { storiesOf } from '@storybook/react'
import { compose, reduce, sort, toPairs } from 'ramda'
import SVGLibrary from './SVGLibrary'
import styled from './styled'

compose(
    reduce(
        (story, [iconName, icon]) => story.add(iconName, icon),
        storiesOf('styles/icons', module),
    ),
    sort(([nameA], [nameB]) => (nameA > nameB ? 1 : -1)),
)(toPairs(SVGLibrary))

const Lib = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const IconContainer = styled.div`
  padding: 12px;
`

storiesOf('styles', module).add('SVGLibrary', () => (
    <Lib>
        {Object.entries(SVGLibrary).map(([key, Icon]) => (
            <IconContainer key={key} title={key}>
                <Icon/>
            </IconContainer>
        ))}
    </Lib>
))
