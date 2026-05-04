const API_ORIGIN = import.meta.env.VITE_API_ORIGIN?.replace(/\/$/, '') ?? '';

export function getAssetUrl(path: string): string {
    if (/^(https?:|data:|blob:)/i.test(path)) {
        return path;
    }

    if (path.startsWith('/pics') && API_ORIGIN) {
        return `${API_ORIGIN}${path}`;
    }

    return path;
}
