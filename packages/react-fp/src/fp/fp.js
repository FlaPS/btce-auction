var arrify = function (val) {
    return val === null || val === undefined ? [] : Array.isArray(val) ? val : [val];
};
var reduceProducers = function () {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (previous, current) {
        return reducers.reduce(function (p, r) { return r(p, current); }, previous);
    };
};
var idMorphism = function (state, action) { return state; };
var concat = function (f, g) {
    return reduceProducers(f, g);
};
export var concatR = concat;
export var Consumer = function (f) {
    if (f === void 0) { f = idMorphism; }
    return Object.assign(f, {
        valueOf: function () { return f; },
        concat: function (g) {
            return Consumer(concat(f, g));
        },
    });
};
//# sourceMappingURL=fp.js.map