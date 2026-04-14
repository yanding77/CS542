import { createContext, useContext, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { SessionContextType } from "../types/menuTypes";

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// crypto.randomUUID() requires HTTPS. Phones on local network use HTTP, so we need a fallback.
function generateUUID(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function SessionProvider({ children }: { children: ReactNode }) {
    const { tableId } = useParams<{ tableId: string }>();

    const [guestId] = useState(() => {
        const stored = localStorage.getItem("guestId");
        if (stored) return stored;
        const fresh = generateUUID();
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