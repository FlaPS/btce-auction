import { useEffect } from 'react';
var useGlobalKeyDown = function (callback) {
    useEffect(function () {
        window.addEventListener('keydown', callback);
        return function () {
            return window.removeEventListener('keydown', callback);
        };
    }, [callback]);
};
export default useGlobalKeyDown;
//# sourceMappingURL=useGlobalKeyDown.js.map