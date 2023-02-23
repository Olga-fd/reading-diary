<template>
  <div>
    <h2>Цитаты</h2>
    <BtnWithModalQuote />
    <div class="inner" v-if="selectedBook.quotes.length > 0">
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
</style>
