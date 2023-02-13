<template>
  <div>
    <h2>Цитаты</h2>
    <BtnWithModalQuote />
    <div class="list-inner" v-if="selectedBook.quotes.length > 0">
      <ul class="quotes" v-for="quote in selectedBook.quotes" :key="quote.id">
        <li>
          {{ quote.value }}
          <button
            @click="removeQuote(quote.number)"
            class="list__del-btn"
          ></button>
        </li>
      </ul>
    </div>

    <blockquote v-else></blockquote>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BtnWithModalQuote from "./BtnWithModalQuote.vue";
import axios from "axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapActions({
      updateData: "list/updateData",
    }),
    async removeQuote(num) {
      await axios
        .patch(`http://localhost:3000/api/books/${this.selectedBook.id}`, {
          quotes: this.delQuote(num),
        })
        .then(() => this.updateData())
        .catch((err) => console.log(err));
    },
    delQuote(num) {
      let index = this.selectedBook.quotes.findIndex(
        (quote) => quote.number == num
      );
      return this.selectedBook.quotes.splice(index, 1);
    },
  },
  components: { BtnWithModalQuote },
};
</script>

<style scoped>
.quotes {
  list-style: square;
}

li {
  margin-bottom: 10px;
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

.list-inner {
  width: 95%;
  height: 300px;
  margin-bottom: 10px;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
  overflow-y: auto;
}

.list-inner::-webkit-scrollbar {
  width: 5px;
}

/* .list-inner::-webkit-scrollbar-track {
  background-color: var(--vt-c-gorse);
} */

.list-inner::-webkit-scrollbar {
  width: 5px;
}

.list-inner::-webkit-scrollbar-thumb {
  background-image: linear-gradient(
    180deg,
    var(--vt-c-electric-violet) 0%,
    #dae4ff 99%
  );
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}

.list-inner {
  scrollbar-color: var(--vt-c-whiskey) #e4e4e4;
  transition: scrollbar-color 0.3s ease-out;
}

.list-inner:hover {
  scrollbar-color: #5749d2;
}

.list-inner li {
  cursor: pointer;
}

.list-inner li:hover {
  color: var(--vt-c-text-west-side);
}

.list-inner li a {
  font-weight: 600;
}
</style>
