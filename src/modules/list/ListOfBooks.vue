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

      <ButtonWithText class="list__btn" @click="setNewBook" />
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
            @change="increment(book.id, $event)"
          />
          <RouterLink :to="`/about/${book.id}`" :class="{ 'read': book.read }">
            {{ book.title }}
          </RouterLink>

          <button @click="removeBook(book.id)" class="list__del-btn"></button>
        </li>
      </ul>
    </div>

    <ButtonWithText
      class="list__hide-btn"
      :class="{ hidden: !this.books.length }"
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

    increment(id, el) {
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
        .catch((err) => {
          throw new Error('Ошибка при добавлении книги')
        });

      this.newBook = "";
    },

    async fetchBooks() {
      await axios
        .get("http://localhost:3000/api/books")
        .then((response) => (this.books = response.data))
        .catch((err) => {
          throw new Error('Ошибка при запросе списка книг с сервера')
        });
    },

    async removeBook(id) {
      await axios
        .delete(`http://localhost:3000/api/books/${id}`)
        .then(() => this.fetchBooks())
        .catch((err) => {
          throw new Error('Ошибка при удалении книги')
        });
    },

    async saveReadBooks(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          read: true,
        })
        .then(() => this.fetchBooks())
        .catch((err) => {
          throw new Error('Ошибка при отметке о прочтении книги')
        });
    },

    async delReadBooks(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          read: false,
        })
        .then(() => this.fetchBooks())
        .catch((err) => {
          throw new Error('Ошибка при отмене отметки о прочтении книги')
        });
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
  margin-bottom: 20px;
}
.list__input {
  width: 50%;
  height: 30px;
  padding-left: 5px;
  border-radius: 5px;
}

.list__input:focus {
  box-shadow: inset 0 0 2px 2px #8256b599;
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
  max-height: 55vh;
  margin-bottom: 50px;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
  overflow-y: auto;
}

.list__wrap-ul::-webkit-scrollbar-track {
  background-color: #fff;
}

.list__wrap-ul::-webkit-scrollbar {
  width: 5px;
}

.list__wrap-ul::-webkit-scrollbar-thumb {
  background-image: linear-gradient(
    180deg,
    var(--vt-c-electric-violet) 0%,
    #12c5e9 99%
  );
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}

.list__wrap-ul {
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
}

.list__wrap-ul:hover {
  scrollbar-color: #5749d2;
}

.list__wrap-ul li {
  cursor: pointer;
}

.list__wrap-ul li:hover,
.read:hover {
  color: var(--vt-c-west-side);
}

.list__wrap-ul li a {
  font-weight: 600;
}

.list__hide-btn {
  margin-left: 0;
  margin-bottom: 30px;
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
  accent-color: #7814fa;
}

[type="checkbox"]:focus {
  outline: none;
}

.read {
  color: var(--vt-c-cornflower-blue);
  text-shadow: 0px 0px 0.5px rgba(252, 252, 249, 0.956);
}

.hidden {
  display: none;
}

@media (width < 720px) {
  ul {
    width: 100%;
    height: 50vh;
  }
  .list {
    width: 100%;
    padding: 10px;
  }

  .list__input {
    width: 93%;
    height: 20px;
  }

  .form__list {
    display: flex;
    align-items: center;
  }

  .list__btn {
    width: 20px;
    height: 20px;
    padding: 0 !important;
    margin-left: 5px;
    line-height: 0;
  }

  .list__btn::after {
    content: "+";
    font-weight: 600;
    font-size: 16px;
    vertical-align: middle;
  }

  .list__wrap-ul {
    width: 100%;
  }

  .list__wrap-ul li {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 1.3em;
    overflow-x: scroll;
  }
}
</style>
