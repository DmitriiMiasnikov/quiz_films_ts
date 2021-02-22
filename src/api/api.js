import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const listApi = {
  async getList(page) {
    const res = await instance.get(`quiz/list/${page}`);
    return res.data.list;
  }
}

export const quizApi = {
  async getQuiz(name) {
    const res = await instance.get(`quiz/${name}`);
    return res
  }
}