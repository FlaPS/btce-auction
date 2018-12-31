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
import { curry } from 'ramda';
export default curry(function (message, traceLevel, f) {
    if (message === void 0) { message = 'trace call'; }
    if (traceLevel === void 0) { traceLevel = 'log'; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var time = new Date().valueOf();
        if (traceLevel === 'debugger interrop')
            debugger;
        var result = f.apply(void 0, __spread(args));
        var elapsedTime = new Date().valueOf() - time;
        console[traceLevel].apply(console, __spread(['\n',
            message,
            'function ' + f.name,
            'elapsedTime ' + elapsedTime,
            '\n'], args, ['\n => ',
            '\n',
            result]));
        return result;
    };
});
/*
const tapToLog = <F extends Function>(f: F) => (
    (...args) => {
        const result = f(...args)
        console.log('Evaluate', f.name, args, result)
        return result
    }
) as any as F


const tapToLogIfFunction = <T>(value: T): T =>
    value instanceof Function
        ? tapToLog(value)
        : value

const logify = <T>(obj: T) =>
    Object.entries(obj).reduce(
        (result, [key, value]) => ({
            ...result,
            [key]: tapToLogIfFunction(value)
        }),
        {}
    )

const result = logify(obj)


type Class<T = {}> = {
    new (...args: any[]): T
    prototype: T
    staticProp: 'abc'
}


const a = {
    b: 5,
    c: a
}

type Mixin<A extends Class<{}>, B extends Class<{}>> = (base: A) => B

const ClassBuilder = <A extends Class<{}>>(Base: A) =>
    Object.assign(Base, {
        map: <B extends Class<{}>>(mixin: Mixin<A, B>) =>
            ClassBuilder(mixin(Base))
    })

class AClass {
    constructor(props) {
        super(props)
    }
    a = () => true
    b = () => this.constructor['d']
    static d = 6
}

const mixinB = <T extends Class<{}>>(Base: T) =>
    class extends Base {
        b = () => 'b'
    }

const mixinC = <T extends Class<{}>>(Base: T) =>
    class extends Base {
        c = () => 'c'
    }


type Foo<T, B> =    ThisType<B>

const ABC = ClassBuilder(AClass)
                .map(mixinB)
                .map(mixinC)

class Next extends ABC {}

(new Next()).c


type A = {a: number

}
interface N {
    static A: number
}
type Nominal<T, Tag extends string> = T & {readonly tag?: Tag}
type NominalA = Nominal<A, 'a'>

const pureA: A = {a: 1}
let nominalA: NominalA = {a: 4}
let nominalB: NominalA = {a: 4}
pureA = nominalA
nominalA = nominalB
nominalA = pureA
*/
//# sourceMappingURL=trace.js.map