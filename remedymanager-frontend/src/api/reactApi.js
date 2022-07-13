const axios = require('axios');

const REACT_URL = process.env.REACT_APP_API_KEY;

// const REACT_URL = 'http://localhost:3001';

export async function createReact(maker) {
  return axios
    .post(`${REACT_URL}/react`, maker, {})
    .then((response) => response.data.react)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getReacts() {
  return axios
    .get(`${REACT_URL}/react`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function excludeReact(id) {
  return axios
    .delete(`${REACT_URL}/react/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function updateReact(id, maker) {
  return axios
    .put(`${REACT_URL}/react/${id}`, maker)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getReactById(id) {
  return axios
    .get(`${REACT_URL}/react/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}
