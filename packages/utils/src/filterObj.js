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
export default (function (pred) {
    return function (array) {
        return Object
            .keys(array)
            .reduce(function (r, key) {
            var _a;
            var test = pred(array[key]);
            return test
                ? __assign({}, r, (_a = {}, _a[key] = array[key], _a)) : r;
        }, {});
    };
});
//# sourceMappingURL=filterObj.js.map