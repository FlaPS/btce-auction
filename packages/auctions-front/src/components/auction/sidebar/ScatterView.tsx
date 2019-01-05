import React from 'react'
import { FrontState } from '../../../store/reducer'
import { useDispatch, useMappedState } from '../../../hooks'
import { scatterDuck } from '../../../store/btce/scatter/scatterDuck'
import { AttachScatter } from './AttachScatter'

const scatterSelector = (state: FrontState) => state.app.scatter

export const ScatterView = () => {
  const scatter = useMappedState(scatterSelector)
  const dispatch = useDispatch()
  if (!scatter.attached)
    return <AttachScatter/>
  return (

     [
       <div className='sidebar__content_block'>
        <div className='sidebar__content_block-head'>
          <div className='scatter__block'>
            <img className='scatter__logo' src='/assets/ava.jpg' alt=''/>
            <div className='scatter__name-wrap'>
              <div className='scatter__name'>chintailease</div>
              <div className='scatter__status-wrap'>
                <div className='scatter__status'>@active</div>
                <div className='scatter__detach'
                     onClick={() => dispatch(scatterDuck.actions.detach())}
                >Detach Scatter</div>
              </div>
            </div>
          </div>
        </div>
        <div className='sidebar__content_block-body'>
          <div className='scatter__btn-wrap'>
            <button className='scatter__btn'>
              <span>Read</span>
              <svg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7 0.96875C8.24193 0.96875 9.42742 1.30746 10.5 1.92843C11.5726 2.5494 12.4194 3.39617 13.0403 4.46875C13.6613 5.54133 14 6.72681 14 7.96875C14 9.23891 13.6613 10.3962 13.0403 11.4688C12.4194 12.5413 11.5726 13.4163 10.5 14.0373C9.42742 14.6583 8.24193 14.9688 7 14.9688C5.72984 14.9688 4.57258 14.6583 3.5 14.0373C2.42742 13.4163 1.55242 12.5413 0.931452 11.4688C0.310484 10.3962 0 9.23891 0 7.96875C0 6.72681 0.310484 5.54133 0.931452 4.46875C1.55242 3.39617 2.42742 2.5494 3.5 1.92843C4.57258 1.30746 5.72984 0.96875 7 0.96875ZM7 2.32359C5.98387 2.32359 5.02419 2.57762 4.17742 3.08569C3.30242 3.59375 2.625 4.2994 2.11694 5.14617C1.60887 6.02117 1.35484 6.95262 1.35484 7.96875C1.35484 8.98488 1.60887 9.94456 2.11694 10.7913C2.625 11.6663 3.30242 12.3438 4.17742 12.8518C5.02419 13.3599 5.98387 13.6139 7 13.6139C8.01613 13.6139 8.94758 13.3599 9.82258 12.8518C10.6694 12.3438 11.375 11.6663 11.8831 10.7913C12.3911 9.94456 12.6452 8.98488 12.6452 7.96875C12.6452 6.95262 12.3911 6.02117 11.8831 5.14617C11.375 4.2994 10.6694 3.59375 9.82258 3.08569C8.94758 2.57762 8.01613 2.32359 7 2.32359ZM10.9516 5.99294C11.0081 6.07762 11.0645 6.1623 11.0645 6.24698C11.0645 6.35988 11.0081 6.41633 10.9516 6.47278L6.09677 11.2994C6.0121 11.3841 5.92742 11.4123 5.84274 11.4123C5.72984 11.4123 5.67339 11.3841 5.61694 11.2994L3.04839 8.73085C2.96371 8.6744 2.93548 8.58972 2.93548 8.47681C2.93548 8.39214 2.96371 8.30746 3.04839 8.25101L3.69758 7.60181C3.75403 7.54536 3.81048 7.51714 3.92339 7.51714C4.00806 7.51714 4.09274 7.54536 4.17742 7.60181L5.84274 9.32359L9.85081 5.34375C9.90726 5.2873 9.96371 5.25907 10.0766 5.25907C10.1613 5.25907 10.246 5.31552 10.3306 5.37198L10.9516 5.99294Z'
                  fill='#0E9C1C'
                />
              </svg>
            </button>
            <button className='scatter__btn'>
              <span>Write</span>
              <svg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7 0.96875C8.24193 0.96875 9.42742 1.30746 10.5 1.92843C11.5726 2.5494 12.4194 3.39617 13.0403 4.46875C13.6613 5.54133 14 6.72681 14 7.96875C14 9.23891 13.6613 10.3962 13.0403 11.4688C12.4194 12.5413 11.5726 13.4163 10.5 14.0373C9.42742 14.6583 8.24193 14.9688 7 14.9688C5.72984 14.9688 4.57258 14.6583 3.5 14.0373C2.42742 13.4163 1.55242 12.5413 0.931452 11.4688C0.310484 10.3962 0 9.23891 0 7.96875C0 6.72681 0.310484 5.54133 0.931452 4.46875C1.55242 3.39617 2.42742 2.5494 3.5 1.92843C4.57258 1.30746 5.72984 0.96875 7 0.96875ZM7 2.32359C5.98387 2.32359 5.02419 2.57762 4.17742 3.08569C3.30242 3.59375 2.625 4.2994 2.11694 5.14617C1.60887 6.02117 1.35484 6.95262 1.35484 7.96875C1.35484 8.98488 1.60887 9.94456 2.11694 10.7913C2.625 11.6663 3.30242 12.3438 4.17742 12.8518C5.02419 13.3599 5.98387 13.6139 7 13.6139C8.01613 13.6139 8.94758 13.3599 9.82258 12.8518C10.6694 12.3438 11.375 11.6663 11.8831 10.7913C12.3911 9.94456 12.6452 8.98488 12.6452 7.96875C12.6452 6.95262 12.3911 6.02117 11.8831 5.14617C11.375 4.2994 10.6694 3.59375 9.82258 3.08569C8.94758 2.57762 8.01613 2.32359 7 2.32359ZM10.9516 5.99294C11.0081 6.07762 11.0645 6.1623 11.0645 6.24698C11.0645 6.35988 11.0081 6.41633 10.9516 6.47278L6.09677 11.2994C6.0121 11.3841 5.92742 11.4123 5.84274 11.4123C5.72984 11.4123 5.67339 11.3841 5.61694 11.2994L3.04839 8.73085C2.96371 8.6744 2.93548 8.58972 2.93548 8.47681C2.93548 8.39214 2.96371 8.30746 3.04839 8.25101L3.69758 7.60181C3.75403 7.54536 3.81048 7.51714 3.92339 7.51714C4.00806 7.51714 4.09274 7.54536 4.17742 7.60181L5.84274 9.32359L9.85081 5.34375C9.90726 5.2873 9.96371 5.25907 10.0766 5.25907C10.1613 5.25907 10.246 5.31552 10.3306 5.37198L10.9516 5.99294Z'
                  fill='#0E9C1C'
                />
              </svg>
            </button>
            <button className='scatter__btn'>
              <span>Account</span>
              <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M7.74756 0.96875C8.98949 0.96875 10.175 1.30746 11.2476 1.92843C12.3201 2.5494 13.1669 3.39617 13.7879 4.46875C14.4088 5.54133 14.7476 6.72681 14.7476 7.96875C14.7476 9.23891 14.4088 10.3962 13.7879 11.4688C13.1669 12.5413 12.3201 13.4163 11.2476 14.0373C10.175 14.6583 8.98949 14.9688 7.74756 14.9688C6.4774 14.9688 5.32014 14.6583 4.24756 14.0373C3.17498 13.4163 2.29998 12.5413 1.67901 11.4688C1.05804 10.3962 0.747559 9.23891 0.747559 7.96875C0.747559 6.72681 1.05804 5.54133 1.67901 4.46875C2.29998 3.39617 3.17498 2.5494 4.24756 1.92843C5.32014 1.30746 6.4774 0.96875 7.74756 0.96875ZM7.74756 13.6139C8.76369 13.6139 9.69514 13.3599 10.5701 12.8518C11.4169 12.3438 12.1226 11.6663 12.6306 10.7913C13.1387 9.94456 13.3927 8.98488 13.3927 7.96875C13.3927 6.95262 13.1387 6.02117 12.6306 5.14617C12.1226 4.2994 11.4169 3.59375 10.5701 3.08569C9.69514 2.57762 8.76369 2.32359 7.74756 2.32359C6.73143 2.32359 5.77175 2.57762 4.92498 3.08569C4.04998 3.59375 3.37256 4.2994 2.86449 5.14617C2.35643 6.02117 2.1024 6.95262 2.1024 7.96875C2.1024 8.98488 2.35643 9.94456 2.86449 10.7913C3.37256 11.6663 4.04998 12.3438 4.92498 12.8518C5.77175 13.3599 6.73143 13.6139 7.74756 13.6139ZM10.6266 6.21875C10.683 6.1623 10.7113 6.07762 10.7113 5.96472C10.7113 5.88004 10.683 5.79536 10.6266 5.73891L9.9774 5.08972C9.92095 5.03327 9.83627 5.00504 9.75159 5.00504C9.63869 5.00504 9.55401 5.03327 9.49756 5.08972L7.74756 6.83972L5.99756 5.08972C5.91288 5.03327 5.8282 5.00504 5.74353 5.00504C5.63062 5.00504 5.57417 5.03327 5.51772 5.08972L4.86853 5.73891C4.81207 5.79536 4.78385 5.88004 4.78385 5.96472C4.78385 6.07762 4.81207 6.1623 4.86853 6.21875L6.61853 7.96875L4.86853 9.71875C4.81207 9.80343 4.78385 9.8881 4.78385 9.97278C4.78385 10.0857 4.81207 10.1421 4.86853 10.1986L5.51772 10.8478C5.57417 10.9042 5.63062 10.9325 5.74353 10.9325C5.8282 10.9325 5.91288 10.9042 5.99756 10.8478L7.74756 9.09778L9.49756 10.8478C9.55401 10.9042 9.63869 10.9325 9.75159 10.9325C9.83627 10.9325 9.92095 10.9042 9.9774 10.8478L10.6266 10.1986C10.683 10.1421 10.7113 10.0857 10.7113 9.97278C10.7113 9.8881 10.683 9.80343 10.6266 9.71875L8.87659 7.96875L10.6266 6.21875Z'
                  fill='#FF3453'
                />
              </svg>
            </button>
          </div>
          <a href='https://get-scatter.com/' className='scatter__download'>download scatter</a>
        </div>
      </div>,
      <div className='sidebar__content_block'>
        <div className='sidebar__content_block-head'>
          <div className='sidebar__content_block-title'>my account</div>
        </div>
        <div className='sidebar__content_block-body'>
          <div className='sidebar__account-name_wrap'>
            <div className='sidebar__account-name'>Account Name</div>
            <div className='sidebar__account-value'>chintailease</div>
          </div>
          <div className='sidebar__balance-wrap'>
            <div className='sidebar__balance-head'>
              <div className='sidebar__balance-title'>Total Balance</div>
              <div className='sidebar__balance'>
                <div className='sidebar__balance-coin'>{scatter.freeEOS + scatter.auctionEOS} EOS</div>
                <div className='sidebar__balance-value'>${(scatter.freeEOS + scatter.auctionEOS) * scatter.usdMultiplier} US</div>
              </div>
            </div>
            <div className='sidebar__balance-body'>
              <div className='sidebar__balance-content'>
                <div className='sidebar__balance-title'>Free</div>
                <div className='sidebar__balance'>
                  <div className='sidebar__balance-coin'>{scatter.freeEOS} EOS</div>
                  <div className='sidebar__balance-value'>${(scatter.freeEOS) * scatter.usdMultiplier} US</div>
                </div>
              </div>
              <div className='sidebar__balance-content'>
                <div className='sidebar__balance-title'>In Auctions</div>
                <div className='sidebar__balance'>
                  <div className='sidebar__balance-coin'>{scatter.auctionEOS} EOS</div>
                  <div className='sidebar__balance-value'>${(scatter.auctionEOS) * scatter.usdMultiplier} US</div>
                </div>
              </div>
            </div>
          </div>
          <div className='sidebar__slider-wrap'>
            <div className='sidebar__slider'>
              <div className='sidebar__slider-percent' style={{ width: '10%' }}></div>
              <div className='sidebar__slider-title'>RAM</div>
              <div className='sidebar__slider-value'>18.86MB <span>/ 28.72MB</span></div>
            </div>
            <div className='sidebar__slider'>
              <div className='sidebar__slider-percent' style={{ width: '15%' }}></div>
              <div className='sidebar__slider-title'>CPU</div>
              <div className='sidebar__slider-value'>18.86MB <span>/ 28.72MB</span></div>
            </div>
            <div className='sidebar__slider'>
              <div className='sidebar__slider-percent' style={{ width: '25%' }}></div>
              <div className='sidebar__slider-title'>NET</div>
              <div className='sidebar__slider-value'>18.86MB <span>/ 28.72MB</span></div>
            </div>
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
          </div>
        </div>
        <div className='sidebar__content_block-footer'>Tokens in Account <span>8</span></div>
      </div>
    ]

  )
}
