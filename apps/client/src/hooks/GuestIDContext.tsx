import { createContext, useContext, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { SessionContextType } from "../types/menuTypes";
import { v4 } from "uuid";

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const { tableId } = useParams<{ tableId: string }>();

    // Generate a guest ID once and persist it across page refreshes
    const [guestId] = useState(() => {
        const stored = localStorage.getItem("guestId");
        if (stored) return stored;
        const fresh = v4();
        localStorage.setItem("guestId", fresh);
        return fresh;
    });

    // If no tableId in the URL, this provider shouldn't render
    if (!tableId) {
        return <div>Error: No table ID found. Please scan a valid QR code.</div>;
    }

    return (
        <SessionContext.Provider value={{ guestId, tableId }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession(): SessionContextType {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a <SessionProvider>");
    }
    return context;
}