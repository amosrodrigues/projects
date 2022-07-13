const axios = require('axios');

const MAKER_URL = process.env.REACT_APP_API_KEY;

// const MAKER_URL = 'http://localhost:3001';

export async function createMaker(maker) {
  return axios
    .post(`${MAKER_URL}/maker`, maker, {})
    .then((response) => response.data.maker)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getMakers() {
  return axios
    .get(`${MAKER_URL}/maker`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function excludeMaker(id) {
  return axios
    .delete(`${MAKER_URL}/maker/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function updateMaker(id, maker) {
  return axios
    .put(`${MAKER_URL}/maker/${id}`, maker)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getMakerById(id) {
  return axios
    .get(`${MAKER_URL}/maker/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}
