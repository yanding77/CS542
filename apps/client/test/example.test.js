import {describe, it, expect} from "vitest";
import {menu, categories} from "../src/data/items.js";

describe('unit test milestone1', () => {
    it('no negative prices', () => {
        menu.forEach(item => {
           expect(item.price > 0);
        })
    })

    it('category exists', () => {
        menu.forEach(item => {
            expect(categories).toContain(item.category);
        })
    })


})