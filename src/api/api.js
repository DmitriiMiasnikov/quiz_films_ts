import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const listApi = {
  async getList(page, currentFilter) {
    const res = await instance.get(`quiz/list/${page}?filter=${currentFilter}`);
    return res.data.list;
  }
}

export const quizApi = {
  async getQuiz(name) {
    const res = await instance.get(`quiz/${name}`);
    return res
  }
}