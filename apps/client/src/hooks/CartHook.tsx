import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ItemDTO, TableCart } from "../types/menuTypes.ts";

export const useCart = (tableID: string) => {

    const queryClient = useQueryClient();

    const cartQuery = useQuery<TableCart>({
        queryKey: ['cart', tableID],
        queryFn: async () => {
            const status = await fetch(`/api/cart/${tableID}`);
            if (!status.ok) {
                throw new Error(`Error: ${status.status} ${status.statusText}`);
            }
            return status.json();
        },
        refetchInterval: (query) => query.state.error ? false : 1000,
        refetchIntervalInBackground: true,
        retry: false,
    })

    const addToCart = useMutation({
        mutationFn: async (dto: ItemDTO) => {
            const status = await fetch(`/api/cart/${tableID}/add`, {
                method: "PATCH",
                body: JSON.stringify(dto),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!status.ok) {
                throw new Error("Network Error: Failed to add to cart");
            }
            return status.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', tableID] });
        },
    });

    const removeFromCart = useMutation({
        mutationFn: async (dto: ItemDTO) => {
            const status = await fetch(`/api/cart/${tableID}/remove`, {
                method: "DELETE",
                body: JSON.stringify(dto),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!status.ok) {
                throw new Error('Network Error: Failed to delete from cart');
            }
            return status.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', tableID] });
        }
    });

    const submitOrderMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/orders/${tableID}/submit`, {
                method: "POST",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || 'Failed to submit order');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', tableID] });
        },
    });

    const quantityMap: { [key: string]: number } = {};

    cartQuery.data?.items.forEach(item => {
        quantityMap[item.id] = item.quantity;
    });


    return {
        cart: cartQuery.data,
        isError: cartQuery.isError,
        quantityMap: quantityMap,
        addItem: addToCart.mutate,
        deleteItem: removeFromCart.mutate,
        submitOrder: submitOrderMutation.mutate,
        isSubmitting: submitOrderMutation.isPending,
    }

}
