const axios = require('axios');

const REMEDY_URL = process.env.REACT_APP_API_KEY;

// const REMEDY_URL = 'http://localhost:3001';

export async function createRemedy(remedy) {
  return axios
    .post(`${REMEDY_URL}/remedy`, remedy)
    .then((response) => response.data.remedy)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getRemedys() {
  return axios
    .get(`${REMEDY_URL}/remedy`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function excludeRemedy(id) {
  return axios
    .delete(`${REMEDY_URL}/remedy/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function updateRemedy(remedy) {
  const {
    _id,
    nroAnvisa,
    name,
    price,
    dateValid,
    phone,
    pills,
    maker,
    reacts,
  } = remedy;

  return axios
    .put(`${REMEDY_URL}/remedy/${_id}`, {
      nroAnvisa,
      name,
      price,
      dateValid,
      phone,
      pills,
      maker,
      reacts,
    })
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getRemedyById(id) {
  return axios
    .get(`${REMEDY_URL}/remedy/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getRemedyByNameOrId(search) {
  return axios
    .post(`${REMEDY_URL}/remedy/search`, search)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}
