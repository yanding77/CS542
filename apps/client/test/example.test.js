import { describe, it, expect } from "vitest";
import { SEED_ITEMS } from "../../server/src/database/seed-data.ts";

const categories = [...new Set(SEED_ITEMS.map(item => item.category))];

describe('unit test milestone1', () => {
    it('no negative prices', () => {
        SEED_ITEMS.forEach(item => {
           expect(item.price > 0);
        })
    })

    it('category exists', () => {
        SEED_ITEMS.forEach(item => {
            expect(categories).toContain(item.category);
        })
    })
})