<script>
// let id = 0;
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      counter: { type: Number, count: 0 },
    };
  },
  components: {},
  computed: {
    ...mapState({
      books: (state) => state.list.books,
      text: (state) => state.list.text,
      newBook: (state) => state.list.newBook,
      hideCompleted: (state) => state.list.hideCompleted,
    }),
    ...mapGetters({
      filteredBooks: "list/filteredBooks",
    }),
  },
  methods: {
    ...mapMutations({
      addBook: "list/addBook",
      removeBook: "list/removeBook",
      setBooks: "list/setBooks",
      setText: "list/setText",
      setHideCompleted: "list/setHideCompleted",
      setReadBook: "list/setReadBook",
    }),
    increment(el) {
      if (el.target.checked == true) {
        this.counter.count++;
      } else {
        this.counter.count--;
      }
    },
    setNewBook(e) {
      this.$store.commit("list/setNewBook", e.target.value);
    },
  },
};
</script>

<template>
  <div class="list">
    <h2>Список книг (прочитано: {{ counter.count }})</h2>
    <form @submit.prevent="addBook">
      <input
        class="list__input"
        :value="newBook"
        @input="setNewBook"
        placeholder="Введите название книги"
      />
      <ButtonWithText class="list__btn">Добавить</ButtonWithText>
    </form>
    <div class="list__wrap-ul">
      <ul>
        <li v-for="book in filteredBooks" :key="book.id">
          <input type="checkbox" v-model="book.read" @change="increment" />
          <RouterLink to="/about" :class="{ read: book.read }">
            {{ book.text }}
          </RouterLink>
          <button @click="removeBook(book)" class="list__del-btn"></button>
        </li>
      </ul>
    </div>

    <ButtonWithText
      class="list__hide-btn"
      @click="setHideCompleted(!hideCompleted)"
      >{{
        hideCompleted ? "Показать все" : "Спрятать прочитанные"
      }}</ButtonWithText
    >
  </div>
</template>

<style scoped>
.list {
  height: 80vh;
}
.list__input {
  width: 50%;
  height: 30px;
  border-radius: 5px;
}
.list__input:focus {
  box-shadow: inset 0 0 2px 2px rgba(220, 46, 46, 0.6);
}

.list__input:focus-visible {
  outline: none;
}
.list__btn {
  margin-left: 25px;
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
  background: url("./../assets/delete.svg") no-repeat;
  background-position: bottom center;
  border: none;
  border-radius: 2px;
}

.list__del-btn:hover {
  transform: scale(1.5);
}
.list__wrap-ul {
  margin-bottom: 50px;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
  overflow-y: auto;
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
.read {
  color: rgba(220, 20, 60, 0.8);
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.7);
  /* text-decoration: line-through; */
}
</style>
