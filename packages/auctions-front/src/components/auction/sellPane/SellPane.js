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
import React from 'react';
import { auctionDuck, defaultSellModel } from '../../../store/btce/auctionDuck';
import { useDispatch } from '../../../hooks';
var isValid = function (value) {
    return value !== undefined && String(value).trim().length > 0;
};
var isStateValid = function (state) {
    return isValid(state.ask) &&
        isValid(state.name) &&
        isValid(state.receivingAccount) &&
        isValid(state.email);
};
export var SellPane = function (props) {
    var _a = __read(React.useState(defaultSellModel()), 2), state = _a[0], setState = _a[1];
    var stateIsValid = isStateValid(state);
    var bindField = function (field) { return function (state) {
        return ({
            value: state[field],
            onChange: function (event) {
                var _a;
                return setState(__assign({}, state, (_a = {}, _a[field] = event.target.value, _a)));
            }
        });
    }; };
    var dispatch = useDispatch();
    var doSubmitSell = React.useCallback(function () {
        return dispatch(auctionDuck.actions.submitSell(state));
    }, [state]);
    return (React.createElement("div", __assign({ className: 'main-tab__wrap' }, props),
        React.createElement("div", { className: 'main-tab__head' },
            React.createElement("span", null, "Place an Ask")),
        React.createElement("div", { className: 'main-tab__body' },
            React.createElement("div", { className: 'sale-name-grid' },
                React.createElement("div", { className: 'form__title-wrap' },
                    React.createElement("span", { className: 'form__title' }, "Sell Name"),
                    React.createElement("a", { href: '#', className: 'form__title-info' },
                        React.createElement("svg", { width: '14', height: '15', viewBox: '0 0 14 15', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                            React.createElement("path", { d: 'M6.78125 0.96875C7.98438 0.96875 9.13281 1.29688 10.1719 1.89844C11.2109 2.5 12.0312 3.32031 12.6328 4.35938C13.2344 5.39844 13.5625 6.54688 13.5625 7.75C13.5625 8.98047 13.2344 10.1016 12.6328 11.1406C12.0312 12.1797 11.2109 13.0273 10.1719 13.6289C9.13281 14.2305 7.98438 14.5312 6.78125 14.5312C5.55078 14.5312 4.42969 14.2305 3.39062 13.6289C2.35156 13.0273 1.50391 12.1797 0.902344 11.1406C0.300781 10.1016 0 8.98047 0 7.75C0 6.54688 0.300781 5.39844 0.902344 4.35938C1.50391 3.32031 2.35156 2.5 3.39062 1.89844C4.42969 1.29688 5.55078 0.96875 6.78125 0.96875ZM6.78125 13.2188C7.76562 13.2188 8.66797 12.9727 9.51562 12.4805C10.3359 11.9883 11.0195 11.332 11.5117 10.4844C12.0039 9.66406 12.25 8.73438 12.25 7.75C12.25 6.76562 12.0039 5.86328 11.5117 5.01562C11.0195 4.19531 10.3359 3.51172 9.51562 3.01953C8.66797 2.52734 7.76562 2.28125 6.78125 2.28125C5.79688 2.28125 4.86719 2.52734 4.04688 3.01953C3.19922 3.51172 2.54297 4.19531 2.05078 5.01562C1.55859 5.86328 1.3125 6.76562 1.3125 7.75C1.3125 8.73438 1.55859 9.66406 2.05078 10.4844C2.54297 11.332 3.19922 11.9883 4.04688 12.4805C4.86719 12.9727 5.79688 13.2188 6.78125 13.2188ZM6.78125 3.97656C6.45312 3.97656 6.17969 4.11328 5.96094 4.33203C5.74219 4.55078 5.63281 4.82422 5.63281 5.125C5.63281 5.45312 5.74219 5.72656 5.96094 5.94531C6.17969 6.16406 6.45312 6.27344 6.78125 6.27344C7.08203 6.27344 7.35547 6.16406 7.57422 5.94531C7.79297 5.72656 7.92969 5.45312 7.92969 5.125C7.92969 4.82422 7.79297 4.55078 7.57422 4.33203C7.35547 4.11328 7.08203 3.97656 6.78125 3.97656ZM8.3125 10.9219V10.2656C8.3125 10.1836 8.25781 10.1016 8.20312 10.0469C8.14844 9.99219 8.06641 9.9375 7.98438 9.9375H7.65625V7.20312C7.65625 7.12109 7.60156 7.03906 7.54688 6.98438C7.49219 6.92969 7.41016 6.875 7.32812 6.875H5.57812C5.46875 6.875 5.38672 6.92969 5.33203 6.98438C5.27734 7.03906 5.25 7.12109 5.25 7.20312V7.85938C5.25 7.96875 5.27734 8.05078 5.33203 8.10547C5.38672 8.16016 5.46875 8.1875 5.57812 8.1875H5.90625V9.9375H5.57812C5.46875 9.9375 5.38672 9.99219 5.33203 10.0469C5.27734 10.1016 5.25 10.1836 5.25 10.2656V10.9219C5.25 11.0312 5.27734 11.1133 5.33203 11.168C5.38672 11.2227 5.46875 11.25 5.57812 11.25H7.98438C8.06641 11.25 8.14844 11.2227 8.20312 11.168C8.25781 11.1133 8.3125 11.0312 8.3125 10.9219Z', fill: '#FFAE00' })))),
                React.createElement("div", { className: 'form__wrap' },
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("label", { className: 'form__label' },
                            React.createElement("span", { className: 'form__label-text' }, "Sale Price*"),
                            React.createElement("span", { className: 'form__item' },
                                React.createElement("input", __assign({ className: 'form__input', type: 'text' }, bindField('ask')(state)))))),
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("label", { className: 'form__label' },
                            React.createElement("span", { className: 'form__label-text' }, "EOS  Name*"),
                            React.createElement("span", { className: 'form__item' },
                                React.createElement("input", __assign({ className: 'form__input', type: 'text' }, bindField('name')(state)))))),
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("label", { className: 'form__label' },
                            React.createElement("span", { className: 'form__label-text' }, "Receiving Account*"),
                            React.createElement("span", { className: 'form__item' },
                                React.createElement("input", __assign({ className: 'form__input', type: 'text' }, bindField('receivingAccount')(state)))))),
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("label", { className: 'form__label' },
                            React.createElement("span", { className: 'form__label-text' }, "Email*"),
                            React.createElement("span", { className: 'form__item' },
                                React.createElement("input", __assign({ className: 'form__input', type: 'text' }, bindField('email')(state)))))),
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("label", { className: 'form__label' },
                            React.createElement("span", { className: 'form__label-text' }, "Auction Period"),
                            React.createElement("span", { className: 'form__item' },
                                React.createElement("input", __assign({ className: 'form__input', type: 'text' }, bindField('auctionPeriod')(state)))))),
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("div", { className: 'form__item', style: stateIsValid ? {} : { pointerEvents: 'none' } },
                            React.createElement("button", { className: 'form__btn', disabled: !stateIsValid, onClick: doSubmitSell },
                                React.createElement("span", { className: 'form__btn-text' }, "Submit Sell Auction"))))),
                React.createElement("div", { className: 'form__wrap' },
                    React.createElement("div", { className: 'form__item-wrap' },
                        React.createElement("label", { className: 'form__label' },
                            React.createElement("span", { className: 'form__label-text' }, "Your message"),
                            React.createElement("span", { className: 'form__item no-miw' },
                                React.createElement("textarea", __assign({ className: 'form__input', rows: '14' }, bindField('message')(state))))))),
                React.createElement("div", { className: 'main-tab__block-wrap' },
                    React.createElement("div", { className: 'main-tab__block-title' }, "Account Information"),
                    React.createElement("div", { className: 'main-tab__block-body' },
                        React.createElement("div", { className: 'account-table' },
                            React.createElement("div", { className: 'account-table_block' },
                                React.createElement("div", { className: 'account-table_row' },
                                    React.createElement("div", { className: 'account-table_cell' }, "EOS Balance"),
                                    React.createElement("div", { className: 'account-table_cell' },
                                        React.createElement("a", { href: '#' }, "10.45 EOS"))),
                                React.createElement("div", { className: 'account-table_row' },
                                    React.createElement("div", { className: 'account-table_cell' }, "RAM Quota"),
                                    React.createElement("div", { className: 'account-table_cell' }, "50%")),
                                React.createElement("div", { className: 'account-table_row' },
                                    React.createElement("div", { className: 'account-table_cell' }, "RAM Unused"),
                                    React.createElement("div", { className: 'account-table_cell' }, "12")),
                                React.createElement("div", { className: 'account-table_row' },
                                    React.createElement("div", { className: 'account-table_cell' }, "Staked CPU"),
                                    React.createElement("div", { className: 'account-table_cell' }, "21")),
                                React.createElement("div", { className: 'account-table_row' },
                                    React.createElement("div", { className: 'account-table_cell' }, "Staked Net"),
                                    React.createElement("div", { className: 'account-table_cell' }, "12")))),
                        React.createElement("div", { className: 'main-tab__block-info' },
                            React.createElement("div", { className: 'main-tab__block-info_text' },
                                state.name,
                                ".eosio"))))))));
};
//# sourceMappingURL=SellPane.js.map