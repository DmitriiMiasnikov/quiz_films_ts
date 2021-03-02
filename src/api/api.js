import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true
})

export const listApi = {
  async getAllList(catalog) {
    const res = await instance.get(`quiz/list/all/${catalog}`);
    return res;
  },
  async getList(page, catalog, currentFilter) {
    const res = await instance.get(`quiz/list/${page}?catalog=${catalog}&filter=${currentFilter}`);
    return res;
  }
}

export const quizApi = {
  async getQuiz(name) {
    const res = await instance.get(`quiz/${name}`);
    return res
  }
}

export const statisticsApi = {
  async setStatisticsQuiz(name, score) {
    const res = await instance.put(`statistics/quiz/${name}?score=${score}`);
    return res
  },
  async setStatisticsFilm(name, answer) {
    const res = await instance.post(`statistics/film/?name=${name}&answer=${answer}`);
    return res
  },
  async getStatisticsQuiz(name) {
    const res = await instance.get(`statistics/${name}`);
    return res
  }
}

export const userApi = {
  async getIsAuth() {
    const res = await instance.get(`users/isAuth/`);
    return res;
  },
  async registration(userName, password, email) {
    const res = await instance.post(`users/registration/?userName=${userName}&password=${password}&email=${email}`);
    return res;
  },
  async authorization(userName, password) {
    const res = await instance.get(`users/authorization/?userName=${userName}&password=${password}`);
    return res;
  },
  async getUser(id) {
    const res = await instance.get(`users/id/${id}`);
    return res;
  }
}