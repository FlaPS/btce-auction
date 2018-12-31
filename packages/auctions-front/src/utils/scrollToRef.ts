import ReactDOM from 'react-dom'

const scroll = (x, y, opts) => window.scrollTo(x, y)

function calculateScrollOffset(element, offset, alignment) {
    const body = document.body
    const html = document.documentElement
    const elementRect = element.getBoundingClientRect()
    const clientHeight = html.clientHeight
    const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
    )
    offset = offset || 0 // additional offset to top
    let scrollPosition
    switch (alignment) {
        case 'top':
            scrollPosition = elementRect.top
            break
        case 'middle':
            scrollPosition =
                elementRect.bottom - clientHeight / 2 - elementRect.height / 2
            break
        case 'bottom':
            scrollPosition = elementRect.bottom - clientHeight
            break
        // defaul to middle
        default:
            scrollPosition =
                elementRect.bottom - clientHeight / 2 - elementRect.height / 2
            break
    }
    const maxScrollPosition = documentHeight - clientHeight
    return Math.min(
        scrollPosition + offset + window.pageYOffset,
        maxScrollPosition,
    )
}

export default function (ref, options: any = {}) {
    options = options || {
        offset: 0,
        align: 'top',
    }

    const element = ReactDOM.findDOMNode(ref)
    if (element === null) return 0
    return scroll(
        0,
        calculateScrollOffset(element, options.offset, options.align),
        options,
    )
}
