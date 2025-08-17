const BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

export async function api(path, opts = {}) {
    const url = `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
        // si usas cookies/sesión: descomenta la línea siguiente y habilita CORS con credentials en el back
        // credentials: "include",
        ...opts,
    });
    console.log("API BASE URL:", BASE);
    if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} → ${text}`);
    }
  // intenta JSON, si falla devuelve texto
    try { return await res.json(); } catch { return await res.text(); }
}
