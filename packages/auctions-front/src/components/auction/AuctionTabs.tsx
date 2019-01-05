import React from 'react'
import styled from '../../styles'
import { InputProps } from '../inputs/helpers'
import { compose, constant } from 'lazy-compose'

const TabButton = styled.div`
  font-family: 'Brandon Grotesque';

  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  div {

    display: flex;
    justify-content: center;
    cursor: pointer;
    color: #616161;
    height: 4.3em;
    margin-bottom: -0.2em;
    pointer-events: none;
    label {
      width: 100%;
      text-align: center;
      font-size: 2.2em;
      text-transform: uppercase;

    }
  }


  .active {
      border-bottom: #FFAE00 solid 0.2em;
      color: #FFAE00;
  }
`


const Layout = styled.div`
  z-index: 100;
  background-color: #000000;
  display: flex;
  justify-content: space-around;
  border-bottom: #272727 solid 0.2em;
`

const AuctionTabsRaw = ({value, onValueChange, data, ...props}: InputProps<number, string>) =>
  <Layout >
    {
      data.map((item, index) =>
        <TabButton onClick={compose(onValueChange, constant(index))} key={index} >
          <div className={(index === value ? 'active' : '')}>
            <label>{item}</label>
          </div>
        </TabButton>,

    )}
  </Layout>

export const AuctionTabs = AuctionTabsRaw
