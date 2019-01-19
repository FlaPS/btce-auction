import React from 'react'
import { connect } from 'react-redux'
import { FrontState } from '../../../store/reducer'
import { AsyncState } from '@sha/fsa'
import { AccountInfoVO } from '../../../store/api/explorer/accounts'
import { Spinner } from '../../elements/Spinner'
import { AccountInfoData } from './AccountInfoData'
import { useMappedState } from '../../../hooks'
import StringInput from '../../inputs/StringInput'
import { domeDuck } from '../../../store/btce/dome/domeDuck'
import { compose } from 'redux'


export const CheckAccountInfo = connect((state: FrontState) => ({
    account: state.app.auction.checkAccount.params,
  }),
  dispatch => ({
    setAccountName: compose(dispatch, domeDuck.actions.getCheckAccount.started),
  }),
)(
  ({account, setAccountName}) =>
    <div className='sidebar__content_block-body'>
      <div className='sidebar__account-name_wrap'>
        <div className='sidebar__account-name'>Account Name</div>
        <StringInput value={account} onValueChange={setAccountName}/>
      </div>
      <LoadableCheckAccount />
    </div>
)

const LoadableCheckAccount = connect((state: FrontState) => state.app.auction.checkAccount)(
  (props: AsyncState<AccountInfoVO>) =>
    props.status === 'started'
      ? <Spinner/>
      : <AccountInfoData
          accountInfo={props.value || {}}
        />
  ,
)
