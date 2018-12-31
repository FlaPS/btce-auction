import React from 'react'
import styled from '../../styles'
import {Button, ExtractProps} from '@sha/react-fp/src'

const CardBase = styled(Button)`

  width: var(--card-width);
  height: var(--card-height);
  padding: 0 0;
  float: left;

  --rollover-bg-color: #ffffff;

  word-break: break-word;
  border: 1px dashed #cfcfcf;
  margin-right: -1px;
  margin-bottom: -1px;
  text-align: inherit;
  overflow: visible;
  background: transparent;

  color: inherit;
  font: inherit;

  box-sizing: border-box;
  position: relative;
  /* Normalize \\\\\\\`line-height\\\\\\\`. Cannot be changed from \\\\\\\`normal\\\\\\\` in Firefox 4+. */
  line-height: normal;

  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  * {
    pointer-events: none;
  }
  cursor: pointer;



  @media (hover) {
    .animated {
        position: absolute;
        left: 0em;
        top: 0em;
        width: 100%;
        height: 100%;
        transition: all 0.1s ease;
        background-color: rgba(255, 255, 255, 0);
    }
    &:hover,
    &:focus {
      outline: 0;
      z-index: 1000;
      .animated {
        box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.49);
        transform: scale(1.1, 1.1);
        background-color: var(--rollover-bg-color);
      }
    }
  }


`

export default ({children, ...props}: ExtractProps<typeof CardBase>) =>
    <CardBase {...props}>
        <div className='animated'/>

        {children}
    </CardBase>
