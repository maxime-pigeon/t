// @ts-ignore
import isEqual from "https://unpkg.com/lodash-es@4.17.21/isEqual.js";

class AssertionError extends Error {
    actual: any;
    expected: any;

    constructor(actual: any, expected: any) {
        super();
        this.actual = JSON.stringify(actual);
        this.expected = JSON.stringify(expected);
    }
}

export function test(name: string, callback: () => void): void {
    try {
        callback();
    } catch (err) {
        if (!(err instanceof AssertionError)) throw err;
        let msg = `--- TEST FAILED\n\n`;
        msg += `✖ ${name}\n`;
        msg += `  └─ ${err.stack?.split("\n")[2].trim()}\n\n`;
        msg += `Actual:   ${err.actual}\n`;
        msg += `Expected: ${err.expected}\n`;
        console.error(msg);
    }
}

export function expect(actual: any): { toBe: (expected: any) => void } {
    return {
        toBe: (expected: any) => {
            if (isEqual(actual, expected)) return;
            throw new AssertionError(actual, expected);
        },
    };
}
