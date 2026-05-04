import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "../types/menuTypes";

export function useMenu(locationId: string) {
    return useQuery<MenuItem[]>({
        queryKey: ['menu', locationId],
        queryFn: async () => {
            const res = await fetch(`/api/items/${locationId}`);
            if (!res.ok) throw new Error('Failed to fetch menu');
            return res.json();
        }
    })
}

