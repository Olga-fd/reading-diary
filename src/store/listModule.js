export const listModule = {
  state: () => ({
    books: [
      { id: 1, text: "Типы и грамматические конструкции", read: false },
      { id: 2, text: "JavaScript", read: false },
      { id: 3, text: "Алгоритмы", read: false },
    ],
    text: "",
    newBook: "",
    hideCompleted: false,
  }),
  getters: {
    filteredBooks(state) {
      return state.hideCompleted
        ? state.books.filter((book) => !book.read)
        : state.books;
    },
  },

  mutations: {
    addBook(state) {
      if (state.newBook) {
        state.books.push({ id: Date.now(), text: state.newBook, read: false });
        state.newBook = "";
      }
    },
    removeBook(state, book) {
      console.log(book);
      state.books = state.books.filter((item) => item !== book);
    },
    setNewBook(state, newBook) {
      state.newBook = newBook;
    },
    setBooks(state, books) {
      state.books = books;
    },
    setText(state, text) {
      state.text = text;
    },
    setHideCompleted(state, hideCompleted) {
      state.hideCompleted = hideCompleted;
    },
  },
  actions: {},
  namespaced: true,
};
