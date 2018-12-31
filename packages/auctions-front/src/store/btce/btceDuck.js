import { combineReducers } from 'redux';
import { auctionDuck } from './auctionDuck';
var reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    return state;
};
export var btceDuck = {
    reducer: combineReducers({
        auction: auctionDuck.reducer,
    }),
};
//# sourceMappingURL=btceDuck.js.map