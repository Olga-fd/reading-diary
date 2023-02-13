import axios from "axios";

export const listModule = {
  state: () => ({
    selectedBook: "",
    search: "",
  }),
  getters: {},

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
  namespaced: true,
};
