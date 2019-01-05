import React from 'react'
import { compose, constant } from 'lazy-compose'
import { colors, styled } from '../../styles'
import { InputProps } from '../inputs/helpers'
import { useWithValue } from '../../hooks'

const Layout = styled.div`
  font-family: 'Brandon Grotesque';
  box-sizing: border-box;
  display: flex;
  user-select: none;

  div {
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 3.3em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    text-decoration: underline;
    label {
      pointer-events: none;
      font-size: 1.2em;
    }
  }
  
  .splitter {
      display: block;
      background-color: #434343;
      width: 0.1em;
      opacity: 0.75;
  }
  
  .active {
      color: ${colors.regular};
      opacity: 1;
      text-decoration: none;
  }
`

const FooterTabsRaw = ({value, onValueChange, data, ...props}: InputProps<number, string>) =>
  <Layout >
    {
      data.map((item, index) =>
          [
            <div
              key={index}
              className={(index === value ? 'active' : 'inactive')}
              onClick={compose(onValueChange, constant(index))}
            >
              <label>{item}</label>
            </div>,
            <span className={'splitter'} key={'splitter' + index}/>,
          ]
        ,

      )}
  </Layout>

export const FooterTabs = useWithValue(0)(FooterTabsRaw)
