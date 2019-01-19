import React, { MouseEventHandler } from 'react'
import styled, { colors } from '../../styles'
import { ExtractProps } from '@sha/react-fp'

const Layout = styled.div`
  width: 100%;
  min-height: 25em;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background: #343434;
  border-radius: 0px 0px 0.6em 0.6em;
  div {
    font-family: Brandon Grotesque;
    line-height: 2.8em;
    font-size: 1.6em;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    
    color: #FFFFFF;
    
    .action {
      cursor: pointer;
      color: ${colors.accent}
    }
  }
`

type EmptyRowsProps =
  & ExtractProps<typeof Layout>
  & {
    text: string
    actionText?: string
    onActionClick?: React.MouseEventHandler<HTMLSpanElement>
  }

export const EmptyRows = ({text, actionText, onActionClick, ...props}: EmptyRowsProps ) =>
  <Layout>
    <div>
      <span>
        {text}
      </span>
      {
        actionText &&
          <span
            className={'action'}
            onClick={onActionClick}
          >
            {actionText}
          </span>
      }
    </div>
  </Layout>
