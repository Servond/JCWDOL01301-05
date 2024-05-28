import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    // 'Access-Control-Allow-Headers': 'Authorization',
  },
});

export default instance;
