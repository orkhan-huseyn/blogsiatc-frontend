import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + '/api/v1/',
  withCredentials: true,
});

export default instance;
