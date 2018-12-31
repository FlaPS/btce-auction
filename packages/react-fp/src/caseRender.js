var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import * as R from 'ramda';
import { default as renderChildren } from './renderChildren';
var hasDisplayName = function (value) {
    return value !== undefined && value !== null && value['displayName'] !== undefined;
};
/**
 *
 * @param {"react".ComponentType<P>} Test to render in case of no match
 * @param {Array<Pattern<Partial<P>>>} patterns
 * @returns Wrapped component with conditional rendering
 */
function caseRender(Test, patterns) {
    if (patterns === void 0) { patterns = []; }
    if (!patterns.length)
        patterns = [{ matcher: R.T, Comp: Test }];
    var matchPredicate = function (predicate, component) {
        return caseRender(Test, __spread(patterns, [{
                matcher: predicate,
                Comp: component,
            },]));
    };
    var matchProps = function (props, component) {
        return matchPredicate(R.whereEq(props), component);
    };
    var match = function (cond, component) {
        return typeof cond === 'function'
            ? matchPredicate(cond, component)
            : matchProps(cond, component);
    };
    var isNil = function (property, component) {
        return caseRender(Test, __spread(patterns, [
            {
                matcher: function (p) { return R.isNil(p[property]); },
                Comp: component,
            },
        ]));
    };
    var isEmpty = function (property, component) {
        return match(function (p) { return R.isEmpty(p[property]); }, component);
    };
    var isNilOrEmpty = function (property, component) {
        return caseRender(Test, __spread(patterns, [{
                matcher: function (p) { return R.isEmpty(p[property]) || R.isNil(p[property]); },
                Comp: component,
            },]));
    };
    var Comp = (function (p, ctx) {
        for (var i = patterns.length - 1; i >= 0; i--)
            if (patterns[i].matcher(p))
                return renderChildren(patterns[i].Comp, p);
        return null;
    });
    Comp.displayName = Test
        ? 'CaseRender(' + hasDisplayName(Test) ? Test['displayName'] : 'Renderable' + ')'
        : 'CaseRender';
    return Object.assign(Comp, {
        match: match,
        isNil: isNil,
        isEmpty: isEmpty,
        isNilOrEmpty: isNilOrEmpty,
    });
}
export default caseRender;
//# sourceMappingURL=caseRender.js.map