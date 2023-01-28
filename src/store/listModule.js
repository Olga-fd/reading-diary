export const listModule = {
  state: () => ({
    // books: [
    //   // { id: 1, title: "Типы и грамматические конструкции", read: false },
    //   // { id: 2, title: "JavaScript", read: false },
    //   // { id: 3, title: "Алгоритмы", read: false },
    // ],
    text: "",
    //newBook: "",
    hideCompleted: false,
    idOfBook: "",
    index: 0,
    titleOfBook: "",
  }),
  getters: {
    filteredBooks(state) {
      return state.hideCompleted
        ? state.books.filter((book) => !book.read)
        : state.books;
    },
    checkAvailabilityOfText(state) {
      console.log(typeof state.index.default);
    },
  },

  mutations: {
    // addBook(state) {
    //   if (state.newBook) {
    //     state.books.push({ id: Date.now(), title: state.newBook, read: false });
    //     state.newBook = "";
    //   }
    // },
    removeBook(state, book) {
      state.books = state.books.filter((item) => item !== book);
    },
    // setNewBook(state, newBook) {
    //   state.newBook = newBook;
    // },
    setBooks(state, books) {
      state.books = books;
    },
    setText(state, text) {
      state.text = text;
    },
    setHideCompleted(state, hideCompleted) {
      state.hideCompleted = hideCompleted;
    },
    setId(state, id) {
      state.idOfBook = id;
      //state.index = state.books.findIndex((book) => book.id === idOfBook);
    },
    setTitle(state, title) {
      state.titleOfBook = title;
    },
  },
  actions: {},
  namespaced: true,
};
