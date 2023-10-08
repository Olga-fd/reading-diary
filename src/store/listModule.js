import axios from "axios";
import { createStore } from './index.js'

export const listModule = {
  state: () => ({
    selectedBook: "",
    search: "",
  }),
  mutations: {
    setSelectedBook(state, book) {
      state.selectedBook = book;
    },
    search(state, word) {
      state.search = word;
    },
  },
  actions: {
    async updateData({ state, commit }) {
      await axios
        .get(`http://localhost:3000/api/books/${state.selectedBook.id}`)
        .then((res) => commit("setSelectedBook", res.data));
    },
  },
  getters: {
    getModalStatusFromCreateStore: () => createStore.getters.getModalStatus
  },
  namespaced: true,
};
