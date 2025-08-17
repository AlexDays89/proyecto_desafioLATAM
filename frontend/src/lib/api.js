const BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

export async function api(path, opts = {}) {
  const url = `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json", ...(opts.headers||{}) }, ...opts });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[API FAIL]", res.status, res.statusText, "→", url, "\n", text);
    throw new Error("API error");
  }
  try { return await res.json(); } catch { return await res.text(); }
}
