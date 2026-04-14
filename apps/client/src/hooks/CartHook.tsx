import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {ItemDTO, TableCart} from "../types/menuTypes.ts";

export const useCart = (tableID: string) => {

    const queryClient = useQueryClient();

    const cartQuery = useQuery<TableCart>({
        queryKey: ['cart', tableID],
        queryFn: async () => {
            const status = await fetch(`/api/cart/${tableID}`);
            if (!status.ok){
                throw new Error(`Error: ${status.status} ${status.statusText}`);
            }
            return status.json();
        },
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
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
            if (!status.ok){
                throw new Error("Network Error: Failed to add to cart");
            }
            return status.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cart', tableID]});
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
            if (!status.ok){
                throw new Error('Network Error: Failed to delete from cart');
            }
            return status.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cart', tableID]});
        }
    });

    const quantityMap: { [key: string]: number } = {};

    cartQuery.data?.items.forEach(item => {
        quantityMap[item.id] = item.quantity;
    });


    return {
        cart: cartQuery.data,
        quantityMap: quantityMap,
        addItem: addToCart.mutate,
        deleteItem: removeFromCart.mutate,
    }

}
