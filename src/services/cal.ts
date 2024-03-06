import axios from "axios";

const API_CAL = process.env.API_CAL;

const baseURL = "https://api.cal.com/v1/";

export const api = axios.create({
  baseURL: baseURL,
  params: {
    apiKey: API_CAL,
  },
  transformRequest: axios.defaults.transformRequest,
  transformResponse: axios.defaults.transformResponse,
  validateStatus: (status) => status >= 200 && status < 300,
});
