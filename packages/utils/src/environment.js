// tslint:disable-next-line:variable-name
var __production = true;
export var setProduction = function (value) {
    return __production = value;
};
export var isProduction = function () {
    return __production;
};
var isNodeEnvironment = typeof process === 'object' &&
    process + '' === '[object process]';
var isBackend = function () {
    return isNodeEnvironment;
};
var isFrontend = function () {
    return !isNodeEnvironment;
};
export { isFrontend, isBackend, };
//# sourceMappingURL=environment.js.map