var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
        title: 'my ask',
        dataIndex: 'ask',
        width: '12em',
    },
    {
        title: 'best bid',
        dataIndex: 'bestBid',
        width: 'calc((100% - 43em)/ 2',
    },
    {
        title: 'best bid%',
        dataIndex: 'bestBidPercent',
        width: 'calc((100% - 43em)/ 2',
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
var selectAuctionsWithMySells = function (state) {
    var mySells = state.app.auction.mySells;
    var auctions = state.app.auction.auctions.filter(function (item) {
        return mySells.find(function (id) { return id === item.id; });
    });
    return auctions;
};
export var MySells = function () {
    var data = useMappedState(selectAuctionsWithMySells);
    return React.createElement(Table, { columns: columns, data: data });
};
var templateObject_1;
//# sourceMappingURL=MySells.js.map