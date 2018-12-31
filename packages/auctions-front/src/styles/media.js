var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a;
import { css } from './styled';
export var sizes = {
    desktop: 1024,
    tablet: 720,
    phone: 420,
};
var dividerCoarse = 10;
var dividerFine = 16;
export var media = (_a = {
        desktopMin: function () {
            var as = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                as[_i] = arguments[_i];
            }
            return css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    @media (min-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (min-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.desktop / dividerCoarse, css.apply(void 0, __spread(as)));
        },
        desktopMax: function () {
            var as = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                as[_i] = arguments[_i];
            }
            return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.desktop / dividerCoarse, css.apply(void 0, __spread(as)));
        }
    },
    _a['824Max'] = function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), 1024 / dividerCoarse, css.apply(void 0, __spread(as)));
    },
    _a.landscapeMax = function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.desktop / dividerCoarse, css.apply(void 0, __spread(as)));
    },
    _a.landscapeMin = function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    @media (min-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (min-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.tablet / dividerCoarse, css.apply(void 0, __spread(as)));
    },
    _a.portraitMax = function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.tablet / dividerCoarse, css.apply(void 0, __spread(as)));
    },
    _a.portraitMin = function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    @media (min-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (min-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.phone / dividerCoarse, css.apply(void 0, __spread(as)));
    },
    _a.phone = function () {
        var as = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            as[_i] = arguments[_i];
        }
        return css(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "], ["\n    @media (max-width: ", "rem) {\n      // @ts-ignore\n      ", "\n    }\n  "])), sizes.phone / dividerCoarse, css.apply(void 0, __spread(as)));
    },
    _a);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=media.js.map