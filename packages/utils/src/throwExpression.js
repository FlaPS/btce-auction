/**
 * trenary operator or arrow function with no bracets requers for an expression
 * Use this function in such cases
 * <example>
 *      (
 *          const callback = (param) =>
 *              param
 *                  ? console.log(param)
 *                  : throwExpression('No param passed')
 *       )()
 * </example>
 * @param e
 */
export default (function (e) {
    return (function () { throw e; })();
});
//# sourceMappingURL=throwExpression.js.map