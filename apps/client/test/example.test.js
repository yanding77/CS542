import { describe, it, expect } from "vitest";
import { menuItems, categories } from "../src/data/items.ts";

describe('unit test milestone1', () => {
    it('no negative prices', () => {
        menuItems.forEach(item => {
            expect(item.price > 0);
        })
    })

    it('category exists', () => {
        menuItems.forEach(item => {
            expect(categories).toContain(item.category);
        })
    })


})