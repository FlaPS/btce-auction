import React from 'react'
import { storiesOf } from '@storybook/react'
import { Pagination } from '../components/table/Pagination'
import { SnackBarItem } from '../components/elements/SnackBarItem'
import { generateGuid } from '@sha/random'


const log = console.log

storiesOf('elements', module)
  .add('SnackBarItem info with all props setup', () => (
    <SnackBarItem
      text={'Scatter attach error'}
      guid={generateGuid()}
      onActionClick={log}
      actionText={'Okay!'}
    />
  ))
  .add('Set of snack bar items', () => (
    <div>
      <SnackBarItem
        text={'Scatter attached'}
        guid={generateGuid()}
      />
      <SnackBarItem
        text={'Scatter attach error!'}
        guid={generateGuid()}
        type={'warning'}
        actionText={'Retry'}
        onActionClick={log}
      />
      <SnackBarItem
        text={'Scatter attached'}
        guid={generateGuid()}
        type={'success'}
      />
    </div>

  ))
