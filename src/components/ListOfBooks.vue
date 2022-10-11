<script>
//import IconDelete from "./icons/IconDelete.vue";
let id = 0;
export default {
  data() {
    return {
      //addClass: "add-btn",
      listClass: "list",
      //delClass: "del-btn",
      //hideClass: "hide-btn",
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
  },
};
</script>

<template>
  <div :class="listClass">
    <h2>Список книг (прочитано: {{ counter.count }})</h2>
    <form @submit.prevent="addBook">
      <input v-model="newBook" />
      <ButtonWithText>Добавить</ButtonWithText>
    </form>
    <div class="wrap-ul">
      <ul>
        <li v-for="book in filteredBooks" :key="book.id">
          <input type="checkbox" v-model="book.read" @change="increment" />
          <span :class="{ read: book.read }">{{ book.text }}</span>
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
  width: 100%;
  height: 65vh;
  padding: 15px;
  border: 2px solid yellow;
}
.del-btn {
  width: 11px;
  height: 9px;
  padding: 0;
  background: url("./../assets/delete.svg") no-repeat;
  background-position: bottom center;
  border: none;
  border-radius: 2px;
  /* box-shadow: inset 0 0 3px 3px rgba(0, 0, 0, 0.6); */
}
.wrap-ul {
  height: 55%;
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
  background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
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

.hide-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
[type="checkbox"] {
  margin-right: 10px;
}
.read {
  text-decoration: line-through;
}

ul {
  height: 100%;
  margin: 10px;
}
</style>
