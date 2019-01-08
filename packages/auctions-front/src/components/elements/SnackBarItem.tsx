import React from 'react'
import styled, { colors, SVGLibrary } from '../../styles'
import { ExtractProps } from '@sha/react-fp'
import { Font12 } from '../../styles/Spans'
import { GoldButtonCell } from '../table/GoldButtonCell'


const Layout = styled.div`
  background: #191919;
  border: 0.1em solid #585858;
  box-sizing: border-box;
  border-radius: 0.5em;
  display: flex;
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .text {
      color: white;
    }

    .icon {
      color: #585858;
    }
  }
`

export type SnackBarItemProps =
  & ExtractProps<typeof Layout>
  & {
    guid: string
    text: string
    onDismiss?: (guid: string) => any
    onActionClick?: (guid: string) => any
    actionText?: string
  }

const GoldButton = styled.div`
  cursor: pointer;
  background: #191919;
  border: 0.1em solid #FFAE00;
  box-sizing: border-box;
  border-radius: 0.5em;
  color: ${colors.accent};
`

const SnackBarItemRaw = ({text, guid, onDismiss, onActionClick, actionText, ...props}: SnackBarItemProps) =>
  <Layout>
    <div className={'main'}>
      <Font12 className={'text'}>{text}</Font12>
      <SVGLibrary.CloseIcon
        onClick={() => onDismiss && onDismiss(guid)}
        className={'icon'}
      />
    </div>
    {
      actionText &&
      <GoldButton
        onClick={() => onActionClick && onActionClick(guid)}
      >
        <Font12>
          {actionText}
        </Font12>
      </GoldButton>
    }
  </Layout>

export const SnackBarItem = React.memo(SnackBarItemRaw)
