<template>
  <div class="list">
    <h2>
      Список книг (прочитано:
      {{ checked.length }})
    </h2>
    <form class="form__list" @submit.prevent>
      <input
        class="list__input"
        :value="newBook"
        @input="newBook = $event.target.value"
        placeholder="Введите название новой книги"
      />

      <ButtonWithText class="list__btn" @click="setNewBook"> </ButtonWithText>
    </form>
    <div class="list__wrap-ul">
      <ul>
        <li
          class="list__wrap_li"
          v-for="book in filteredBooks"
          :key="book.id"
          @click="setSelectedBook(book)"
        >
          <input
            type="checkbox"
            v-model="book.read"
            @change="increment(book.id)"
          />
          <RouterLink to="/about" :class="{ read: book.read }">
            {{ book.title }}
          </RouterLink>

          <button @click="removeBook(book.id)" class="list__del-btn"></button>
        </li>
      </ul>
    </div>

    <ButtonWithText
      class="list__hide-btn"
      @click="setHideCompleted(!hideCompleted)"
    >
      {{ hideCompleted ? "Показать все" : "Спрятать прочитанные" }}
    </ButtonWithText>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      books: [],
      counter: { type: Number, count: 0 },
      newBook: "",
      hideCompleted: false,
    };
  },
  components: {},
  computed: {
    ...mapState({
      search: (state) => state.list.search,
      selectedBook: (state) => state.list.selectedBook,
    }),
    ...mapGetters({}),

    filteredBooks() {
      return this.hideCompleted
        ? this.books.filter((book) => !book.read)
        : this.search
        ? this.books.filter(
            // (book) => book.title.toLowerCase() == this.search.toLowerCase()
            (book) =>
              book.title.toLowerCase().includes(this.search.toLowerCase())
          )
        : this.books;
    },

    checked() {
      return this.books.filter((book) => book.read);
    },
  },
  methods: {
    ...mapMutations({
      setSelectedBook: "list/setSelectedBook",
    }),

    increment(el, id) {
      if (el.target.checked == true) {
        this.counter.count++;
        this.saveReadBooks(id);
      } else {
        this.counter.count--;
        this.delReadBooks(id);
      }
    },
    async setNewBook() {
      await axios
        .post("http://localhost:3000/api/books", {
          title: this.newBook,
          read: false,
          picture: "",
          plot: "",
          review: "",
          quotes: [],
        })
        .then(() => this.fetchBooks())
        .catch((err) => console.log(err));

      this.newBook = "";
    },

    async fetchBooks() {
      await axios
        .get("http://localhost:3000/api/books")
        .then((response) => (this.books = response.data))
        .catch((error) => console.log(error));
    },

    async removeBook(id) {
      await axios
        .delete(`http://localhost:3000/api/books/${id}`)
        .then(() => this.fetchBooks())
        .catch((err) => console.log(err));
    },

    async saveReadBooks(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          read: true,
        })
        .catch((err) => console.log(err));
    },

    async delReadBooks(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          read: false,
        })
        .catch((err) => console.log(err));
    },

    setHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
  },

  mounted() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
.list {
  height: 80vh;
}
.list__input {
  width: 50%;
  height: 30px;
  padding-left: 5px;
  border-radius: 5px;
}

/* .list__input::placeholder {
  padding-left: 5px;
} */

.list__input:focus {
  box-shadow: inset 0 0 2px 2px rgba(220, 46, 46, 0.6);
}

.list__input:focus-visible {
  outline: none;
}

.list__btn {
  margin-left: 25px;
}

.list__btn::after {
  content: "Добавить";
  font-weight: 600;
}
.list__hide-btn {
  position: absolute;
  left: 10px;
  bottom: 10px;
}

.list__del-btn {
  width: 11px;
  height: 9px;
  margin-left: 15px;
  padding: 0;
  background: url("../../assets/images/delete.svg") no-repeat;
  background-position: bottom center;
  border: none;
  border-radius: 2px;
}

.list__del-btn:hover {
  transform: scale(1.5);
}

.list__wrap-ul {
  width: 50%;
  margin-bottom: 50px;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
  overflow-y: auto;

  /* column-count: 2;
  column-gap: 4%; */
}

.list__wrap-ul::-webkit-scrollbar-track {
  background-color: var(--vt-c-whiskey);
}

.list__wrap-ul::-webkit-scrollbar {
  width: 5px;
}

.wrap-ul::-webkit-scrollbar-thumb {
  background-image: linear-gradient(
    180deg,
    var(--vt-c-text-west-side) 0%,
    #708ad4 99%
  );
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}

.wrap-ul {
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
}

.wrap-ul:hover {
  scrollbar-color: #5749d2;
}

.list__wrap-ul li {
  cursor: pointer;
}

.list__wrap-ul li:hover {
  color: var(--vt-c-text-west-side);
}

ul {
  height: 100%;
  margin-top: 20px;
  padding: 0;
}

li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

[type="checkbox"] {
  margin-right: 10px;
  accent-color: var(--vt-c-text-west-side);
}

[type="checkbox"]:focus {
  outline: none;
}

.read {
  color: rgba(220, 20, 60, 0.8);
  text-shadow: 0px 0px 0.5px rgba(252, 252, 249, 0.956);
  /* text-decoration: line-through; */
}

@media screen and (width < 720px) {
  .list {
    width: 100%;
  }

  .list__input {
    width: 50%;
    height: 20px;
  }

  .form__list {
    display: flex;
  }

  .list__btn {
    width: 20px;
    height: 20px;
    padding: 0 !important;
    margin-left: 5px;
  }

  .list__btn::after {
    content: "+";
    font-weight: 600;
    font-size: 16px;
  }

  .list__wrap-ul li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1.3em;
  }
}
</style>