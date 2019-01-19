import React from 'react'
import { FrontState } from '../../../store/reducer'
import { useDispatch, useMappedState } from '../../../hooks'
import { scatterDuck } from '../../../store/btce/scatter/scatterDuck'
import { AccountInfoVO } from '../../../store/api/explorer/accounts'
import { AsyncState } from '@sha/fsa'
import Maybe from '@sha/utils/src/Maybe'

const getBalanceEOS = (accountInfo: Partial<AccountInfoVO>) =>
  Maybe.fromValue(accountInfo)
    .map( a => a.availableEOS)
    .map( value => value + ' EOS')
    .getOrElse('-')

const getBalanceUS = (accountInfo: Partial<AccountInfoVO>) =>
  Maybe.fromValue(accountInfo)
    .map( a => a.availableEOS)
    .map( value => '$' + Math.floor((value * 2.5) * 1000) / 1000 + ' US')
    .getOrElse('-')

export const AccountInfoData = ({accountInfo = {}}: {accountInfo?: Partial<AccountInfoVO>}) => {
  return [
    <div className='sidebar__balance-wrap'>
      <div className='sidebar__balance-head'>
        <div className='sidebar__balance-title'>Total Balance</div>
        <div className='sidebar__balance'>
          <div className='sidebar__balance-value'>
            <div className='sidebar__balance-value-eos'>
              {getBalanceEOS(accountInfo)}
            </div>
            <div className='sidebar__balance-value-us'>
              {getBalanceUS(accountInfo)}
            </div>
          </div>
        </div>
      </div>
    </div>,
    <div className='sidebar__slider-wrap'>
      {makeSlider('RAM', 'MB', accountInfo.usedRAM, accountInfo.totalRAM)}
      {makeSlider('CPU', '', accountInfo.usedCPU, accountInfo.totalCPU)}
      {makeSlider('NET', '', accountInfo.usedNET, accountInfo.totalNET)}

      <div className='sidebar__slider'>
        <div className='sidebar__slider-percent' style={{ width: '46%' }}></div>
        <div className='sidebar__slider-title'>Staked</div>
        <div className='sidebar__slider-value'>18.86MB <span>/ 28.72MB</span></div>
      </div>
      <div className='sidebar__slider'>
        <div className='sidebar__slider-percent' style={{ width: '12%' }}></div>
        <div className='sidebar__slider-title'>Unstaked</div>
        <div className='sidebar__slider-value'>18.86MB <span>/ 28.72MB</span></div>
      </div>
      <div className='sidebar__slider'>
        <div className='sidebar__slider-percent' style={{ width: '98%' }}></div>
        <div className='sidebar__slider-title'>Refunding</div>
        <div className='sidebar__slider-value'>18.86MB <span>/ 28.72MB</span></div>
      </div>
    </div>,

    <div className='sidebar__content_block-footer'>Tokens in Account <span>N/A</span></div>,
  ]
}


const makeSlider = (label: string, postfix: string = '', actual: number, max: number) => {
  if (actual === undefined) {
    return  <div className='sidebar__slider'>
      <div className='sidebar__slider-percent' style={{ width: '0em' }}></div>
      <div className='sidebar__slider-title'>{label}</div>
      <div className='sidebar__slider-value'>-<span>/ -</span></div>
    </div>
  }

  max = actual > max ? actual : max
  const percent = actual === 0 ? 0 : ((actual / max) * 100)

  return  <div className='sidebar__slider'>
            <div className='sidebar__slider-percent' style={{ width: percent + '%' }}></div>
            <div className='sidebar__slider-title'>{label}</div>
            <div className='sidebar__slider-value'>{actual}{postfix} <span>/ {max}{postfix}</span></div>
          </div>
}
