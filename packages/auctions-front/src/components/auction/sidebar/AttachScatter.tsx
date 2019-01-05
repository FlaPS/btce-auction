import React from 'react'
import { styled } from '../../../styles'
import { scatterDuck } from '../../../store/btce/scatter/scatterDuck'
import { useDispatch } from '../../../hooks'

const Layout = styled.div`
  color: white;
  font-family: Muller;
  font-size: 2.0em;
`

export const AttachScatter = () => {
  const dispatch = useDispatch()
  return (<Layout
          onClick={() => dispatch(scatterDuck.actions.attach.started())}
        >
          Attach scatter
        </Layout>
  )
}
