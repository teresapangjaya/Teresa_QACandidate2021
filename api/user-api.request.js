const axios = require('axios');
const urlGetUser = 'https://reqres.in/api/users?page=1';
const urlPostCreate = 'https://reqres.in/api/users';

const getUser = async () => {
  try {
    const res = await axios(urlGetUser);
    return res;
  } catch(err) {
    throw err;
  };
};

const postUser = async (name, job) => {
  try {
    const res = await axios.post(urlPostCreate, {name: name, job: job})
    return res;
  } catch(err) {
    throw err;
  };
};

module.exports = {
  getUser,
  postUser
}