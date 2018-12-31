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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { actionCreatorFactory } from '@sha/fsa';
import * as random from '@sha/random';
import { DAY_MILIS, now } from '@sha/utils';
import { times, update } from 'ramda';
var factory = actionCreatorFactory('auction');
var names = ['max', 'while', 'a', 'xxx', 'btc', 'rus', 'aaa', '1', '2', 'best', 'noname', 'plus'];
var getAuctionRow = function (index) {
    return ({
        id: index,
        name: names[index],
        suffix: 'eosio',
        ask: Number((Math.random() * 100).toFixed(2)),
        bestBid: Math.random() > 0.4 ? Number(((Math.random() * 200) + 100).toFixed(2)) : 0,
        bestBidPercent: (Math.random() * 100).toFixed(2),
        timeRemaining: Math.random() * DAY_MILIS * 20,
        dislikes: random.randomNatural(200),
        publishedOn: random.faker.date.recent(10).getTime(),
        message: random.faker.lorem.words(random.randomNatural(15)),
    });
};
export var defaultSellModel = function () { return ({
    ask: '',
    name: '',
    receivingAccount: '',
    email: '',
    auctionPeriod: '',
    message: '',
}); };
export var defaultPlaceBidModel = function () { return ({
    bidAmount: '',
    EOSAccountName: '',
}); };
var actions = {
    placeBid: factory('placeBid'),
    submitSell: factory('sell'),
    fetchRecentAuctions: factory.async('fetchUsers'),
};
var populate = function (totalAuctionsLength, myBidsQuant, sells) {
    if (totalAuctionsLength === void 0) { totalAuctionsLength = 10; }
    if (myBidsQuant === void 0) { myBidsQuant = 3; }
    if (sells === void 0) { sells = 2; }
    var auctions = times(getAuctionRow)(totalAuctionsLength);
    var myBiddingAuctions = random.takeRandomElements(auctions, myBidsQuant, myBidsQuant);
    var myBids = myBiddingAuctions.map(function (a) { return ({
        auctionId: a.id,
        bidAmount: Number((Math.random() * (Number(a.bestBid) - Number(a.ask)) + Number(a.ask)).toFixed(2))
    }); });
    var mySells = random.takeRandomElements(auctions, sells, sells).map(function (a) { return a.id; });
    var auctionEOS = Math.floor(myBids.reduce(function (a, b) { return a + b.bidAmount; }, 0) * 100) / 100;
    return {
        auctions: auctions,
        myBids: myBids,
        mySells: mySells,
        scatter: {
            usdMultiplier: 1.8,
            freeEOS: auctionEOS + 592.23,
            auctionEOS: auctionEOS,
        },
    };
};
var reducer = function (state, action) {
    if (state === void 0) { state = populate(); }
    if (actions.submitSell.isType(action)) {
        var newAuction = __assign({}, action.payload, { id: state.auctions.length, suffix: 'eosio', publishedOn: now() });
        return {
            auctions: __spread([newAuction], state.auctions),
            myBids: state.myBids,
            mySells: __spread([newAuction.id], state.mySells),
            scatter: state.scatter,
        };
    }
    if (actions.placeBid.isType(action)) {
        var _a = __read(action.payload.EOSAccountName.split('.'), 2), name_1 = _a[0], suffix_1 = _a[1];
        var prevAuction = state.auctions.find(function (a) { return a.name === name_1 && a.suffix === suffix_1; });
        var index = state.auctions.indexOf(prevAuction);
        var newAuction = __assign({}, prevAuction, { bestBid: action.payload.bidAmount });
        var auctionId = newAuction.id;
        return {
            auctions: update(index, newAuction, state.auctions),
            myBids: __spread(state.myBids, [{ auctionId: auctionId, bidAmount: action.payload.bidAmount }]),
            mySells: state.mySells,
            scatter: __assign({}, state.scatter, { freeEOS: state.scatter.freeEOS - action.payload.bidAmount, auctionEOS: state.scatter.auctionEOS + action.payload.bidAmount }),
        };
    }
    return state;
};
export var auctionDuck = {
    actions: actions,
    reducer: reducer,
};
//# sourceMappingURL=auctionDuck.js.map