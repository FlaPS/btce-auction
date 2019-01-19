import React from 'react'
import { storiesOf } from '@storybook/react'
import { ExplorerTabs } from '../components/explorer/ExplorerTabs'
import { FooterTabs } from '../components/explorer/FooterTabs'
import { NumberInput } from '../components/inputs/NumberInput'


storiesOf('inputs', module)
  .add('NumberInput default', () => (
    <NumberInput />
  ))
  .add('NumberInput default with 4digits', () => (
    <NumberInput fixedDigits={4} />
  ))
