import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const listApi = {
  async getList() {
    const res = await instance.get('quiz/list');
    return res.data.list;
  }
}

export const quizApi = {
  async getQuiz(name) {
    const res = await instance.get(`quiz/${name}`);
    return res
  }
}