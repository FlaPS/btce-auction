import React from 'react'
import styled, {layouts} from '../../styles'
import TextAreaInput, {TextAreaProps} from './TextAreaInput'
import {Div} from '@sha/react-fp/src'

const makeShadow = value =>
    value
    // .replace('&', '&amp')
    // .replace('<', '&lt')
    // .replace('>', '&gt')
    // .replace('"', '&quot')
        .replace(/\r?\n/g, '<br/>')
        .replace(/\s\s/g, ' &nbsp;')

const TextAreaAutosizeInput = React.forwardRef((props: TextAreaProps, ref: any) => {
        const textArea = React.useRef(null)
        const divRef = React.useRef(null)

        React.useLayoutEffect(() => {
            if (textArea.current) {
                divRef.current.innerHTML = makeShadow(textArea.current.innerHTML)
            }
        })

        React.useEffect(
            () => {
                ref.current = textArea.current
            },
        )

        return (
            <Layout>
                <div ref={divRef} className={'shadow'}/>
                <TextAreaInput autoFocus {...props} ref={textArea}/>
            </Layout>
        )
    }
)

const Layout = styled(Div)`
  position: relative;
  width: 100%;
  height: 100%;

  .shadow {
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    color: transparent;
    opacity: 0;
    height: auto;
    z-index: -100;
    ${layouts.autoSizeText}
  }

  textarea {
    opacity: 1;
    position: absolute;
    top: 0px;
    overflow-y: hidden;
  }
`

export default TextAreaAutosizeInput
