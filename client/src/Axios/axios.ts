import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});
const token = localStorage.getItem('token');

const config = {
  Headers: {
    Authorization: token,
  },
};

export default function axiosSetUp() {
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use((response) => {
    response.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  });
}
