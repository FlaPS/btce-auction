import React from 'react'
import styled, { colors } from '../../styles'
import { ExtractProps } from '@sha/react-fp'


const Layout = styled.div`
  border: 0.1em solid ${colors.accent};
  box-sizing: border-box;
  border-radius: 0.3em;
  min-width: 8.2em;
  margin-right: 1.8em;
  
  height: 2.9em;
  cursor: pointer;
  display: flex;
  div {
    margin: auto;
    font-family: 'Brandon Grotesque';
    font-size: 1.3em;
    text-transform: uppercase;
    font-weight: 800;
    color: #F7A900;
  }
`
export const GoldButtonCell = ({label, ...props}: ExtractProps<typeof Layout> & {label: string}) =>
  <Layout {...props}>
    <div>{label}</div>
  </Layout>
