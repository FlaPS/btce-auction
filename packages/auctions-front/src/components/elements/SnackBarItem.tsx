import React from 'react'
import styled, { colors, SVGLibrary } from '../../styles'
import { ExtractProps } from '@sha/react-fp'
import { Font12 } from '../../styles/Spans'
import { GoldButtonCell } from '../table/GoldButtonCell'


const Layout = styled.div`

  .main {
    background: #191919;
    border: 1px solid #616161;
    min-height: 4.0em;
    box-sizing: border-box;
    border-radius: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: white;
    align-items: center;

    width: fit-content;
    padding-left: 1.8em;

    svg {
      margin-right: 0.7em;
    }
    .icon {
      min-height: 3em;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 2em;
      padding-right: 1.2em;
      cursor: pointer;
    }
    .icon:hover {
      color: ${colors.accent};
    }
  }

  .warning {
    background-color: #E91D1D;
    border: none;
  }

  .success {
    background-color: #0E9C1C;
    border: none;
  }
`

export type SnackBarItemProps =

  & {
    guid: string
    text: string
    onDismiss?: (guid: string) => any
    onActionClick?: (guid: string) => any
    actionText?: string
    type?: 'info' | 'warning' | 'success'
  }

const SnackActionButton = styled.div`

  cursor: pointer;
  border: 0.1em solid white;
  box-sizing: border-box;
  border-radius: 0.4em;
  height: 2.4em;
  padding-left: 1.6em;
  padding-right: 1.6em;
  display: flex;
  align-items: center;
  margin-left: 2em;

  &:hover {
    color: ${colors.accent};
    border: 0.1em solid  ${colors.accent};
  }
`

const Icons = {
  info: SVGLibrary.InfoSnackIcon,
  warning: SVGLibrary.ErrorSnackIcon,
  success: SVGLibrary.SuccessSnackIcon,
}


const SnackBarItemRaw = ({
   text,
   guid,
   onDismiss,
   onActionClick,
   actionText,
   type = 'info',
   ...props}: SnackBarItemProps) =>
  <Layout>

    <div className={'main ' + type}>
      {React.createElement(Icons[type])}
      <Font12 className={'text'}>{text}</Font12>
      {
        actionText &&
        <SnackActionButton
          onClick={() => onActionClick && onActionClick(guid)}
        >
          <Font12>
            {actionText}
          </Font12>
        </SnackActionButton>
      }
      <div         className={'icon'}>
          <SVGLibrary.CloseIcon
            onClick={() => {
                if (onDismiss)
                  onDismiss(guid)
              }
            }

          />
      </div>
    </div>

  </Layout>

export const SnackBarItem = React.memo(SnackBarItemRaw)
