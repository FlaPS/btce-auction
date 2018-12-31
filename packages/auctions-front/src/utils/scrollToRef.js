import ReactDOM from 'react-dom';
var scroll = function (x, y, opts) { return window.scrollTo(x, y); };
function calculateScrollOffset(element, offset, alignment) {
    var body = document.body;
    var html = document.documentElement;
    var elementRect = element.getBoundingClientRect();
    var clientHeight = html.clientHeight;
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    offset = offset || 0; // additional offset to top
    var scrollPosition;
    switch (alignment) {
        case 'top':
            scrollPosition = elementRect.top;
            break;
        case 'middle':
            scrollPosition =
                elementRect.bottom - clientHeight / 2 - elementRect.height / 2;
            break;
        case 'bottom':
            scrollPosition = elementRect.bottom - clientHeight;
            break;
        // defaul to middle
        default:
            scrollPosition =
                elementRect.bottom - clientHeight / 2 - elementRect.height / 2;
            break;
    }
    var maxScrollPosition = documentHeight - clientHeight;
    return Math.min(scrollPosition + offset + window.pageYOffset, maxScrollPosition);
}
export default function (ref, options) {
    if (options === void 0) { options = {}; }
    options = options || {
        offset: 0,
        align: 'top',
    };
    var element = ReactDOM.findDOMNode(ref);
    if (element === null)
        return 0;
    return scroll(0, calculateScrollOffset(element, options.offset, options.align), options);
}
//# sourceMappingURL=scrollToRef.js.map