import React from 'react'
import { storiesOf } from '@storybook/react'
import { ProxiesDataPane } from '../components/explorer/proxies/ProxiesDataPane'
import { ProducersDataPane } from '../components/explorer/producers/ProducersDataPane'

storiesOf('explorerTables', module)
  .add('Proxies', () => (
    <ProxiesDataPane />
  ))
  .add('Block broducers', () => (
    <ProducersDataPane />
  ))
