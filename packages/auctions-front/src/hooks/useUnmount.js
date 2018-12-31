import { useEffect } from 'react';
var useUnmount = function (unmount) {
    useEffect(function () { return function () {
        if (unmount)
            unmount();
    }; }, []);
};
export default useUnmount;
//# sourceMappingURL=useUnmount.js.map