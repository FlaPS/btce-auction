import React from 'react'
import styled from '../../styles'
import { FactoryAnyAction } from '@sha/fsa'
import { SnackBarItem, SnackBarItemProps } from './SnackBarItem'
import { compose, constant } from 'lazy-compose'
import { useDispatch, useMappedState } from '../../hooks'
import { snackBarDuck } from '../../store/btce/ui/snackBarDuck'


const Layout = styled.div`
  position: fixed;
  z-index: 1000;
  left: 3.0em;
  bottom: 2.0em;
  display: flex;
  flex-direction: column-reverse;
`

type SnackBarDataItem = SnackBarItemProps & {
  action: FactoryAnyAction
}

type SnackBarProps = {
  data: SnackBarDataItem[]
  dispatch: (action: FactoryAnyAction) => any
}

type DataItem = ReturnType<typeof snackBarDuck.actions.push>

const SnackBarRaw = () => {
  const dispatch = useDispatch()
  const data: DataItem[] = useMappedState(snackBarDuck.selector)
  return (
    <Layout>
      {
        data.map(
          (action: DataItem) =>
            <SnackBarItem
              text={action.payload.text}
              type={action.payload.type}
              actionText={action.payload.actionText}
              key={action.guid}
              guid={action.guid}
              onDismiss={() =>
                dispatch(snackBarDuck.actions.dismiss(action.guid))
              }
              onActionClick={
                () => dispatch(snackBarDuck.actions.resolve(action.guid))
              }
            />,
        )
      }
    </Layout>
  )
}

export const SnackBar = SnackBarRaw
