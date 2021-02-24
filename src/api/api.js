import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const listApi = {
  async getList(page, catalog, currentFilter) {
    const res = await instance.get(`quiz/list/${page}?catalog=${catalog}&filter=${currentFilter}`);
    return res.data.list;
  }
}

export const quizApi = {
  async getQuiz(name) {
    const res = await instance.get(`quiz/${name}`);
    return res
  }
}

export const userApi = {
  async registration(userName, password, email) {
    const res = await instance.post(`users/registration/?userName=${userName}&password=${password}&email=${email}`);
    return res;
  },
  async authorization(userName, password) {
    const res = await instance.get(`users/authorization/?userName=${userName}&password=${password}`);
    return res;
  }
}