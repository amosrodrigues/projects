const axios = require('axios');

const USER_URL = 'https://tasksmanager-bk.herokuapp.com';

export async function createUser(user) {
  return axios
    .post(`${USER_URL}/users`, user)
    .then((response) => response.data.user)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function onLogin(user) {
  return axios
    .post(`${USER_URL}/login`, user)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function createTask(task, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  return axios
    .post(`${USER_URL}/tasks`, task, {
      headers: headers,
    })
    .then((response) => response.data.task)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getTasks(order) {
  const auth = JSON.parse(localStorage.getItem('auth'));

  return axios
    .post(`${USER_URL}/tasks/all`, order, {
      headers: { Authorization: auth && auth.token },
    })
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function excludeTask(id) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return axios
    .delete(`${USER_URL}/tasks/${id}`, {
      headers: { Authorization: auth.token },
    })
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function updateTask(id, task) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const headers = {
    'Content-Type': 'application/json',
    Authorization: auth.token,
  };

  return axios
    .put(`${USER_URL}/tasks/${id}`, task, {
      headers: headers,
    })
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}

export async function getTaskById(id) {
  return axios
    .get(`${USER_URL}/tasks/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      return { message: error.response.data.message };
    });
}
