import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Cart from './Cart';
import { useCart } from '../hooks/CartHook';
import { useSession } from '../hooks/GuestIDContext';
import type { ItemDTO, SessionContextType, TableCart } from '../types/menuTypes';

vi.mock('../hooks/CartHook', () => ({
    useCart: vi.fn(),
}));

vi.mock('../hooks/GuestIDContext', () => ({
    useSession: vi.fn(),
}));

vi.mock('framer-motion', () => {
    type MotionOnlyProps = {
        animate?: unknown;
        drag?: unknown;
        dragConstraints?: unknown;
        dragMomentum?: unknown;
        dragTransition?: unknown;
        exit?: unknown;
        initial?: unknown;
        whileHover?: unknown;
        whileTap?: unknown;
    };

    const stripMotionProps = ({
        animate,
        drag,
        dragConstraints,
        dragMomentum,
        dragTransition,
        exit,
        initial,
        whileHover,
        whileTap,
        ...domProps
    }: MotionOnlyProps) => domProps;

    return {
        AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
        motion: {
            button: (props: ComponentPropsWithoutRef<'button'> & MotionOnlyProps) => (
                <button {...stripMotionProps(props)} />
            ),
            div: (props: ComponentPropsWithoutRef<'div'> & MotionOnlyProps) => (
                <div {...stripMotionProps(props)} />
            ),
            li: (props: ComponentPropsWithoutRef<'li'> & MotionOnlyProps) => <li {...stripMotionProps(props)} />,
        },
    };
});

type CartAction = (dto: ItemDTO) => void;

const defaultSession: SessionContextType = {
    guestId: 'guest-1',
    tableId: 'table-1',
};

const emptyCart: TableCart = {
    tableId: defaultSession.tableId,
    itemCount: 0,
    totalPrice: 0,
    items: [],
};

const cartWithItems: TableCart = {
    tableId: defaultSession.tableId,
    itemCount: 2,
    totalPrice: 20.5,
    items: [
        {
            id: 'item-1',
            name: 'Delicious Empanada',
            price: 10.25,
            quantity: 2,
            subtotal: 20.5,
            addedBy: defaultSession.guestId,
        },
    ],
};

function mockCartState({
    addItem = vi.fn<CartAction>(),
    cart = emptyCart,
    deleteItem = vi.fn<CartAction>(),
    session = defaultSession,
}: {
    addItem?: CartAction;
    cart?: TableCart;
    deleteItem?: CartAction;
    session?: SessionContextType;
} = {}) {
    vi.mocked(useSession).mockReturnValue(session);
    vi.mocked(useCart).mockReturnValue({
        addItem,
        cart,
        deleteItem,
        quantityMap: Object.fromEntries(cart.items.map((item) => [item.id, item.quantity])),
    });

    return { addItem, deleteItem, session };
}

function renderCart() {
    return render(<Cart />);
}

function openCart() {
    const cartIcon = screen.getByText('🛒');
    const cartTrigger = cartIcon.closest('.pointer-events-auto');

    if (!cartTrigger) {
        throw new Error('Cart trigger was not rendered with a clickable wrapper.');
    }

    fireEvent.click(cartTrigger);
}

describe('Cart', () => {
    beforeEach(() => {
        mockCartState();
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('renders a closed cart trigger and requests cart data for the current table', () => {
        renderCart();

        expect(useCart).toHaveBeenCalledWith(defaultSession.tableId);
        expect(screen.getByText('🛒')).toBeInTheDocument();
        expect(screen.queryByText('Tu Pedido')).not.toBeInTheDocument();
        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('opens an empty cart and shows the empty-state copy without checkout controls', () => {
        renderCart();

        openCart();

        expect(screen.getByText('Tu Pedido')).toBeInTheDocument();
        expect(screen.getByText('Tu carrito esta vacio!')).toBeInTheDocument();
        expect(screen.queryByText('Confirmar Pedido!')).not.toBeInTheDocument();
        expect(screen.queryByText('Total a Pagar')).not.toBeInTheDocument();
    });

    it('renders cart count, item details, line subtotal, and checkout controls for a non-empty cart', () => {
        mockCartState({ cart: cartWithItems });

        renderCart();

        expect(screen.getByText('2')).toBeInTheDocument();

        openCart();

        const itemRow = screen.getByText('Delicious Empanada').closest('li');
        expect(itemRow).not.toBeNull();
        expect(within(itemRow!).getByText('2')).toBeInTheDocument();
        expect(within(itemRow!).getByText('$10.25')).toBeInTheDocument();
        expect(within(itemRow!).getByText('$20.50')).toBeInTheDocument();
        expect(screen.getByText('$ 20.5')).toBeInTheDocument();
        expect(screen.getByText('Confirmar Pedido!')).toBeInTheDocument();
    });

    it('adds and removes the selected item using the current guest id', () => {
        const addItem = vi.fn<CartAction>();
        const deleteItem = vi.fn<CartAction>();
        mockCartState({ addItem, cart: cartWithItems, deleteItem });

        renderCart();
        openCart();

        fireEvent.click(screen.getByText('＋'));
        fireEvent.click(screen.getByText('－'));

        expect(addItem).toHaveBeenCalledTimes(1);
        expect(addItem).toHaveBeenCalledWith({
            productId: cartWithItems.items[0].id,
            clientId: defaultSession.guestId,
        });
        expect(deleteItem).toHaveBeenCalledTimes(1);
        expect(deleteItem).toHaveBeenCalledWith({
            productId: cartWithItems.items[0].id,
            clientId: defaultSession.guestId,
        });
    });

    it('closes the cart when the user returns to the menu', () => {
        mockCartState({ cart: cartWithItems });

        renderCart();
        openCart();

        fireEvent.click(screen.getByText('← Menu'));

        expect(screen.queryByText('Tu Pedido')).not.toBeInTheDocument();
    });
});
