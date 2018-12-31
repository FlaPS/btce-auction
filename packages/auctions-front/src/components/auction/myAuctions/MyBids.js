var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import React from 'react';
import styled from '../../../styles';
import moment from '../home/HomePane';
import { useMappedState } from '../../../hooks';
import { Table } from '../../table/Table';
var NameCell = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n    font-size: 2.0em;\n    color: #FFAE00;\n  \n"], ["\n\n    font-size: 2.0em;\n    color: #FFAE00;\n  \n"])));
var columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '18em',
        render: function (value, record) {
            return React.createElement(NameCell, null, record.name);
        },
    },
    {
        title: 'suffix',
        dataIndex: 'suffix',
        width: '7em',
        mapValue: function (value) { return '.' + value; },
    },
    {
        title: 'ask',
        dataIndex: 'ask',
        width: '12em',
    },
    {
        title: 'my bid',
        dataIndex: 'bidAmount',
        width: 'calc((100% - 43em)/ 3',
    },
    {
        title: 'best bid',
        dataIndex: 'bestBid',
        width: 'calc((100% - 43em)/ 3',
    },
    {
        title: 'best bid%',
        dataIndex: 'bestBidPercent',
        width: 'calc((100% - 43em)/ 3',
        mapValue: function (value, record) {
            return (record.bestBid / record.ask * 100).toFixed(2) + '%';
        },
    },
    {
        title: 'time remaining',
        dataIndex: 'timeRemaining',
        width: '16em',
        mapValue: function (value) { return moment(value).format('d') + ' days'; },
    },
    {
        title: 'published on',
        dataIndex: 'publishedOn',
        width: '15em',
        mapValue: function (value) { return moment(value).format('MMM DD, YYYY'); },
    },
];
var selectAuctionsWithMyBids = function (state) {
    var myBids = state.app.auction.myBids;
    var auctions = state.app.auction.auctions.filter(function (item) {
        return myBids.find(function (bid) { return bid.auctionId === item.id; });
    });
    return auctions.map(function (item) { return (__assign({}, item, { bidAmount: myBids.find(function (bid) { return bid.auctionId === item.id; }).bidAmount })); });
};
export var MyBids = function () {
    var bids = useMappedState(selectAuctionsWithMyBids);
    return React.createElement(Table, { columns: columns, data: bids });
};
var templateObject_1;
//# sourceMappingURL=MyBids.js.map