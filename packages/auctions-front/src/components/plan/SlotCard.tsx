import React from 'react'
import styled, {fontSize, SVGLibrary} from '../../styles'
import {ExtractProps} from '@sha/react-fp'
import dateFormat from '../../utils/dateFormat'
import CardBase from './CardBase'


const SlotCard = ({timestamp, label, type, ...props}: SlotProps) => (
    <Layout {...props}>
        <div className={'cover'}>
            {timestamp && (
                <SuggestedTime>
                    {type === 'slot' && dateFormat.format(timestamp)}
                </SuggestedTime>
            )}
            <Label>{label}</Label>
            <SVGLibrary.Plus/>
        </div>
    </Layout>
)

const Label = styled.div`
  display: flex;
  padding-bottom: 0.7em;
  max-width: 8em;
  justify-content: space-between;
  align-items: center;
  ${fontSize.regular}
`

const SuggestedTime = styled.b`
  line-height: 2.1em;
  ${fontSize.regular}
`

export const Layout = styled(CardBase)`

  .cover {
    @media (max-width: 420px) {
        font-size: 1.4em;
    }
    top: 0px;
    left: 0px;
    position: absolute;
    padding: 1.2rem 1.1rem 2.2rem 1.5em;
    z-index: 100;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
  
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    line-height: 2em;
    align-items: center;

  }
`

type SlotProps = ExtractProps<typeof Layout> & {
    timestamp?: number
    label: string
    type?: 'new' | 'slot'
}

export default React.memo(SlotCard)
