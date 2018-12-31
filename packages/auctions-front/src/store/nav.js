var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { matchPath } from 'react-router';
import { trace } from '../../../utils/src';
import { LOCATION_CHANGE } from 'connected-react-router';
var makeRoute = function (pattern) {
    var creator = function (props) {
        if (props === void 0) { props = {}; }
        return Object
            .entries(props)
            .reduce(function (result, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return result.replace(':' + key, String(value));
        }, pattern);
    };
    var matchParams = function (path, options) {
        if (options === void 0) { options = { isExact: true }; }
        var result = matchPath(path, __assign({ path: pattern }, options));
        return result;
    };
    return Object.assign(creator, {
        match: matchParams,
        pattern: pattern,
        isType: function (action) {
            return action.type.includes(LOCATION_CHANGE) &&
                action.payload &&
                action.payload.location &&
                action.payload.location.pathname &&
                trace()(matchParams)(action.payload.location.pathname) !== null &&
                matchParams(action.payload.location.pathname).isExact === true;
        },
    });
};
export var isLocation = function (route) { return function (action) {
    return route
        ? route.isType(action)
        : action.type.includes(LOCATION_CHANGE);
}; };
export var push = function (route) { return function (params) {
    if (params === void 0) { params = {}; }
    return ({
        type: LOCATION_CHANGE,
        payload: {
            location: {
                pathname: route(params),
            },
            params: params,
            pattern: route.pattern,
            action: 'PUSH',
        },
    });
}; };
export var nav = {
    auctionHome: makeRoute('/auction/home'),
    auctionBuyName: makeRoute('/auction/buyName/:fullName'),
    auctionSellName: makeRoute('/auction/sellName'),
    auctionMyAuctions: makeRoute('/auction/myAuctions'),
    auctionMyAuctionsBids: makeRoute('/auction/myAuctions/bids'),
    auctionMyAuctionsSells: makeRoute('/auction/myAuctions/sells'),
    auctionHouseRules: makeRoute('/auction/houseRules'),
};
//# sourceMappingURL=nav.js.map