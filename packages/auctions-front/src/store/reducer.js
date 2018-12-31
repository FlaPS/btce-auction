import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { btceDuck } from './btce/btceDuck';
var reducer = function (history) { return combineReducers({
    router: connectRouter(history),
    app: btceDuck.reducer,
}); };
export default reducer;
//# sourceMappingURL=reducer.js.map