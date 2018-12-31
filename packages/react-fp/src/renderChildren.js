import * as React from 'react';
import { omit } from 'ramda';
/**
 * Could forfard props for "Renderable"
 * Use case:
 * <Component value='1'>
 * {
 *     props =>
 *          props.value  // props forwarded and inferred by TypeScript here
 * }
 * </Component>
 * Accepts Renderable as parameter
 */
export default (function (children, props) {
    var omittedProps = props
        ? (children === props.children ? omit(['children'], props) : props)
        : {};
    return typeof children === 'function'
        ? React.createElement(children, omittedProps)
        : children;
});
//# sourceMappingURL=renderChildren.js.map