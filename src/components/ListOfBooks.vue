<script>
let id = 0;
export default {
  data() {
    return {
      text: "",
      newBook: "",
      hideCompleted: false,
      books: [
        { id: id++, text: "Типы и грамматические конструкции", read: false },
        { id: id++, text: "JavaScript", read: false },
        { id: id++, text: "Алгоритмы", read: false },
      ],
      counter: { type: Number, count: 0 },
    };
  },
  components: {
    //IconDelete,
  },
  computed: {
    filteredBooks() {
      return this.hideCompleted
        ? this.books.filter((book) => !book.read)
        : this.books;
    },
  },
  methods: {
    addBook() {
      this.books.push({ id: id++, text: this.newBook, read: false });
      this.newBook = "";
    },
    removeBook(book) {
      this.books = this.books.filter((item) => item !== book);
    },
    increment(el) {
      if (el.target.checked == true) {
        this.counter.count++;
      } else {
        this.counter.count--;
      }
    },
    getDataAboutBook(e) {
      let obj = { id: e.currentTarget.dataset.id, title: e.target.innerText };
      localStorage.setItem("numberOfBook", JSON.stringify(obj));
    },
  },
};
</script>

<template>
  <div class="list">
    <h2>Список книг (прочитано: {{ counter.count }})</h2>
    <form @submit.prevent="addBook">
      <input v-model="newBook" />
      <ButtonWithText>Добавить</ButtonWithText>
    </form>
    <div class="wrap-ul">
      <ul>
        <li
          v-for="book in filteredBooks"
          :key="book.id"
          :data-id="book.id"
          @click="getDataAboutBook"
        >
          <input type="checkbox" v-model="book.read" @change="increment" />
          <RouterLink to="/about" :class="{ read: book.read }">{{
            book.text
          }}</RouterLink>
          <button @click="removeBook(book)" class="del-btn">
            <!-- <IconDelete /> -->
          </button>
        </li>
      </ul>
    </div>

    <ButtonWithText class="hide-btn" @click="hideCompleted = !hideCompleted">{{
      hideCompleted ? "Показать все" : "Спрятать прочитанные"
    }}</ButtonWithText>
  </div>
</template>

<style scoped>
.list {
  height: 90vh;
  /*padding: 15px;
  border: 2px solid yellow; */
}
.del-btn {
  width: 11px;
  height: 9px;
  margin-left: 15px;
  padding: 0;
  background: url("./../assets/delete.svg") no-repeat;
  background-position: bottom center;
  border: none;
  border-radius: 2px;

  /* box-shadow: inset 0 0 3px 3px rgba(0, 0, 0, 0.6); */
}

.del-btn:hover {
  transform: scale(1.5);
}
.wrap-ul {
  margin-bottom: 50px;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: #d4aa70 #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
  overflow-y: auto;
}

.wrap-ul::-webkit-scrollbar-track {
  background-color: #6969dd;
}
.wrap-ul::-webkit-scrollbar {
  width: 5px;
}
.wrap-ul::-webkit-scrollbar-thumb {
  background-image: linear-gradient(180deg, #fa8e14 0%, #708ad4 99%);
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}

.wrap-ul {
  scrollbar-color: #d4aa70 #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
}

.wrap-ul:hover {
  scrollbar-color: #5749d2;
}

.wrap-ul li {
  cursor: pointer;
}

.wrap-ul li:hover {
  color: #fa8e14;
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

.hide-btn {
  /* position: absolute;
  left: 10px;
  bottom: 10px; */
}
[type="checkbox"] {
  margin-right: 10px;
}
.read {
  text-decoration: line-through;
}
</style>
