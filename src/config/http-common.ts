import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.response.use(
  function (res: AxiosResponse<any, any>) {
    return res.data;
  },
  (err: AxiosError<any, any>) => {
    return Promise.reject(err);
  }
);

export default apiClient;
