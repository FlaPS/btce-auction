import React from 'react'
import {createPortal} from 'react-dom'
import {useMount, useUnmount} from '../../hooks/'

export default (props: { children }) => {
    const el = React.useRef(divFactory())
    useMount(() => {
        document.getElementById('root').setAttribute('class', 'no-click')
        document.body.appendChild(el.current)
    })

    useUnmount(() => {
        document.getElementById('root').removeAttribute('class')
        document.body.removeChild(el.current)
    })

    return createPortal(props.children, el.current)
}

const divFactory = () => {
    const el = document.createElement('div')
    el.setAttribute('class', 'modal')
    return el
}
