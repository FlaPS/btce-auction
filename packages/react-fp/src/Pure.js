var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
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
import * as React from 'react';
import { map } from 'ramda';
import { concatR } from './fp/fp';
import * as ReactDOM from 'react-dom';
import { withProps, defaultProps } from 'recompose';
import { mergeDeepRight } from 'ramda';
import { connect } from 'react-redux';
// type PReducer<S, P> = (state:S, p:P) => S
export var messageFactory = function (type) {
    return function (payload) {
        return ({ type: type, payload: payload });
    };
};
export var getStateActions = function () {
    return ({
        setState: messageFactory('setState'),
    });
};
/**
 * Pure container Component
 * Acceps a childern element as a React.SFC - to render
 * one after state updates and expose some additional props
 * P - props
 * M - Inside actions will be exposed as effects too
 * E - effects, only external actions
 * S - inner state to forward one into child renderer,
 * you can infer all properties in (props) => element children component
 */
export var Pure = function (messages, effects, update, resolvers, ctx, components, hoc, stateMappers) {
    if (update === void 0) { update = function (_) { return _; }; }
    if (resolvers === void 0) { resolvers = []; }
    if (ctx === void 0) { ctx = {}; }
    if (components === void 0) { components = []; }
    if (hoc === void 0) { hoc = undefined; }
    if (stateMappers === void 0) { stateMappers = []; }
    messages = messages || {};
    effects = effects || {};
    var Comp = /** @class */ (function (_super) {
        __extends(PureContainer, _super);
        function PureContainer(props) {
            var _this = _super.call(this, props) || this;
            _this.signal = function (action) {
                _this.currentState = update(_this.currentState, action);
                _this.setState(_this.currentState);
                // this.ioListeners.forEach(listener => listener(action))
                // console.log('set state to ', this.currentState)
                if (_this.props[action.type])
                    _this.props[action.type](action.payload);
                resolvers
                    // @ts-ignore
                    .map(function (r) { return r(effects, _this.state, _this.currentState); })
                    .filter(function (e) { return e !== undefined; })
                    .forEach(function (e) { return _this.props[e.type] && _this.props[e.type](e.payload); });
            };
            _this.pureRefs = {};
            _this.makeRef = function (name) { return function (element) {
                var domElement = ReactDOM.findDOMNode(element);
                if (_this.pureRefs[name] !== domElement)
                    _this.pureRefs[name] = domElement;
            }; };
            // @ts-ignore
            _this.bindedActions = map(function (action) { return function (payload) { return _this.signal(action(payload)); }; }, messages);
            _this.setStateSignal = function (value) { return _this.signal({ type: 'setState', payload: value }); };
            var init = props.init, children = props.children, exposeToState = __rest(props, ["init", "children"]);
            _this.currentState = _this.state = exposeToState;
            return _this;
        }
        PureContainer.prototype.componentDidMount = function () {
            this.currentState = update(this.state, { type: 'init', payload: {} });
            this.signal({ type: 'init' });
        };
        PureContainer.prototype.componentWillReceiveProps = function (next) {
            var init = next.init, children = next.children, exposeToState = __rest(next, ["init", "children"]);
            this.currentState = update(this.currentState, { type: 'nextProps', payload: { props: exposeToState, next: next } });
            this.currentState = mergeDeepRight(this.currentState, exposeToState);
            // console.log('recieve props and set state to ', this.currentState)
            this.setState(this.currentState);
        };
        PureContainer.prototype.render = function () {
            // @ts-ignore
            var _a = this.props, children = _a.children, props = __rest(_a, ["children"]);
            var outProps = Object.assign({
                // dispatch: getFrontendStore().dispatch,
                makeRef: this.makeRef,
                pureRefs: this.pureRefs,
                setState: this.setStateSignal,
            }, this.state, this.bindedActions);
            var child = children;
            child = components.reduceRight(function (p, c) {
                // @ts-ignore
                return withProps({ children: p })(c);
            }, child);
            return child && child(outProps, this.context);
        };
        return PureContainer;
    }(React.Component));
    if (hoc)
        // @ts-ignore
        Comp = hoc(Comp);
    if (stateMappers.length)
        Comp = connect(function (state, props) {
            return Object.assign.apply(Object, __spread([{}], stateMappers.map(function (f) { return f(state, props); })));
        })(Comp);
    var value = {
        messages: messages,
        effects: effects,
        update: update,
        resolvers: resolvers,
        ctx: ctx,
        components: components,
        hoc: hoc,
        stateMappers: stateMappers,
    };
    var Props = {};
    return Object.assign(Comp, value, {
        Props: Props,
        of: function (comp) {
            return Pure(messages, effects, update, resolvers, ctx, [comp], hoc, stateMappers);
        },
        ap: function (component) {
            return Pure(messages, effects, update, resolvers, ctx, components.concat([component]), hoc, stateMappers);
        },
        recieveProps: function (nextPropsReciever) {
            return Pure(messages, effects, concatR(update, function (state, action) {
                if (action.type === 'nextProps') {
                    return Object.assign({}, state, nextPropsReciever(state, action.payload.props, action.payload.next));
                }
                return state;
            }), resolvers, ctx, components, hoc, stateMappers);
        },
        contramap: function (component) {
            return Pure(messages, effects, update, resolvers, ctx, [component].concat(components), hoc, stateMappers);
        },
        valueOf: function () { return value; },
        /**
         * Expose a messages for child component
         * @param {Msg}  the object with handlers to expose
         */
        addMsg: function (m) {
            return Pure(Object.assign({}, messages, m), Object.assign({}, effects, m), update, resolvers, ctx, components, hoc, stateMappers);
        },
        addReducer: function (reducer) {
            return Pure(messages, effects, concatR(update, reducer), resolvers, ctx, components, hoc, stateMappers);
        },
        addEff: function (e) {
            return Pure(Object.assign({}, messages, e), Object.assign({}, effects, e), update, resolvers, ctx, components, hoc, stateMappers);
        },
        addResolver: function (resolver) {
            return Pure(messages, effects, update, resolvers.concat([resolver]), ctx, components, hoc, stateMappers);
        },
        concat: function (nextPure) {
            return Pure(Object.assign({}, messages, nextPure.messages), Object.assign({}, effects, nextPure.effects), concatR(nextPure.update, update), 
            // @ts-ignore
            [].concat(resolvers, nextPure.resolvers), ctx, components, hoc, stateMappers.concat(nextPure.stateMappers));
        },
        connect: function (mapper) {
            return Pure(messages, effects, update, resolvers, ctx, components, hoc, mapper ? stateMappers.concat([mapper]) : stateMappers);
        },
        addProps: function (props) {
            return Pure(messages, effects, update, resolvers, ctx, components, 
            // @ts-ignore
            defaultProps(props), stateMappers);
        },
        defaultProps: function (props) {
            return Pure(messages, effects, update, resolvers, ctx, components, 
            // @ts-ignore
            defaultProps(props), stateMappers);
        },
        addState: function (defaultState) {
            return Pure(messages, effects, update, resolvers, ctx, components, hoc, stateMappers)
                .addMsg(getStateActions())
                .addReducer(function (state, action) {
                return action.type === 'setState'
                    ? Object.assign({}, state, action.payload)
                    : state;
            });
        },
    });
};
//# sourceMappingURL=Pure.js.map