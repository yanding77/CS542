import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import {describe, it, expect, vi, afterEach} from "vitest";
import App from "../src/app";
import * as matchers from '@testing-library/jest-dom/matchers'; // Import matchers
import MenuCategories from "../src/components/MenuCategories.jsx";

expect.extend(matchers);

describe('App testing', () => {
    afterEach(() => {
        cleanup();
    });

    it('scrolls the menu when a category is selected', () => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();

        render(<App/>);

        const categoryBtn = screen.getByRole('button', {name: "Ceviches"});
        fireEvent.click(categoryBtn);

        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('applies active styles only to the selected category', () => {
        const categories = ['Entradas', 'Ceviches'];

        render(
            <MenuCategories
                categories={categories}
                selectedCategory="Entradas"
                onSelectCategory={() => {}}
            />
        );

        const activeBtn = screen.getByRole('button', { name: "Entradas" });
        const inactiveBtn = screen.getByRole('button', { name: "Ceviches" });

        expect(activeBtn).toHaveClass('bg-[#ffcc00]');
        expect(inactiveBtn).not.toHaveClass('bg-[#ffcc00]');
    });
})