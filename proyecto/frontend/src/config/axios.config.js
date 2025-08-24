import axios from "axios";

const baseURL = import.meta.env?.VITE_API_BASE_URL || 
                import.meta.env?.VITE_API_URL || 
                "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: baseURL.replace(/\/+$/, ""),
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token && !config.headers?.Authorization) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
  } catch {}
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const { status, data } = error?.response || {};
    const message = data?.message || data?.error || error?.message || `HTTP ${status || ""} error`;
    
    const wrapped = new Error(message);
    wrapped.status = status;
    wrapped.data = data;
    wrapped.url = error?.config?.url;
    wrapped.method = error?.config?.method;
    throw wrapped;
  }
);

export default axiosInstance;
