import {describe, it, expect} from "vitest";

describe('example test', () => {
    it('first', () => {
        const string = 'HELLO'.toLowerCase();
        expect(string).toEqual('hello');
    })
})