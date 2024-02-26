import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://diocodes.dev/api";

export const api = axios.create({
  baseURL,
  transformRequest: axios.defaults.transformRequest,
  transformResponse: axios.defaults.transformResponse,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
});
