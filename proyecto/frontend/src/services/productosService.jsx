import axios from "../config/axios.config";

const handleResponse = async (apiCall) => {
  try {
    const { data } = await apiCall();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en el servicio');
  }
};

export const getProductos = () => handleResponse(() => axios.get("/productos"));

export const getProductoPorId = (id) => handleResponse(() => axios.get(`/productos/${id}`));
