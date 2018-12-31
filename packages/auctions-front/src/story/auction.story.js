import React from 'react';
import { storiesOf } from '@storybook/react';
import { SideBar } from '../components/auction/sidebar/SideBar';
import { BuyPane } from '../components/auction/buyPane/BuyPane';
import { SellPane } from '../components/auction/sellPane/SellPane';
import { Menu } from '../components/auction/Menu';
import { Ticker } from '../components/auction/Ticker';
import { AuctionTabs } from '../components/auction/AuctionTabs';
storiesOf('auction', module)
    .add('SideBar', function () { return (React.createElement(SideBar, null)); })
    .add('buyForm', function () { return (React.createElement(BuyPane, null)); })
    .add('sellPane', function () { return (React.createElement(SellPane, null)); })
    .add('menu', function () { return (React.createElement(Menu, null)); })
    .add('ticker', function () { return (React.createElement(Ticker, null)); })
    .add('auction tabs', function () {
    return React.createElement(AuctionTabs, { data: ['home', 'sell name', 'buy name', 'my auctions', 'house rules'] });
});
//# sourceMappingURL=auction.story.js.map