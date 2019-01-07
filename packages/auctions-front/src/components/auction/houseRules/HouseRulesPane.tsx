import React from 'react'
import styled, { colors } from '../../../styles'

const Layout = styled.div`
  background: #191919;
  border-radius: 0px 0px 0.6em 0.6em;
  .section {

    padding: 3.0em;

    .title {
      font-family: 'Brandon Grotesque';

      text-transform: uppercase;
      color: ${colors.accent};
      margin-bottom: 1.6em;
      span {
          font-size: 2.2em;
          letter-spacing: 0.07em;
      }
    }

    .text {
      font-family: Muller;

      color: ${colors.regular};
      span {
        line-height: 1.2em;
        font-size: 1.8em;
      }
    }


  }

  > :not(:last-child){
      border-bottom: 0.1em solid #2B2B2B;
  }
`

const rules = [
  {
    title: 'Introduction',
    content: 'Our aim is to create as perfectly efficient and transparent market for EOS namespaces as possible, available to anyone, at any point in time, anywhere, at the lowest possible cost. Dome is the stage where anyone can buy, sell, and make a public request for (premium) EOS namespaces. The custom dome design promotes rapid price discovery and prevents automated bidding from interfering with the “normal” conditions of the market structure. Finally, we strive to provide the most convenient way of namespace exchange through intuitive and pleasant to use user interface suitable for the needs of all users. ',
  },
  {
    title: 'Setup',
    content: `In order to participate in the auctions or set your own auction you have to firstly setup Scatter. We do not hold your private keys, the only requirement is signatures using Scatter. Furthermore, exchanging of accounts and all other auction changes are done using decentralized EOS smart contract and Dome is the convenient user interface for these operations. Airdropped tokens to accounts that are already sold remain with the account sold.

The minimum price for opening a Sell auction is 1 EOS. Once an auction is concluded 2% of the price for which it was sold is transferred to Dome’s contract. In other words, the seller pays the auction fee. Setting up the auction, updating it, and cancelling it is free.

Make sure that, as an account seller, you have full access to the EOS account that would receive the EOS for which the account is sold or alter the state of the auction. You will be notified by mail regarding the changes in the state of your auctions. All accounts that are listed on auction are being screened in order to determine that they are safe. In other words, we will attempt to reduce the probability of deferred transactions undoing sale of an account. Nonetheless, the buyer has to check the history of the account for any pending actions.
`,
  },
  {
    title: 'Updates',
    content: 'The Dome House Rules will be greatly expanded in the following months by including user-activated Buy auctions, Over-the-Counter deals, custom dome duration, and more. Therefore, to remain fully informed visit this section on a regular basis.',
  },

]

export const HouseRulesPane = () =>
  <Layout>
    {
      rules.map( (rule, index) =>
        <div className={'section'} key={index} >
          <div className={'title'}><span>{rule.title}</span></div>
          <div className={'text'}><span>{rule.content}</span></div>
        </div>,
      )
    }
  </Layout>
