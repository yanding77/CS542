import {useQuery} from "@tanstack/react-query";
import type {TableCart} from "../types/menuTypes.ts";

export const useCart = (tableID: string) => {

    const cartQuery = useQuery<TableCart>({

        queryKey: ['cart', tableID],
        queryFn: async () => {
            const status = await fetch(`/api/cart/${tableID}`);
            if (!status.ok){
                throw new Error(`Error: ${status.status} ${status.statusText}`);
            }
            return status.json();
        },
    })

    return {
        cart: cartQuery.data,
    }

}
