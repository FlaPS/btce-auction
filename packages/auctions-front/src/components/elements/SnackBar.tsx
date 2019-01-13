import React from 'react'
import styled from '../../styles'
import { FactoryAnyAction } from '@sha/fsa'
import { SnackBarItem, SnackBarItemProps } from './SnackBarItem'
import { compose, constant } from 'lazy-compose'
import { useDispatch, useMappedState } from '../../hooks'


const Layout = styled.div`
  position: static;
  height: 100vh;
  padding-left: 3.0em;
  padding-bottom: 7.0em;
  display: flex;
  flex-direction: column-reverse;
  div + div {
    margin-top: 3em;
  }
`

type SnackBarDataItem = SnackBarItemProps & {
  action: FactoryAnyAction
}

type SnackBarProps = {
  data: SnackBarDataItem[]
  dispatch: (action: FactoryAnyAction) => any
}

const SnackBarRaw = ({data}: SnackBarProps) => {
  const dispatch = useDispatch()
  const data = useMappedState()
  return (
    <Layout>
      {
        data.map(
          ({action, ...item}) =>
            <SnackBarItem
              {...item}
              key={item.guid}
              onActionClick={
                action ? compose(dispatch, constant(action)) : undefined
              }
            />,
        )
      }
    </Layout>
  )
}

export const SnackBar = SnackBarRaw
