import React from 'react'
import { compose, constant } from 'lazy-compose'
import { styled } from '../../../styles'
import { InputProps } from '../../inputs/helpers'
import { useWithValue } from '../../../hooks'

const TabButton = styled.div`
  font-family: 'Brandon Grotesque';

  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  div {
    width: 100%
    display: flex;
    justify-content: center;
    cursor: pointer;
    color: #FEFEFE;
    opacity: 0.3;
    height: 4.3em;
    pointer-events: none;
    align-items: center;
    background-color: #616161;
    label {
      width: 100%;
      text-align: center;
      font-size: 2.2em;
      text-transform: uppercase;
      font-weight: bold;
    }
  }


  .active {
      opacity: 1;
      background-color: #191919;
      color: #FEFEFE;
  }

`


const Layout = styled.div`
  z-index: 100;
  background-color: #000000;
  display: flex;
  justify-content: space-around;
  bottom-border: #272727 solid 0.2em;
  .splitter {
      background-color: #616161;
      min-width: 0.1em;
  }
`

const MyAuctionsTabsRaw = ({value, onValueChange, data, ...props}: InputProps<number, string>) =>
  <Layout >
    {
      data.map((item, index) =>
        [
          <TabButton onClick={compose(onValueChange, constant(index))} key={index} >
            <div className={(index === value ? 'active' : '')}>
              <label>{item}</label>
            </div>
          </TabButton>,
          index !== data.length - 1 && <div className={'splitter'} key={'splitter' + index}></div>,
        ],

      )}
  </Layout>

export const MyAuctionsTabs = MyAuctionsTabsRaw
