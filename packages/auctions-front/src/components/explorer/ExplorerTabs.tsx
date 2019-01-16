import React from 'react'
import { compose, constant } from 'lazy-compose'
import { colors, styled } from '../../styles'
import { InputProps } from '../inputs/helpers'
import { useWithValue } from '../../hooks'

const Layout = styled.div`
  font-family: 'Brandon Grotesque';
  width: 100%;
  box-sizing: border-box;
  display: flex;
  user-select: none;

  div {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #5a5a5a;
    height: 5.1em;
    padding-left: 1em;
    padding-right: 1em;
    margin-left: -0.1em;
    margin-right: -0.1em
    label {
      pointer-events: none;
      font-size: 1.4em;
      font-weight: 900;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }
  
  .splitter {
      display: block;
      background-color: #434343;
      width: 0.1em;
      height: 3.0em;
      margin-top: 1em;
      opacity: 0.75;
  }
  
  .active {
      height: 5.1em;
      border-radius: 0.8em 0.8em 0 0;
      background-color: #191919;
      color: ${colors.accent};
  }
`

const ExplorerTabsRaw = ({value, onValueChange, data, ...props}: InputProps<number, string>) =>
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
            (index !== data.length - 1) && <span className={'splitter'} key={'splitter' + index}/>,
          ]
       ,

      )}
  </Layout>

export const ExplorerTabs = useWithValue(0)(ExplorerTabsRaw)
