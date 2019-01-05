import { styled } from '../../styles'

export const Value = styled.div`
  font-family: 'Brandon Grotesque';
  font-size: 1.3em;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20em;
`

export const Caption = styled(Value)`
  opacity: 0.5;
  margin-left: 2em;
  margin-right: 0.3em;
`

export const ExpandedRowLayout = styled.div`

  padding-right: 2em;
  height: 5.1em;
  border-bottom: 0.1em solid #FFAF02;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:  #000000;
  
  div {
    display: flex;
  }
`

