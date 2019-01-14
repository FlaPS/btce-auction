import React from 'react'
import { styled } from '../../styles'
import { ExtractProps } from '@sha/react-fp'


const Layout = styled.div`
  width: 100%;
  height: 100%;
  
`

type SpinnerProps =
  & ExtractProps<typeof Layout>
  & {
    loading?: boolean
  }

export const Spinner = ({loading, ...props}: SpinnerProps) =>
  <Layout {...props}>
    <div className='spinner'>
      <div className='double-bounce1'></div>
      <div className='double-bounce2'></div>
    </div>
  </Layout>
