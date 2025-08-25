const BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

export async function api(path, opts = {}) {
  const url = `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  let options = { ...opts, headers: { "Content-Type": "application/json", ...(opts.headers||{}) } };
  if (options.body && typeof options.body !== "string") {
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[API FAIL]", res.status, res.statusText, "→", url, "\n", text);
    throw new Error("API error");
  }
  try { return await res.json(); } catch { return await res.text(); }
}
