import React, { useState } from 'react'
import { BlocksTable } from './BlocksTable'
import { ExplorerTabs } from '../ExplorerTabs'
import { TransactionTracesTable } from './TransactionTracesTable'
import { FooterTabs } from '../FooterTabs'


export const LiveFeedDataPane = () => {
  const [index, setIndex] = useState(0)


  const tabs =
    <FooterTabs
      value={index}
      onValueChange={setIndex}
      data={['BLOCKS', 'TRANSACTIONS']}
      key={'tabs'}
    />

  return index === 0
            ? <BlocksTable
                footerChildren={[
                 tabs,
                ]}
              />
            : <TransactionTracesTable
                footerChildren={[
                  tabs,
                ]}
              />
}
