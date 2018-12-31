export var estimate = function (test, label) {
    if (label === void 0) { label = 'someFunction'; }
    console.time('estimate ' + label);
    var result = test();
    console.timeEnd('estimate ' + label);
    return result;
};
//# sourceMappingURL=estimate.js.map