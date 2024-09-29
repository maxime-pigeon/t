// @ts-ignore
import isEqual from "https://unpkg.com/lodash-es@4.17.21/isEqual.js";
class AssertionError extends Error {
    constructor(actual, expected) {
        super();
        this.actual = JSON.stringify(actual);
        this.expected = JSON.stringify(expected);
    }
}
export function test(name, callback) {
    var _a;
    try {
        callback();
    }
    catch (err) {
        if (!(err instanceof AssertionError))
            throw err;
        let msg = `--- TEST FAILED\n\n`;
        msg += `✖ ${name}\n`;
        msg += `  └─ ${(_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")[2].trim()}\n\n`;
        msg += `Actual:   ${err.actual}\n`;
        msg += `Expected: ${err.expected}\n`;
        console.error(msg);
    }
}
export function expect(actual) {
    return {
        toBe: (expected) => {
            if (isEqual(actual, expected))
                return;
            throw new AssertionError(actual, expected);
        },
    };
}
