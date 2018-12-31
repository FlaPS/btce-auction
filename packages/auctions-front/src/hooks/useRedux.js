// Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
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
import { createContext, useContext, useEffect, useRef, useState, } from 'react';
import shallowEqual from './shallowEqual';
var Context = createContext(null);
export var StoreProvider = Context.Provider;
/**
 * Your passed in mapState function should be memoized to avoid
 * resubscribing every render. If you use other props in mapState, use
 * useCallback to memoize the resulting function, otherwise define the mapState
 * function outside of the component:
 *
 * const mapState = useCallback(
 *   state => state.todos.get(id),
 *   // The second parameter to useCallback tells you
 *   [id],
 * );
 * const todo = useMappedState(mapState);
 */
export function useMappedState(mapState) {
    var store = useContext(Context);
    if (!store) {
        throw new Error('redux-react-hooks requires your Redux store to be passed through context via the <StoreProvider>');
    }
    var runMapState = function () { return mapState(store.getState()); };
    var _a = __read(useState(function () { return runMapState(); }), 2), mappedState = _a[0], setMappedState = _a[1];
    // If the store or mapState change, rerun mapState
    var _b = __read(useState(store), 2), prevStore = _b[0], setPrevStore = _b[1];
    var _c = __read(useState(function () { return mapState; }), 2), prevMapState = _c[0], setPrevMapState = _c[1];
    if (prevStore !== store || prevMapState !== mapState) {
        setPrevStore(store);
        setPrevMapState(function () { return mapState; });
        setMappedState(runMapState());
    }
    // We use a ref to store the last result of mapState in local component
    // state. This way we can compare with the previous version to know if
    // the component should re-render. Otherwise, we'd have pass mappedState
    // in the array of memoization paramaters to the second useEffect below,
    // which would cause it to unsubscribe and resubscribe from Redux everytime
    // the state changes.
    var lastRenderedMappedState = useRef(null);
    // Set the last mapped state after rendering.
    useEffect(function () {
        lastRenderedMappedState.current = mappedState;
    });
    useEffect(function () {
        // Run the mapState callback and if the result has changed, make the
        // component re-render with the new state.
        var checkForUpdates = function () {
            var newMappedState = runMapState();
            if (!shallowEqual(newMappedState, lastRenderedMappedState.current)) {
                setMappedState(newMappedState);
            }
        };
        // Pull data from the store on first render.
        checkForUpdates();
        // Subscribe to the store to be notified of subsequent changes.
        var unsubscribe = store.subscribe(checkForUpdates);
        // The return value of useEffect will be called when unmounting, so
        // we use it to unsubscribe from the store.
        return unsubscribe;
    }, [store, mapState]);
    return mappedState;
}
export function useDispatch() {
    var store = useContext(Context);
    if (!store) {
        throw new Error('redux-react-hooks requires your Redux store to be passed through context via the <StoreProvider>');
    }
    return store.dispatch;
}
//# sourceMappingURL=useRedux.js.map