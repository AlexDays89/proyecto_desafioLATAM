export async function login(data) {
    const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export async function register(data) {
    const res = await fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Register failed");
    return res.json();
}

export async function getProfile(token) {
    const res = await fetch("http://localhost:3000/usuarios/perfil", {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Get profile failed");
    return res.json();
}

export async function updateProfile(token, data) {
    const res = await fetch("http://localhost:3000/usuarios/perfil", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update profile failed");
    return res.json();
}