import axios from "../config/axios.config";

const handleResponse = async (apiCall) => {
  try {
    const { data } = await apiCall();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en el servicio');
  }
};

const saveToken = (token) => {
  if (token) {
    try { localStorage.setItem("token", token); } catch {}
  }
};

export const login = async (payload) => {
  const data = await handleResponse(() => axios.post("/usuarios/login", payload));
  saveToken(data?.token);
  return data;
};

export const register = async (payload) => handleResponse(() => axios.post("/usuarios/register", payload));

export const getProfile = () => handleResponse(() => axios.get("/usuarios/perfil"));

export const updateProfile = (tokenOrPayload, maybePayload) => {
  const payload = maybePayload ?? tokenOrPayload;
  return handleResponse(() => axios.put("/usuarios/perfil", payload));
};
