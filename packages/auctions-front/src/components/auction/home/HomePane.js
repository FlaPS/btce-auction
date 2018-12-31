var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { now } from '@sha/utils';
import { Table } from '../../table/Table';
import { styled } from '../../../styles';
import moment from 'moment';
import { useMappedState } from '../../../hooks';
import { nav } from '../../../store';
import { history } from '../../../history';
var NameCell = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  cursor: pointer;\n  a {\n    font-size: 2.0em;\n    color: #FFAE00;\n  }\n"], ["\n  cursor: pointer;\n  a {\n    font-size: 2.0em;\n    color: #FFAE00;\n  }\n"])));
var columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '18em',
        render: function (value, record) {
            return React.createElement(NameCell, null,
                React.createElement("a", { onClick: function () { return history.push(nav.auctionBuyName({ fullName: record.name + '.' + record.suffix })); } }, record.name));
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
        title: 'best bid',
        dataIndex: 'bestBid',
        width: 'calc((100% - 40em)/ 2',
    },
    {
        title: 'best bid%',
        dataIndex: 'bestBidPercent',
        width: 'calc((100% - 40em)/ 2',
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
        title: 'dislikes',
        dataIndex: 'dislikes',
        width: '10em',
        render: function (value) {
            return React.createElement("div", { className: 'account-table_cell dislike' },
                React.createElement("span", { className: 'dislike-value' }, value),
                React.createElement("svg", { width: '15', height: '13', viewBox: '0 0 15 13', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                    React.createElement("path", { d: 'M13.9609 1.77343C14.3984 2.21093 14.6992 2.73046 14.8633 3.33203C15.0273 3.93359 15.0273 4.53515 14.918 5.13671C14.7812 5.73828 14.5352 6.28515 14.1523 6.75L8.35546 12.7383C8.24609 12.8477 8.10937 12.875 7.97265 12.875C7.83593 12.875 7.72656 12.8477 7.64453 12.7383L1.84765 6.75C1.46484 6.28515 1.1914 5.73828 1.08202 5.13671C0.945304 4.53515 0.972648 3.93359 1.13671 3.33203C1.30077 2.73046 1.60155 2.21093 2.03905 1.77343L2.12109 1.6914C2.72265 1.06249 3.48827 0.707024 4.36327 0.652337C5.23828 0.597649 6.05859 0.816399 6.76953 1.30859L7.5625 3.68749L4.93749 5.4375L8.875 9.375L7.5625 5.875L10.1875 4.125L9.25781 1.30859C9.96875 0.816399 10.7617 0.597649 11.6367 0.652337C12.5117 0.707024 13.25 1.06249 13.8789 1.6914L13.9609 1.77343Z' })));
        }
    },
    {
        title: 'published on',
        dataIndex: 'publishedOn',
        width: '15em',
        mapValue: function (value) { return moment(value).format('MMM DD, YYYY'); },
    },
];
var BodyLayout = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n   background-color: #191919;\n  border-radius: 0 0 6px 6px;\n\n\n"], ["\n   background-color: #191919;\n  border-radius: 0 0 6px 6px;\n\n\n"])));
var Value = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: 'Brandon Grotesque';\n  font-size: 1.3em;\n  letter-spacing: 0.7px;\n  text-transform: uppercase;\n  color: #FFFFFF;\n  white-space: nowrap;\n  padding-right: 4em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 20em;\n"], ["\n  font-family: 'Brandon Grotesque';\n  font-size: 1.3em;\n  letter-spacing: 0.7px;\n  text-transform: uppercase;\n  color: #FFFFFF;\n  white-space: nowrap;\n  padding-right: 4em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 20em;\n"])));
var Caption = styled(Value)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  opacity: 0.5;\n   padding-right: 0.5em;\n"], ["\n  opacity: 0.5;\n   padding-right: 0.5em;\n"])));
var ExpandedLayout = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 5.1em;\n  border-bottom: 0.1em solid #FFAF02;\n  display: flex;\n  align-items: center;\n  background-color:  #000000;\n"], ["\n  height: 5.1em;\n  border-bottom: 0.1em solid #FFAF02;\n  display: flex;\n  align-items: center;\n  background-color:  #000000;\n"])));
var selectRecentAuctions = function (state) { return state.app.auction.auctions; };
export var HomePane = function () {
    return (React.createElement("div", { className: 'main-tab__wrap' },
        React.createElement("div", { className: 'main-tab__head' },
            React.createElement("span", null, "Recent")),
        React.createElement(BodyLayout, null,
            React.createElement(Table, { data: useMappedState(selectRecentAuctions), columns: columns, expandedRowRender: function (record, index) {
                    return React.createElement(ExpandedLayout, null,
                        React.createElement(Caption, null, "Length"),
                        React.createElement(Value, null, record.name.length + record.suffix.length + 1),
                        React.createElement(Caption, null, "Number of bids"),
                        React.createElement(Value, null, "Unknown"),
                        React.createElement(Caption, null, "Time elapsed"),
                        React.createElement(Value, null, moment(now() - record.publishedOn).format('d h')),
                        record.message && [
                            React.createElement(Caption, null, "Message"),
                            React.createElement(Value, null, record.message),
                        ]);
                } }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=HomePane.js.map