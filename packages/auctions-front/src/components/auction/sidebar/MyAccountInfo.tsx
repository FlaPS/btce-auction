import React from 'react'
import { connect } from 'react-redux'
import { FrontState } from '../../../store/reducer'
import { AsyncState } from '@sha/fsa'
import { AccountInfoVO } from '../../../store/api/explorer/accounts'
import { Spinner } from '../../elements/Spinner'
import { AccountInfoData } from './AccountInfoData'
import { useMappedState } from '../../../hooks'

export const MyAccountInfo = ({scatter}) =>
  <div className='sidebar__content_block-body'>
    <div className='sidebar__account-name_wrap'>
      <div className='sidebar__account-name'>Account Name</div>
      <div className='sidebar__account-value'>
        {scatter.scatterData && scatter.scatterData.account}
      </div>
    </div>
    <LoadableMyAccount />
  </div>

const LoadableMyAccount = connect((state: FrontState) => state.app.auction.myAccount)(
  (props: AsyncState<AccountInfoVO>) =>
    props.status === 'started'
      ? <Spinner/>
      : <AccountInfoData
          accountInfo={props.value || {}}
        />,
  )
