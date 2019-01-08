import React from 'react'
import { storiesOf } from '@storybook/react'
import { Pagination } from '../components/table/Pagination'
import { SnackBarItem } from '../components/elements/SnackBarItem'
import { generateGuid } from '@sha/random'


const log = console.log

storiesOf('elements', module)
  .add('SnackBarItem with all props setup', () => (
    <SnackBarItem text={'Scatter attach error'} guid={generateGuid()}  />
  ))
